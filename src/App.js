import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Tv from "./components/TV/Tv";
import Search from "./components/Search/Search";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Banner />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/tv">
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
