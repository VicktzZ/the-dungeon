import blessed from "blessed";
import { render } from "react-blessed";
import { game } from "game";
import { useState } from "react";
import { reaction } from "mobx";

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: game.title,
});

screen.key(["escape", "q", "C-c"], (ch, key) => {
  return process.exit(0);
});

const App = () => {
  const { screens } = game;
  const [ CurrentScreen, setCurrentScreen ] = useState(() => screens['main']);

  reaction(
    () => game.currentScreen,
    (currentScreen) => {
      setCurrentScreen(() => screens[currentScreen]);
    }
  );

  return CurrentScreen();
};

render(<App />, screen);
