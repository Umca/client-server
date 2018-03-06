import React, { Component } from 'react'
import Search from './SearchContainer' 
import Filter from './FilterContainer'
import '../styles/App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Search />
        <Filter />
      </div>
    );
  }
}

export default App;
