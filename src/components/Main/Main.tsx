import { List } from '../List';
import { Spinner } from '../Spinner/Spinner';
import { Items, LoadStatus } from '../../helpers/types';
import './main.css';

export interface MainProps {
  people: Items[];
  loadStatus: LoadStatus;
  previous: string | null;
  next: string | null;
  errorText: string;
  onPagination: (url: string) => void;
}
export const Main = ({
  people,
  loadStatus,
  previous,
  next,
  errorText,
  onPagination,
}: MainProps) => {
  return (
    <div className="main-container">
      <header className="main-header">Results</header>
      {loadStatus === 'loading' && <Spinner />}
      {loadStatus === 'error' && <span className="errorText">{errorText}</span>}
      {loadStatus === 'pending' && <span>Use search to find a hero</span>}
      {loadStatus === 'loaded' && (
        <List
          people={people}
          previous={previous}
          next={next}
          onPagination={onPagination}
        />
      )}
    </div>
  );
};
