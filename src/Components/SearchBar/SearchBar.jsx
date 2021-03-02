import Joi from "joi-browser";
import React from "react";
import Form from "../../common/Form/Form";
import "./searchBar.css";

export default class SearchBar extends Form {
  state = {
    data: { searchTerm: "" },
    errors: {},
  };

  schema = {
    searchTerm: Joi.string().required().label("Music input"),
  };

  doSubmit = () => {
    this.props.onSubmit(this.state.data.searchTerm);
  };

  render() {
    return (
      <div className="SearchBar">
        {this.renderInput(
          "searchTerm",
          "Search for music/artis",
          "Enter A Song, Album, or Artist",
        )}
        {this.renderButton("search")}
      </div>
    );
  }
}
