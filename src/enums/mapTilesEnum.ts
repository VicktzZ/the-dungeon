export enum MapTiles {
	EMPTY = ' ',
	START = 'S',
	MERCHANT = 'M',
	CHEST = 'C',
	MYSTERY = '?',
	VILLAGE = 'V',
	BOSS = 'B',
	BOSSROOM = '!',
	ENEMY = 'E',
	PLAYER = 'P',
	PATH_H = '-',
	PATH_V = '|',
	PATH_TR = '/',
	PATH_TL = '\\',
	ARROW_L = '<',
	ARROW_R = '>',
};

export const TILES_WITHOUT_EVENT = [
	MapTiles.EMPTY,
	MapTiles.ARROW_L,
	MapTiles.ARROW_R,
	MapTiles.PATH_H,
	MapTiles.PATH_TL,
	MapTiles.PATH_TR,
	MapTiles.PATH_V,
	MapTiles.PLAYER,
	MapTiles.START
]