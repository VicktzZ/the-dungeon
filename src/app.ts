import { terminal } from "@resources"
import { sleep } from "@utils"
import { i18n } from '@i18n'
import { LoadingView, MenuView } from '@views'
import chalk from "chalk"
import figlet from 'figlet'

async function run() {
	terminal.clear()
	const title = figlet.textSync(i18n.t('game.title'), {
		font: 'Standard',
		horizontalLayout: 'full',
		verticalLayout: 'full'
	})

	await LoadingView(async () => {
		terminal.clear()
		terminal.write(chalk.magenta(title))
	})

	await sleep(2000)
	await MenuView()
}

run()
