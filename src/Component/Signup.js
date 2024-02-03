import React, { useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";

function Signup(props) {
  const context = useContext(NoteContext);
  const {updateUser} = context;
  let Navigate = useNavigate();
  const [credentials,setCredentials] = useState({name:"",email:"",password:""})
  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e)=>{
      e.preventDefault();
      const host = "http://localhost:5000";
      const response = await fetch(`${host}/api/auth/createUser`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            
          },
          body:JSON.stringify({name:credentials.name,email:credentials.email,psswd:credentials.password})
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
          // ave "auth-token" and redirect to show notes and add note
          localStorage.setItem('token',json.authToken);
          Navigate("/");// redirect to home page having endpoint as "/"
          updateUser();
          props.showAlert("Account Created Successfully","success");
      }else{
          // Alert
          props.showAlert("Invalid, Check your credentials.Follow guidelines. !!!!","danger");
      }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="titleName" style={{color:"#ffc107",marginTop:'30px'}}>Create Account</h3>
      <hr />
      <div className="my-3 mb-3">
        <label htmlFor="name" className="my-3 form-label" style={{fontSize:'20px',marginTop:'30px'}}>
          Name
        </label>
        <input
          type="test"
          className=" form-control"
          id="name"
          name="name"
          onChange={onChange}
          value = {credentials.name}
          aria-describedby="emailHelp"
          style={{border:'1px solid black'}}
        />
        <label htmlFor="email" className="my-3 form-label" style={{fontSize:'20px'}}>
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          onChange={onChange}
          value={credentials.email}
          style={{border:'1px solid black'}}
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="my-1 form-label" style={{fontSize:'20px'}}>
          Password
        </label>
        <input
          type="password"
          className="my-2 form-control"
          name="password"
          id="password"
          value = {credentials.password}
          style={{border:'1px solid black'}}
          onChange={onChange}
        />
        <div id="passwordDescription" className="mx-1 form-text">
            Password must be of minimum 5 length.
        </div>
      </div>
      <button type="submit" className="btn btn-outline-warning ">
        Create
      </button>
    </form>
  );
}

export default Signup;
