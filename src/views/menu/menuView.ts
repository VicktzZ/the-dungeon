import { MenuOptionsEnum } from "@enums"
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

	terminal.write(chalk.magenta(title))

	const { value } = await terminal.prompt({
		type: 'list',
		name: 'value',
		message: i18n.t('generic_labels.prompt'),
		choices: [
			{ name: i18n.t('menu.newGame'), value: MenuOptionsEnum.NewGame },
			{ name: i18n.t('menu.loadGame'), value: MenuOptionsEnum.LoadGame },
			{ name: i18n.t('menu.settings'), value: MenuOptionsEnum.Settings },
			{ name: i18n.t('menu.exit'), value: MenuOptionsEnum.Exit },
		],
	})

	switch (value) {
		case MenuOptionsEnum.NewGame:
			await NewGameView()
			break
		case MenuOptionsEnum.LoadGame:
			break
		case MenuOptionsEnum.Settings:
			await SettingsView()
			break
		case MenuOptionsEnum.Exit:
			process.exit(0)
		default:
			break
	}
}
