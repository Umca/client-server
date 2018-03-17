import React, { Component } from 'react'
import '../styles/search.css'

export default class Search extends Component{
    constructor(props){
        super(props)

        this.state = {
            inputValue:this.props.state.model,
        }
        
    }

    handleInputChange(e){
        let str = e.target.value
        this.setState({
            inputValue: str
        },        
            this.props.updateState('model', str)    
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