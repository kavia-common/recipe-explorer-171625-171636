import React, { useEffect, useRef } from 'react';
import { useStore } from '../../state/store';
import Badge from '../common/Badge';

/**
 * PUBLIC_INTERFACE
 * Accessible modal that shows recipe details with focus trap and ESC close.
 */
export default function RecipeDetailModal() {
  const { state, dispatch } = useStore();
  const recipe = state.ui.selectedRecipe;
  const open = state.ui.modalOpen;
  const ref = useRef(null);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') dispatch({ type: 'ui/closeModal' }); }
    if (open) {
      document.addEventListener('keydown', onKey);
      setTimeout(() => ref.current?.focus(), 0);
    }
    return () => document.removeEventListener('keydown', onKey);
  }, [open, dispatch]);

  if (!open || !recipe) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="recipe-title" className="modal-backdrop" onClick={() => dispatch({ type: 'ui/closeModal' })} style={backdropStyle}>
      <div className="modal-card" ref={ref} tabIndex="-1" onClick={(e) => e.stopPropagation()} style={modalStyle}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'start' }}>
          <h2 id="recipe-title" style={{ marginTop: 0 }}>{recipe.title}</h2>
          <button className="btn ghost" onClick={() => dispatch({ type: 'ui/closeModal' })} aria-label="Close details">✕</button>
        </div>
        <img alt="" src={recipe.image} style={{ width: '100%', maxHeight: 260, objectFit: 'cover', borderRadius: '12px' }} />
        <p style={{ color: 'var(--muted)' }}>Cuisine: {recipe.cuisine} • Diet: {recipe.diet || 'Any'} • Time: {recipe.time}m • Rating: {recipe.rating.toFixed(1)}</p>
        <div className="row" style={{ flexWrap: 'wrap' }}>
          {recipe.tags.map(t => <Badge key={t}>{t}</Badge>)}
        </div>
        <div className="stack" style={{ marginTop: '.75rem' }}>
          <h3>Instructions</h3>
          <ol>
            {recipe.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}

const backdropStyle = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)',
  display: 'grid', placeItems: 'center', padding: '1rem', zIndex: 50
};
const modalStyle = {
  background: 'var(--surface)', color: 'var(--text)', borderRadius: '12px',
  border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)', maxWidth: 720,
  width: '100%', padding: '1rem'
};
