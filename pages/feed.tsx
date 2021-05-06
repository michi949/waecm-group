import React, {useEffect, useState} from 'react';
import Link from 'next/link'
import Dialog from '../components/dialog';
import {Navigation} from '../components/navigation';
import globals from '../util/globals';
import {ITweetItem} from '../data/tweetSchema';
import Button from '../components/button';
import {logout, useLoggedIn} from '../util/tokenManagment';
import {useRouter} from 'next/router';
import storage from '../util/storage';

export default function Feed(): React.ReactElement {
  useLoggedIn();

  const [tweetItems, setTweetItems] = useState([]);
  const router = useRouter();


  useEffect(() => {
    loadNextTweetItems();
  }, []);

  const loadNextTweetItems = async () => {
    fetch(`${globals.host}/api/tweets?nonce=${storage.getItem('nonce')}&skip=${tweetItems.length}&limit=${6}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storage.getItem('token')}`,
      },
      method: 'GET'
    }).then(response => {
      if (response.status === 401) {
        throw response
      }
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
      .then((res) => {
        const tweets: ITweetItem[] = res ?? [];
        setTweetItems([...tweetItems, ...tweets]);
      }).catch((err) => {
      if (err.status === 401) {
        logout();
      }
    });
  }

  return (
    <Dialog>
      <Navigation/>
      <main className="flex flex-col content-start flex-1">
        {tweetItems.length === 0 ?
          <div className="h-32 w-full text-center p-4">
            <div>currently no RSS - Feed</div>
            <Link href="/createFeed">
              <div className="text-blue-500 underline">create RSS - Feed</div>
            </Link>
          </div>
          : null}
        {tweetItems.map((tweetItem) => <TweetItem tweetItem={tweetItem}/>)}
        {tweetItems.length !== 0 ?
          <div className="h-32 w-full text-center p-4">
            <Button onClick={() => loadNextTweetItems()}>
              Load More
            </Button>
          </div>
          : null}
      </main>
    </Dialog>
  );


  function TweetItem({tweetItem}: { tweetItem: ITweetItem }) {

    return <div
      className="flex flex-row w-full py-2 border-b" key={tweetItem._id}>
      <img className="max-w-8 max-h-8 mx-2" src={tweetItem.icon}/>
      <div>
        <div>
          {tweetItem.title}
          <div className="inline text-gray-700">
            {" "}- {new Date(tweetItem.date).toLocaleDateString()} {new Date(tweetItem.date).toLocaleTimeString()}
          </div>
        </div>
        <Link href={tweetItem.url}>
          <div className="text-xs text-blue-900 cursor-pointer underline">
            {tweetItem.url}
          </div>
        </Link>
      </div>
    </div>;
  }
}