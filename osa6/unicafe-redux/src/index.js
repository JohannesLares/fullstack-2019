import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const edit = (type) => {
    store.dispatch({
      type: type
    })
  }

  return (
    <div>
      <button onClick={()=>edit('GOOD')}>good</button> 
      <button onClick={()=>edit('OK')}>neutral</button> 
      <button onClick={()=>edit('BAD')}>bad</button>
      <button onClick={()=>edit('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
