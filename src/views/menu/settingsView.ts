import { terminal } from "@resources";
import {	 SettingsOptions, DifficultyOptions, LanguageOptions } from "@enums"
import { i18n } from "@i18n"
import MenuView from "./menuView";

export default async function SettingsView() {
	terminal.clear()

	const { value } = await terminal.inquirer.prompt({
		type: 'list',
		name: 'value',
		message: i18n.t('generic_labels.prompt'),
		choices: [
			{ name: i18n.t('settings.language'), value: SettingsOptions.Language },
			{ name: i18n.t('settings.difficulty'), value: SettingsOptions.Difficulty },
			{ name: i18n.t('generic_labels.back'), value: SettingsOptions.Back }
		],
	})

	switch (value) {
		case SettingsOptions.Language:
			const { value: language } = await terminal.inquirer.prompt({
				type: 'list',
				name: 'value',
				message: i18n.t('settings.language'),
				choices: [
					{ name: i18n.t('language.en'), value: LanguageOptions.En },
					{ name: i18n.t('language.pt'), value: LanguageOptions.Pt },
					{ name: i18n.t('generic_labels.back'), value: SettingsOptions.Back }
				]
			})

			if (language !== SettingsOptions.Back) {
				i18n.setLanguage(language)
			}

			await SettingsView()
			break
		case SettingsOptions.Difficulty:
			const { value: difficulty } = await terminal.inquirer.prompt({
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

			if (difficulty !== SettingsOptions.Back) {

			}

			await SettingsView()
			break
		case SettingsOptions.Back:
			await MenuView()
			break
		default:
			break
	}
}

