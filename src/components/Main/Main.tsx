import { List } from '../List';
import { Popup } from '../Popup';
import './main.css';
import { Pagination } from '../Pagination';
//TBD:restructure layoutdue jumping list
export const Main = () => {
  return (
    <div className="main-container">
      <header className="main-header">Results</header>
      <List />
      <Pagination />
      <Popup />
    </div>
  );
};
