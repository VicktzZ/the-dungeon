import { MenuOptions } from "@enums"
import { i18n } from "@i18n"
import { terminal } from "@resources"
import chalk from "chalk"
import figlet from "figlet"
import NewGameView from "./newGame"
import SettingsView from "./settingsView"

export default async function MenuView() {
	terminal.clear()

	const title = figlet.textSync(i18n.t('game.title'), {
		font: 'Standard',
		horizontalLayout: 'full',
		verticalLayout: 'full'
	})

	console.log(chalk.magenta(title))

	const { value } = await terminal.prompt({
		type: 'list',
		name: 'value',
		message: i18n.t('generic_labels.prompt'),
		choices: [
			{ name: i18n.t('menu.newGame'), value: MenuOptions.NewGame },
			{ name: i18n.t('menu.loadGame'), value: MenuOptions.LoadGame },
			{ name: i18n.t('menu.settings'), value: MenuOptions.Settings },
			{ name: i18n.t('menu.exit'), value: MenuOptions.Exit },
		],
	})

	switch (value) {
		case MenuOptions.NewGame:
			await NewGameView()
			break
		case MenuOptions.LoadGame:
			break
		case MenuOptions.Settings:
			await SettingsView()
			break
		case MenuOptions.Exit:
			process.exit(0)
		default:
			break
	}
}
