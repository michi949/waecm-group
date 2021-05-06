import React from 'react';

export default function Dialog({children}: { children: React.ReactNode }): JSX.Element {
  return <div className="flex flex-col items-center w-screen h-screen overflow-y-auto">
    <div className="flex flex-col my-8 w-full md:w-96 bg-white p-4 rounded-3xl neomorphism">
      <div className="">
        {children}
      </div>
    </div>
  </div>;
}