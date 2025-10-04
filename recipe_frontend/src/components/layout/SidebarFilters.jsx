import React, { useState } from 'react';
import { useStore } from '../../state/store';

/**
 * PUBLIC_INTERFACE
 * SidebarFilters provides basic filter controls for cuisine, diet, time and rating.
 */
export default function SidebarFilters() {
  const { state, dispatch } = useStore();
  const [open, setOpen] = useState(true);

  const filters = state.ui.filters;
  const handleChange = (key, value) => {
    dispatch({ type: 'ui/setFilters', payload: { ...filters, [key]: value } });
  };

  return (
    <aside aria-label="Filters" style={{ position: 'sticky', top: '80px' }}>
      <button className="btn ghost" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="filters-panel">
        Filters {open ? '▾' : '▸'}
      </button>
      <div id="filters-panel" hidden={!open} className="stack" style={{ marginTop: '.5rem' }}>
        <label className="stack">
          <span>Cuisine</span>
          <select className="select" value={filters.cuisine || ''} onChange={(e) => handleChange('cuisine', e.target.value || null)}>
            <option value="">Any</option>
            <option>Italian</option>
            <option>Mexican</option>
            <option>Indian</option>
            <option>Chinese</option>
            <option>Mediterranean</option>
          </select>
        </label>
        <label className="stack">
          <span>Diet</span>
          <select className="select" value={filters.diet || ''} onChange={(e) => handleChange('diet', e.target.value || null)}>
            <option value="">Any</option>
            <option>Vegetarian</option>
            <option>Vegan</option>
            <option>Gluten-Free</option>
            <option>Keto</option>
          </select>
        </label>
        <label className="stack">
          <span>Max Time (minutes)</span>
          <input className="input" type="number" min="0" value={filters.maxTime || ''} onChange={(e) => handleChange('maxTime', e.target.value ? Number(e.target.value) : null)} />
        </label>
        <label className="stack">
          <span>Min Rating</span>
          <input className="input" type="number" min="0" max="5" step="0.5" value={filters.minRating ?? ''} onChange={(e) => handleChange('minRating', e.target.value ? Number(e.target.value) : null)} />
        </label>
        <button className="btn secondary" onClick={() => dispatch({ type: 'ui/setFilters', payload: { cuisine: null, diet: null, maxTime: null, minRating: null } })}>
          Clear Filters
        </button>
      </div>
    </aside>
  );
}
