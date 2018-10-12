import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Home } from './pages';
import * as reducers from './ducks';

const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

export default App;
