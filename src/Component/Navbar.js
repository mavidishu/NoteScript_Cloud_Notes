import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import userProfile from "../assets/userProfile.png";

const Navbar = () => {
  // useLocation() is a hook provided by 'react-router-dom':
  let location = useLocation();
  let navigate = useNavigate();

  let context = useContext(NoteContext);
  const {User} = context;

  const refAccount = useRef(null);
  const refClose = useRef(null);
  const handleClick = () => {
    refAccount.current.click();
  };
  const handleLogoutAcc = ()=>{
    localStorage.removeItem("token");
    refClose.current.click();
    navigate("/login");
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <button
        className="btn btn-primary d-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        ref={refAccount}
        aria-controls="offcanvasExample"
      >
        Button with data-bs-target
      </button>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h4 className="offcanvas-title" id="offcanvasExampleLabel">
            User Account
          </h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            ref={refClose}
          ></button>
        </div>
        <div className="offcanvas-body">
          <div>
              <div className="userProfile">
                <img src={userProfile} alt="user profile" style={{height:"100px",width:"130px",margin:"30px 100px"}}/>
              </div>
              <div className="userName d-flex flex-column my-3 mx-3">
                <h5>User Name</h5>
                <h5 className="text-muted">{User.name}</h5>
                <hr />
              </div>
              <div className="userEmail d-flex flex-column my-3 mx-3">
                <h5>User Email </h5>
                <h5 className="text-muted">{User.email} </h5>
                <hr />
              </div>
              <div className="userEmail d-flex flex-column my-3 mx-3">
                <h5>Login Time </h5>
                <h5 className="text-muted">{User.timeStamp} </h5>
                <hr />
              </div>
              <button
                  onClick={handleLogoutAcc}
                  className="btn btn-outline-warning mx-3"
                >
                  Logout
              </button>
          </div>
          <div className="dropdown mt-3"></div>
        </div>
      </div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary "
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            NoteScript - Cloud Notes
          </Link>
          <button
          //eslint-disable-next-line
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>
            {localStorage.getItem("token") ? (
              <div>
                <div class="image-container">
                  <i
                    className="mx-3 fa-regular fa-circle-user fa-2xl userAccount"
                    onClick={handleClick}
                    style={{ color: "#ffffff" }}
                  ></i>
                  <span className="image-name">User Account</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-warning"
                >
                  Logout
                </button>
              </div>
            ) : (
              //eslint-disable-next-line
              <form className="d-flex" role="login-signup">
                <Link
                  className="btn btn-outline-warning mx-3"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-outline-warning"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </form>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

// useLocation is used when we are using react router dom
