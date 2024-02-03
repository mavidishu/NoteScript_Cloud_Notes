import './App.css';
import Navbar from './Component/Navbar';
import  Home  from './Component/Home.js';
import NoteState from './context/notes/NotesState.js';
import{
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import About from './Component/About.js';
import Alert from './Component/Alert.js';
import { useState } from 'react';
import Login from './Component/Login.js';
import Signup from './Component/Signup.js';
import Footer from './Component/Footer.js';


function App() {
  const[alert,setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      type:type
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
    <>
    {/* Context Provider NoteState */}
    <NoteState>
      <Router>
        <Navbar/>
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home showAlert={showAlert}/>}></Route>
            <Route exact path='/About' element={<About/>}></Route>
            <Route exact path='/login' element={<Login showAlert={showAlert}/>}></Route>
            <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}></Route>
          </Routes>
        </div>
        <Footer/>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
