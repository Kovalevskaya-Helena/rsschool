import { Component } from 'react';
import { Search } from '../Search';
import './header.css';

export interface HeaderProps {
  searchText: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}
export class Header extends Component<HeaderProps> {
  render() {
    return (
      <div className="header-container">
        <header className="header">Search app</header>
        <Search
          searchText={this.props.searchText}
          onChangeText={this.props.onChangeText}
          onSearch={this.props.onSearch}
        />
      </div>
    );
  }
}
