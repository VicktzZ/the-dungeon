import type { GameMap } from '@types';
import { MapTiles } from '@consts/mapTiles';
import chalk from 'chalk';

const TILE_DISPLAY = {
    [MapTiles.EMPTY]: ' ',
    [MapTiles.START]: chalk.green('S'),
    [MapTiles.MERCHANT]: chalk.yellow('M'),
    [MapTiles.MYSTERY]: chalk.magentaBright('?'),
    [MapTiles.VILLAGE]: chalk.yellowBright('V'),
	[MapTiles.CHEST]: chalk.blue('C'),
    [MapTiles.BOSS]: chalk.red('B'),
    [MapTiles.ENEMY]: chalk.red('E'),
    [MapTiles.PLAYER]: chalk.green('P'),
	[MapTiles.BOSSROOM]: chalk.redBright('!'),
    [MapTiles.PATH_H]: chalk.gray('-'),
    [MapTiles.PATH_V]: chalk.gray('|'),
	[MapTiles.PATH_TR]: chalk.gray('/'),
	[MapTiles.PATH_TL]: chalk.gray('\\'),
	[MapTiles.ARROW_L]: chalk.gray('<'),
	[MapTiles.ARROW_R]: chalk.gray('>'),
};

export function renderMap(map: GameMap, playerPos: { x: number; y: number }): string {
    const displayMap = map.map(row => [...row]);

    // Adiciona o jogador ao mapa
    if (playerPos.y >= 0 && playerPos.y < displayMap.length &&
        playerPos.x >= 0 && playerPos.x < displayMap[playerPos.y].length) {
        displayMap[playerPos.y][playerPos.x] = MapTiles.PLAYER;
    }

    return displayMap.map(row =>
        row.map(tile => TILE_DISPLAY[tile as keyof typeof TILE_DISPLAY] || ' ').join('')
    ).join('\n');
}
