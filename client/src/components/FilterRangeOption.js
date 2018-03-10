import React from 'react'

const FilterRangeOption = (props) => { 
    return (
        <div>
            <input
                type="range"
                id={props.opts.id}
                onChange={props.opts.handleCallback}
                min={props.opts.min}
                max={props.opts.max}
                step={props.opts.step}
                />
            <label htmlFor={props.opts.id}>{props.opts.description}</label>
        </div>
    )
}

export default FilterRangeOption;