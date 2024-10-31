import {combineReducers, configureStore} from "@reduxjs/toolkit"
import userReducer from './slices/userSlice.js'
import taskReducer from './slices/taskSlice.js'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'task'],
}

const rootReducer = combineReducers({
    user: userReducer,
    task: taskReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})

export const persistor = persistStore(store);