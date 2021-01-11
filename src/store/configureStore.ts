import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { initialState, rootReducer } from '../reducers';

export default function configureStore() {
  // const composeEnhancers =
  //     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  //         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  //             // options like actionSanitizer, stateSanitizer
  //         }) : compose;

  // const enhancer = composeEnhancers(
  //     applyMiddleware(thunk)
  // );

  const enhancer = applyMiddleware(thunk);

  return createStore(rootReducer, initialState, enhancer);
}
