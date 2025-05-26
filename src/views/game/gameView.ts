import { i18n } from "@i18n";
import { terminal } from "@resources";
import { dungeon } from "@resources/Dungeon";
import figlet from "figlet";

export default async function GameView() {
	figlet.textSync(i18n.t('game.floors.' + dungeon.floor), {
		font: 'Standard',
		horizontalLayout: 'full',
		verticalLayout: 'full'
	})
}

