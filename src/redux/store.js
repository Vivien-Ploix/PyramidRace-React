import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './authentication/authReducer';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

let store = createStore(
    persistedReducer,
    compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
let persistor = persistStore(store)

export {store, persistor};