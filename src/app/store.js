import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from '../features/user/userSlice'
import authReducer from '../features/auth/authSlice';

import thunk from 'redux-thunk';


const persistConfig = {
    key: 'wtff', // Puede ser cualquier cadena única
    storage,
    whitelist: ['user', 'auth']
};

const rootReducer = combineReducers({ user: userReducer, auth: authReducer })

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})
