import { render, screen, fireEvent } from '@testing-library/react';
import RecipeCard from '../../components/recipes/RecipeCard';
import { StoreProvider } from '../../state/store';

const recipe = {
  id: 'test1',
  title: 'Test Recipe',
  image: 'https://picsum.photos/seed/test/600/400',
  time: 10,
  rating: 4.5,
  tags: ['fast', 'test'],
  cuisine: 'Italian',
  diet: null,
  steps: ['a','b']
};

test('toggles favorite with proper aria-pressed', () => {
  render(
    <StoreProvider>
      <RecipeCard recipe={recipe} />
    </StoreProvider>
  );

  const favBtn = screen.getByRole('button', { name: /add to favorites/i });
  expect(favBtn).toHaveAttribute('aria-pressed', 'false');
  fireEvent.click(favBtn);
  expect(screen.getByRole('button', { name: /remove from favorites/i })).toHaveAttribute('aria-pressed', 'true');
});
