import React, { Component } from 'react'

class Track extends Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        return (
            <div className="card col-12 border border-color-primary col-md-2" data-id={this.props.id}>
              <img className="card-img-top" src={this.props.img} alt="Card cap"/>
              <div className="card-body col-12">
                <h6 className="card-title">{this.props.title} by {this.props.artists}</h6>
                <a className="btn btn-primary justify-content-around" href={this.props.albumUrl} >Album Page</a>
              </div>
            </div>
        )
    }
}

export default Track