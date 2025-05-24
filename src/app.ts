import { terminal } from "@resources"
import chalk from "chalk"
import figlet from 'figlet'
import { Spinner } from 'cli-spinner'
import { sleep } from "@utils"
import { i18n } from '@i18n'
import { MenuView } from '@views'

async function run() {
	const spinner = new Spinner(i18n.t('game.loading'))

	terminal.clear()
    const title = figlet.textSync(i18n.t('game.title'), {
        font: 'Standard',
        horizontalLayout: 'full',
        verticalLayout: 'full'
    })

	spinner.start()
	await sleep(2000)
	spinner.stop()

	terminal.clear()
    console.log(chalk.magenta(title))
	await sleep(2000)

	await MenuView()

}

run()
