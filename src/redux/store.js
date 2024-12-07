import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import persistConfig from './persistConfig';
import userReducer from './slices/userSlice';
import categoriesReducer from './slices/categoriesSlice';
import cartReducer from './slices/cartSlice';

// Combine all slices into a root reducer
const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});

// Apply persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
});

export const persistor = persistStore(store);
export default store;
