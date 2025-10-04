import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../../pages/HomePage';
import { StoreProvider } from '../../state/store';

jest.mock('../../services/api', () => ({
  getRecipes: jest.fn(async () => [
    { id: 'a', title: 'Apple Pie', image: '', time: 40, rating: 4.2, tags: ['dessert'], cuisine: 'Italian', diet: null, steps: [''] },
    { id: 'b', title: 'Banana Bread', image: '', time: 60, rating: 4.8, tags: ['dessert'], cuisine: 'Italian', diet: null, steps: [''] }
  ])
}));

test('search filters the results', async () => {
  render(
    <StoreProvider>
      <HomePage />
    </StoreProvider>
  );
  await waitFor(() => expect(screen.getByText(/results/i)).toBeInTheDocument());

  const input = screen.getByRole('searchbox', { name: /search/i });
  fireEvent.change(input, { target: { value: 'banana' } });

  await waitFor(() => {
    expect(screen.getByText(/Banana Bread/i)).toBeInTheDocument();
  });
});
