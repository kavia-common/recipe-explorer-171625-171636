import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * NotFound page for unknown routes.
 */
export default function NotFound() {
  return (
    <div className="container" style={{ paddingBlock: '3rem' }}>
      <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>404</h1>
        <p>We couldn’t find that page.</p>
        <NavLink to="/" className="btn">Go Home</NavLink>
      </div>
    </div>
  );
}
