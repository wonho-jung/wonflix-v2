import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Tv from "./components/TV/Tv";
import Search from "./components/Search/Search";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import "./api";
import Detail from "./components/Detail/Detail";
import Login from "./components/Login/Login";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import Profile from "./components/Profile/Profile";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Switch>
            <Route path="/profile">
              <Header />
              <Profile />
            </Route>
            <Route path="/" exact>
              <Header />

              <Banner />
              <Home />
            </Route>

            <Route path="/tv">
              <Header />

              <Banner />
              <Tv />
            </Route>
            <Route path="/search">
              <Header />

              <Search />
            </Route>
            <Route path="/movie/:id">
              <Header />

              <Detail />
            </Route>
            <Route path="/show/:id">
              <Header />

              <Detail />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
