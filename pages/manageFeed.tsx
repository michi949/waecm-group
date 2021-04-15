import React from 'react';
import Link from 'next/Link';
import { useEffect, useState } from 'react';
import FeedList from '../components/feedList';


export default function ManageFeed(): React.ReactElement {

    const[feedItems, setFeedItems] = useState([]);

    useEffect(() => {
        if(localStorage.getItem("feedItems") === null){
            localStorage.setItem("feedItems", JSON.stringify([]));
          }else{
            let feedItemLocal = JSON.parse(localStorage.getItem("feedItems"));
            setFeedItems(feedItemLocal);
          }
    }, [])

	return (
		<div className="grid place-items-center w-screen h-screen">
			<div className="flex flex-col min-h-5/6 w-80 bg-white p-4 rounded-3xl neomorphism">
				<header className="flex content-center justify-evenly px-4 py-4 w-full">
					<Link href="/feed">
						<button className="bg-gray-200 hover:bg-blue-700 hover:text-white text-black font-bold py-2 px-4 rounded-3xl w-28">Tweets</button>
					</Link>
                    <Link href="/manageFeed">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl w-28">Settings</button>
					</Link>
				</header>
				<main className="flex flex-col items-center h-full">
                    <p className="m-2">currently no RSS - Feed</p>
                    <Link href="/createFeed" >
                        <button className="bg-gray-200 hover:bg-blue-700 hover:text-white text-black font-bold py-2 px-4 rounded-3xl w-28">+ add Feed</button>
                    </Link>
				</main>
			</div>
		</div>
	);
}