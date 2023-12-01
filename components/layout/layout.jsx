/**
 * Layout Component
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - The content to be rendered within the layout.
 *
 * @returns {JSX.Element} Layout component
 */

import React from 'react';
import NavBar from '../navbar/navbar';

export default function Layout({ children }) {
  return (
    <div className="content">
      <NavBar />
      {children}
    </div>
  );
}
