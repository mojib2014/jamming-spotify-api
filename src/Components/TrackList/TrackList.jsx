import React, { Component } from "react";
import Track from "../Track/Track";
import "./TrackList.css";

export default class TrackList extends Component {
  render() {
    const { tracks, onRemove, onAdd, isRemoval } = this.props;
    return (
      <div className="TrackList">
        {tracks &&
          tracks.map((track) => (
            <Track
              key={track.id}
              track={track}
              onAdd={onAdd}
              onRemove={onRemove}
              isRemoval={isRemoval}
            />
          ))}
      </div>
    );
  }
}
