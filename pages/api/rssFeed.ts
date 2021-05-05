import { NextApiRequest, NextApiResponse } from "next";
import { IFeedItem } from "../../data/rssFeedSchema";
import { deleteRssFeedFromDatabase, getAllRssFeedFromDatabase, setRssFeedIntoDatabase, updateRssFeedFromDatabase } from "../../util/databaseConnector";

export default (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method === 'POST') {
        handlePostRequest(req, res);
      } else if (req.method === "GET") {
        handleGetRequest(req, res);
      } else if (req.method === "DELETE") {
        handleDeleteRequest(req, res);
      } else if (req.method === "PUT") {
        handleUpdateRequest(req, res);
      } else {
        res.status(400).json({error: 'No valid Request'});
      }
}

const handleGetRequest = (req: NextApiRequest, res: NextApiResponse): NextApiResponse => {
    const rssFeeds = getAllRssFeedFromDatabase();

    rssFeeds.then( a => {
        console.log(a);
        res.status(200).json(a);
    });

    return res;
}

const handlePostRequest = (req: NextApiRequest, res: NextApiResponse): NextApiResponse => {
    const val = req.body;
    const feedItem: IFeedItem = val.feedItem;

    if(feedItem.keywords.split(",").length >= 3){
        res.status(200).json({error: "To many Keywords"});
        return res;
    }

    const rssFeeds = getAllRssFeedFromDatabase();
    rssFeeds.then( a => {
      if(a.length >= 3){
        res.status(200).json({error: "To manny Feeds"});
        return res;
      } else {
        const result = setRssFeedIntoDatabase({url: feedItem.url, keywords: feedItem.keywords, includeAll: feedItem.includeAll, icon: feedItem.icon, status: feedItem.status });
        result.then( a => {
          res.status(200).json(a);
        });
      }
    });

    return res;
}

const handleDeleteRequest = (req: NextApiRequest, res: NextApiResponse): NextApiResponse => {
    const _id = req.query._id ?? '';
    const result = deleteRssFeedFromDatabase(_id.toString());

    result.then( a => {
        console.log(a);
        res.status(200).json(a);
    });

    return res;
}

const handleUpdateRequest = (req: NextApiRequest, res: NextApiResponse): NextApiResponse => { 
    const _id = req.query._id ?? '';
    const val = req.body;
    const feedItem: IFeedItem = val.feedItem;

    if(feedItem.keywords.split(",").length >= 3){
        res.status(200).json({error: "To many Keywords"});
        return res;
    }

    const result = updateRssFeedFromDatabase(_id.toString(), { url: feedItem.url, keywords: feedItem.keywords, includeAll: feedItem.includeAll, icon: feedItem.icon, status: feedItem.status });
    result.then( a => {
        res.status(200).json(a);
    });

    return res;
}
