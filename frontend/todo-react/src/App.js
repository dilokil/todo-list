import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import AuthService from "./services/AuthService";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Dilokil WebApp
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  HomePage
                </Link>
              </li>

              {showModeratorBoard && (
                  <li className="nav-item">
                    <Link to={"/mod"} className="nav-link">
                      Moderator Board
                    </Link>
                  </li>
              )}

              {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      Admin Board
                    </Link>
                  </li>
              )}

              {currentUser && (
                  <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                      TodoList
                    </Link>
                  </li>
              )}
            </div>

            {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
            ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      LoginPage
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
            )}
          </nav>

          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/user" element={<BoardUser />} />
              <Route path="/mod" element={<BoardModerator />} />
              <Route path="/admin" element={<BoardAdmin />} />
            </Routes>
          </div>

          {/* <AuthVerify logOut={this.logOut}/> */}
        </div>
    );
  }
}

export default App;