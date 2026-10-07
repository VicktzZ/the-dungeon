# The Dungeon

A dungeon crawler that runs in the terminal, written in TypeScript. Each floor
is generated procedurally from a seed, so the same seed always produces the
same dungeon.

Inspired by "A Masmorra", one of my first projects.

## How it plays

You pick a hero and a difficulty, then move through the floor one step at a
time. The map is an 80x10 grid drawn with colored ASCII tiles:

| Tile | Meaning |
| --- | --- |
| `P` | Player |
| `S` | Start |
| `E` | Enemy |
| `M` | Merchant |
| `C` | Chest |
| `V` | Village |
| `?` | Mystery room |
| `B` / `!` | Boss and boss room |

## What is implemented

- **Seeded map generation**: a main corridor, branching rooms of several
  types, start and boss placement, and enemies placed according to difficulty
- **Movement** with blocked directions detected and disabled in the prompt
- **Heroes** with distinct base stats and skills, loaded from JSON data files
- **Difficulty modifiers** and settings persisted between runs
- **Localization** in English and Portuguese
- **View system**: menu, new game, settings, loading and game screens as
  separate modules

## Not built yet

Room events are stubs and there is no combat system yet. Those are the next
steps, followed by progression across floors.

## Stack

TypeScript, Bun, Inquirer (prompts), Chalk and Figlet (rendering), MobX (game
state), random-seed (deterministic generation).

## Running it

Requires [Bun](https://bun.sh).

```bash
bun install
cd src
bun app.ts
```

The game reads its data files relative to `src`, so it has to be started from
that directory.

## Project layout

```
src/resources/   Dungeon state, map generator, events, terminal wrapper
src/models/      Entity, Hero, Enemy, Player, Skill
src/views/       Menu, settings, new game and game screens
src/data/        Hero stats, hero skills, game settings
src/i18n/        Translations (en, pt)
```
