import React, { Component } from 'react'
import API from '../utils/api'
import SearchOption from '../components/SearchOption'

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
            if(t){
                API.searchRequest(t)
                .then(res => this.setState({
                    dataSource: res
                }))
            } else {
                this.setState({
                    dataSource: []
                })
            }
            
        })
    }
    render(){
        return (
            <div>
                <input  
                value = {this.state.inputValue}
                onChange = {this.handleInputChange.bind(this)}
                />
                <div>
                    {
                        this.state.dataSource.map( car => <SearchOption model={car.model} key={car.id} />)
                    }
                </div>
            </div>
        )
    }
}