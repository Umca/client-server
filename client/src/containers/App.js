import React, {
  Component
} from 'react'
import Search from './SearchContainer'
import Filter from './FilterContainer'
import Result from '../components/Result'
import '../styles/App.css'
import logo from '../assets/images/logo.png'
import API from '../utils/api'
import { formatUrl } from '../utils/additional'

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
      () => this.sendRequest(piece, val)
    )
  }

  sendRequest(piece, val) {
    if (piece == "searchStr") this.searchRequest(piece, val)
    else this.filterRequest(piece, val)
  }

  searchRequest(piece, val) {
    if (val) {
      API.request(formatUrl(piece, this.state, initialState))
        .then(res => this.setState({
          data: res
        }))
    } else {
      this.setState({
        data: initialState.data
      })
    }
  }

  filterRequest(piece, val) { 
    API.request(formatUrl(null, this.state, initialState))
      .then(res => this.setState({
        data: res
      }))
  }

  render() {
    return (
      <div className="App">
        <header className = "App-header">
          <img className = "App-logo"
          alt = "logo"
          src = {
            logo
          }
          />
        </header>
        <Search state={this.state} updateState={this.updateState.bind(this)} />
        <Filter state={this.state} updateState = {this.updateState.bind(this)} />
        <Result data={this.state.data}/> 
      </div>
    );
  }
}

export default App;