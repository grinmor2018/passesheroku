import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class PassesList extends Component {
  constructor() {
    super();
    this.state = {
      passes: [],
      filterText: "",
      web: "",
      user: "",
      password: "",
      email: "",
      clave: "",
      observations: "",
      _id: "",
      showing: false,
      pass2show: [],
    };
    this.filterUpdate = this.filterUpdate.bind(this);
  }

  componentDidMount() {
    this.getPasses();
  }

  async getPasses() {
    const res = await axios.get("/api/functions");
    this.setState({ passes: res.data });
  }

  async deletePass(id) {
    if (confirm("Are you sure to delete it?")) {
      await axios.delete("/api/functions/" + id);
      this.getPasses();
    }
  }

  filterUpdate(e) {
    this.setState({
      filterText: e.target.value,
    });
  }

  render() {
    if (this.state.showing) {
      {
        /*Show one pass*/
      }
      return (
        <div className="container p-4">
          <div className="card grey lighten-1 p-4">
            <h3>Show a pass</h3>
          </div>

          <div className="card grey lighten-2 p-4">
            <div className="row">
              <table className="table centered table-large table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Web</th>
                    <th scope="col">User</th>
                    <th scope="col">Password</th>
                    <th scope="col">Email</th>
                    <th scope="col">Claves</th>
                    <th scope="col">Observations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    key={this.state.pass2show._id}
                    onDoubleClick={() => {
                      (this.state.showing = false),
                        (this.state.pass2show = []),
                        this.forceUpdate();
                    }}
                  >
                    <td className="h3">{this.state.pass2show.web}</td>
                    <td className="h3">{this.state.pass2show.user}</td>
                    <td className="h3">{this.state.pass2show.password}</td>
                    <td className="h3">{this.state.pass2show.email}</td>
                    <td className="h3">{this.state.pass2show.clave}</td>
                    <td className="h3">{this.state.pass2show.observations}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row justify-content-center">
              <div className="col-1">
                <a
                  onClick={() => {
                    (this.state.showing = false),
                      (this.state.pass2show = []),
                      this.forceUpdate();
                  }}
                  className="btn-floating btn-large waves-effect waves-light blue"
                >
                  <i className="material-icons">arrow_back</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      {
        /*Show all*/
      }
      return (
        <div className="container p-4">
          <div className="card grey lighten-1 p-4">
            <h3>Passes list</h3>
            <form action="#">
              <p>
                <label>
                  <input name="group1" type="radio" checked />
                  <span>Web</span>
                </label>
              </p>
              <p>
                <label>
                  <input name="group1" type="radio" />
                  <span>User</span>
                </label>
              </p>
              <p>
                <label>
                  <input class="with-gap" name="group1" type="radio" />
                  <span>Gmail</span>
                </label>
              </p>
            </form>

            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="colSearch"
                id="colSearch1"
                value="web"
                checked
              />
              <label class="form-check-label" for="colSearch1">
                Web
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="colSearch"
                id="colSearch2"
                value="user"
              />
              <label className="form-check-label" for="colSearch2">
                User
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="colSearch"
                id="colSearch3"
                value="email"
              />
              <label className="form-check-label" for="colSearch3">
                Email
              </label>
            </div>

            <div className="row">
              <div className="col-12">
                <input
                  className="form-control"
                  name="search"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={this.filterUpdate}
                />
              </div>
            </div>
          </div>

          <div className="card grey lighten-2 p-4">
            <table className="table centered table-sm table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Web</th>
                  <th scope="col">User</th>
                  <th scope="col">Password</th>
                  <th scope="col">Email</th>
                  <th scope="col">Claves</th>
                  <th scope="col">Observations</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.passes
                  .filter((name) => {
                    return (
                      name.web
                        .toLowerCase()
                        .indexOf(this.state.filterText.toLowerCase()) >= 0
                    );
                  })
                  .sort((a, b) => a.web > b.web)
                  .map((pass) => {
                    return (
                      <tr
                        key={pass._id}
                        onDoubleClick={() => {
                          (this.state.showing = true),
                            (this.state.pass2show = pass),
                            this.forceUpdate();
                        }}
                      >
                        <td>{pass.web}</td>
                        <td>{pass.user}</td>
                        <td>{pass.password}</td>
                        <td>{pass.email}</td>
                        <td>{pass.clave}</td>
                        <td>{pass.observations}</td>
                        <td>
                          <Link to={"/edit/" + pass._id}>
                            <a class="btn-floating btn-small waves-effect waves-light green">
                              <i className="material-icons">edit</i>
                            </a>
                          </Link>

                          <a
                            className="btn-floating btn-small waves-effect waves-light red"
                            onClick={() => this.deletePass(pass._id)}
                          >
                            <i className="material-icons">delete</i>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default PassesList;
