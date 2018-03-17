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
import { initialState } from '../utils/constants'
import Error from '../components/Error'
import observer from '../utils/observer'

class App extends Component {
  constructor() {
      super()
      this.state = initialState
  }
  componentDidMount(){
      const target = document.querySelector('#break')
      console.log(target)
      observer.observe(target)
  }

  updateState(piece, val) {
      this.setState({
          [`${piece}`]: val
      },
      () => { 
          if (!val) {
              this.setState({
                  data: initialState.data,
              })
          } else { 
              this.sendRequest()
          }
        }
      )
  }

  sendRequest() {
      API.request(formatUrl(this.state, initialState))
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
          API.current = null
          if (!res){
          setTimeout(() => {
              this.sendRequest()
          }, 1500)
          return null
      }
      this.setState({
          data: res,
          errors: false
      })
    })
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
        {
          !this.state.errors ? 
            <Result data={this.state.data} /> : 
            <Error message={"Oops! Service unavailbale. Bad request!"}/>
        }
        <div id="break" style={{ width: '1px', height:"1px", border: "1px solid red"}}></div>
      </div>
    );
  }
}

export default App;