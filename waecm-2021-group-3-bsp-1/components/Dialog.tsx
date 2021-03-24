import React from 'react';

export default function Dialog({children}) {
  return <div className="bg-white mx-auto max-w-sm mt-10 px-4 py-8 rounded text-center neomorphism">
    {children}
  </div>;
}