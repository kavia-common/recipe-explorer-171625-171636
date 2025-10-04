import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import recipesReducer, { initialRecipesState } from './slices/recipesSlice';
import uiReducer, { initialUiState } from './slices/uiSlice';
import useLocalStorage from '../hooks/useLocalStorage';

/**
 * Combines reducers similar to Redux combineReducers for useReducer.
 */
function combineReducers(reducers) {
  return (state, action) =>
    Object.keys(reducers).reduce((acc, key) => {
      acc[key] = reducers[key](state[key], action);
      return acc;
    }, {});
}

const StoreContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * StoreProvider wraps the app with global state using React Context and useReducer.
 */
export function StoreProvider({ children }) {
  const [persistedFavs, setPersistedFavs] = useLocalStorage('favorites', []);
  const rootReducer = useMemo(() => combineReducers({ recipes: recipesReducer, ui: uiReducer }), []);
  const [state, dispatch] = useReducer(rootReducer, {
    recipes: { ...initialRecipesState, favorites: persistedFavs },
    ui: initialUiState
  });

  useEffect(() => {
    setPersistedFavs(state.recipes.favorites);
  }, [state.recipes.favorites, setPersistedFavs]);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useStore returns { state, dispatch } for app-wide state access.
 */
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
