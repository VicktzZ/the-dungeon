import figlet from 'figlet';
import { terminal } from '@resources';
import chalk, { type ColorName } from 'chalk';

export default function figletTitle(title: string, options?: { color?: ColorName, figlet?: figlet.Options }) {
	terminal.write(chalk[options?.color || 'white'](figlet.textSync(title, options?.figlet || {
		font: 'Standard',
		horizontalLayout: 'full',
		verticalLayout: 'full'
	})))
}
