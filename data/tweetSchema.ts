import { ObjectID } from 'bson';
import mongoose from 'mongoose';
import { IFeedItem } from './rssFeedSchema';

export interface ITweetItem  {
    _id: string,
    title: string,
    icon: string,
    url: string,
    date: Date
}

 const Tweet = new mongoose.Schema({
    title: String,
    icon: String,
    text: String,
    url: String,
    date: { type: Date, default: Date.now },
});


export default mongoose.models.Tweet || mongoose.model('Tweet', Tweet);