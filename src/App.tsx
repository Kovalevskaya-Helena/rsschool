import { BrowserRouter, Routes, Route } from 'react-router';

import { Layout } from './components/Layout';
import { UnControlledForm } from './components/UnControlledForm';
import { ControlledForm } from './components/ControlledForm';
import { Main } from './components/Main';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Main />} />
            <Route path='/uncontrolledform' element={<UnControlledForm />} />
            <Route path='/controlledform' element={<ControlledForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
