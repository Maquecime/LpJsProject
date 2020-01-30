import React from 'react';

export default class Add extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {
      return (
        <div>
          <h1>Add</h1>
          <form onSubmit={this.props.submit}>
              <input name="name" type="text" placeholder="Enter name of Rocket"/>
              <input name="country" type="text" placeholder="Enter country"/>
              <input name="takeOffThrust" type="text" placeholder="Enter take of thrust"/>
              <button type="submit">Send</button>
          </form>
        </div>
      );
    }
}