import React from 'react'
import '../styles/part.css'

const FilterRangeOption = ({text}) => {
    return(
        <div className="rounded">
            <input type="checkbox" value="None" id="rounded" name="check" />
            <label htmlFor="rounded">{text}</label>
        </div>
    )
}

export default FilterRangeOption;