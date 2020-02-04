import React from 'react';
import {Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default class Edit extends React.Component {

    constructor(props) {
      super(props);
      const rocketid = this.props.match.params.rocketId;
      const updated = this.props.list.find(rocket => rocket.id === rocketid);
      this.state={updated:updated, rocketId: rocketid};

    }


    render() {

      return (
        <Col md={6} className="justify-content-around offset-3">
          <h1>Edit</h1>
              {/*<form onSubmit={(event) => this.props.updateRocket(event, this.state.rocketId)}>*/}
              {/*    <input name="name" type="text" placeholder="Enter name of Rocket" defaultValue={this.state.updated.name}/>*/}
              {/*    <input name="country" type="text" placeholder="Enter country" defaultValue={this.state.updated.country}/>*/}
              {/*    <input name="takeOffThrust" type="text" placeholder="Enter take of thrust" defaultValue={this.state.updated.takeOffThrust}/>*/}
              {/*    <button type="submit">Send</button>*/}
              {/*</form>*/}
            <Form onSubmit={(event) => this.props.updateRocket(event, this.state.rocketId)}>
                <Row>
                    <Col>
                        <Form.Control required name="name" type="text" placeholder="Enter name of Rocket" defaultValue={this.state.updated.name} />
                    </Col>
                    <Col>
                        <Form.Control required name="country" type="text" placeholder="Enter country of Rocket" defaultValue={this.state.updated.country} />
                    </Col>
                    <Col>
                        <Form.Control required name="takeOffThrust" type="text" placeholder="Enter take off thrust" defaultValue={this.state.updated.takeOffThrust}/>
                    </Col>
                    <Col md={1}>
                        <Button type="submit">Submit</Button>
                    </Col>
                </Row>
            </Form>
        </Col>
      );
    }
}