import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import PassesList from "./components/PassesList";
import CreatePass from "./components/CreatePass";

class App extends Component {
  render() {
    return (
      <Router>
        <Navigation />
        <Route path="/" exact component={PassesList} />
        <Route path="/edit/:id" component={CreatePass} />
        <Route path="/createPass" component={CreatePass} />
      </Router>
    );
  }
}

export default App;
