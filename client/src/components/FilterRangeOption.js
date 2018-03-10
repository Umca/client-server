import React from 'react'

const FilterRangeOption = ({ props }) => { 
    return (
        <div>
            <input
                type="range"
                id={props.id}
                onChange={props.handleCallback}
                min={props.min}
                max={props.max}
                step={props.step}
                />
            <label htmlFor={props.id}>{props.description}</label>
        </div>
    )
}

export default FilterRangeOption;