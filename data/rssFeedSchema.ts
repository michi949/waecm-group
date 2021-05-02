import { ObjectID } from 'bson';
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export interface IFeedItem{
    id: string,
    url: string,
    keywords: string,
    includeAll: boolean,
    icon: string,
    status: boolean,
    edit: boolean
}

const rssFeed = new Schema({
    id: ObjectID,
    url: String,
    keywords: String,
    includeAll: Boolean,
    icon: String,
    status: Boolean,
    edit: Boolean,
});


var RssFeed = mongoose.model('RssFeed', rssFeed);
export default RssFeed;