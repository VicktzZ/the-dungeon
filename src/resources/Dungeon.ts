import type { Event, GameMap, MapConfig } from '@types';
import { renderMap } from '@utils';
import { generateMap } from '@utils/mapGenerator';
import { makeAutoObservable, observable } from 'mobx';
import gen from 'random-seed';
import { terminal } from './Terminal';

export class Dungeon {
	private seed: string = '';
	private gen: gen.RandomSeed = gen.create('');
	private map: GameMap = [];
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

	@observable public floor = 0;
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

	// Setters

	setMapConfig(config: MapConfig) {
		this.mapConfig = config;
	}

	setSeed(seed: string) {
		this.seed = seed;
		this.gen = gen.create(seed);
	}

	// Utils

	generateMap(): GameMap {
		return this.map = generateMap(this.mapConfig);
	}

	randomPercent(percent: number): boolean {
		return this.gen.intBetween(0, 100) < percent;
	}

	renderMap(): void {
		terminal.clear()
		terminal.write(renderMap(this.map, this.playerPos))
		if (this.dungeonConfig?.seedVisible) terminal.write(`\nSeed: ${this.seed}`)
	}

	movePlayer(dx: number, dy: number) {
		const newX = this.playerPos.x + dx;
		const newY = this.playerPos.y + dy;

		if (newX >= 0 && newX < this.mapConfig.width &&
			newY >= 0 && newY < this.mapConfig.height &&
			this.map[newY][newX] !== ' ') {
			this.playerPos.x = newX;
			this.playerPos.y = newY;
			this.renderMap();
		}
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
		this.playerPos = { x: this.mapConfig.startPos, y: Math.floor(this.mapConfig.height / 2) };
		this.dungeonConfig = config || { seedVisible: false };
		this.generateMap();
	}
}

export const dungeon = new Dungeon({ seedVisible: true })
