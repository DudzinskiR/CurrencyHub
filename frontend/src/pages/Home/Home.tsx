import React from 'react'
import "./Home.scss"

import CurrencyAnalysis from '../../components/Modules/CurrencyAnalysis/compoment/CurrencyAnalysis'
import CurrencyPair from '../../components/Modules/CurrencyPair/CurrencyPair'
import HeaderBar from '../../components/HeaderBar/HeaderBar'

const Home = () => {
  return (
    <>
      <HeaderBar />
      <CurrencyPair />
      <CurrencyAnalysis />
    </>
  )
}

export default Home