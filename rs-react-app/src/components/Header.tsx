import React, { Component } from 'react';
import { Search } from './Search';
import './header.css';

export class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <header className="header">Search app</header>
        <Search
          searchText={this.props.searchText}
          onChangeText={this.props.onChangeText}
        />
      </div>
    );
  }
}
