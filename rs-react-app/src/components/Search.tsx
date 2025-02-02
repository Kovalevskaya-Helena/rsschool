import React, { Component } from 'react';

export class Search extends Component {
  render() {
    return (
      <div>
        <input placeholder="search something..." />
        <button type="button">Search</button>
      </div>
    );
  }
}
