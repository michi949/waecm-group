import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import Dialog from '../components/dialog';
import {Navigation} from '../components/navigation';
import storage from '../util/storage';

export default function ManageFeed(): React.ReactElement {
  const [feedItems, setFeedItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setFeedItems(storage.getItem("feedItems"));
  }, []);
  useEffect(() => {
    storage.setItem("feedItems", feedItems);
  }, [feedItems]);

  const deleteFeedItem = (id) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      const updatedFeedItems = [...feedItems].filter(
        (feedItem) => feedItem.id !== id
      );
      setFeedItems(updatedFeedItems);
    }
  };
  const editFeedItem = (id) => {
    feedItems.find(item => item.id === id).edit = true;
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

function FeedItem(feedItem, editFeedItem: (id) => void, deleteFeedItem: (id) => void) {
  return <div
    className="flex flex-row items-center w-full my-2 border-b"
    key={feedItem.id}
  >
    <img className="max-w-8 max-h-8 mx-2" src={feedItem.icon}/>
    <div className={`${!feedItem.status ? 'text-gray-400 font-light' : ''} w-full truncate`}>
      {feedItem.url}
    </div>
    <FontAwesomeIcon
      className="mx-2 cursor-pointer"
      icon={faPen}
      onClick={() => editFeedItem(feedItem.id)}
    />
    <FontAwesomeIcon
      className="mx-2 cursor-pointer"
      icon={faTrash}
      onClick={() => deleteFeedItem(feedItem.id)}
    />
  </div>;
}
