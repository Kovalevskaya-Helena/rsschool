import { Component } from 'react';
import './spinner.css';

export class Spinner extends Component {
  render() {
    return (
      <div className="lds-css">
        <div className="lds-double-ring">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
