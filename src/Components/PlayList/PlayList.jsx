import React from "react";
import Joi from "joi-browser";
import TrackList from "../TrackList/TrackList";
import Form from "../../common/Form/Form";
import "./PlayList.css";

export default class PlayList extends Form {
  state = {
    data: { playlistName: "" },
    errors: {},
  };

  schema = {
    playlistName: Joi.string().required().label("Playlist Name"),
  };

  doSubmit = () => {
    this.props.onSave(this.state.data.playlistName);
  };
  render() {
    const { playlistTracks, onAdd, onRemove } = this.props;
    return (
      <div className="Playlist">
        {this.renderInput("playlistName", "Playlist", "Enter a playlist name")}
        <TrackList
          tracks={playlistTracks}
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={true}
        />
        {this.renderButton("SAVE TO SPOTIFY")}
      </div>
    );
  }
}
