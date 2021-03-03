import React, { Component } from "react";
import Spotify from "../../services/spotifyService";
import PlaylistListItem from "../PlaylistListItem/PlaylistListItem";
import "./playlistList.css";

export default class PlaylistList extends Component {
  state = {
    playlistList: [],
  };

  async componentDidMount() {
    const playlists = await Spotify.getUserPlaylists();
    this.setState({ playlistList: playlists });
  }

  render() {
    const { playlistList } = this.state;
    const { selectPlaylist } = this.props;
    return (
      <section className="PlaylistList">
        <h2>Local Playlists</h2>
        {playlistList &&
          playlistList.map((playlist) => (
            <PlaylistListItem
              key={playlist.id}
              playlist={playlist}
              selectPlaylist={selectPlaylist}
            />
          ))}
      </section>
    );
  }
}
