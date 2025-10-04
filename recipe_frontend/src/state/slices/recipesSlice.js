export const initialRecipesState = {
  all: [],
  filtered: [],
  favorites: []
};

/**
 * PUBLIC_INTERFACE
 * recipesReducer manages recipe collections and favorites.
 */
export default function recipesReducer(state = initialRecipesState, action) {
  switch (action.type) {
    case 'recipes/loadRecipes': {
      const all = action.payload || [];
      return { ...state, all, filtered: all };
    }
    case 'recipes/applyFilters': {
      const filtered = action.payload || [];
      return { ...state, filtered };
    }
    case 'recipes/toggleFavorite': {
      const id = action.payload;
      const exists = state.favorites.includes(id);
      const favorites = exists ? state.favorites.filter(x => x !== id) : [...state.favorites, id];
      return { ...state, favorites };
    }
    default:
      return state;
  }
}
