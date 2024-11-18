// store.js
import { configureStore } from '@reduxjs/toolkit';
import jwtReducer from './slices/storeJwt/storeJwt'; // Import the reducer
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, jwtReducer);

// export const store = configureStore({
//     reducer: {
//         auth: jwtReducer, // Use the reducer here
//     },
// });


const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
