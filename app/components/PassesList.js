import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class PassesList extends Component {
  constructor() {
    super();
    this.state = {
      passes: [],
      filterText: "",
    };
    this.filterUpdate = this.filterUpdate.bind(this);
  }

  componentDidMount() {
    this.getPasses();
  }

  async getPasses() {
    const res = await axios.get("http://localhost:4000/api/functions");
    this.setState({ passes: res.data });
  }

  async deletePass (id) {
    console.log(id);
    await axios.delete("http://localhost:4000/api/functions/" + id);
    this.getPasses();
  };

  filterUpdate (e) {
    this.setState({
      filterText: e.target.value,
    });
  };

  render() {
    return (
      <div className="container p-4">
        <div className="card cyan lighten-4 p-4">
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

        <div className="col-md-12">
          <table className="table table-sm table-bordered table-hover">
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
                    <tr key={pass._id}>
                      <td>{pass.web}</td>
                      <td>{pass.user}</td>
                      <td>{pass.password}</td>
                      <td>{pass.email}</td>
                      <td>{pass.clave}</td>
                      <td>{pass.observations}</td>
                      <td>
                        <Link
                          className="btn btn-success"
                          to={"/edit/" + pass._id}
                        >
                          <i className="material-icons">edit</i>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.deletePass(pass._id)}
                        >
                          <i className="material-icons">delete</i>
                        </button>
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
