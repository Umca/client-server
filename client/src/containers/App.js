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
import ErrorBoundary from './Error'

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

      if (val) {
        API.request(formatUrl(piece, this.state, initialState))
          .then(res => {
            if (!res.ok) return Promise.reject(`Failed request! ${res.statusText}`)
            else return Promise.resolve(res.json())
          })
          .catch(err => {
            console.log('from app', err)
            this.setState({
              errors : true
            })
          })        
          .then(res => {
            debugger
            API.current = null
            if (!res){
              setTimeout(() => {
                this.sendRequest(piece, val)
              }, 1500)
              
              return null
            }
            this.setState({
              data: res,
              errors: false
            })
          })
    } else {
      this.setState({
        data: initialState.data,
      })
    }
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
        <Filter state={this.state} updateState={this.updateState.bind(this)} />
        {/* <ErrorBoundary> */}
          <Result data={this.state.data} /> 
        {/* </ErrorBoundary>   */}
      </div>
    );
  }
}

export default App;