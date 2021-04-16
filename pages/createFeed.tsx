import React, { useEffect, useState } from "react";
import Link from "next/Link";
import { getFeedItemsFromLocalStorage } from "../util/getFeedItemsFromLocalStorage";
import { saveFeedItemsToLocalStorage } from "../util/saveFeedItemsToLocalStorage";
import { FeedItem } from "../util/feedItem";
import storage from "../util/storage";

export default function CreateFeed(): React.ReactElement {
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState("");
  const [includeAll, setInlcudeAll] = useState(false);
  const [icon, setIcon] = useState("/Twitter.png");
  const [status, setStatus] = useState(true);
  const [edit, setEdit] = useState(false);

  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    setFeedItems(storage.getItem("feedItems") ?? []);
  }, []);
  useEffect(() => {
    saveFeedItemsToLocalStorage(feedItems);
    feedItems.forEach((feedItem) => {
      if (feedItem.edit === true) {
        setUrl(feedItem.url);
        setKeywords(feedItem.keywords);
        setInlcudeAll(feedItem.includeAll);
        setIcon(feedItem.icon);
        setStatus(feedItem.status);
        const editedFeedItems = [...feedItems].filter(
          (temp) => temp.id !== feedItem.id
        );
        setFeedItems(editedFeedItems);
      }
    });
  }, [feedItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedItems.length < 3) {
      const newFeedItem = {
        id: new Date().getTime(),
        url: url,
        keywords: keywords,
        includeAll: includeAll,
        icon: icon,
        status: status,
        edit: edit,
      };

      setFeedItems([...feedItems].concat(newFeedItem));
      setUrl("");
      setKeywords("");
      setInlcudeAll(false);
      setIcon("/Twitter.png");
      setStatus(true);
      alert("Saved succesfully!");
    } else {
      alert("You can't add more than 3 feeds!");
    }
  };

  return (
    <div className="grid place-items-center w-screen h-screen">
      <div className="flex flex-col min-h-5/6 w-80 bg-white p-4 rounded-3xl neomorphism">
        <header className="flex content-center justify-evenly px-4 py-4 w-full">
          <Link href="/feed">
            <button className="bg-gray-200 hover:bg-blue-700 hover:text-white text-black font-bold py-2 px-4 rounded-3xl w-28">
              Tweets
            </button>
          </Link>
          <Link href="/manageFeed">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl w-28">
              Settings
            </button>
          </Link>
        </header>
        <main className="flex flex-col content-start">
          <form onSubmit={handleSubmit}>
            <label className="block mt-2">
              <p>Complete RSS - Feed URL:</p>
              <input
                type="url"
                onChange={(e) => setUrl(e.target.value)}
                pattern="https?://.+"
                value={url}
                className="form-input mt-1 block w-full border rounded-3xl"
                placeholder="https://rss.orf.at/news.xml"
              />
            </label>
            <label className="block mt-4">
              <p>RSS - Feed Keywords:</p>
              <input
                type="text"
                onChange={(e) => setKeywords(e.target.value)}
                value={keywords}
                className="form-input mt-1 block w-full border rounded-3xl"
                placeholder="Formel 1, Rennen"
              />
              <div className="inline-flex items-center pt-1">
                <input
                  type="checkbox"
                  onChange={() => setInlcudeAll(!includeAll)}
                  checked={includeAll}
                  className="form-checkbox"
                />
                <p className="ml-2">include all keywords</p>
              </div>
            </label>
            <label className="block my-4">
              <p>Optional Icon:</p>
              <img src={icon} className="max-w-12 max-h-12 m-1" alt="Icon" />
              <input
                type="file"
                onChange={(e) =>
                  setIcon(URL.createObjectURL(e.target.files[0]))
                }
                className="hidden"
                accept="image/png, image/svg"
              />
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                onChange={() => setStatus(!status)}
                checked={status}
                className="form-checkbox"
              />
              <p className="ml-2">Feed active</p>
            </label>
            <div className="flex flex-col items-center m-4">
              <Link href="/manageFeed">
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl w-48 mt-1"
                >
                  Abort
                </button>
              </Link>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl w-48 mt-1"
              >
                Save
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
