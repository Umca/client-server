import React, { Component } from 'react'
import Search from './SearchContainer' 
import Filter from './FilterContainer'
import Result from '../components/Result'
import '../styles/App.css'
import logo from '../assets/images/logo.png'
import API from '../utils/api'

let initialState = {
  price: 800000,
  fuel: 5,
  maker: [],
  body: [],
  searchStr: '',
  data: []
}
class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }
  updateState(piece, val) {
    this.setState({
      [`${piece}`]: val
    },
      () => {
       if (piece == "searchStr") {
         if (val) { 
           API.request(this.formatUrl(piece))
             .then(res => this.setState({
               data: res
             }))
         } else {
            this.setState({
              data: initialState.data
            })
         }
                
      } 
       else {
         API.request(this.formatUrl())
           .then(res => this.setState({
             data: res
           }))
        }
      }
    )
  }

  formatUrl(type) { 
    let result = "";
    switch (type) {
      case 'searchStr': result = `search?model=${this.state[type]}`;
        break;  
      default: result = `filter?${this.getUrlQuery()}`  
    }
    return result;
  }
  getUrlQuery() {
    let query = "";

    for (let key in this.state) {
      if (this.state.hasOwnProperty(key) && key !== 'searchStr' && key !== 'data') {
        if (this.state[key] == initialState[key]) { 
          continue;
        }
        if (typeof this.state[key] == 'string' || typeof this.state[key] == 'number') {
          query += `${key}=${this.state[key]}&`
        } else { 
          query += `${key}=`
          query += this.state[key].join(',') +'&'
        }
      }
    }
    return query;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" alt="logo" src={logo}/>
        </header>
        <Search updateState={this.updateState.bind(this)}/>
        <Filter updateState={this.updateState.bind(this)} />
        <Result data={this.state.data}/>
      </div>
    );
  }
}

export default App;
