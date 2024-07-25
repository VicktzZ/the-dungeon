#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import {App} from '@app';

const cli = meow(
	`
	Usage
	  $ the-dungeon

	Options
		--name  Your name

	Examples
	  $ the-dungeon --name=Jane
	  Hello, Jane
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
			},
		},
	},
);

render(<App />);
