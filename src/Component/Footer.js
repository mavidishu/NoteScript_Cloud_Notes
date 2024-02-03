import React, { useEffect } from 'react'
import Desc from './Desc';
import LinkComp from './LinkComp';
import { useLocation } from 'react-router-dom';
export default function Footer(){
    let location = useLocation();
    useEffect(()=>{
        console.log(location);
    },[])
    return (
        <>
            <div className="footer" style={{marginTop:`${location.pathname==='/login'?'100px':'30px'}`,backgroundColor:'#212529',color:'white'}}>
                <div className="footercomp" style={{display:'flex',justifyContent:'space-between'}}>
                    <Desc/>
                    <LinkComp/>
                </div>
        
                <div className="description d-flex flex-row justify-content-center" style={{fontSize:'18px',color:'rgba(255, 255, 255, 0.66)'}}>
                    <div className="description d-flex flex-row">
                        <p >Made With Love by NoteScipt Team  </p>
                        <i className="fa-solid fa-heart mx-2 my-1" style={{color: "#ffffff"}}>.</i>
                    </div>
                </div>
            </div>
        </>
    )
}