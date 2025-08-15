import { dungeon } from "@resources/Dungeon";
import NewFloorView from "./newfloorView";
import { terminal } from "@resources";
import { i18n } from "@i18n";
import { sleep } from "@utils";
import chalk from "chalk";
import { MapTiles } from "@enums";
import { TILES_WITHOUT_EVENT } from "@enums/mapTilesEnum";
import { DungeonEvent } from "@resources/Event";

export default async function GameView() {
	await NewFloorView(dungeon.floor, 'green')
	dungeon.renderMap()

	let lastDirection: 'up' | 'down' | 'left' | 'right' | undefined

	while (true) {
		const { value: direction } = await terminal.prompt({
			type: 'list',
			name: 'value',
			message: i18n.t('game.direction.prompt'),
			choices: [
				{
					name: dungeon.isDirectionBlocked(0, -1) ? chalk.red(i18n.t('game.direction.up')) : i18n.t('game.direction.up'),
					value: 'up',
					disabled: dungeon.isDirectionBlocked(0, -1) ? 'Bloqueado' : false
				},
				{
					name: dungeon.isDirectionBlocked(0, 1) ? chalk.red(i18n.t('game.direction.down')) : i18n.t('game.direction.down'),
					value: 'down',
					disabled: dungeon.isDirectionBlocked(0, 1) ? 'Bloqueado' : false
				},
				{
					name: dungeon.isDirectionBlocked(-1, 0) ? chalk.red(i18n.t('game.direction.left')) : i18n.t('game.direction.left'),
					value: 'left',
					disabled: dungeon.isDirectionBlocked(-1, 0) ? 'Bloqueado' : false
				},
				{
					name: dungeon.isDirectionBlocked(1, 0) ? chalk.red(i18n.t('game.direction.right')) : i18n.t('game.direction.right'),
					value: 'right',
					disabled: dungeon.isDirectionBlocked(1, 0) ? 'Bloqueado' : false
				}
			],
			default: lastDirection || 'up'
		})

		if (direction === 'up') {
			lastDirection = 'up'
			dungeon.movePlayer(0, -1)
		} else if (direction === 'down') {
			lastDirection = 'down'
			dungeon.movePlayer(0, 1)
		} else if (direction === 'left') {
			lastDirection = 'left'
			dungeon.movePlayer(-1, 0)
		} else if (direction === 'right') {
			lastDirection = 'right'
			dungeon.movePlayer(1, 0)
		}
		
		const mapTile = dungeon.getPlayerPos().tile
		if (!TILES_WITHOUT_EVENT.includes(mapTile)) {
			new DungeonEvent(mapTile)
			dungeon.setEventsAlreadyPlayed([
				dungeon.getPlayerPos().coords.y,
				dungeon.getPlayerPos().coords.x,
			])

			console.log(dungeon.getEventsAlreadyPlayed())
			continue
		}

		dungeon.renderMap()
	}
}

