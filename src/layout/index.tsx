import {Box} from 'ink';
// import { observable, reaction } from "mobx";
import type React from 'react';

export const Layout = ({children}: {children: React.ReactNode}) => {
	// reaction(() => layoutProps, ({ title, style }) => {
	//     layoutProps.title = title
	//     layoutProps.style = style
	// })

	return (
		<Box>{children}</Box>
		// <box
		//     width='100%'
		//     height='100%'
		//     align="center"
		//     valign="middle"
		//     padding={{ top: 1, left: 1 }}
		//     border='line'
		//     label={layoutProps.title}
		//     style={layoutProps.style}
		// >
		//     {children}
		// </box>
	);
};
