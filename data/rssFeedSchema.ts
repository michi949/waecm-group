import { ObjectID } from 'bson';
import { Schema } from 'mongoose';

export const RssFeed = new Schema({
    id: ObjectID,
    url: String,
    keywords: String,
    includeAll: Boolean,
    icon: String,
    status: Boolean,
    edit: Boolean,
});