import data from '../mock/recipes.json';

const API_BASE = process.env.REACT_APP_API_BASE;

/**
 * Apply client-side filters.
 */
function applyFilters(items, { q, sort, filters }) {
  let out = [...items];

  if (q) {
    const s = q.toLowerCase();
    out = out.filter(r => r.title.toLowerCase().includes(s) || r.tags.join(' ').toLowerCase().includes(s));
  }

  if (filters?.cuisine) out = out.filter(r => r.cuisine === filters.cuisine);
  if (filters?.diet) out = out.filter(r => r.diet === filters.diet);
  if (typeof filters?.maxTime === 'number') out = out.filter(r => r.time <= filters.maxTime);
  if (typeof filters?.minRating === 'number') out = out.filter(r => r.rating >= filters.minRating);

  switch (sort) {
    case 'ratingDesc':
      out.sort((a, b) => b.rating - a.rating); break;
    case 'timeAsc':
      out.sort((a, b) => a.time - b.time); break;
    case 'timeDesc':
      out.sort((a, b) => b.time - a.time); break;
    case 'titleAsc':
      out.sort((a, b) => a.title.localeCompare(b.title)); break;
    default:
      // relevance: keep as-is
      break;
  }

  return out;
}

/**
 * PUBLIC_INTERFACE
 * getRecipes returns recipes optionally filtered and sorted.
 * If REACT_APP_API_BASE is defined, code is ready to switch to real API.
 */
export async function getRecipes({ q = '', sort = 'relevance', filters = {} } = {}) {
  if (API_BASE) {
    // Example future integration:
    // const params = new URLSearchParams({ q, sort, ...filters });
    // const res = await fetch(`${API_BASE}/recipes?${params.toString()}`);
    // const json = await res.json();
    // return json;
  }
  // mock path
  const items = data;
  return applyFilters(items, { q, sort, filters });
}
