import React from 'react';
import Link from 'next/Link'
import Dialog from '../components/dialog';
import {Navigation} from '../components/navigation';

export default function Feed(): React.ReactElement {
	return (
		<Dialog>
			<Navigation/>
			<main className="flex flex-col content-start flex-1">
				<div className="h-32 w-full text-center p-4">
					<div>currently no RSS - Feed</div>
					<Link href="/createFeed">
						<div className="text-blue-500 underline">create RSS - Feed</div>
					</Link>
				</div>
				</main>
		</Dialog>
	);
}