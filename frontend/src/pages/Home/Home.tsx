import React from 'react'
import "./Home.scss"

import CurrencyAnalysis from '../../components/Modules/CurrencyAnalysis/compoment/CurrencyAnalysis'
import CurrencyPair from '../../components/Modules/CurrencyPair/CurrencyPair'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div className='home-page'>
      <div className="home-page-content">
        <HeaderBar />
        <CurrencyPair />
        <CurrencyAnalysis />
      </div>

      <Footer />
    </div>
  )
}

export default Home