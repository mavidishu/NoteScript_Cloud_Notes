import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);// consuming context
    const {deleteNote} = context;// destructuring
    const {note,updateNote} = props;
    
    return (
        // Card to display a note
        <div className='col-md-3 mx-3'>
            <div className="card my-3" style={{width: "18rem" , backgroundColor:"#edf0ee"}}>
                    <span className="badge text-bg-warning">{note.tag}</span>
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <div className="d-flex justify-content-between">
                            {/* Delte Note Button */}
                            <i className="fa-solid fa-trash " onClick={()=>{deleteNote(note._id);props.showAlert("Note Deleted Successfully ","success")}}></i> {/* since we are passing an argument in delete note that's why we used arrow function here */}
                            {/* Edit Note Button */}
                            <i className="fa-regular fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem