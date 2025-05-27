import { i18n } from "@i18n";
import { terminal } from "@resources";
import { figletTitle } from "@utils";
import { sleep } from "@utils";
import type { ColorName } from "chalk";

export default async function NewFloorView(floor: number, color: ColorName) {
	terminal.clear()

	figletTitle(i18n.t('game.floor.' + floor + '.title'), { color })
	await sleep(2000)
	terminal.clear()

	figletTitle(i18n.t('game.floor.' + floor + '.description'), { color })
	await sleep(3000)
	terminal.clear()
}
