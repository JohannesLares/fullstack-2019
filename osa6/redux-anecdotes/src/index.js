import React from 'react'
import ReactDOM from 'react-dom'
import { create } from './store'
import { Provider } from 'react-redux'
import App from './App'

const store = create()



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)