import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import FavoritesPage from '../pages/FavoritesPage';
import NotFound from '../pages/NotFound';

/**
 * PUBLIC_INTERFACE
 * AppRouter defines client routes for the application.
 */
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
