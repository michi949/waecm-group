import {FeedItem} from '../util/feedItem';
import React from 'react';

export function Input({type, onChange, pattern, value, placeholder, label}: {type: string, onChange: (e: any) => void, pattern?: string, value: any, placeholder: string, label: string}) {
  return <label className="block mt-2">
    {label}
    <input
      type={type}
      onChange={onChange}
      pattern={pattern}
      value={value}
      className="form-input mt-1 block w-full border rounded-3xl"
      placeholder={placeholder}
    />
  </label>;
}