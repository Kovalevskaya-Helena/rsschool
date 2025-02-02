import React, { Component } from 'react';
import './search.css';

export class Search extends Component {
  state = { value: '' };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    console.log(this.state.value);
  };
  render() {
    return (
      <div className="search-container">
        <input
          className="search-input"
          placeholder="search something..."
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button className="search-button" type="button">
          Search
        </button>
      </div>
    );
  }
}
