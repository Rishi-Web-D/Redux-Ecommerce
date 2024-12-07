import { version } from 'react';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  version : 1
//   whitelist: ['user', 'cart'], // Choose slices to persist
};

export default persistConfig;
