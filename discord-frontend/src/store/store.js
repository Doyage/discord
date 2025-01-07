import { composeWithDevTools } from '@redux-devtools/extension';
import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer.js';
import alertReducer from './reducers/alertReducer.js';
import friendsReducer from './reducers/friendsReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  friends: friendsReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
