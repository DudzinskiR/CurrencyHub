import React from 'react'
import "./Home.scss"

import CurrencyAnalysis from '../../components/Modules/CurrencyAnalysis/compoment/CurrencyAnalysis'
import CurrencyPair from '../../components/Modules/CurrencyPair/CurrencyPair'

const Home = () => {
  return (
    <>
      <CurrencyPair />
      <CurrencyAnalysis />
    </>
  )
}

export default Home