import React, { Component } from "react";

import List from './List';
import Add from './Add';
import uuid from 'uuidv4';

import {
  Router,
  Switch,
  Route
} from "react-router-dom";


import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default class App extends Component  {

    constructor(props) {
        super(props)
        this.state = { list: [] }
        this.submit = this.submit.bind(this)
        this.deleteRocket = this.deleteRocket.bind(this)
    }

    componentDidMount() {
        console.log('aaaaa');
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
            prevState.list = [...prevState.list, {id: uuid.uuid(), name: data.get('name'), country: data.get('country'), takeOffThrust: data.get('takeOffThrust')}];
            return prevState
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
                </Switch>
            </Router>
        )
    }
}