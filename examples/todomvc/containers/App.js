import React, { Component } from 'react';
import TodoApp from './TodoApp';
import { createStore, combineReducers, compose } from 'redux';
import { persistState , devTools} from 'redux-devtools';
import { ImportExportMonitor } from '../../../src/react';
import { DebugPanel, DevTools } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';

const finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <TodoApp /> }
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store}
                    monitor={ImportExportMonitor}/>
        </DebugPanel>
      </div>
    );
  }
}
