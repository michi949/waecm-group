import { ObjectID } from 'bson';
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
import { IFeedItem } from './rssFeedSchema';

export interface ITweetItem {
    id: string,
    appId: string,
    title: string,
    url: string,
    rssFeed: IFeedItem,
    date: Date
}

 const tweet = new Schema({
    id: ObjectID,
    apiId: String,
    title: String,
    url: String,
    rssFeed: {type: Schema.Types.ObjectId, ref: "RssFeed" },
    date: { type: Date, default: Date.now },
});

var Tweet = mongoose.model('Tweet', tweet);
export default Tweet;