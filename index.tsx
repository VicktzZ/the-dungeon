import blessed from "blessed";
import { render } from "react-blessed";
import { game } from "game";
import { useEffect, useState } from "react";
import { reaction } from "mobx";
import { Layout } from "@layout";
import { GameLoading } from "@components";

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
  const [ loading, setLoading ] = useState(true)

  reaction(
    () => game.currentScreen,
    (currentScreen) => {
      setCurrentScreen(() => screens[currentScreen]);
    }
  );

  return (
    <Layout>
      {loading ?
        <GameLoading setLoading={setLoading} />
        : CurrentScreen()
      }
    </Layout>
  );
};

render(<App />, screen);
