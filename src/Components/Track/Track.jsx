import React, { Component } from "react";
import "./Track.css";

export default class Track extends Component {
  renderAction = () => {
    const { isRemoval } = this.props;
    return isRemoval ? (
      <button className="Track-action" onClick={this.removeTrack}>
        -
      </button>
    ) : (
      <button className="Track-action" onClick={this.addTrack}>
        +
      </button>
    );
  };

  addTrack = () => {
    this.props.onAdd(this.props.track);
  };

  removeTrack = () => {
    this.props.onRemove(this.props.track);
  };

  render() {
    const { track } = this.props;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{track.name}</h3>
          <p>
            {track.artist} | {track.album}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
