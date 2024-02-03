import React, { useState ,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';


function Login(props) {
    const [credentials,setCredentials ] = useState({email:"",password:""});

    let context = useContext(NoteContext);
    const {updateUser} = context;

    let Navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              
            },
            body:JSON.stringify({email:credentials.email,psswd:credentials.password})
        });
        const json = await response.json();
        if(json.success){
            // ave "auth-token" and redirect to show notes and add note
            localStorage.setItem('token',json.authToken);
            Navigate("/");// redirect to home page having endpoint as "/"
            updateUser();// fetchng user who logged in
            props.showAlert("Successfully Logged In","success");
        }else{
            // Alert
            props.showAlert("Invalid Credentials, Either email or password does not exists !!!!","danger");
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value });
    };
  return (
    <form onSubmit={handleSubmit} >
        <h2 style={{color:'#ffc107',marginTop:'30px'}}>Login to your account</h2>
        <hr />
        <div className="my-3 mb-3">
            <label htmlFor="email" className="form-label" style={{fontSize:'20px',marginTop:"30px"}}>Email address</label>
            <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email} name="email" aria-describedby="emailHelp" style={{border:'1px solid black'}}/>
            <div id="email" className="form-text"style={{fontSize:'15px'}}>We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{fontSize:'20px'}}>Password</label>
            <input type="password" className="form-control " onChange={onChange} value={credentials.password} name="password" id="password" style={{border:'1px solid black'}}/>
        </div>
        <button type="submit" className="btn btn-outline-warning" >Login</button>
    </form>
  )
}

export default Login;