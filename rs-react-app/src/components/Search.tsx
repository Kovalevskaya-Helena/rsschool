import React, { Component } from 'react';
import './search.css';

export class Search extends Component {
  onClick = () => {
    const text = this.props.searchText;
    localStorage.setItem('label', text.trim());
  };
  render() {
    return (
      <div className="search-container">
        <input
          className="search-input"
          placeholder={'search something...'}
          value={this.props.searchText}
          onChange={() => this.props.onChangeText(event)}
        />
        <button className="search-button" type="button" onClick={this.onClick}>
          Search
        </button>
      </div>
    );
  }
}
