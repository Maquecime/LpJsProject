import React from 'react';

import {
    Link
  } from "react-router-dom";

export default class List extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {
      return (
        <div>
          <h1>List</h1>
          <ul>
            { this.props.list.map((element, index) => {           
                return <li key={ element.id }>
                        Nom rocket: {element.name} Pays: {element.country} Décollage: {element.takeOffThrust}
                        <button className="btn btn-danger ml-2" onClick={() => this.props.deleteRocket(element.id) }>x</button>
                        </li>
                })                    
            }           
          </ul>
          <Link to="/add">Add</Link>
        </div>
      );
    }
}