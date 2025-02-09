import { BrowserRouter, Routes, Route } from 'react-router';
import { ErrorBoundary } from '../ErrorBoundary';
import { Layout } from '../Layout';
import { Details } from '../Details';
import { NotFoundPage } from '../NotFoundPage/';

export const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Layout />}>
            <Route path="/details/:id" element={<Details />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
