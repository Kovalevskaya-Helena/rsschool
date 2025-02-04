import { Component } from 'react';
import { List } from './List';
import { Spinner } from './Spinner';
import { Items, LoadStatus } from '../helpers/types';
import './main.css';

export interface MainProps {
  people: Items[];
  loadStatus: LoadStatus;
  errorText: string;
}
export class Main extends Component<MainProps> {
  render() {
    const { loadStatus, people, errorText } = this.props;

    return (
      <div className="main-container">
        <header className="main-header">Results</header>
        <div className="main-box">
          <span className="main-box-label">Name</span>
          <span className="main-box-description">Description</span>
        </div>
        {loadStatus === 'loading' && <Spinner />}
        {loadStatus === 'error' && <span>{errorText}</span>}
        {loadStatus === 'pending' && <span>Use search to find a hero</span>}
        {loadStatus === 'loaded' && people.length === 0 && (
          <span>Nothing was found</span>
        )}
        <List people={people} loadStatus={loadStatus} />
      </div>
    );
  }
}
