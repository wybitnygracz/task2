import React from 'react';
import { Provider } from 'react-redux';
import Game from './views/Game';
import 'semantic-ui-css/semantic.min.css';
import configureStore from './store/configureStore';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}
