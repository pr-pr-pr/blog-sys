import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { infoReducer } from './info/reducers';
import { userReducer } from './user/reducers';

const rootReducer = combineReducers({
  info: infoReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middleware = [thunk];
  const middlewareEnhancer = applyMiddleware(...middleware);

  const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer));

  return store;
}
