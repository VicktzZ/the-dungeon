import type { Event, GameMap, MapConfig } from '@types';
import { makeAutoObservable, observable } from 'mobx';
import gen from 'random-seed';
import { terminal } from './Terminal';
import { i18n } from '@i18n';
import { MapGenerator } from './MapGenerator';
import { DifficultyOptionsEnum, MapTiles } from '@enums';

export class Dungeon {
	private seed: string = '';
	private gen: gen.RandomSeed = {} as gen.RandomSeed;
	private map: GameMap = [];
	private mapGenerator: MapGenerator = {} as MapGenerator;
	private difficulty: DifficultyOptionsEnum = DifficultyOptionsEnum.Medium;
	private playerPos: { x: number; y: number } = { x: 0, y: 0 };
	private dungeonConfig?: { seedVisible?: boolean };
	private mapConfig: MapConfig = {
		width: 80,
		height: 10,
		startPos: 2,
		endPos: 78,
		pathWidth: 3,
		seed: ''
	};

	@observable public floor = 1;
	@observable public events: Event[] = [];

	constructor(config?: { seedVisible?: boolean, seed?: string }) {
		makeAutoObservable(this);
		this.new(config)
	}

	// Getters

	getRandomEvent(): Event {
		return this.events[this.gen.intBetween(0, this.events.length)] as Event;
	}

	getSeed(): string {
		return this.seed;
	}

	getMapConfig(): MapConfig {
		return this.mapConfig;
	}

	getDifficulty(): DifficultyOptionsEnum {
		return this.difficulty;
	}

	// Setters

	setMapConfig(config: MapConfig) {
		this.mapConfig = config;
	}

	setSeed(seed: string) {
		this.seed = seed;
		this.gen = gen.create(seed);
	}

	setDifficulty(difficulty: DifficultyOptionsEnum) {
		this.difficulty = difficulty;
	}

	// Utils

	generateMap(): GameMap {
		this.mapGenerator = new MapGenerator(this.mapConfig)
		return this.map = this.mapGenerator.generate({ difficulty: this.difficulty });
	}

	randomPercent(percent: number): boolean {
		return this.gen.intBetween(0, 100) < percent;
	}

	renderMap(): void {
		terminal.clear()
		this.mapGenerator.render(this.playerPos)
		terminal.write('\n' + i18n.t('game.floor.' + this.floor + '.title'))
		if (this.dungeonConfig?.seedVisible) terminal.write(`\nSeed: ${this.seed}\n`)
	}

	isDirectionBlocked(dx: number, dy: number): boolean {
		const newX = this.playerPos.x + dx;
		const newY = this.playerPos.y + dy;

		if (newX < 0 || newX >= this.mapConfig.width ||
			newY < 0 || newY >= this.mapConfig.height) {
			return true;
		}

		if (dx === 0 && dy !== 0) {
			return this.map[newY][newX] === ' ';
		}

		return this.map[newY][newX] === ' ' || this.map[newY][newX] === '|';
	}

	movePlayer(dx: number, dy: number) {
		if (this.isDirectionBlocked(dx, dy)) return false;

		this.playerPos.x += dx;
		this.playerPos.y += dy;
		this.renderMap();
		return true;
	}

	new(config?: { seedVisible?: boolean, seed?: string }) {
		const s = config?.seed || Math.random().toString();
		this.seed = s;
		this.gen = gen.create(s);
		this.mapConfig = {
			width: 80,
			height: 10,
			startPos: 2,
			endPos: 78,
			pathWidth: 3,
			seed: s
		};
		this.floor = 1;
		this.dungeonConfig = config || { seedVisible: false };
		this.generateMap();

		let startX = this.mapConfig.startPos;
		let startY = Math.floor(this.mapConfig.height / 2);

		for (let y = 0; y < this.map.length; y++) {
			const x = this.map[y].indexOf(MapTiles.START);
			if (x !== -1) {
				startX = x;
				startY = y;
				break;
			}
		}

		this.playerPos = { x: startX, y: startY };
		return this;
	}

}

export const dungeon = new Dungeon({ seedVisible: true })
