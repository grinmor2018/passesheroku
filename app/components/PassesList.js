import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import showPass from "./ShowPass";

export default class PassesList extends Component {
  constructor() {
    super();
    this.state = {
      passes: [],
      filterText: "",
    };
    this.filterUpdate = this.filterUpdate.bind(this);
    this.showPass = this.showPass.bind(this);
  }

  componentDidMount() {
    this.getPasses();
  }

  async getPasses() {
    const res = await axios.get("http://localhost:4000/api/functions");
    this.setState({ passes: res.data });
  }

  async deletePass(id) {
    console.log(id);
    await axios.delete("http://localhost:4000/api/functions/" + id);
    this.getPasses();
  }

  filterUpdate(e) {
    this.setState({
      filterText: e.target.value,
    });
  }

  show(pass){
    this.showPass(pass);
  }

  render() {
    return (
      <div className="container p-4">
        <div className="card grey lighten-1 p-4">
          <h3>Passes list</h3>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={this.filterUpdate}
            />
          </form>
        </div>

        <div className="card grey lighten-2 p-4">
          <table className="table centered table-sm table-bordered table-hover">
            <thead>
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
              {this.state.passes
                .filter((name) => {
                  return (
                    name.web
                      .toLowerCase()
                      .indexOf(this.state.filterText.toLowerCase()) >= 0
                  );
                })
                .map((pass) => {
                  return (
                    <tr key={pass._id} onDoubleClick={() => this.show(pass)}>
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
