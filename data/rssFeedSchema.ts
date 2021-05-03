import { ObjectID } from 'bson';
import mongoose from 'mongoose';

export interface IFeedItem{
    id: string,
    url: string,
    keywords: string,
    includeAll: boolean,
    icon: string,
    status: boolean,
    edit: boolean
}

const RssFeed = new mongoose.Schema({
    id: ObjectID,
    url: String,
    keywords: String,
    includeAll: Boolean,
    icon: String,
    status: Boolean,
    edit: Boolean,
});

export default mongoose.models.RssFeed || mongoose.model('RssFeed', RssFeed);