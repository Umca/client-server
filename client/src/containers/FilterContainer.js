import React, { Component } from 'react'
import FilterInputOption from '../components/FilterInputOption'
import FilterRangeOption from '../components/FilterRangeOption'
import { formatString } from '../utils/additional'

export default class Filter extends Component{
    constructor(props){
        super(props)
        this.state = {
            bodyFilter: this.props.state.body,
            makerFilter: this.props.state.maker,
            fuelFilter: this.props.state.fuel,
            priceFilter: this.props.state.price
        }
        this.bodies= [
            'Convertible', 'Coupe', 'Crossover', 'Hatchback',
            'Sedan', 'SUV', 'Truck', 'Van/Minivan', 'Wagon'
        ]
        this.makers= [
                'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi',
                'Bentley', 'BMW', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge',
                'Ferrari', 'Ford', 'Honda', 'Kia', 'Suzuki'
        ]
        
    }
    handleCheckbox(id, type, e) {
        if (e.target.checked) {
            this.setState(
                {
                    [`${type}Filter`]: [...this.state[`${type}Filter`], id]
                },
                () => this.props.updateState(type, this.state[`${type}Filter`]))
            
        } else { 
            let index = this.state[`${type}Filter`].indexOf(id)
            this.setState(
                {
                    [`${type}Filter`]: [...this.state[`${type}Filter`].slice(0, index),
                        ...this.state[`${type}Filter`].slice(index +1)
                    ]
                },
                () => this.props.updateState(type, this.state[`${type}Filter`]))            
        }
    }
    handleRange(type, e) { 
        let val = e.target.value
        this.setState(
            {
                [`${type}Filter`]: val
            },
            () => this.props.updateState(type, val)
        )
    }
    formatString(str) {
        let thousands = Math.floor(parseInt(str) / 1000)
        let remainder = parseInt(str) % 1000
        return `${thousands},${remainder}`
    }
    render(){
        return(
            <div className="App-filter_wrapper">
                <div className="maker_filter">
                    <p className="head">Makes</p>    
                    {
                        this.makers.map((maker, index) =>
                            <FilterInputOption
                                props={{
                                    text: `${maker}`,
                                    key: `${index}`,
                                    forId: `${index}_maker`,
                                    handleCallback: this.handleCheckbox.bind(this, maker, 'maker')
                                    
                                }}
                                key={index}
                            />)
                    }
                </div>     
                <div className="body_filter">   
                    <p className="head">Body styles</p>    
                    {
                        this.bodies.map((body, index) => 
                                <FilterInputOption
                                    props={{
                                        text: `${body}`,
                                        key: `${index}`,
                                        forId: `${index}_body`,
                                        handleCallback: this.handleCheckbox.bind(this, body, 'body')
                                    }}
                                    key={index}
                                />)
                        }
                </div>
                <div className="price_filter">
                    <p className="head">Price range</p>    
                    <FilterRangeOption
                        props={{
                            id:"price_range",
                            handleCallback: this.handleRange.bind(this, 'price'),
                            min: '1000',
                            max: '800000',
                            step: '1000',
                            description: `Under $ ${formatString(this.state.priceFilter)}`,
                            default: '100000'
                        }}
                    />
                        
                </div>
                < div className="fuel_filter" >
                    <p className="head">Fuel economy</p>      
                    <FilterRangeOption
                        props={{
                                id:"fuel_range",
                                handleCallback: this.handleRange.bind(this, 'fuel'),
                                min: '5',
                                max: '100',
                                step: '1',
                                description: `More than ${this.state.fuelFilter} MPG Highway`,
                                default: '5'
                            }}    
                />
                </div>
            </div>
        )
    }
}