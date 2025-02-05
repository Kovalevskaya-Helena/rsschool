import { Component } from 'react';
import './search.css';

interface SearchProps {
  searchText: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}

export class Search extends Component<SearchProps> {
  render() {
    return (
      <div className="search-container">
        <input
          className="search-input"
          placeholder={'search Star Wars...'}
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
