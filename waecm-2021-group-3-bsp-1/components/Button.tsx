import React from 'react';

export default function Button({children, onClick}: {children: React.ReactNode, onClick: () => void}): JSX.Element {
	return <button
		className="mt-8 bg-yellow-200 w-full p-2 rounded border border-gray-400"
		onClick={onClick}>
		{children}
	</button>;
}