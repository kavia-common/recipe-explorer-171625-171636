import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from '../../router/Router';

test('renders NotFound for unknown route', () => {
  render(
    <MemoryRouter initialEntries={['/unknown']}>
      <AppRouter />
    </MemoryRouter>
  );
  expect(screen.getByText(/We couldn’t find that page/i)).toBeInTheDocument();
});
