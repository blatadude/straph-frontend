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
        cardDivCol: 'col-12'
      })
    }
  };
  queryUpdate = (e) => {
    this.setState({value: e.target.value})
  };

  renderTrack = () => {
    if (this.state.tracks) {
    return this.state.tracks.map(track => {
      let artists = track.artists.map(artist => artist.name).join(', ')
      return <Track
      id = {track.id} 
      title={track.name} 
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
    let trackName = el.dataset.title;
    let trackId = el.dataset.id
    console.log({
      "trackName": trackName, 
      "id": trackId});
    const arrayCopy = this.state.selectedTracks.slice();
    const idCopy = arrayCopy.map(track => track.id)
    // get index of id if in selectedTracks - roundabout way
    const trackIndex = idCopy.indexOf(trackId);
    // console.log(trackIndex)
    // If in array, remove at index of id, not ideal, but works
    if (trackIndex !== -1) {
      arrayCopy.splice(trackIndex, 1)
      console.log(arrayCopy)
    } 
    // if 5 tracks selected, return error somehow
    else if (this.state.selectedTracks.length === 5) {
      this.setState({
        warningShow: true,
      })
      return
    }
    // else, push
    else {
      arrayCopy.push({id: trackId, title: trackName});
      console.log(arrayCopy)
      // console.log(arrayCopy)
    }
    
    this.setState({
      selectedTracks: arrayCopy,
        sidebarShowing: true,
        cardDivCol: "col-8"
      })
    // update state. ughhh, use redux
  };
  showSidebar = () => {
    let trackListing = this.state.selectedTracks.map(track => {
      console.log(track)
      return <List name={track.title} key={track.id}/>
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
