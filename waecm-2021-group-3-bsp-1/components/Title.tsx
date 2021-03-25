import React from 'react';

export default function Title({children}: {children: React.ReactNode}): JSX.Element {
	return <div className="text-xl font-bold">
		{children}
	</div>;
}