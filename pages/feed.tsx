import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Dialog from '../components/dialog';
import {Navigation} from '../components/navigation';
import globals from '../util/globals';
import { ITweetItem } from '../data/tweetSchema';
import Button from '../components/button';

export default function Feed(): React.ReactElement {
	const [tweetItems, setTweetItems] = useState([]);

	useEffect(() => {
		loadNextTweetItems();
	}, []);

	const loadNextTweetItems = async () => {
		fetch(`${globals.host}/api/tweets?skip=${tweetItems.length}&limit=${6}`, {
			headers: {
			  'Content-Type': 'application/json'
			},
			method: 'GET'
			}).then((x) => x.json())
			.then((res) => {
				const tweets: ITweetItem[] = res;
				setTweetItems([...tweetItems, ...tweets]);
				console.log(tweetItems);
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
						<div className="text-blue-500 underline">Load More</div>
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
    	<div className={`w-full truncate`}>
      		{tweetItem.text}
    	</div>
		<div className={`w-full truncate`}>
      		{tweetItem.url}
    	</div>
	</div>;
  }
}