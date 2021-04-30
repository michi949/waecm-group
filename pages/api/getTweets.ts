import { NextApiRequest, NextApiResponse } from 'next';
import Twitter from 'twitter';
import { parseStringPromise } from 'xml2js';
import { getEnvironmentVariable } from '../../util/environmentVariables'

export default (req: NextApiRequest, res: NextApiResponse): void => {
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
    });
};