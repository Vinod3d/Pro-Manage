import {combineReducers, configureStore} from "@reduxjs/toolkit"
import userReducer from './slices/userSlice.js'
import taskReducer from './slices/taskSlice.js'
import analyticsReducer from './slices/analyticsSlice.js'
import singleTaskReducer from './slices/singleTaskSlice.js';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
}

const rootReducer = combineReducers({
    user: persistReducer(persistConfig, userReducer),
    task: taskReducer,
    analytics: analyticsReducer,
    singleTask: singleTaskReducer,
});


export const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})

export const persistor = persistStore(store);