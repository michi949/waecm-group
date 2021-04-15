import React from 'react';
import Link from 'next/Link'

export default function InvalidLogin(): React.ReactElement {
	return (
		<div className="grid place-items-center w-screen h-screen">
			<div className="flex flex-col min-h-5/6 w-80 bg-white p-4 rounded-3xl neomorphism">
				<header className="flex content-center justify-evenly px-4 py-4 w-full">
					<Link href="/feed">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl w-28">Tweets</button>
					</Link>
					<Link href="/manageFeed">
						<button className="bg-gray-200 hover:bg-blue-700 hover:text-white text-black font-bold py-2 px-4 rounded-3xl w-28">Settings</button>
					</Link>
				</header>
				<main className="flex flex-col content-start flex-1">
				<div className="bock h-32 w-full text-center p-4">
					<p>currently no RSS - Feed</p>
					<Link href="/createFeed"><a className="text-blue-500 underline">create RSS - Feed</a></Link>
				</div>
				</main>
			</div>
		</div>
	);
}