import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Dialog from '../components/dialog';
import {Navigation} from '../components/navigation';
import globals from '../util/globals';
import { ITweetItem } from '../data/tweetSchema';
import Button from '../components/button';
import { checkLoginState, logout } from '../util/tokenManagment';
import { useRouter } from 'next/router';
import storage from '../util/storage';

export default function Feed(): React.ReactElement {
	const [tweetItems, setTweetItems] = useState([]);
	const router = useRouter();
	

	useEffect(() => {
		checkLogin();
		loadNextTweetItems();
	}, []);

	const checkLogin = () => {
		if(!checkLoginState()) {
				router.push('/')
			}
	  }

	const loadNextTweetItems = async () => {
		fetch(`${globals.host}/api/tweets?nonce=${storage.getItem("nonce")}&skip=${tweetItems.length}&limit=${6}`, {
			headers: {
			  'Content-Type': 'application/json',
			   Authorization: `Bearer ${storage.getItem("token")}`,
			},
			method: 'GET'
			}).then(response => {
				if (response.status === 401) { throw response }
				if (!response.ok) { throw response }
				return response.json() 
			  })
			.then((res) => {
				const tweets: ITweetItem[] = res ?? [];
				setTweetItems([...tweetItems, ...tweets]);
			}).catch((err) => {
				if(err.status === 401) {
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
				: null }
				{tweetItems.length !== 0 ? tweetItems.map((tweetItem) => TweetItem(tweetItem)) : null}
				{tweetItems.length !== 0 ? 
				<div className="h-32 w-full text-center p-4">
					<Button onClick={() => loadNextTweetItems()}>
						<div className="bg-gray-200 text-black font-bold rounded-3xl">Load More</div>
					</Button>
				</div> 
				: null }
				</main>
		</Dialog>
	);


function TweetItem(tweetItem: ITweetItem) {
	return <div
	  className="flex flex-row items-center w-full my-2 border-b"
	  key={tweetItem._id}>
	 <img className="max-w-8 max-h-8 mx-2" src={tweetItem.icon}/>
    	<div className="w-full truncate">
      		{tweetItem.title}
    	</div>
		<div className="w-full truncate">
      		{tweetItem.url}
    	</div>
	</div>;
  }
}