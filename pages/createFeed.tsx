import React, {useEffect, useState} from 'react';
import Link from 'next/Link';

export default function CreateFeed(): React.ReactElement {

	const[feedItems, setFeedItems] = useState([]);
	const[feedItem, setFeedItem] = useState("");

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
				<main className="flex flex-col content-start">
					<form>
						<label className="block mt-2">
							<p>Complete RSS - Feed URL:</p>
							<input type="url" 
							className="feedItem-input form-input mt-1 block w-full border rounded-3xl" placeholder="https://rss.orf.at/news.xml" />
						</label>
						<label className="block mt-4">
							<p>RSS - Feed Keywords:</p>
							<input type="text" className="form-input mt-1 block w-full border rounded-3xl" placeholder="Formel 1, Rennen" />
							<div className="inline-flex items-center pt-1">
								<input type="checkbox" className="form-checkbox" />
								<p className="ml-2">include all keywords</p>
							</div>
						</label>
						<label className="block my-4">
							<p>Optional Icon:</p>
							<input type="file" />
						</label>
						<label className="flex items-center">
							<input type="checkbox" className="form-checkbox" />
							<p className="ml-2">Feed active</p>
						</label>
						<div className="flex flex-col items-center m-8">
							<Link href="/manageFeed">
								<button type="reset" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl w-48 m-1">Abort</button>
							</Link>
								<button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl w-48 m-1">Save</button>
						</div>
					</form>
				</main>
			</div>
		</div>
	);
}