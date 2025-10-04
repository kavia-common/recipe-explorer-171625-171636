export const initialUiState = {
  searchQuery: '',
  sort: 'relevance',
  filters: { cuisine: null, diet: null, maxTime: null, minRating: null },
  modalOpen: false,
  selectedRecipe: null
};

/**
 * PUBLIC_INTERFACE
 * uiReducer manages UI state like search, sort, filters and modal.
 */
export default function uiReducer(state = initialUiState, action) {
  switch (action.type) {
    case 'ui/setSearchQuery':
      return { ...state, searchQuery: action.payload };
    case 'ui/setSortOption':
      return { ...state, sort: action.payload };
    case 'ui/setFilters':
      return { ...state, filters: action.payload };
    case 'ui/openModal':
      return { ...state, modalOpen: true, selectedRecipe: action.payload };
    case 'ui/closeModal':
      return { ...state, modalOpen: false, selectedRecipe: null };
    default:
      return state;
  }
}
