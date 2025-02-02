import React, { Component } from 'react';
import { Search } from './Search';
import './header.css';

export class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <header className="header">Search app</header>
        <div>
          УВАЖАЕМЫЙ ПРОВЕРЯЮЩИЙ,ОЧЕНЬ ПРОШУ ПРОВЕРИТЬ МОЮ РАБОТУ ВО ВТОРНИК
          (04.02.2025) ВЕЧЕРОМ ИЛИ В СРЕДУ(05.02.2025) К СОЖАЛЕНИЮ,НЕ ХВАТИЛО
          ВРЕМЕНИ! БУДУ ОЧЕНЬ БЛАГОДАРНА!
          <br />
          DEAR EXAMINER, I REALLY ASK YOU TO CHECK MY WORK ON TUESDAY
          (04.02.2025) EVENING OR WEDNESDAY (05.02.2025) UNFORTUNATELY, WE DID
          NOT ENOUGH TIME! I WOULD BE VERY GRATEFUL!
        </div>
        <Search
          searchText={this.props.searchText}
          onChangeText={this.props.onChangeText}
        />
      </div>
    );
  }
}
