import React,{useContext, useState} from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext);// consuming context using useContext hook
    const {addNote} = context;// destructuring

    // Creating a state using useState() react hook;
    const [note,setNote] = useState({title:"",description:"",tag:""})//useState is a React Hook

    // Add Note button click 
    const handleClick = (e)=>{
        e.preventDefault();// to prevent page reload
        addNote(note.title,note.description,note.tag);// from context
        props.showAlert("Note Added Succesfully","success");
    }

    // This will update "note" state when the input(3) tags updates
    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    // Form: Add Note
    <div>
        <h3 className='my-3'>Add a note</h3>
      <hr />
      <div className="container my-3">
        <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label" style={{fontSize:'20px'}}>Title</label>
          <input type='text' className="form-control" id="title" onChange={onChange} name='title'  aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label" style={{fontSize:'20px'}}>Description</label>
          <input type="text" className="form-control" id="description" name='description'  onChange={onChange}/>
        </div>
            <label htmlFor="tag" className="form-label" style={{fontSize:'20px'}}>Tag</label>
          <input type='text' className="form-control" id="tag" onChange={onChange}  name='tag' aria-describedby="tag"/>
        <button disabled={note.description.length<5 ||note.title.length<5 || note.tag.length<3} type="submit" className="my-3 btn btn-outline-warning my-2" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote