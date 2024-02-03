import React,{ useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const notesInitial  = [];

    // State to fetch notes from MongoDb(Backend)
    const [Notes,setNotes] = useState(notesInitial);
    const [User,setUser] = useState({name:"",email:"",timeStamp:""});
    const updateUser = async()=>{
      const response = await fetch(`http://localhost:5000/api/auth/getUser`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        const json = await response.json();
        setUser({name:json.name,email:json.email,timeStamp:json.timeStamp});
    }
    // API CALL - Get All Notes using GET
    const getNote = async()=>{
        const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        const json = await response.json();
        // console.log(json)
        setNotes(json);
    }

    // API CALL - Add a note using POST
    const addNote = async(title,description,tag)=>{
        
        const host = "http://localhost:5000"
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}),
        });
        const note = await response.json();
        setNotes(Notes.concat(note))
    }

    // API CALL - Delete a note using DELETE
    const deleteNote= async(id)=>{
      const newNotes = Notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
      const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/notes/deletenote/:${id}`,{
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          }
        });
        const json = await response.json();
        console.log(json);
    }

    // API CALL - Edit a notes using PUT
    const editNote = async(id,title,description,tag)=>{
      // API CALL
      const host = "http://localhost:5000"
      const response = await fetch(`${host}/api/notes/updatenote/:${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}),
      });
      const json = await response.json();
      console.log(json);

      let newNotes = JSON.parse(JSON.stringify(Notes));// deep copy of Notes
      // logic to edit in client(Frontend):
      for (let index = 0; index < Notes.length; index++) {
        const element = Notes[index];
        if(element._id === id){
          newNotes[index].title = title; //don't use element(above) it's const we need to update Notes array.
          newNotes[index].description = description;
          newNotes[index].tag = tag;
        }
        break;// break loop once we found and edited the requ. note
      }
      setNotes(newNotes);// This will set updates notes.
    }
    return(
        <NoteContext.Provider value={{Notes,addNote,editNote,deleteNote,getNote,User,updateUser}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;