//import { combineReducers } from 'redux'
import authReducers from "./auth/redux_reducers";
import appReducers from "./application/redux_reducers";

let reducers = {
  auth: authReducers,
  app: appReducers
};

//export default combineReducers(reducers)
export default reducers;