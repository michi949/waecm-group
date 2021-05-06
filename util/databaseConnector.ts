import { ObjectID } from "bson";
import mongoose, { Connection } from "mongoose";
import RssFeed from "../data/rssFeedSchema";
import Tweet from "../data/tweetSchema";
import User from "../data/userCredentialsShema";
import globals from "./globals";

async function connectDB() {
    if ( mongoose.connection.readyState === 1) {
        return;
    }
   
    await mongoose.connect(globals.database_path, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      user: globals.database_user,
      pass: globals.database_password,
    });
  };
  
  export default connectDB;

//#region User
export async function setUserIntoDatabase(object: {id: string, name: string, picture: string}) {
    connectDB();
    const user = new User(object)
    user.save();
}

export async function findUserInDatabase(sub: string): Promise<any> {
    connectDB();
    return User.find({ id: sub }).exec();
}

export async function updateUserInDatabase(sub: string, object: {lastLogin: Date, picture: string}) {
    connectDB();
    return User.updateOne({id: sub}, object).exec();
}
//#endregion

//#region Tweet
export async function setTweetIntoDatabase(object: { title: string, url: string, icon: string }) {
    connectDB();
    const m = new Tweet(object);
    return await m.save(); 
}

export async function findTweetByUrlInDatabase(url: string) {
    connectDB();
    return await Tweet.findOne({url: url}).exec();
}

export async function getAllTeweetsFromDatabase() {
    connectDB();
    return await Tweet.find().exec();
}

export async function findFromToTweetsFromDatabase(skip: number, limit: number = 6) {
    connectDB();
    return await Tweet.find().limit(limit).skip(skip).exec();
}

//#endregion

//#region RssFeed
export async function setRssFeedIntoDatabase(object: { url: string, keywords: string, includeAll: boolean, icon: string, status: boolean }) {
    connectDB();
    const m = new RssFeed(object);
    return await m.save(); 
}

export async function getAllRssFeedFromDatabase() {
    connectDB();
    return await RssFeed.find().exec(); 
}

export async function deleteRssFeedFromDatabase(_id: string) {
    connectDB();
    return await RssFeed.deleteOne({_id: _id}).exec();
}

export async function updateRssFeedFromDatabase(_id: string, object: { url: string, keywords: string, includeAll: boolean, icon: string, status: boolean }) {
    connectDB();
    return await RssFeed.updateOne({_id: _id}, object).exec();
}
//#endregion
