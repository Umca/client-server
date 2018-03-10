import React, { Component } from 'react'
import Search from './SearchContainer' 
import Filter from './FilterContainer'
import '../styles/App.css'
import logo from '../assets/images/logo.png'

class App extends Component {
  constructor() {
    super()
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" alt="logo" src={logo}/>
        </header>
        <Search />
        <Filter />
      </div>
    );
  }
}

export default App;
