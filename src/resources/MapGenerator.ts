import { MapTiles } from '@enums';
import type { GameMap, MapConfig } from '@types';
import generation from 'random-seed';
import chalk from 'chalk';
import { terminal } from './Terminal';


export class MapGenerator {
	private gen: generation.RandomSeed;
	private map: GameMap;
	private pathY: number;

	private ROOM_TYPES: MapTiles[] = [
		MapTiles.EMPTY,
		MapTiles.MERCHANT,
		MapTiles.MYSTERY,
		MapTiles.ENEMY,
		MapTiles.VILLAGE,
		MapTiles.BOSS,
		MapTiles.CHEST
	];

	private TILE_DISPLAY: Record<MapTiles, string> = {
		[MapTiles.EMPTY]: ' ',
		[MapTiles.START]: chalk.green(MapTiles.START),
		[MapTiles.MERCHANT]: chalk.yellow(MapTiles.MERCHANT),
		[MapTiles.MYSTERY]: chalk.magentaBright(MapTiles.MYSTERY),
		[MapTiles.VILLAGE]: chalk.yellowBright(MapTiles.VILLAGE),
		[MapTiles.CHEST]: chalk.blue(MapTiles.CHEST),
		[MapTiles.BOSS]: chalk.red(MapTiles.BOSS),
		[MapTiles.ENEMY]: chalk.red(MapTiles.ENEMY),
		[MapTiles.PLAYER]: chalk.green(MapTiles.PLAYER),
		[MapTiles.BOSSROOM]: chalk.redBright(MapTiles.BOSSROOM),
		[MapTiles.PATH_H]: chalk.gray(MapTiles.PATH_H),
		[MapTiles.PATH_V]: chalk.gray(MapTiles.PATH_V),
		[MapTiles.PATH_TR]: chalk.gray(MapTiles.PATH_TR),
		[MapTiles.PATH_TL]: chalk.gray(MapTiles.PATH_TL),
		[MapTiles.ARROW_L]: chalk.gray(MapTiles.ARROW_L),
		[MapTiles.ARROW_R]: chalk.gray(MapTiles.ARROW_R),
	};

	constructor(private config: MapConfig) {
		this.gen = generation.create(config.seed);
		this.map = this.initializeMap();
		this.pathY = Math.floor(this.config.height / 2);
	}

	public generate(): GameMap {
		this.generateMainPath();
		this.generateRooms();
		this.setStartAndBossPositions();
		this.addEnemiesToPath();

		return this.map;
	}

	private initializeMap(): GameMap {
		return Array(this.config.height).fill(0).map(() =>
			Array(this.config.width).fill(MapTiles.EMPTY)
		);
	}

	private generateMainPath(): void {
		const { startPos, endPos, pathWidth } = this.config;

		for (let x = startPos; x < endPos; x++) {
			for (let y = this.pathY - Math.floor(pathWidth/2); y <= this.pathY + Math.floor(pathWidth/2); y++) {
				if (y >= 0 && y < this.config.height) {
					this.map[y][x] = MapTiles.PATH_H;
				}
			}
		}
	}

	private generateRooms(): void {
		const { startPos, endPos } = this.config;

		for (let x = startPos + 5; x < endPos - 5; x += 10) {
			const roomTypeIndex = this.gen.intBetween(0, this.ROOM_TYPES.length - 1);
			const roomType = this.ROOM_TYPES[roomTypeIndex];
			const roomY = this.gen.intBetween(this.pathY - 3, this.pathY + 3);

			if (roomY >= 0 && roomY < this.config.height) {
				const connectY = roomY > this.pathY ? this.pathY + 1 : this.pathY - 1;
				for (let y = Math.min(roomY, connectY); y <= Math.max(roomY, connectY); y++) {
					this.map[y][x] = MapTiles.PATH_V;
				}

				this.map[roomY][x] = roomType;
			}
		}
	}

	private setStartAndBossPositions(): void {
		this.map[this.pathY][this.config.startPos] = MapTiles.START;
		this.map[this.pathY][this.config.endPos - 1] = MapTiles.BOSSROOM;
	}

	private addEnemiesToPath(): void {
		const { startPos, endPos } = this.config;
		const enemyCount = this.gen.intBetween(3, 6);
		const availablePositions: number[] = [];

		for (let x = startPos + 5; x < endPos - 5; x++) {
			if (this.map[this.pathY][x] === MapTiles.PATH_H) {
				availablePositions.push(x);
			}
		}

		for (let i = availablePositions.length - 1; i > 0; i--) {
			const j = this.gen.intBetween(0, i);
			[availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
		}

		const selectedPositions: number[] = [];
		for (const pos of availablePositions) {
			if (selectedPositions.every(p => Math.abs(p - pos) > 5)) {
				selectedPositions.push(pos);
				if (selectedPositions.length >= enemyCount) break;
			}
		}

		for (const pos of selectedPositions) {
			const isBoss = this.gen.random() < 0.2;
			this.map[this.pathY][pos] = isBoss ? MapTiles.BOSS : MapTiles.ENEMY;
		}
	}

	public render(playerPos: { x: number; y: number }): void {
		const displayMap = this.map.map(row => [...row]);

		if (playerPos.y >= 0 && playerPos.y < displayMap.length &&
			playerPos.x >= 0 && playerPos.x < displayMap[playerPos.y].length) {
			displayMap[playerPos.y][playerPos.x] = MapTiles.PLAYER;
		}

		terminal.write(displayMap.map(row =>
			row.map(tile => this.TILE_DISPLAY[tile as keyof typeof this.TILE_DISPLAY] || ' ').join('')
		).join('\n'));
	}

}
