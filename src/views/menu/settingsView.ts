import { terminal } from "@resources";
import { SettingsOptionsEnum, LanguageOptionsEnum } from "@enums"
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
			{ name: i18n.t('settings.language'), value: SettingsOptionsEnum.Language },
			{ name: i18n.t('generic_labels.back'), value: SettingsOptionsEnum.Back }
		],
	})

	switch (value) {
		case SettingsOptionsEnum.Language:
			const { value: language } = await terminal.prompt({
				type: 'list',
				name: 'value',
				message: i18n.t('settings.language'),
				choices: [
					{ name: i18n.t('language.en'), value: LanguageOptionsEnum.En },
					{ name: i18n.t('language.pt'), value: LanguageOptionsEnum.Pt },
					{ name: i18n.t('generic_labels.back'), value: SettingsOptionsEnum.Back }
				]
			})

			if (language !== SettingsOptionsEnum.Back) {
				i18n.setLanguage(language)
				gameSettings.setLanguage(language)
			}

			await SettingsView()
			break
		case SettingsOptionsEnum.Back:
			await MenuView()
			break
		default:
			break
	}
}

