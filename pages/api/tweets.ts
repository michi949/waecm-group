import { NextApiRequest, NextApiResponse } from "next";
import { findFromToTeweetsFromDatabase } from "../../util/databaseConnector";

export default (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method === "GET") {
        const skip: number = Number(req.query.skip) ?? 0;
        const limit: number = Number(req.query.limit) ?? 6;
        
        const tweets = findFromToTeweetsFromDatabase(skip, limit);

        tweets.then( a => {
            console.log(a);
            res.status(200).json(a);
        });

    } else {
        res.status(400).json({error: "Wrong Request"});
    }
}