import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { infoReducer } from './info/reducers';

const rootReducer = combineReducers({
  info: infoReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewareEnhancer = applyMiddleware();

  const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer));

  return store;
}
