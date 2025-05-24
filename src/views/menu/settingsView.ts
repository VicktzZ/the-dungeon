import { terminal } from "@resources";
import { SettingsOptions, LanguageOptions } from "@enums"
import { i18n } from "@i18n"
import MenuView from "./menuView";
import { gameSettings } from "@data";

export default async function SettingsView() {
	terminal.clear()

	const { value } = await terminal.prompt({
		type: 'list',
		name: 'value',
		message: i18n.t('generic_labels.prompt'),
		choices: [
			{ name: i18n.t('settings.language'), value: SettingsOptions.Language },
			{ name: i18n.t('generic_labels.back'), value: SettingsOptions.Back }
		],
	})

	switch (value) {
		case SettingsOptions.Language:
			const { value: language } = await terminal.prompt({
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
				gameSettings.setLanguage(language)
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

