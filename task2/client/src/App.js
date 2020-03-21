import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Home from "./views/Home";
import Profile from "./views/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Notes</h1>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
