import React from "react";
import "./Track.css";

export default function Track({ track, isRemoval, onAdd, onRemove }) {
  const renderAction = () => {
    return isRemoval ? (
      <button className="Track-action" onClick={() => onRemove(track)}>
        -
      </button>
    ) : (
      <button className="Track-action" onClick={() => onAdd(track)}>
        +
      </button>
    );
  };
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      {renderAction()}
    </div>
  );
}
