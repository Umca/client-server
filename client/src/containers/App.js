import React, {
  Component
} from 'react'
import Search from './SearchContainer'
import Filter from './FilterContainer'
import Result from '../components/Result'
import '../styles/App.css'
import logo from '../assets/images/logo.png'
import API from '../utils/api'
import { formatUrl, isFilter } from '../utils/additional'
import { initialState } from '../utils/constants'
import Error from '../components/Error'

class App extends Component {
  constructor() {
    super()
    this.state = initialState
    this.prevY = 0

    this.rangeRef = {}//React.createRef()
  }
  componentDidMount() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }
    const observer = new IntersectionObserver(
      this.handleObserver.bind(this), options)
      const target = document.querySelector('#break')

    observer.observe(target)
    

  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y
    if (this.prevY > y) {
    const page = ++this.state.page

      //request
      fetch(`http://localhost:6650/api/cars/page?since=${page}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(res => {
          if (res) {
              this.setState({
                  page,
                  data: [...this.state.data, ...res]
              })
          } else {
            this.setState({
              page: 0
            })
          }
            
        })      
    }
    this.prevY = y
  }

  updateState(piece, val) {
      this.setState({
          [`${piece}`]: val
      },
        () => { 
          if (!val && isFilter(this.state, initialState)) {
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
        <Filter state={this.state} updateState={this.updateState.bind(this)} rangeRef={this.rangeRef} />
        {
          !this.state.errors ? 
            <Result data={this.state.data} /> : 
            <Error message={"Oops! Service unavailbale. Bad request!"}/>
        }
      </div>
    );
  }
}

export default App;