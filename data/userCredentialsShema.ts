import { Schema } from 'mongoose';
import { ObjectID } from 'bson';

export const User = new Schema({
    id: String,
    name: String,
    picture: String,
    rssFeed: [{type: Schema.Types.ObjectId, ref: "RssFeed" }],
    tweets: [{type: Schema.Types.ObjectId, ref: "Tweet" }],
    lastLogin: { type: Date, default: Date.now },
});