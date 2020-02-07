import React, { Component } from "react";

import List from './List';
import Add from './Add';
import Edit from './Edit';
const uuid = require('uuidv4');
import 'bootstrap/dist/css/bootstrap.min.css';


import {
  Router,
  Switch,
  Route
} from "react-router-dom";


import { createBrowserHistory } from 'history';
import Client from '../client/lib/client.js';

const client = Client("localhost",8080);

const history = createBrowserHistory();

export default class App extends Component  {

    constructor(props) {
        super(props);
        this.state = { list: [] };
        this.submit = this.submit.bind(this);
        this.update = this.update.bind(this);
        this.deleteRocket = this.deleteRocket.bind(this);
    }

    componentDidMount() {
        client.findAll()
          .then(
              res =>{
                  this.setState({list: res})
              });
      }

    submit(event) {
        const data = new FormData(event.target);
        event.preventDefault();
        history.push("/");
        const newRocket = {name: data.get("name"), country: data.get("country"), takeOffThrust: data.get("takeOffThrust")};
        let newId;
        client.add(newRocket).then(res =>{
            newId = res.id;
        });
        this.setState((prevState, props) => {
            prevState.list = [...prevState.list, {id: newId, ...newRocket}];
            return prevState
        })
    }

    update(event, id){
        const data = new FormData(event.target);
        event.preventDefault();
        history.push("/");
        const objIndex = this.state.list.findIndex((rocket => rocket.id === id));
        const rocketUpdated = {name: data.get("name"), country: data.get("country"), takeOffThrust: data.get("takeOffThrust")};
/*        fetch(`http://localhost:8080/api/rockets/${id}`, {
            method:"put",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(rocketUpdated)
        });*/

        this.setState((prevState, props) => {
            prevState.list[objIndex] = rocketUpdated;
            return prevState;
        })
    }

    deleteRocket(id) {
/*        fetch(`http://localhost:8080/api/rockets/${id}`, {
            method: "delete"
        });*/
        const list = this.state.list.filter( item => item.id !== id );
        this.setState({list: list});
      }

    render () {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/add">
                        <Add submit={this.submit} />
                    </Route>
                    <Route exact path="/">
                        <List list={ this.state.list } deleteRocket={this.deleteRocket}/>
                    </Route>
                    <Route
                        path="/edit/:rocketId"
                        render={({ match }) => <Edit match={match} list={this.state.list} updateRocket={this.update} />}
                        />
                </Switch>
            </Router>
        )
    }
}