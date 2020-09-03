import React, { Component } from "react";
import axios from "axios";

export default class CreatePass extends Component {
  constructor() {
    super();
    this.state = {
      web: "",
      user: "",
      password: "",
      email: "",
      clave: "",
      observations: "",
      passes: [],
      _id: "",
      editing: false,
    };
    this.addPass = this.addPass.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get("/api/functions/");
    this.setState({ passes: res.data });
    console.log(this.props.match.params.id);
    if (this.props.match.params.id) {
      const res = await axios.get(
        "/api/functions/" + this.props.match.params.id
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
        "/api/functions/" + this.state._id,
        newPass
      );
      M.toast({ html: "Pass edited" });
    } else {
      await axios.post("/api/functions", newPass);
      this.setState({
        web: "",
        user: "",
        password: "",
        email: "",
        clave: "",
        observations: "",
      });
      M.toast({ html: "Pass added" });
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
        <div className="card grey lighten-1 p-4">
          <h3>Create a new pass</h3>
          {/*Comments*/}
        </div>

        <div className="card grey lighten-2 p-4">
          <form className="col 12" onSubmit={this.addPass}>
            <div className="row">
              <div class="input-field col s12">
                <input
                  className="autocomplete"
                  name="web"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="web"
                  value={this.state.web}
                ></input>
                <label for="web">Web</label>
              </div>
            </div>

            <div className="row">
              <div class="input-field col s6">
                <input
                  className="autocomplete"
                  name="user"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="user"
                  value={this.state.user}
                ></input>
                <label for="user">User</label>
              </div>

              <div className="input-field col s6">
                <input
                  className="autocomplete"
                  name="password"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="password"
                  value={this.state.password}
                ></input>
                <label for="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div class="input-field col s12">
                <input
                  name="email"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="email"
                  value={this.state.email}
                ></input>
                <label for="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div class="input-field col s12">
                <input
                  name="clave"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="clave"
                  value={this.state.clave}
                ></input>
                <label for="clave">Clave</label>
              </div>
            </div>
            <div className="row">
              <div class="input-field col s12">
                <textarea
                  name="observations"
                  onChange={this.handleChange}
                  className="materialize-textarea"
                  placeholder="observations"
                  value={this.state.observations}
                ></textarea>
                <label for="observations">Observations</label>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-1">
                <a
                  onClick={this.addPass}
                  className="btn-floating btn-large waves-effect waves-light blue"
                >
                  <i className="material-icons">send</i>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
