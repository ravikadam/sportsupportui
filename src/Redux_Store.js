import reducers_ from "./containers/combinedReducer";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import storage from "redux-persist/es/storage";
import { persistCombineReducers } from "redux-persist";

const logger = createLogger({
  collapsed:true
});

const config = {
  key: "_parenting_illumine",
  storage
};
const reducers = persistCombineReducers(config, reducers_);

let store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

export default store;