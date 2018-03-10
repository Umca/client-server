import React from 'react'
import '../styles/filter.css'

const FilterRangeOption = ({ props }) => {
    return(
        <p>
            <input type="checkbox"
                id={`test${props.forId}`}
                onChange={props.handleCallback}
            />
            <label htmlFor={`test${props.forId}`} > {props.text} </label>
        </p>
    )
}

export default FilterRangeOption;