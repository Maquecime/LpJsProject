import React from 'react';

export default class Edit extends React.Component {

    constructor(props) {
      super(props);
      console.log(this.props);
      const rocketid = this.props.match.params.rocketId;
      const updated = this.props.list.find(rocket => rocket.id === rocketid);
      this.state={updated:updated, rocketId: rocketid};
      console.log(this.state.updated);    

    }


    render() {

      return (
        <div>
          <h1>Edit</h1>
          <form onSubmit={this.props.updateRocket}>
              <input name="id" type="text" defaultValue={this.state.rocketId}/>
              <input name="name" type="text" placeholder="Enter name of Rocket" defaultValue={this.state.updated.name}/>
              <input name="country" type="text" placeholder="Enter country" defaultValue={this.state.updated.country}/>
              <input name="takeOffThrust" type="text" placeholder="Enter take of thrust" defaultValue={this.state.updated.takeOffThrust}/>
              <button type="submit">Send</button>
          </form>
        </div>
      );
    }
}