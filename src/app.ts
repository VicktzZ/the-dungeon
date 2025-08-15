import { terminal } from "@resources"
import { figletTitle, sleep } from "@utils"
import { i18n } from '@i18n'
import { LoadingView, MenuView } from '@views'

async function run() {
	const viewParam = process.argv.find(param => param.includes('--'))?.split('--')[1]
	terminal.clear()

	if (viewParam) {
		const module = await import(`./views/index`) as Record<string, any>
		return await module[viewParam]()
	}

	await LoadingView(() => {
		terminal.clear()
		figletTitle(i18n.t('game.title'), { color: 'magenta' })
	})

	await sleep(2000)
	await MenuView()
}

run()
