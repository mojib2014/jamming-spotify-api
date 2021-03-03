import React from "react";
import Track from "../Track/Track";
import "./TrackList.css";

export default function TrackList({ tracks, onAdd, onRemove, isRemoval }) {
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
