import { NextApiRequest, NextApiResponse } from "next";
import triggerTimer from "../../util/intervalTimer";

export default (req: NextApiRequest, res: NextApiResponse): void => {
    triggerTimer();    
    res.status(200).json({timer: "running"});
}