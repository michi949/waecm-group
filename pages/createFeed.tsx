import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import storage from '../util/storage';
import {Navigation} from '../components/navigation';
import Dialog from '../components/dialog';
import {Input} from '../components/input';
import { IFeedItem } from '../data/rssFeedSchema';
import globals from '../util/globals';
import { faAward } from '@fortawesome/free-solid-svg-icons';

const generateFeedItem: () => IFeedItem = () => ({
  edit: false,
  status: true,
  includeAll: false,
  keywords: '',
  url: '',
  _id: '',
  icon: '/Twitter.png'
});

export default function CreateFeed(): React.ReactElement {
  const [feedItem, setFeedItem] = useState<IFeedItem>(generateFeedItem());
  const patchFeedItem = (key: string, value: any) => {
    setFeedItem(feedItem => ({...feedItem, [key]: value}));
  };

  useEffect(() => {
    const feedItems = storage.getItem('feedItems') ?? [];
    setFeedItem(feedItems.find(item => item.edit) ?? generateFeedItem());
    storage.setItem("feedItems", feedItems.map(item => ({...item, edit: false})));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedItem.edit) {

    const res = await fetch(`${globals.host}/api/rssFeed`, {
      body: JSON.stringify({
        feedItem
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => {
      if (!response.ok) { throw response }
      return response.json() 
    })
		.then((res) => {
          setFeedItem(generateFeedItem()); 
          alert('Saved succesfully!');
			}).catch( err => {
        alert("To many Feeds are created!");
      });

    } else {

      fetch(`${globals.host}/api/rssFeed?_id=${feedItem._id}`, {
        body: JSON.stringify({
          feedItem
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      .then((x) => x.json())
      .then((res) => {
        setFeedItem(generateFeedItem()); 
        alert('Updated succesfully!');
      });
    }
  };


  return (
    <Dialog>
      <Navigation/>
      <main className="flex flex-col content-start">
        <form onSubmit={handleSubmit}>
          <Input
            label="Complete RSS - Feed URL:"
            type="url"
            value={feedItem.url}
            onChange={e => patchFeedItem('url', e.target.value)}
            pattern="https?://.+"
            placeholder="https://rss.orf.at/news.xml"
          />
          <Input
            label="RSS - Feed Keywords:"
            type="text"
            onChange={(e) => patchFeedItem('keywords', e.target.value)}
            value={feedItem.keywords}
            placeholder="Formel 1, Rennen"
          />
          <div className="inline-flex items-center pt-1">
            <input
              type="checkbox"
              onChange={() => patchFeedItem('includeAll', !feedItem.includeAll)}
              checked={feedItem.includeAll}
              className="form-checkbox"
            />
            <p className="ml-2">include all keywords</p>
          </div>
        <label className="block my-4">
          <p>Optional Icon:</p>
          <img src={feedItem.icon} className="max-w-12 max-h-12 m-1" alt="Icon"/>
          <input
            type="file"
            onChange={(e) => patchFeedItem('url', URL.createObjectURL(e.target.files[0]))}
            className="hidden"
            accept="image/png, image/svg"
          />
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            onChange={() => patchFeedItem('status', !feedItem.status)}
            checked={feedItem.status}
            className="form-checkbox"
          />
          <p className="ml-2">Feed active</p>
        </label>
        <div className="flex flex-col items-center m-4">
          <Link href="/manageFeed">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl w-48 mt-1"
            >
              Abort
            </button>
          </Link>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl w-48 mt-1"
          >
            Save
          </button>
        </div>
      </form>
    </main>
</Dialog>
);
}
