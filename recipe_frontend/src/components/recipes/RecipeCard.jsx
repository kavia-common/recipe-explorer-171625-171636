import React from 'react';
import Badge from '../common/Badge';
import { useStore } from '../../state/store';

/**
 * PUBLIC_INTERFACE
 * RecipeCard shows a single recipe with favorite toggle and opens detail modal.
 */
export default function RecipeCard({ recipe }) {
  const { state, dispatch } = useStore();
  const isFav = state.recipes.favorites.includes(recipe.id);

  const toggleFav = (e) => {
    e.stopPropagation();
    dispatch({ type: 'recipes/toggleFavorite', payload: recipe.id });
  };

  const open = () => dispatch({ type: 'ui/openModal', payload: recipe });

  return (
    <article className="card" role="article" tabIndex="0" onClick={open} onKeyDown={(e) => e.key === 'Enter' && open()} aria-label={`Recipe ${recipe.title}`}>
      <img src={recipe.image} alt="" style={{ width: '100%', height: 160, objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} />
      <div style={{ padding: '.75rem' }} className="stack">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0, fontSize: '1rem' }}>{recipe.title}</h3>
          <button className="btn ghost" aria-pressed={isFav} aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'} onClick={toggleFav}>
            {isFav ? '★' : '☆'}
          </button>
        </div>
        <div className="row" style={{ color: 'var(--muted)', fontSize: '.9rem' }}>
          <span>⏱ {recipe.time}m</span>
          <span>⭐ {recipe.rating.toFixed(1)}</span>
        </div>
        <div className="row" style={{ flexWrap: 'wrap' }}>
          {recipe.tags.slice(0, 3).map(tag => (<Badge key={tag}>{tag}</Badge>))}
        </div>
      </div>
    </article>
  );
}
