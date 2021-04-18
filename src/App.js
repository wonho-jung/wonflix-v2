import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Tv from "./components/TV/Tv";
import Search from "./components/Search/Search";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import "./api";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Banner />

            <Home />
          </Route>

          <Route path="/tv">
            <Banner />

            <Tv />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
