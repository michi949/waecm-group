import React from 'react';

export default function Title({children}) {
  return <div className="text-xl font-bold">
    {children}
  </div>;
}