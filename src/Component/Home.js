import React,{useContext} from 'react'
import Notes from './Notes'
import img from '../assets/wave.png';
import NoteContext from '../context/notes/NoteContext';
export default function Home(props) {
  const context = useContext(NoteContext);
  const {User} = context;
  return (
    <div>
      <div className="my-2 container d-flex justify-content-center">
        <h2>Welcome, {User.name}<img src={img} alt="Hello" style={{marginLeft:'10px',height:'35px',width:'35px'}}></img></h2>
      </div>
      <Notes showAlert={props.showAlert}/> {/* prop drilling */}
    </div>
  )
}
