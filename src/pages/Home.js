import React from 'react'
import NavBar from '../components/NavBar'
import HomeCategoryBar from '../components/HomePage/HomeCategoryBar'
import ItemCardView from '../components/HomePage/ItemCardView'

const Home = () => {
  return (
    <div>
        <NavBar />
        <HomeCategoryBar />
        <ItemCardView />
    </div>
  )
}

export default Home