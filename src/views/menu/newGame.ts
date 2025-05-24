import { terminal } from "@resources"
import MenuView from "./menuView"
import { i18n } from "@i18n"
import { SettingsOptions, DifficultyOptions, HeroOptions } from "@enums"
import chalk from "chalk"
import { sleep } from "@utils"

async function selectHero() {
	terminal.clear()
	const { value: hero } = await terminal.prompt({
		type: 'list',
		name: 'value',
		message: i18n.t('hero.prompt'),
		choices: [
			{ name: chalk.redBright(HeroOptions.Warrior), value: HeroOptions.Warrior },
			{ name: chalk.green(HeroOptions.Archer), value: HeroOptions.Archer },
			// { name: HeroOptions.Mage, value: HeroOptions.Mage },
			// { name: HeroOptions.Paladin, value: HeroOptions.Paladin },
			// { name: HeroOptions.Rogue, value: HeroOptions.Rogue },
			{ name: i18n.t('generic_labels.back'), value: SettingsOptions.Back }
		]
	})

	if (hero === SettingsOptions.Back) {
		await MenuView()
	} else {
		showHeroDescription(hero)
	}
}

async function showHeroDescription(hero: HeroOptions) {
	await terminal.write(i18n.t(`hero.descriptions.${hero}`), undefined, 10)
	await terminal.write('\n\nHP: 100 | MP: 100 | ATK: 10 | DEF: 10 | SPD: 10\n')

	const { value: choice } = await terminal.prompt({
		type: 'list',
		name: 'value',
		message: i18n.t('hero.choice'),
		choices: [
			{ name: i18n.t('generic_labels.yes'), value: true },
			{ name: i18n.t('generic_labels.no'), value: false }
		]
	})

	if (choice) {

	} else {
		await selectHero()
	}
}

export default async function NewGameView() {
	terminal.clear()

	const { value: difficulty } = await terminal.prompt({
		type: 'list',
		name: 'value',
		message: i18n.t('settings.difficulty'),
		choices: [
			{ name: i18n.t('difficulty.easy'), value: DifficultyOptions.Easy },
			{ name: i18n.t('difficulty.medium'), value: DifficultyOptions.Medium },
			{ name: i18n.t('difficulty.hard'), value: DifficultyOptions.Hard },
			{ name: i18n.t('generic_labels.back'), value: SettingsOptions.Back },
			// { name: i18n.t('difficulty.nightmare'), value: DifficultyOptions.Nightmare }
		]
	})

	if (difficulty === SettingsOptions.Back) {
		await MenuView()
	}

	await selectHero()
}
