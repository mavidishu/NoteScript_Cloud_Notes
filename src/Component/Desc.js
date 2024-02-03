import React from  'react'
import urlImage from '../assets/favicon.jpg';

export default function Desc(){
    return (
      <div className="container my-3">
        <div className="tille-name my-3 d-flex">
            <img className='mx-3 logo' src= {urlImage}  alt="logo" style={{height:'35px', width:'35px'}}/>
            <h4 style={{marginTop:'5px',color:'rgba(255, 255, 255, 0.88)'}}>NoteScript - Cloud Notes</h4>
        </div>
        <div className="desc mx-3">
            <p style={{color:'rgba(255, 255, 255, 0.66)'}}>Notes anytime anywhere just one login required</p>
        </div>
      </div>
    )
}