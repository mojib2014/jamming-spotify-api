import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
// import Spotify from "../../util/Spotify";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import PlayList from "../PlayList/PlayList";
import Spotify from "../../services/spotifyService";
import "./App.css";

class App extends Component {
  state = {
    searchTerm: "",
    playlistTracks: [],
    searchResults: [],
  };

  search = async (searchTerm) => {
    if (searchTerm) {
      const res = await Spotify.search(searchTerm);
      this.setState({ searchResults: res });
    }
  };

  addTrack = (track) => {
    const playlistTracks = [...this.state.playlistTracks];
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) return;
    playlistTracks.push(track);
    this.setState({ playlistTracks });
  };

  removeTrack = (track) => {
    const playlistTracks = [...this.state.playlistTracks];
    playlistTracks.filter((t) => t.id !== track.id);
    this.setState({ playlistTracks });
  };

  savePlaylist = async (name) => {
    const uris = this.state.playlistTracks.map((track) => track.uri);
    await Spotify.savePlaylist(name, uris);
    this.setState({ playlistName: "New Playlist", playlistTracks: [] });
  };

  render() {
    return (
      <>
        <Navbar />
        <main className="App">
          <div className="content">
            <SearchBar onSubmit={this.search} />
            <div className="App-playlist">
              <SearchResults
                searchResults={this.state.searchResults}
                onAdd={this.addTrack}
              />
              <PlayList
                playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onSave={this.savePlaylist}
              />
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default App;
