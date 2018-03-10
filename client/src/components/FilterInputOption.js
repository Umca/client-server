import React from 'react'
import '../styles/filter.css'

const FilterRangeOption = (props) => {
    return(
        <p>
            <input type="checkbox"
                id={`test${props.opts.forId}`}
                onChange={props.opts.handleCallback}
            />
            <label htmlFor={`test${props.opts.forId}`} > {props.opts.text} </label>
        </p>
    )
}

export default FilterRangeOption;