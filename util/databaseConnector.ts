import { ObjectID } from "bson";
import mongoose, { Connection } from "mongoose";
import RssFeed from "../data/rssFeedSchema";
import Tweet from "../data/tweetSchema";
import User from "../data/userCredentialsShema";
import globals from "./globals";

const dbPath = "mongodb://localhost:27017/waecm2021group3db";

const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
      return handler(req, res);
    }
   
    await mongoose.connect(globals.database_path, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      user: globals.database_user,
      pass: globals.database_password,
    });
    return handler(req, res);
  };
  
  export default connectDB;

//#region User
export async function setUserIntoDatabase(object: {id: string, name: string, picture: string}) {
    const user = new User(object).save();
}

export async function findUserInDatabase(sub: string): Promise<any> {
    return User.find({ id: sub }).exec();
}

export async function updateUserInDatabase(sub: string, object: {lastLogin: Date, picture: string}) {
    return User.updateOne({id: sub}, object).exec();
}

//#endregion

//#region Tweet

export async function setTweetIntoDatabase(object: { id: string, title: string, url: string, rssFeed: ObjectID }) {
    const m = new Tweet(object);
    m.save(); 
}

//#endregion

//#region RssFeed
export async function setRssFeedIntoDatabase(object: { url: string, keyword: string, includedAll: boolean, icon: string, status: boolean, edit: boolean }) {
    const m = new RssFeed(object);
    m.save(); 
}

export async function getRssFeedFromDatabase(id: string) {
    return RssFeed.findOne({ id: id }).exec();
}
//#endregion
