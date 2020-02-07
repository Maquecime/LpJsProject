import React from 'react';

import {
    Link
  } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";

export default class List extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {
      return (
        <Col md={8} className="offset-2">
            <Row className="flex-row">
            <h1 className="text-center flex-grow-1">List</h1>
            <Link className="btn btn btn-outline-dark align-self-center" to="/add">+</Link>

            </Row>
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
                            <td>{element.takeoffthrust}</td>
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

        </Col>
      );
    }
}