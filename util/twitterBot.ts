import { getEnvironmentVariable } from "./environmentVariables";
import Twitter from 'twitter';
import { parseStringPromise } from 'xml2js';
import { IFeedItem } from "../data/rssFeedSchema";
import { getAllRssFeedFromDatabase } from "./databaseConnector";


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
    feeds.forEach(rssFeed => {
        fetch(rssFeed.url)
        .then(raw => raw.text())
        .then(rawXML => parseStringPromise(rawXML))
        .then(result => {
            const keywords = rssFeed.keywords.split(",");
            return Promise.all(result["rdf:RDF"].item.map(async element => {
                console.log(element);

                if (searchFieldForKeyword(element.title[0], keywords) || searchFieldForKeyword(element["dc:subject"][0], keywords)) {
                    const result = await sendTweet(`${element.title[0]}: ${element.link[0]}`);
                    console.log(result);
                }
                
                return Promise.resolve();
            }));
        })
        .then(() => console.log("Save to DB"))
        .catch(error => console.log("Do nothing"));
    });
}


const searchFieldForKeyword = (field: string, keywords: string[]): boolean => {
    return keywords.map(keyword => field.toLowerCase().includes(keyword.toLowerCase())).some(predicate => predicate);
};    

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

const checkInDatabaseForDouble = () => {

}


    /* 
    const tweetIDs = ["1388101964186140672"];
    const response = [];

    const twitterClient = new Twitter({
        consumer_key: getEnvironmentVariable("TWITTER_API_KEY"),
        consumer_secret: getEnvironmentVariable("TWITTER_API_SECRET"),
        access_token_key: getEnvironmentVariable("TWITTER_ACCESS_TOKEN"),
        access_token_secret: getEnvironmentVariable("TWITTER_ACCESS_TOKEN_SECRET")
    });

    const getTweet = (tweetID: string): Promise<any> => {
        return new Promise((res, rej) => {            
            twitterClient.get(`statuses/show`, {id: tweetID}, (error, tweetBody, response) => {
                if (!error) {
                    res(tweetBody);
                } else {
                    rej(error);
                }
            });
        });
    };

    Promise.all(tweetIDs.map(async tweetID => {
        const tweet = await getTweet(tweetID);
        response.push(tweet);
        return Promise.resolve();
    }))
    .then(_ => {
        return res.status(200).json(response);
    });*/