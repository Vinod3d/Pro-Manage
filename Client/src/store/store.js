import {configureStore} from "@reduxjs/toolkit"
import userReducer from './slices/userSlice.js'
import taskReducer from './slices/taskSlice.js'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user : persistedReducer,
        task : taskReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})

export const persistor = persistStore(store);