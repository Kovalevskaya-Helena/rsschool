import { Outlet } from 'react-router';
import { PeopleSearch } from '../PeopleSearch';
import './layout.css';

export const Layout = () => {
  return (
    <div className="layout">
      <PeopleSearch />
      <Outlet />
    </div>
  );
};
