import { ObjectID } from 'bson';
import { Schema } from 'mongoose';

export const Tweet = new Schema({
    id: ObjectID,
    apiId: String,
    title: String,
    url: String,
    rssFeed: {type: Schema.Types.ObjectId, ref: "RssFeed" },
    date: { type: Date, default: Date.now },
});