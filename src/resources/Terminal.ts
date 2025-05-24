import chalk, { type ColorName } from 'chalk'
import inquirer from 'inquirer';
export class Terminal {
    inquirer = inquirer

	async typeWriter(text: string, delay: number = 30): Promise<void> {
        return new Promise((resolve) => {
            let i = 0;
            const interval = setInterval(() => {
                process.stdout.write(text[i] || '');
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, delay);
        });
    }

    async write(text: string, style?: ColorName, delay: number = 30): Promise<void> {
        const styledText = chalk[style || 'white'](text);
        return this.typeWriter(styledText, delay);
    }

	clear(): void {
		process.stdout.write('\x1B[2J\x1B[0;0H');
	}
}

export const terminal = new Terminal()
