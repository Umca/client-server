import React from 'react'
import { formatString } from '../utils/additional'
import "../styles/result.css"

const Result = ({ data }) => {
    return (
        <div className="App-result_wrapper">
            <div className="test" >
            {
                data.map(item => <ResultItem key={item.model} data={item} />)
            }
            </div>
        </div>
        )
    }
    
const ResultItem = ({ data }) => { 
    return (
        <div className="result-item_wrapper">
            <div className="image_wrapper">
                <img src={`./images/${data.image}.jpg`} alt=""/>
            </div>
            <div className="description_wrapper">
                <h4>{data.model}</h4>
                <div className="description_table">
                    <div className="description_fields">
                        <p className="bold">Price range: </p>
                        <p className="bold">Fuel economy: </p>
                        <p className="bold">Available in: </p>
                    </div>
                    <div className="description_values">
                        <p>{`$ ${formatString(data.price.min)} - $ ${formatString(data.price.max)}`}</p>
                        <p>{`${data.fuel.min} MPG - ${data.fuel.max} MPG`}</p>
                        <p>{
                            data.bodyOptions.map((body, i, arr) => <span key={i}> {body} {(i===arr.length-1) ? '' : ','} </span>)
                        }</p>
                    </div>
                </div>    
            </div>
            
        </div>
    )
}

export default Result;