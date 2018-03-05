import React, { Component } from 'react'
import API from '../utils/api'

export default class Search extends Component{
    constructor(){
        super()

        this.state = {
            inputValue:'',
            dataSource: []
        }
    }

    handleInputChange(e){
        let t = e.target.value

        this.setState({
            inputValue: t
        }, () => {
            API.searchRequest(t)
        })
    }
    render(){
        return (
            <div>
                <input  
                value = {this.state.inputValue}
                onChange = {this.handleInputChange.bind(this)}
                />
            </div>
        )
    }
}