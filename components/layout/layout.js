import React from 'react'
import NavBar from '../navbar/navbar'

export default function Layout({children}) {
  return (
    <div className='content dark:text-white dark:bg-dark'>
        <NavBar />
        {children}
    </div>
  )
}
