import { ObjectID } from 'bson';
import mongoose from 'mongoose';
import { IFeedItem } from './rssFeedSchema';

export interface ITweetItem {
    id: string,
    appId: string,
    title: string,
    url: string,
    rssFeed: IFeedItem,
    date: Date
}

 const Tweet = new mongoose.Schema({
    id: ObjectID,
    apiId: String,
    title: String,
    url: String,
    rssFeed: {type: mongoose.Schema.Types.ObjectId, ref: "RssFeed" },
    date: { type: Date, default: Date.now },
});

export default mongoose.models.Tweet || mongoose.model('Tweet', Tweet);