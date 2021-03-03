import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import PlayList from "../PlayList/PlayList";
import Spotify from "../../services/spotifyService";
import PlaylistList from "../PlaylistList/PlaylistList";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    searchTerm: "",
    playlistName: "",
    playlistId: null,
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
    console.log(playlistTracks);
    playlistTracks.filter((t) => t.id !== track.id);
    this.setState({ playlistTracks });
  };

  savePlaylist = async (name) => {
    const uris = this.state.playlistTracks.map((track) => track.uri);
    await Spotify.savePlaylist(name, uris, this.state.playlistId);
    this.setState({ playlistName: "", playlistId: null, playlistTracks: [] });
  };

  selectPlaylist = async (id, name) => {
    const playlistTracks = await Spotify.getPlaylist(id);

    this.setState({ playlistTracks, playlistId: id, playlistName: name });
  };

  render() {
    console.log("stat", this.state.playlistTracks);
    return (
      <>
        <Navbar />
        <ToastContainer />
        <main className="App">
          <div className="content">
            <SearchBar onSubmit={this.search} />
            <div className="App-playlist">
              <SearchResults
                searchResults={this.state.searchResults}
                onAdd={this.addTrack}
              />
              <PlaylistList selectPlaylist={this.selectPlaylist} />
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
