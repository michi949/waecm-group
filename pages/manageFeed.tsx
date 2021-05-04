import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import Dialog from '../components/dialog';
import {Navigation} from '../components/navigation';
import storage from '../util/storage';
import globals from '../util/globals';
import { IFeedItem } from '../data/rssFeedSchema';

export default function ManageFeed(): React.ReactElement {
  const [feedItems, setFeedItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${globals.host}/api/rssFeed`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
		})
		.then((x) => x.json())
		.then((res) => {
        const rssFeeds: IFeedItem[] = res;
				console.log(rssFeeds);
        setFeedItems(rssFeeds);
			});

  }, []);

  useEffect(() => {
    storage.setItem("feedItems", feedItems);
  }, [feedItems]);

  const deleteFeedItem = async (_id) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {

      const res = await fetch(`${globals.host}/api/rssFeed?_id=${_id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      }).then((x) => x.json())
			.then((res) => {
        console.log("Penis");
        const updatedFeedItems = [...feedItems].filter(
          (feedItem) => feedItem._id !== _id
        );
        setFeedItems(updatedFeedItems); 
			});
    }
  };

  const editFeedItem = (_id) => {
    feedItems.find(item => item._id === _id).edit = true;
    router.push('/createFeed');
    storage.setItem("feedItems", feedItems);
  };

  return (
    <Dialog>
      <Navigation/>
      <main className="flex flex-col items-center h-full">
        {feedItems.length === 0 ? <div className="m-2">currently no RSS - Feed</div> : null}
        {feedItems.map((feedItem) => FeedItem(feedItem, editFeedItem, deleteFeedItem))}
        {feedItems.length < 3 ? (
          <Link href="/createFeed">
            <button
              className="bg-gray-200 hover:bg-blue-700 hover:text-white text-black font-bold py-2 px-4 rounded-3xl">
              + add Feed
            </button>
          </Link>
        ) : null}
      </main>
    </Dialog>
  );
}

function FeedItem(feedItem, editFeedItem: (_id) => void, deleteFeedItem: (_id) => void) {
  return <div
    className="flex flex-row items-center w-full my-2 border-b"
    key={feedItem._id}
  >
    <img className="max-w-8 max-h-8 mx-2" src={feedItem.icon}/>
    <div className={`${!feedItem.status ? 'text-gray-400 font-light' : ''} w-full truncate`}>
      {feedItem.url}
    </div>
    <FontAwesomeIcon
      className="mx-2 cursor-pointer"
      icon={faPen}
      onClick={() => editFeedItem(feedItem._id)}
    />
    <FontAwesomeIcon
      className="mx-2 cursor-pointer"
      icon={faTrash}
      onClick={() => deleteFeedItem(feedItem._id)}
    />
  </div>;
}
