import React from 'react'
import Header from './Header'
import Headline from './Headline'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main>
        <Header />
        <div className='lower'>
          <Headline />
          <Outlet />
        </div>
    </main> 
  )
}

export default Layout