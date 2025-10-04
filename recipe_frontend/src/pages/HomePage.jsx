import React, { useEffect } from 'react';
import SidebarFilters from '../components/layout/SidebarFilters';
import RecipeGrid from '../components/recipes/RecipeGrid';
import SortSelect from '../components/common/SortSelect';
import RecipeDetailModal from '../components/recipes/RecipeDetailModal';
import { useStore } from '../state/store';
import { getRecipes } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * HomePage loads and displays recipes with filters and sorting.
 */
export default function HomePage() {
  const { state, dispatch } = useStore();

  useEffect(() => {
    // Load recipes initially from mock
    async function load() {
      const data = await getRecipes({ q: state.ui.searchQuery, sort: state.ui.sort, filters: state.ui.filters });
      dispatch({ type: 'recipes/loadRecipes', payload: data });
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Re-filter/sort when UI changes
    async function apply() {
      const data = await getRecipes({ q: state.ui.searchQuery, sort: state.ui.sort, filters: state.ui.filters });
      dispatch({ type: 'recipes/applyFilters', payload: data });
    }
    apply();
  }, [state.ui.searchQuery, state.ui.sort, state.ui.filters, dispatch]);

  return (
    <div className="container">
      <h1 id="page-title" style={{ marginTop: '1rem' }}>Discover Recipes</h1>
      <div className="grid" style={{ gridTemplateColumns: '1fr', gap: '1rem' }}>
        <div className="toolbar">
          <div className="row" style={{ gap: '.5rem' }}>
            <SortSelect />
          </div>
          <div aria-live="polite">{state.recipes.filtered.length} results</div>
        </div>
        <div className="grid" style={{ gridTemplateColumns: '280px 1fr', gap: '1rem' }}>
          <div>
            <SidebarFilters />
          </div>
          <div>
            <RecipeGrid recipes={state.recipes.filtered} />
          </div>
        </div>
      </div>
      <RecipeDetailModal />
    </div>
  );
}
