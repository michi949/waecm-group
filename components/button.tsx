import React from 'react';

export default function Button({children, onClick}: {children: React.ReactNode, onClick: () => void}): JSX.Element {
	return <button 
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl w-full max-w-60"
		onClick={onClick}>
		{children}
	</button>;
}