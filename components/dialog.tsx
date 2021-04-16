import React from 'react';

export default function Dialog({children}: { children: React.ReactNode }): JSX.Element {
  return <div className="grid place-items-center w-screen h-screen">
    <div className="flex flex-col min-h-5/6 w-80 bg-white p-4 rounded-3xl neomorphism">
      {children}
    </div>
  </div>;
}