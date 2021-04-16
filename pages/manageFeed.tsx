import React from "react";
import Link from "next/Link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getFeedItemsFromLocalStorage } from "../util/getFeedItemsFromLocalStorage";
import { saveFeedItemsToLocalStorage } from "../util/saveFeedItemsToLocalStorage";

export default function ManageFeed(): React.ReactElement {
  const [feedItems, setFeedItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getFeedItemsFromLocalStorage(setFeedItems);
  }, []);
  useEffect(() => {
    saveFeedItemsToLocalStorage(feedItems);
  }, [feedItems]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      const updatedFeedItems = [...feedItems].filter(
        (feedItem) => feedItem.id !== id
      );
      setFeedItems(updatedFeedItems);
    }
  };
  const editHandler = (id) => {
    feedItems.map((feedItem) => {
      if (feedItem.id === id) {
        feedItem.edit = true;
        router.push("/createFeed");
      }
    });
    saveFeedItemsToLocalStorage(feedItems);
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
        <main className="flex flex-col items-center h-full">
          <p className="m-2">currently no RSS - Feed</p>
          {feedItems.map((feedItem) => (
            <div
              className="flex flex-row items-center justify-evenly w-full my-2 border-b"
              key={feedItem.id}
            >
              <img className="max-w-8 max-h-8" src={feedItem.icon} />
              <div className={!feedItem.status ? "text-gray-400 font-light" : ""}>{feedItem.url.substring(0, 20)}</div>
              <FontAwesomeIcon
                icon={faPen}
                onClick={() => editHandler(feedItem.id)}
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => deleteHandler(feedItem.id)}
              />
            </div>
          ))}            
          {(feedItems.length < 3 ) ? <Link href="/createFeed">
            <button className="bg-gray-200 hover:bg-blue-700 hover:text-white text-black font-bold py-2 px-4 rounded-3xl w-28">
              + add Feed
            </button>
          </Link> : null}
          
        </main>
      </div>
    </div>
  );
}
