import { ObjectID } from "bson";
import mongoose, { Connection } from "mongoose";
import { RssFeed } from "../data/rssFeedSchema";
import { Tweet } from "../data/tweetSchema";
import { User } from "../data/userCredentialsShema";

const dbPath = "mongodb://localhost:27017/waecm2021group3db";

//#region User
export async function setUserIntoDatabase(object: {id: string, name: string, picture: string}) {
    const UserObj = getConnection().model('User', User);
    const m = new UserObj(object);
    m.save(); 
}

export async function findUserInDatabase(sub: string) {
    const UserObj = getConnection().model('User', User);
    return UserObj.find({ id: sub }).exec();
}

export async function updateUserInDatabase(sub: string, object: {lastLogin: Date, picture: string}) {
    const UserObj = getConnection().model('User', User);
    return UserObj.updateOne({id: sub}, object).exec();
}

//#endregion

//#region Tweet

export async function setTweetIntoDatabase(object: { id: string, title: string, url: string, rssFeed: ObjectID }) {
    const TweetObj = getConnection().model('Tweet', Tweet);
    const m = new TweetObj(object);
    m.save(); 
}

//#endregion

//#region RssFeed
export async function setRssFeedIntoDatabase(object: { url: string, keyword: string, includedAll: boolean, icon: string, status: boolean, edit: boolean }) {
    const RssFeedObj = getConnection().model('RssFeed', RssFeed);
    const m = new RssFeedObj(object);
    m.save(); 
}
//#endregion

function getConnection(): Connection & Promise<Connection> {
    return mongoose.createConnection(dbPath, {
        user: "service-user",
        pass: "itsedev",
    });
}