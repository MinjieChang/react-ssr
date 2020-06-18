import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { getClientStore } from '../store'
import { BrowserRouter } from 'react-router-dom'

import Router from '../router'
// import Home from '../component/Home';

const App = () => {
  return (
    <Provider store={getClientStore()}>
      <BrowserRouter>
        {Router}
      </BrowserRouter>
    </Provider>
  )
}
ReactDom.hydrate(<App />, document.getElementById('root'))

// ReactDom.hydrate(<Home />, document.getElementById('root'))