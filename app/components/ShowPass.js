import React, { Component } from "react";

export default class ShowPass extends Component {
  constructor() {
    super();
    this.state = {
      web: this.props.web,
      user: this.props.user,
      password: this.props.password,
      email: this.props.email,
      clave: this.props.clave,
      observations: this.props.observations,
      _id: this.props._id,
    };
  }

  render() {
    return (
      <div className="container p-4">
        <div className="card grey lighten-1 p-4">
          <h3>Show a pass</h3>
          {/*Comments*/}
        </div>

        <div className="card grey lighten-2 p-4">
          <table className="table centered table-large table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Web</th>
                <th scope="col">User</th>
                <th scope="col">this.stateword</th>
                <th scope="col">Email</th>
                <th scope="col">Claves</th>
                <th scope="col">Observations</th>
              </tr>
            </thead>
            <tbody>
              <tr key={this.state._id}>
                <td>{this.state.web}</td>
                <td>{this.state.user}</td>
                <td>{this.state.password}</td>
                <td>{this.state.email}</td>
                <td>{this.state.clave}</td>
                <td>{this.state.observations}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
