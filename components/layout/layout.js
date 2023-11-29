import React from 'react'
import NavBar from '../navbar/navbar'

/**
 * Functional component representing the layout structure of the application.
 * It includes a navigation bar and wraps the content provided as children.
 * @function Layout
 * @param {Object} props - The properties passed to the Layout component.
 * @param {ReactNode} props.children - The content to be wrapped by the layout.
 * @returns {JSX.Element} - The rendered Layout component.
 */

export default function Layout({children}) {
  return (
    <div className='content'>
        <NavBar />
        {children}
    </div>
  )
}
