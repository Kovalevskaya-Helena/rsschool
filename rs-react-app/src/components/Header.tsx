import React, { Component } from 'react';
import { Search } from './Search';

export class Header extends Component {
  render() {
    return (
      <div>
        <header>Search app</header>
        <Search />
      </div>
    );
  }
}
