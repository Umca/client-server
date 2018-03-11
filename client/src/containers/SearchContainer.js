import React, { Component } from 'react'
import '../styles/search.css'

export default class Search extends Component{
    constructor(){
        super()

        this.state = {
            inputValue:'',
            //dataSource: []
        }
    }

    handleInputChange(e){
        let t = e.target.value

        this.setState({
            inputValue: t
        },
            this.props.updateState('searchStr', t)    
        )
    }
    render(){
        return (
            <div className="App-search_wrapper">
                <p>
                    <input
                    className="search_input"    
                    value = {this.state.inputValue}
                    onChange = {this.handleInputChange.bind(this)}
                    />
                    <input className="search_input_loop" />
                </p>    
            </div>
        )
    }
}