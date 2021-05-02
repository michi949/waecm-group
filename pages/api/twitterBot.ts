import { NextApiRequest, NextApiResponse } from 'next';
import Twitter from 'twitter';
import { parseStringPromise } from 'xml2js';
import { getEnvironmentVariable } from '../../util/environmentVariables'

export default (req: NextApiRequest, res: NextApiResponse): void => {
    const testRSSFeeds = ["https://rss.orf.at/news.xml"];
    const testKeywords = ["ORF"];

    const twitterClient = new Twitter({
        consumer_key: getEnvironmentVariable("TWITTER_API_KEY"),
        consumer_secret: getEnvironmentVariable("TWITTER_API_SECRET"),
        access_token_key: getEnvironmentVariable("TWITTER_ACCESS_TOKEN"),
        access_token_secret: getEnvironmentVariable("TWITTER_ACCESS_TOKEN_SECRET")
    });

    const sendTweet = (tweet: string): Promise<any> => {
        return new Promise((res, rej) => {
            twitterClient.post('statuses/update', {status: tweet}, (error, tweetBody, response) => {
                if (!error) {
                    res(tweetBody);
                } else {
                    rej(error);
                }
            });
        });
    };

    const searchFieldForKeyword = (field: string, keywords: string[]): boolean => {
        return keywords.map(keyword => field.toLowerCase().includes(keyword.toLowerCase())).some(predicate => predicate);
    };    

    testRSSFeeds.forEach(rssFeed => {
        fetch(rssFeed)
        .then(raw => raw.text())
        .then(rawXML => parseStringPromise(rawXML))
        .then(result => {
            return Promise.all(result["rdf:RDF"].item.map(async element => {
                if (searchFieldForKeyword(element.title[0], testKeywords) || searchFieldForKeyword(element["dc:subject"][0], testKeywords)) {
                    const result = await sendTweet(`${element.title[0]}: ${element.link[0]}`);
                    console.log(result);
                }
                return Promise.resolve();
            }));
        })
        .then(() => res.status(200).json({ success: true, error: null }))
        .catch(error => res.status(500).json({ success: false, error: error }));
    });
};