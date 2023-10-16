import React from 'react'
import NavBar from '../navbar/navbar'

export default function Layout({children}) {
  return (
    <div className='content'>
        <NavBar />
        {children}
    </div>
  )
}
