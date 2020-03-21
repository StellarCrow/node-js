import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

import Home from "./views/Home";
import Profile from "./views/Profile";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <h1>Notes</h1>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
