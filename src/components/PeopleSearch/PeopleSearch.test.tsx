import { PeopleSearch } from './PeopleSearch';
import { render } from '@testing-library/react';

vi.mock('react-router', () => ({
  useSearchParams: () => ['', vi.fn()],
  useParams: () => ({ id: '' }),
  useNavigate: vi.fn(),
}));

vi.mock('../Main/Main', () => ({
  Main: () => <div>Main</div>,
}));

describe('PeopleSearch', () => {
  test('renders search', () => {
    const { getByRole } = render(<PeopleSearch />);
    getByRole('textbox');
  });
});
