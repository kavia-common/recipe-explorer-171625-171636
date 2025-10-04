import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Badge renders a small pill label.
 */
export default function Badge({ children }) {
  return <span className="badge">{children}</span>;
}
