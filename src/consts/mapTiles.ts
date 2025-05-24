import type { MapTile } from "@types";

export const MapTiles: Record<string, MapTile> = {
    EMPTY: ' ' as const,
    START: 'S' as const,
    MERCHANT: 'M' as const,
	CHEST: 'C' as const,
    MYSTERY: '?' as const,
    VILLAGE: 'V' as const,
    BOSS: 'B' as const,
	BOSSROOM: '!' as const,
    ENEMY: 'E' as const,
    PLAYER: 'P' as const,
    PATH_H: '-' as const,
    PATH_V: '|' as const,
    PATH_TR: '/' as const,
    PATH_TL: '\\' as const,
    ARROW_L: '<' as const,
    ARROW_R: '>' as const,
};
