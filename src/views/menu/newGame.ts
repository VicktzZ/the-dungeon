import { terminal } from "@resources"
import { i18n } from "@i18n"
import { SettingsOptions, DifficultyOptions, HeroOptions } from "@enums"
import MenuView from "./menuView"
import chalk from "chalk"
import { heroStats } from "@data"
import { createPlayer, player } from "@models"

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
	if (hero === HeroOptions.Back) {
		await selectHero()
		return
	}

	await terminal.typeWrite(i18n.t(`hero.descriptions.${hero}`), undefined, 10)
	terminal.write('\n')
	terminal.write(`
		${chalk.red('HP')}: ${heroStats[hero].hp} ${chalk.gray.underline('(Vida máxima)')}
		${chalk.blue('MP')}: ${heroStats[hero].mp} ${chalk.gray.underline('(Magia máxima)')}
		${chalk.green('ATK')}: ${heroStats[hero].atk} ${chalk.gray.underline('(Adiciona ao ataque)')}
		${chalk.yellow('DEF')}: ${heroStats[hero].def} ${chalk.gray.underline('(Adiciona à defesa)')}
		${chalk.magenta('SPD')}: ${heroStats[hero].spd} ${chalk.gray.underline('(Aumenta a chance de se esquivar)')}
	\n`)

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
		createPlayer(hero)
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
