import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePass extends Component {
  constructor() {
    super();
    this.state = {
      web: '',
      user: '',
      password: '',
      email: '',
      clave: '',
      observations: '',
      passes: [],
      _id: '',
      editing: false,
    };
    this.addPass = this.addPass.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get("http://localhost:4000/api/functions/");
    this.setState({ passes: res.data });
    console.log(this.props.match.params.id);
    if (this.props.match.params.id) {
      const res = await axios.get(
        "http://localhost:4000/api/functions/" + this.props.match.params.id
      );
      this.setState({
        web: res.data.web,
        user: res.data.user,
        password: res.data.password,
        email: res.data.email,
        clave: res.data.clave,
        observations: res.data.observations,
        editing: true,
        _id: this.props.match.params.id,
      });
    }
  }

  async addPass(e) {
    e.preventDefault();
    const newPass = {
      web: this.state.web,
      user: this.state.user,
      password: this.state.password,
      email: this.state.email,
      clave: this.state.clave,
      observations: this.state.observations,
    };
    if (this.state.editing) {
      await axios.put(
        "http://localhost:4000/api/functions/" + this.state._id,
        newPass
      );
     //M.toast({html: 'Pass edited'});
    } else {
      await axios.post("http://localhost:4000/api/functions", newPass);
      this.setState({
        web: "",
        user: "",
        password: "",
        email: "",
        clave: "",
        observations: "",
      });
      //M.toast({html: 'Pass added'});
    }
    window.location.href = "/";
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="container p-4">
        <div className="card cyan lighten-4 p-4">
          <h3>Create a new pass</h3>
          {/*Comments*/}
        </div>

        <div className="card p-4">
          <form className="form-group" onSubmit={this.addPass}>
            <div className="row p-1">
              <input
                name="web"
                onChange={this.handleChange}
                type="text"
                placeholder="web"
                value={this.state.web}
              ></input>
            </div>

            <div className="row p-1">
              <input
                name="user"
                onChange={this.handleChange}
                type="text"
                placeholder="user"
                value={this.state.user}
              ></input>
            </div>
            <div className="row p-1">
              <input
                name="password"
                onChange={this.handleChange}
                type="text"
                placeholder="password"
                value={this.state.password}
              ></input>
            </div>
            <div className="row p-1">
              <input
                name="email"
                onChange={this.handleChange}
                type="text"
                placeholder="email"
                value={this.state.email}
              ></input>
            </div>
            <div className="row p-1">
              <input
                name="clave"
                onChange={this.handleChange}
                type="text"
                placeholder="clave"
                value={this.state.clave}
              ></input>
            </div>
            <div className="row p-1">
              <textarea
                name="observations"
                onChange={this.handleChange}
                className="materialize-textarea"
                placeholder="observations"
                value={this.state.observations}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}