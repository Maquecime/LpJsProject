import React from 'react';
import {Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default class Add extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {
      return (
          <Col md={6} className="justify-content-around offset-3">
            <h1>Add</h1>
                <Form onSubmit={this.props.submit}>
                    <Row>
                        <Col>
                            <Form.Control required name="name" type="text" placeholder="Enter name of Rocket"/>
                        </Col>
                        <Col>
                            <Form.Control required name="country" type="text" placeholder="Enter country of Rocket"/>
                        </Col>
                        <Col>
                            <Form.Control required name="takeoffthrust" type="text" placeholder="Enter take off thrust"/>
                        </Col>
                        <Col md={1}>
                            <Button type="submit">Add</Button>
                        </Col>
                    </Row>
                </Form>
        </Col>
      );
    }
}