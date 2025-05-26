import type { GameMap, MapConfig } from '@types';
import { MapTiles } from '@consts/mapTiles';
import generation from 'random-seed';

const ROOM_TYPES = [
	MapTiles.EMPTY,
	MapTiles.MERCHANT,
	MapTiles.MYSTERY,
	MapTiles.ENEMY,
	MapTiles.VILLAGE,
	MapTiles.BOSS,
	MapTiles.CHEST
] as const;

export function generateMap(config: MapConfig): GameMap {
    const { width, height, startPos, endPos, pathWidth, seed } = config;
    const map: GameMap = Array(height).fill(0).map(() => Array(width).fill(MapTiles.EMPTY));

    const gen = generation.create(seed);
    const pathY = Math.floor(height / 2);
	for (let x = startPos; x < endPos; x++) {
		for (let y = pathY - Math.floor(pathWidth/2); y <= pathY + Math.floor(pathWidth/2); y++) {
			if (y >= 0 && y < height) {
				map[y][x] = MapTiles.PATH_H;
			}
		}
	}

    for (let x = startPos + 5; x < endPos - 5; x += 10) {
		const roomTypeIndex = gen.intBetween(0, ROOM_TYPES.length - 1);
		const roomType = ROOM_TYPES[roomTypeIndex];
		const roomY = gen.intBetween(pathY - 3, pathY + 3);

		if (roomY >= 0 && roomY < height) {
			const connectY = roomY > pathY ? pathY + 1 : pathY - 1;
			for (let y = Math.min(roomY, connectY); y <= Math.max(roomY, connectY); y++) {
				map[y][x] = MapTiles.PATH_V;
			}

			map[roomY][x] = roomType;
		}
	}

    map[pathY][startPos] = MapTiles.START;
    map[pathY][endPos - 1] = MapTiles.BOSSROOM;

    addEnemiesToPath(map, pathY, startPos, endPos, gen)

    return map;
}

function addEnemiesToPath(map: GameMap, pathY: number, startPos: number, endPos: number, gen: generation.RandomSeed) {
    const enemyCount = gen.intBetween(3, 6);
    const availablePositions: number[] = [];

    for (let x = startPos + 5; x < endPos - 5; x++) {
        if (map[pathY][x] === MapTiles.PATH_H) {
            availablePositions.push(x);
        }
    }

    for (let i = availablePositions.length - 1; i > 0; i--) {
        const j = gen.intBetween(0, i);
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
        const isBoss = gen.random() < 0.2;
        map[pathY][pos] = isBoss ? MapTiles.BOSS : MapTiles.ENEMY;
    }
}
