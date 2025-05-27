import { terminal } from "@resources"
import { i18n } from "@i18n"
import { SettingsOptionsEnum, DifficultyOptionsEnum, HeroOptionsEnum } from "@enums"
import MenuView from "./menuView"
import chalk from "chalk"
import { heroStats, gameSettings } from "@data"
import { createPlayer } from "@models"
import { HeroColorsEnum } from "@enums"
import { sleep } from "@utils"
import LoadingView from "@views/misc/loadingView"
import GameView from "@views/game/gameView"

async function showHeroDescription(hero: HeroOptionsEnum) {
	if (hero === HeroOptionsEnum.Back) {
		await selectHero()
		return
	}

	await terminal.typeWrite(i18n.t(`hero.descriptions.${hero}`), undefined, 10)
	terminal.write('\n')
	terminal.write(`
		${chalk.red('HP')}: ${heroStats[hero].hp} ${chalk.gray.underline('(Vida máxima)')}
		${chalk.blue('MP')}: ${heroStats[hero].mp} ${chalk.gray.underline('(Magia máxima)')}
		${chalk.green('ATK')}: ${heroStats[hero].atk} ${chalk.gray.underline('(Aumenta em 1 ao ataque)')}
		${chalk.yellow('DEF')}: ${heroStats[hero].def} ${chalk.gray.underline('(Aumenta em 1 à defesa)')}
		${chalk.magenta('SPD')}: ${heroStats[hero].spd} ${chalk.gray.underline('(Aumenta em 1% a chance de se esquivar)')}
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

async function selectHero() {
	terminal.clear()
	const { value: hero } = await terminal.prompt({
		type: 'list',
		name: 'value',
		message: i18n.t('hero.prompt'),
		choices: [
			...gameSettings.unlockedHeroes.map(hero => ({
				name: chalk[HeroColorsEnum[hero]](hero),
				value: hero
			})),
			{ name: i18n.t('generic_labels.back'), value: SettingsOptionsEnum.Back }
		]
	})

	if (hero === SettingsOptionsEnum.Back) {
		await MenuView()
	} else {
		await showHeroDescription(hero)
	}
}

export default async function NewGameView() {
	terminal.clear()

	const { value: difficulty } = await terminal.prompt({
		type: 'list',
		name: 'value',
		message: i18n.t('settings.difficulty'),
		choices: [
			{ name: i18n.t('difficulty.easy'), value: DifficultyOptionsEnum.Easy },
			{ name: i18n.t('difficulty.medium'), value: DifficultyOptionsEnum.Medium },
			{ name: i18n.t('difficulty.hard'), value: DifficultyOptionsEnum.Hard },
			{ name: i18n.t('generic_labels.back'), value: SettingsOptionsEnum.Back },
			// { name: i18n.t('difficulty.nightmare'), value: DifficultyOptionsEnum.Nightmare }
		]
	})

	if (difficulty === SettingsOptionsEnum.Back) {
		await MenuView()
	}

	await selectHero()

	await LoadingView()
	await GameView()
}
