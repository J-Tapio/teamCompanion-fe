import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
// slices
import fitnessReducer from './slices/fitness';
import eventsReducer from './slices/events';
import userReducer from './slices/user';
import teamReducer from './slices/team';
import memoReducer from './slices/memo';

const rootPersistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  fitness: fitnessReducer,
  events: eventsReducer,
  user: userReducer,
  team: teamReducer,
  memo: memoReducer,
});

export { rootPersistConfig, rootReducer };
