import { getEnvironmentVariable } from "./environmentVariables";
import Twitter from 'twitter';
import { parseStringPromise } from 'xml2js';
import { IFeedItem } from "../data/rssFeedSchema";
import { findTweetByUrlInDatabase, getAllRssFeedFromDatabase, setTweetIntoDatabase } from "./databaseConnector";


const twitterClient = new Twitter({
    consumer_key: getEnvironmentVariable("TWITTER_API_KEY"),
    consumer_secret: getEnvironmentVariable("TWITTER_API_SECRET"),
    access_token_key: getEnvironmentVariable("TWITTER_ACCESS_TOKEN"),
    access_token_secret: getEnvironmentVariable("TWITTER_ACCESS_TOKEN_SECRET")
});

export function peformTwitterBot() {
    getAllRssFeedFromDatabase().then((a: IFeedItem[]) => {
        if (a.length === 0) {
            console.log("No feeds in List!");
        }

        checkFeedForKeyWords(a);
    });
}

const checkFeedForKeyWords = (feeds: IFeedItem[]) => {
    feeds = feeds.filter(a => a.status === true);

    feeds.forEach(rssFeed => {
        fetch(rssFeed.url)
        .then(raw => raw.text())
        .then(rawXML => parseStringPromise(rawXML))
        .then(result => {
            const keywords = rssFeed.keywords.split(",");
            return Promise.all(result["rdf:RDF"].item.map(async element => {
        
                if (searchFieldForKeyword(element.title[0], element["dc:subject"][0], keywords, rssFeed.includeAll)) {
                    checkInDatabaseForDouble(element, rssFeed.icon);
                }

                return Promise.resolve();
            }));
        })
        .catch(error => console.log("Nothing Found"));
    });
}

const searchFieldForKeyword = (title: string, subject: string, keywords: string[], includeAll: boolean): boolean => {
    if(includeAll) {
        let hasAll = true;
        keywords.forEach(keyword => {
            if (!title.toLowerCase().includes(keyword.toLowerCase()) && !keywords.map(keyword => subject.toLowerCase().includes(keyword.toLowerCase()))) {
                hasAll = false;
            }
        });
        return hasAll;
    } else {
        return keywords.map(keyword => title.toLowerCase().includes(keyword.toLowerCase())).some(predicate => predicate) || keywords.map(keyword => subject.toLowerCase().includes(keyword.toLowerCase())).some(predicate => predicate);
    }
};    

/*
const searchFieldForKeyword = (field: string, keywords: string[]): boolean => {
    return keywords.map(keyword => field.toLowerCase().includes(keyword.toLowerCase())).some(predicate => predicate);
};   */

const sendTweet = (tweet: string): Promise<any> => {
    return new Promise((res, rej) => {
        twitterClient.post('statuses/update', { status: tweet }, (error, tweetBody, response) => {
            if (!error) {
                res(tweetBody);
            } else {
                rej(error);
            }
        });
    });
};    

const checkInDatabaseForDouble = (element, icon) => {

    const title = element.title[0] ?? "Not Found";
    const link = element.link[0] ?? "Not Found";

    findTweetByUrlInDatabase(link).then((a) => {
        if(!a) {
            setTweetIntoDatabase({title: title, url: link, icon: icon}).then((b) => {
              const result = sendTweet(`${title}: ${link}`);
            });
        } else {
            console.log("Already Saved!");
        }
    });

}

