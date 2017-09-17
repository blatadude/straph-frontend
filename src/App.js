import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:'',
      tracks: []
    }
  }

  fetchSearch() {
    fetch('localhost:4200/search?query=' + this.state.value).then(data => {
      this.setState({tracks: data.tracks})
    })
  }
  handleChange() {
    this.setState({value: event.target.value})
  }
  render() {
    return (
    <div className="container-fluid mt-2">
      <div className="row mb-2">
        <div className="input-group col-10">
          <input className="form-control" type="text" placeholder="Search!" value={this.state.value} onSubmit={this.fetchSearch}/>
          <span className="input-group-button">
            <button className="btn btn-secondary" type="button" onClick={this.handlefetchSearch}>Search</button>
          </span>
        </div>
      </div>
      <div className="col-10 d-flex justify-content-around flex-wrap">
        <div className="card mb-2"><img className="card-img-top" src="https://i.scdn.co/image/51a6c30ca17ac55f5cca5261de9fecba05cf2986" alt="Card image cap"/>
          <div className="card-body">
            <h6 className="card-title">Pretty Rave Girl 2010</h6><a className="btn btn-primary" href="#">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
