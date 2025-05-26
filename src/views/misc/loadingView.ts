import { terminal } from "@resources"
import chalk from "chalk"
import { sleep } from "@utils"
import { Spinner } from "cli-spinner"
import { i18n } from "@i18n"

export default async function LoadingView(callback?: () => Promise<void>, delay?: number): Promise<void> {
	const spinner = new Spinner(i18n.t('game.loading'))

	terminal.clear()
	spinner.start()
	await sleep(delay || 1000)
	await callback?.()
	spinner.stop()
}
