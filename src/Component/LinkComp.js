import React from 'react'
import {Link} from 'react-router-dom';

export default function LinkComp(){
    return (
      <div className="container gap d-flex justify-content-center my-3" style={{color:'rgba(255, 255, 255, 0.66)'}}>
        <div className="Nav-Links my-3">
            <h4>Links</h4>
            <Link className="nav-link" to='/'>Home</Link>
            <Link className="nav-link" to='/About'>About</Link>
        </div>
      </div>
    )
}