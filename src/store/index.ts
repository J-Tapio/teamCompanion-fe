import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { rootPersistConfig, rootReducer } from './rootReducer';

// ----------------------------------------------------------------------

/* 
Prefer to use the callback notation for the middleware option in configureStore to access a pre-typed getDefaultMiddleware instead.
*/
// Middleware solution found: https://github.com/reduxjs/redux-toolkit/discussions/1204?sort=new

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

// state.getState did not work as suggested within reduxjs/toolkit docs?
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const { dispatch } = store;

const useSelector = useReduxSelector;
const useDispatch = () => useReduxDispatch<AppDispatch>();

export { store, persistor, dispatch, useSelector, useDispatch };
