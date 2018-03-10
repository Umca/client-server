import React, { Component } from 'react'
import Search from './SearchContainer' 
import Filter from './FilterContainer'
import '../styles/App.css'
import logo from '../assets/images/logo.png'
import API from '../utils/api'

class App extends Component {
  constructor() {
    super()
    this.state = {
      price: 1000,
      fuel: 5,
      maker: [],
      body: [],
      searchStr:''
    }
  }
  updateState(piece, val) {
    this.setState({
      [`${piece}`]: val
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" alt="logo" src={logo}/>
        </header>
        <Search updateState={this.updateState.bind(this)}/>
        <Filter updateState={this.updateState.bind(this)}/>
      </div>
    );
  }
}

export default App;
