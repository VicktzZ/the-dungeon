import { terminal } from "@resources"
import { figletTitle, sleep } from "@utils"
import { i18n } from '@i18n'
import { LoadingView, MenuView } from '@views'

async function run() {
	terminal.clear()

	await LoadingView(() => {
		terminal.clear()
		figletTitle(i18n.t('game.title'), { color: 'magenta' })
	})

	await sleep(2000)
	await MenuView()
}

run()
