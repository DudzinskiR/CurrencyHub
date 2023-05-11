import React from 'react'
import "./Home.scss"

import CurrencyAnalysis from '../../components/Modules/CurrencyAnalysis/compoment/CurrencyAnalysis'
import CurrencyPair from '../../components/Modules/CurrencyPair/CurrencyPair'
import HeaderBar from '../../components/header-bar/header-bar'
import Footer from '../../components/footer/footer'

const Home = () => {
  return (
    <div className='home-page'>
      <div className="home-page-content">
        <HeaderBar />
        <div className="home-page-container">
          <CurrencyPair />
          <CurrencyAnalysis />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home