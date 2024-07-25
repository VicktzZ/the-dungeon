export interface Event {
	name: string;
	description: string;
	execute(): void;
	type: string;
}
