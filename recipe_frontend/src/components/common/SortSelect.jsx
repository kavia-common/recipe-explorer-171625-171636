import React from 'react';
import { useStore } from '../../state/store';

/**
 * PUBLIC_INTERFACE
 * SortSelect allows choosing sorting of recipes.
 */
export default function SortSelect() {
  const { state, dispatch } = useStore();
  const value = state.ui.sort;

  return (
    <label className="row" aria-label="Sort">
      <span className="sr-only">Sort by</span>
      <select
        className="select"
        value={value}
        onChange={(e) => dispatch({ type: 'ui/setSortOption', payload: e.target.value })}
      >
        <option value="relevance">Relevance</option>
        <option value="ratingDesc">Rating: High to Low</option>
        <option value="timeAsc">Time: Low to High</option>
        <option value="timeDesc">Time: High to Low</option>
        <option value="titleAsc">Title: A-Z</option>
      </select>
    </label>
  );
}
