import {reaction} from 'mobx';
import {game} from 'game';
import {useState} from 'react';

export const App = () => {
	const {screens} = game;
	const [CurrentScreen, setCurrentScreen] = useState(() => screens['main']);
	const [loading, setLoading] = useState(true);

	reaction(
		() => game.currentScreen,
		currentScreen => {
			setCurrentScreen(() => screens[currentScreen]);
		},
	);

	return (
		<></>
		//   <Layout>
		// 	{loading ?
		// 	  <GameLoading setLoading={setLoading} />
		// 	  : CurrentScreen()
		// 	}
		//   </Layout>
	);
};
