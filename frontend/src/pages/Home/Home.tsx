import React from 'react'
import "./Home.scss"
import SessionAnalysis from '../../components/modules/session-analysis/session-analysis'
import HeaderBar from '../../components/header-bar/header-bar'
import Footer from '../../components/footer/footer'
import ChangeDistribution from '../../components/modules/change-distribution/change-distribution'

const Home = () => {
  return (
    <div className='home-page'>
      <div className="home-page-content">
        <HeaderBar />
        <div className="home-page-container">
          <ChangeDistribution />
          <SessionAnalysis />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home