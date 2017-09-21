import React, { Component } from 'react';
import Track from './Track'
import List from './List'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:'',
      cardDivCol: 'col-12',
      selectedTracks: [],
      sidebarShowing: false
    }
  }

  handleSubmit = (e) => {
      e.preventDefault();
      this.fetchSearch();
  };

  fetchSearch = () => {
    fetch('http://localhost:4200/search?query=' + this.state.value)
      .then(data => data.json())
      // add to state
      .then(res => {
        this.setState({tracks: res.tracks})
      })    
    // set sidebar hidden if no tracks
    if (this.state.selectedTracks.length >= 1) {
      return;
    } else {
      this.setState({
        sidebarShowing: false,
        cardDivCol: 'col-12',
      })
    }
  };
  queryUpdate = (e) => {
    this.setState({value: e.target.value})
  };

  renderTrack = (tracks) => {
    if (this.state.tracks) {
    return this.state.tracks.map(track => {
      let artists = track.artists.map(artist => artist.name).join(', ')
      return <Track 
      name={track.name} 
      artists={artists} 
      img={track.album.images[1].url} 
      key={track.id} 
      albumUrl={track.album.external_urls.spotify}
      />
      })
    }
    return
  };
  cardClick = (el) => {
    // find card parent element from click
    el = el.target.closest('.card');
    // hacky, but effective way to get card-title
    let trackName = el.lastChild.firstChild.textContent;
    console.log(trackName);
    const arrayCopy = this.state.selectedTracks.slice();
    // gets index of trackName
    const trackIndex = this.state.selectedTracks.indexOf(trackName);
    // If in array, remove
    if (trackIndex !== -1) {
      arrayCopy.splice(trackIndex, 1)
    } 
    // if 5 tracks selected, return error somehow
    else if (this.state.selectedTracks.length === 5) {
      this.setState({
        warningShow: true,
      })
    }
    // else, push
    else {
      arrayCopy.push(trackName);
    }
    
    // update state. ughhh, use redux
    this.setState({
      selectedTracks: arrayCopy,
        sidebarShowing: true,
        cardDivCol: "col-8"
      })
  };
  showSidebar = () => {
    let trackListing = this.state.selectedTracks.map(trackName => {
      return <List name={trackName} key={trackName}/>
    })
    return (
      <ul className="list-group col-4" >
        {trackListing}
      </ul>
    )  
  }

  
  render() {
    return (
    <div className="container-fluid mt-3">
      <div className="row">
        <form onSubmit={this.handleSubmit} className="col-12">
          <div className="input-group mb-3">
            <input className="form-control" type="text" placeholder="Search!" value={this.state.value} onChange={this.queryUpdate}/>
            <span className="input-group-button">
              <button className="btn btn-secondary" type="submit">Search</button>
            </span>
          </div>
        </form>
        
        <div className={`${this.state.cardDivCol} d-flex justify-content-md-around flex-wrap flex-row mb-3`} onClick={this.cardClick}>
          {this.renderTrack()}
        </div>
      {/* sidebar if tracks in array */}
      {this.showSidebar()}
      </div>
    </div>
    );
  }
}

export default App;
