import React, { Component } from 'react'
import FilterInputOption from '../components/FilterInputOption'

export default class Filter extends Component{
    constructor(){
        super()
        this.state = {
            bodies: [
                'Convertible', 'Coupe', 'Crossover', 'Hatchback',
                 'Sedan', 'SUV', 'Truck', 'Van/Minivan', 'Wagon'
            ],
            makers: [
                'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi',
                'Bentley', 'BMW', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge',
                'Ferrari', 'Ford', 'Honda', 'Kia', 'Suzuki'
            ]
        }
    }
    render(){
        return(
            <div>
                {
                    this.state.bodies.map((body, index) => 
                        <FilterInputOption text = {body} key={index} />)
                }
            </div>
        )
    }
}