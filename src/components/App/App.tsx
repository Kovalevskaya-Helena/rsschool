import { ErrorBoundary } from '../ErrorBoundary';
import { PeopleSearch } from '../PeopleSearch';

export const App = () => {
  return (
    <ErrorBoundary>
      <PeopleSearch />
    </ErrorBoundary>
  );
};
