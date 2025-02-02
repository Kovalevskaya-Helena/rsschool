import React, { Component } from 'react';
import './search.css';

export class Search extends Component {
  render() {
    return (
      <div className="search-container">
        <input className="search-input" placeholder="search something..." />
        <button className="search-button" type="button">
          Search
        </button>
      </div>
    );
  }
}
