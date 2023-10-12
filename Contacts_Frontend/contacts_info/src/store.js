import { configureStore , combineReducers} from "@reduxjs/toolkit";
import authReducer from './Slices/AuthSlice'
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    whitelist: [],
};


console.log(authReducer,'authaaaaaaaaaaaa');
const rootReducer=combineReducers({
    auth:authReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store=configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
})

export const persistor = persistStore(store);