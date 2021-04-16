import React, {useEffect, useState} from 'react';
import Link from 'next/Link';
import {FeedItem} from '../util/feedItem';
import storage from '../util/storage';
import {Navigation} from '../components/navigation';
import Dialog from '../components/dialog';
import {Input} from '../components/input';

const generateFeedItem: () => FeedItem = () => ({
  edit: false,
  status: true,
  includeAll: false,
  keywords: '',
  url: '',
  id: new Date().getTime(),
  icon: '/Twitter.png'
});

export default function CreateFeed(): React.ReactElement {
  const [feedItem, setFeedItem] = useState<FeedItem>(generateFeedItem());
  const patchFeedItem = (key: string, value: any) => {
    setFeedItem(feedItem => ({...feedItem, [key]: value}));
  };

  useEffect(() => {
    const feedItems = storage.getItem('feedItems') ?? [];
    setFeedItem(feedItems.find(item => item.edit) ?? generateFeedItem());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const feedItems = storage.getItem('feedItems') ?? [];
    const newFeedItems = [...feedItems.filter(item => !item.edit), {...feedItem, edit: false}];
    storage.setItem('feedItems', newFeedItems);
    setFeedItem(generateFeedItem());

    alert('Saved succesfully!');
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
