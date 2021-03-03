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

  componentDidMount() {
    const { playlistName } = this.props;
    if (playlistName) this.setState({ data: { playlistName: playlistName } });
  }

  schema = {
    playlistName: Joi.string().required().label("Playlist Name"),
  };

  doSubmit = () => {
    this.props.onSave(this.state.data.playlistName);
  };

  render() {
    const { playlistTracks, onAdd, onRemove } = this.props;
    return (
      <section className="Playlist">
        {this.renderInput("playlistName", "Playlist Name")}
        <TrackList
          tracks={playlistTracks}
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={true}
        />
        {this.renderButton("SAVE TO SPOTIFY")}
      </section>
    );
  }
}
