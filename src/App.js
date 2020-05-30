import "babel-polyfill";
import React, { Component } from "react";
import Main from "./Main";
import { Provider } from "react-redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";
import { PersistGate } from "redux-persist/es/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./Redux_Store";
import reducers_ from "./containers/combinedReducer";

const config = {
  key: "_parenting_illumine",
  storage
};
const reducers = persistCombineReducers(config, reducers_);

class App extends Component {
  render() {
    // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));
    let persistor = persistStore(store);
    return (
      <Provider store={store}>
        <PersistGate
          loading={
            <div>
              <p>Loading</p>
            </div>
          }
          onBeforeLift={() => {}}
          persistor={persistor}
        >
        <Router>
          <Main />
        </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
