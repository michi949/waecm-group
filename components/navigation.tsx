import Link from 'next/link';
import React from 'react';
import {useRouter} from 'next/router';

function NavigationButton({link, children}) {
  const router = useRouter();
  return <Link href={link}>
    <button
      className={`${router.asPath === link ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-blue-700 hover:text-white text-black font-bold py-2 px-4 rounded-3xl w-28`}>
      {children}
    </button>
  </Link>;
}

export function Navigation() {
  return <header className="flex content-center justify-evenly px-4 py-4 w-full">
    <NavigationButton link="/feed">Tweets</NavigationButton>
    <NavigationButton link="/manageFeed">Settings</NavigationButton>
  </header>;
}