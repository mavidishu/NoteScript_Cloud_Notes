import React, { useContext, useEffect, useRef,useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "../Component/NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  const context = useContext(NoteContext); // consuming context
  const {Notes, getNote,editNote,updateUser} = context; // destructuring
  let Navigate= useNavigate();
  
  //this wil handle the case when we are not logged in . component will navigate to /login endpoint
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote();
      updateUser();
    }else{
      Navigate('/login');
    }
  }, [Notes]);

  // state for editing notes
  const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""})//useState is a React Hook; two state with same values affect controlled component

  const updateNote = (currentNote) => {
    ref.current.click(); // this will click the trigger button given by bootstrap edit note modal will open
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  };

  // References Used:
  const ref = useRef(null)
  const refClose = useRef(null);

  const handleClick = ()=>{
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();// click the close button whenever save button is clicked
    props.showAlert("Note updated successfully","success");
  }

  // This will update "note" state when the input(3) tags updates
  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {/* Form to add a note  */}
      <AddNote showAlert={props.showAlert}/>

      {/* <!-- Button trigger modal --> */}
      <button
        type=" button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label" >
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      onChange={onChange}
                      name="etitle"
                      aria-describedby="emailHelp"
                      value={note.etitle}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label" >
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange}
                    />
                  </div>
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    value={note.etag}
                    type="text"
                    className="form-control"
                    id="etag"
                    onChange={onChange}
                    name="etag"
                    aria-describedby="etag"
                  />
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5 || note.etag.length<3} type="button" onClick={handleClick} className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Extracting Notes into List of NoteItem */}
      <div className="row my-3">
        <h3 className="my-3">Your Notes</h3>
        <hr />
        <div className="container">
          {Notes.length === 0 && 'No notes available. Add some notes to insert here.'}
        </div>
        {Notes.map((note) => {
          return (
            <NoteItem note={note} updateNote={updateNote} showAlert={props.showAlert} key={note._id} />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
