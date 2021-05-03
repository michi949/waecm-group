import mongoose from 'mongoose';
import { IFeedItem } from './rssFeedSchema';
import { ITweetItem } from './tweetSchema';

export interface IUser {
    id: string
    name: string,
    pricture: string,
    rssFeeds: [IFeedItem],
    tweets: [ITweetItem],
    lastLogin: Date
}

const User = new mongoose.Schema({
    id: String,
    name: String,
    picture: String,
    rssFeeds: [{type: mongoose.Schema.Types.ObjectId, ref: "RssFeed" }],
    tweets: [{type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }],
    lastLogin: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', User);