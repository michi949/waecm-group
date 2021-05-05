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
import { checkLoginState, logout } from '../util/tokenManagment';
import Button from '../components/button';

export default function ManageFeed(): React.ReactElement {
  const [feedItems, setFeedItems] = useState([]);
  const router = useRouter();
 

  useEffect(() => {
    checkLogin();


    fetch(`${globals.host}/api/rssFeed?nonce=${storage.getItem("nonce")}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storage.getItem("token")}`,
      },
      method: 'GET'
		})
		.then((x) => x.json())
		.then((res) => {
        const rssFeeds: IFeedItem[] = res;
				console.log(rssFeeds);
        setFeedItems(rssFeeds);
			}).catch((err) => {
        if(err.status === 401) {
					logout();
				}
			});

  }, []);

  useEffect(() => {
    storage.setItem("feedItems", feedItems);
  }, [feedItems]);

  const checkLogin = () => {
		if(!checkLoginState()) {
				router.push('/')
			}
	  }

  const deleteFeedItem = async (_id) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {

      const res = await fetch(`${globals.host}/api/rssFeed?nonce=${storage.getItem("nonce")}&_id=${_id}`, {
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${storage.getItem("token")}`,
        },
        method: 'DELETE'
      }).then(response => {
        console.log(response);
        if (!response.ok) { throw response }
        return response.json() 
      })
			.then((res) => {
        const updatedFeedItems = [...feedItems].filter(
          (feedItem) => feedItem._id !== _id
        );
        setFeedItems(updatedFeedItems); 
			}).catch((err) => {
        if(err.status === 401) {
					logout();
				}
      });
    }
  };

  const handleLogout = () => {
		logout();
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

      <Button onClick={handleLogout}>
				Logout
			</Button>
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
