import React, { Component } from "react";
import "./PlaylistListItem.css";

export default class PlaylistListItem extends Component {
  state = {
    selected: false,
  };
  handleSelect = () => {
    this.setState({ selected: !this.state.selected });
    this.props.selectPlaylist(this.props.playlist.id);
  };

  render() {
    const { playlist } = this.props;
    return (
      <div
        className={
          this.state.selected ? "playlistListItem active" : "playlistListItem"
        }
        onClick={this.handleSelect}
      >
        <p>{playlist.name}</p>
      </div>
    );
  }
}
