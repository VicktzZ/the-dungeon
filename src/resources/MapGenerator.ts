import { DifficultyOptionsEnum, MapTiles } from '@enums';
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
		MapTiles.VILLAGE,
		MapTiles.BOSS,
		MapTiles.CHEST,
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

	public generate({ difficulty }: { difficulty: DifficultyOptionsEnum }): GameMap {
		this.generateMainPath();
		this.generateRooms();
		this.setStartAndBossPositions();
		this.addEnemiesToPath(difficulty);

		return this.map;
	}

	private initializeMap(): GameMap {
		return Array(this.config.height).fill(0).map(() =>
			Array(this.config.width).fill(MapTiles.EMPTY)
		);
	}

	private generateMainPath(): void {
		const { startPos, endPos, pathWidth } = this.config;
		const halfWidth = Math.floor(pathWidth / 2);

		for (let x = startPos; x < endPos; x++) {
			for (let y = this.pathY - halfWidth; y <= this.pathY + halfWidth; y++) {
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
				const startY = Math.min(roomY, this.pathY);
				const endY = Math.max(roomY, this.pathY);

				this.map[this.pathY][x] = MapTiles.PATH_H;
				for (let y = startY; y <= endY; y++) {
					if (this.map[y][x] === MapTiles.EMPTY || this.map[y][x] === MapTiles.PATH_V) {
						this.map[y][x] = MapTiles.PATH_V;
					}
				}

				this.map[roomY][x] = roomType;

				if (roomY !== this.pathY) {
					this.map[this.pathY][x] = MapTiles.PATH_H;
				}
			}
		}
	}

	private setStartAndBossPositions(): void {
		this.map[this.pathY][this.config.startPos] = MapTiles.START;
		this.map[this.pathY][this.config.endPos - 1] = MapTiles.BOSSROOM;
	}

	private addEnemiesToPath(difficulty: DifficultyOptionsEnum): void {
		const { startPos, endPos } = this.config;
		const enemyCountByDifficulty: Record<DifficultyOptionsEnum, number[]> = {
			[DifficultyOptionsEnum.Easy]: [2, 3],
			[DifficultyOptionsEnum.Medium]: [3, 5],
			[DifficultyOptionsEnum.Hard]: [5, 6],
			[DifficultyOptionsEnum.Nightmare]: [6, 7],
		}

		const enemyCount = this.gen.intBetween(enemyCountByDifficulty[difficulty][0], enemyCountByDifficulty[difficulty][1]);
		const availablePositions: number[] = [];

		for (let x = startPos + 5; x < endPos - 5; x++) {
			if (this.map[this.pathY][x] === MapTiles.PATH_H &&
				this.map[this.pathY][x - 1] === MapTiles.PATH_H &&
				this.map[this.pathY][x + 1] === MapTiles.PATH_H) {
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
			const aboveY = this.pathY - 1;
			const belowY = this.pathY + 1;

			if (aboveY >= 0 && (this.map[aboveY][pos] === MapTiles.EMPTY || this.map[aboveY][pos] === MapTiles.PATH_H)) {
				this.map[aboveY][pos] = MapTiles.PATH_V;
			}

			if (belowY < this.config.height && (this.map[belowY][pos] === MapTiles.EMPTY || this.map[belowY][pos] === MapTiles.PATH_H)) {
				this.map[belowY][pos] = MapTiles.PATH_V;
			}

			if (pos > 0 && this.map[this.pathY][pos - 1] === MapTiles.EMPTY) {
				this.map[this.pathY][pos - 1] = MapTiles.PATH_H;
			}
			if (pos < this.config.width - 1 && this.map[this.pathY][pos + 1] === MapTiles.EMPTY) {
				this.map[this.pathY][pos + 1] = MapTiles.PATH_H;
			}
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
