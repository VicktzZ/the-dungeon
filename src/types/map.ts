// types/map.ts
export type MapTile = ' ' | 'S' | 'M' | '?' | 'V' | 'B' | 'E' | 'P' | '-' | '|' | '!' | 'X' | 'C' | '/' | '\\' | '<' | '>';
export type MapRow = MapTile[];
export type GameMap = MapRow[];

export interface MapConfig {
    width: number;
    height: number;
    startPos: number;
    endPos: number;
    pathWidth: number;
	seed: string;
}
