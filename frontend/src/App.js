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
        fetch(`/api/rockets`)
          .then(res => res.json())
          .then(list => {
              this.setState({list: list})
        });
      }

    submit(event) {
        const data = new FormData(event.target);
        event.preventDefault();
        history.push("/");
        this.setState((prevState, props) => {
            prevState.list = [...prevState.list, {id: uuid.uuid(), name: data.get('name'), country: data.get('country'), takeoffthrust: data.get('takeoffthrust')}];
            return prevState
        })
    }

    update(event, id){
        const data = new FormData(event.target);
        event.preventDefault();
        history.push("/");
        const objIndex = this.state.list.findIndex((rocket => rocket.id === id));
        console.log(id);
        console.log(data.get("name"));
        console.log(data.get("country"));
        console.log(data.get("takeoffthrust"));

        this.setState((prevState, props) => {
            prevState.list[objIndex].name = data.get("name");
            prevState.list[objIndex].country = data.get("country");
            prevState.list[objIndex].takeoffthrust = data.get("takeoffthrust");
            return prevState;
        })
    }

    deleteRocket(id) {
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