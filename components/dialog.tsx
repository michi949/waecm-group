import React from 'react';

export default function Dialog({children}: {children: React.ReactNode}): JSX.Element {
	return <div className="bg-white flex flex-col items-center justify-around w-80 h-96 p-8 rounded-3xl neomorphism">
		{children}
	</div>;
}