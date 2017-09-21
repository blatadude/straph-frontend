import React, { Component } from 'react'

class List extends Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        return (
            <li className="list-group-item">{this.props.name}</li>
        )
    }
}

export default List