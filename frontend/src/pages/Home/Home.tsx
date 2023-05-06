import React from 'react'
import "./Home.scss"

import CurrencyAnalysis from '../../components/Modules/CurrencyAnalysis/compoment/CurrencyAnalysis'
import CurrencyPair from '../../components/Modules/CurrencyPair/CurrencyPair'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <>
      <HeaderBar />
      <CurrencyPair />
      <CurrencyAnalysis />
      <Footer />
    </>
  )
}

export default Home