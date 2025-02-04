import React, { Component } from 'react';
import './search.css';

export class Search extends Component {
  render() {
    return (
      <div className="search-container">
        <input
          className="search-input"
          placeholder={'search something...'}
          value={this.props.searchText}
          onChange={(event) => this.props.onChangeText(event.target.value)}
        />
        <button
          className="search-button"
          type="button"
          onClick={() => this.props.onSearch()}
        >
          Search
        </button>
      </div>
    );
  }
}
