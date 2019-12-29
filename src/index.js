import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import FindArticles from './findArticles'
import reducers from './reducers/reducers'
import thunk from 'redux-thunk'

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export default store

class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <FindArticles />
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
