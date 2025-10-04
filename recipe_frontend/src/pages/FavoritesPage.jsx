import React, { useMemo } from 'react';
import { useStore } from '../state/store';
import RecipeGrid from '../components/recipes/RecipeGrid';

/**
 * PUBLIC_INTERFACE
 * FavoritesPage shows favorited recipes using current loaded data.
 */
export default function FavoritesPage() {
  const { state } = useStore();
  const favs = useMemo(
    () => state.recipes.all.filter(r => state.recipes.favorites.includes(r.id)),
    [state.recipes.all, state.recipes.favorites]
  );

  return (
    <div className="container">
      <h1 id="page-title" style={{ marginTop: '1rem' }}>Your Favorites</h1>
      <RecipeGrid recipes={favs} />
    </div>
  );
}
