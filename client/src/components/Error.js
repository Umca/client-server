import React from 'react'
import error from '../assets/images/error_cat.png'
import "../styles/error.css"

const Error = ({message}) =>{
    return(
        <div className='App-error'>
            <img alt="" src={error} />
            <p className="error_message">{message}</p>
        </div>
    )
}
export default Error