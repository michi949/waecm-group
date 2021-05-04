import { NextApiRequest, NextApiResponse } from "next";
import { IFeedItem } from "../../data/rssFeedSchema";
import { getAllRssFeedFromDatabase, setRssFeedIntoDatabase } from "../../util/databaseConnector";

export default (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method === 'POST') {
        handlePostRequest(req, res);
      } else if (req.method === "GET") {
        handleGetRequest(req, res);
      } else {
        res.status(400).json({error: 'No valid Request'});
      }
}

const handleGetRequest = (req: NextApiRequest, res: NextApiResponse): NextApiResponse => {
    const rssFeeds = getAllRssFeedFromDatabase();
    
    rssFeeds.then( a => {
        res.status(200).json(a);
    });

    return res;
}


const handlePostRequest = (req: NextApiRequest, res: NextApiResponse): NextApiResponse => {
    const val = req.body;
    const feedItem: IFeedItem = val.feedItem;
    const result = setRssFeedIntoDatabase({url: feedItem.url, keywords: feedItem.keywords, includeAll: feedItem.includeAll, icon: feedItem.icon, status: feedItem.status, edit: feedItem.edit });
    result.then( a => {
        res.status(200).json(a);
    });
    return res;
}