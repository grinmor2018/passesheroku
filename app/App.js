import React, { Component } from 'react';
import {BrowserRouter as Router , Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import PassesList from './components/PassesList';
import CreatePass from './components/CreatePass';
import ShowPass from './components/ShowPass';

class App extends Component {
  render(){
    return (
      <Router>
        <Navigation/>
        <Route path="/" exact component={PassesList} />
        <Route path="/edit/:id" component={CreatePass} />
        <Route path="/createPass" component={CreatePass} />
        <Route path="/showPass" component={ShowPass} />
      </Router>
    );
  }
  
};

export default App;