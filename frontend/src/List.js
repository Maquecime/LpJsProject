import React from 'react';

import {
    Link
  } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

export default class List extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {
      return (
        <Col md={8} className="offset-2">
          <h1 className="text-center">List</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Take Off Thrust</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                { this.props.list.map((element, index) => {
                    return (
                        <tr>
                            <td>{element.name}</td>
                            <td>{element.country}</td>
                            <td>{element.takeOffThrust}</td>
                            <td>
                                <Link className="btn btn-primary" to={`/edit/${element.id}`} >Edit</Link>
                                <button className="btn btn-danger ml-2" onClick={() => this.props.deleteRocket(element.id) }>x</button>
                            </td>
                        </tr>
                    )
                    })
                }
                </tbody>
                </Table>
          <Link to="/add">Add</Link>
        </Col>
      );
    }
}