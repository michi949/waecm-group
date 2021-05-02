import mongoose from 'mongoose';
var Schema = mongoose.Schema;
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

const user = new Schema({
    id: String,
    name: String,
    picture: String,
    rssFeeds: [{type: Schema.Types.ObjectId, ref: "RssFeed" }],
    tweets: [{type: Schema.Types.ObjectId, ref: "Tweet" }],
    lastLogin: { type: Date, default: Date.now },
});

var User = mongoose.model('User', user);
export default User;