import chalk, { type ColorName } from 'chalk'
import inquirer, { type Question } from 'inquirer'
import type { Answers } from 'node_modules/inquirer/dist/commonjs';
import type { UnnamedDistinctQuestion } from 'node_modules/inquirer/dist/esm/types';

export class Terminal {
	private isWritting: boolean = false;
	private cancelTyping: boolean = false;
	private keyListener: ((key: Buffer) => void) | null = null;
	private isInputEnabled: boolean = true;

	private async handleKeyPress() {
        return new Promise<void>((resolve) => {
            if (!this.isInputEnabled) {
                resolve();
                return;
            }

            if (process.stdin.isTTY) {
                process.stdin.setRawMode(true);
            }

            this.keyListener = (key: Buffer) => {
                if (key.toString() === '\r' || key.toString() === 'q') {
                    this.cancelTyping = true;
                    this.cleanupKeyListener();
                    resolve();
                }
            };

            process.stdin.on('data', this.keyListener);
            process.stdin.resume();
        });
    }

    private cleanupKeyListener() {
        if (this.keyListener) {
            process.stdin.off('data', this.keyListener);
            this.keyListener = null;
        }
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(!this.isInputEnabled);
        }
        process.stdin.pause();
    }

    public disableInput() {
        this.isInputEnabled = false;
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(false);
            process.stdin.pause();
        }
    }

    public enableInput() {
        this.isInputEnabled = true;
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(false);
            process.stdin.resume();
        }
    }

    async typeWriter(text: string, delay: number = 30): Promise<void> {
        if (!this.isInputEnabled) {
            process.stdout.write(text);
            return;
        }

        this.cancelTyping = false;
        this.isWritting = true;
        const keyPressHandler = this.handleKeyPress();

        try {
            let i = 0;
            while (i < text.length && !this.cancelTyping) {
                process.stdout.write(text[i++]);
                await new Promise(resolve => setTimeout(resolve, delay));
            }

            if (this.cancelTyping && i < text.length) {
                process.stdout.write(text.slice(i));
            }
        } finally {
            this.cleanupKeyListener();
            this.isWritting = false;
        }
    }

	async typeWrite(text: string, style?: ColorName, delay: number = 30): Promise<void> {
		const styledText = chalk[style || 'white'](text);
		return this.typeWriter(styledText, delay)
	}

	write(text?: string, style?: ColorName): void {
		process.stdout.write(chalk[style || 'white'](text || ''))
	}

	async prompt(
		question: UnnamedDistinctQuestion<Answers & object> & { name: string; },
		answers?: object | undefined
	): Promise<object & Answers> {
		while (this.isWritting) {
			await new Promise(resolve => setTimeout(resolve, 100))
		}
		return await inquirer.prompt(question, answers)
	}

	clear(): void {
		process.stdout.write('\x1B[2J\x1B[0;0H');
	}

	press(unixKey?: string): void {
		process.stdout.write(unixKey || '\x0D');
	}
}

export const terminal = new Terminal()
