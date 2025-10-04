import React from 'react';
import RecipeCard from './RecipeCard';

/**
 * PUBLIC_INTERFACE
 * RecipeGrid renders a grid of RecipeCard components.
 */
export default function RecipeGrid({ recipes }) {
  return (
    <section aria-label="Recipe results" className="grid cards">
      {recipes.map(r => <RecipeCard key={r.id} recipe={r} />)}
    </section>
  );
}
