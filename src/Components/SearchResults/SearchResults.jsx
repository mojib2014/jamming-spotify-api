import React, { Component } from "react";
import TrackList from "../TrackList/TrackList";
import "./SearchResults.css";

export default class SearchResults extends Component {
  render() {
    const { searchResults, onAdd } = this.props;
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
      </div>
    );
  }
}
