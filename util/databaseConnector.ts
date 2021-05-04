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
   
    const conn = await mongoose.connect(globals.database_path, {
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

export async function setTweetIntoDatabase(object: { id: string, title: string, url: string, rssFeed: ObjectID }) {
    connectDB();
    const m = new Tweet(object);
    m.save(); 
}

//#endregion

//#region RssFeed
export async function setRssFeedIntoDatabase(object: { url: string, keywords: string, includeAll: boolean, icon: string, status: boolean, edit: boolean }) {
    connectDB();
    const m = new RssFeed(object);
    return await m.save(); 
}

export async function getAllRssFeedFromDatabase() {
    connectDB();
    return await RssFeed.find().exec(); //findOne({ id: id }).exec();
}
//#endregion
