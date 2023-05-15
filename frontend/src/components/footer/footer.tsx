import React from 'react'
import "./footer.scss"
import gitHubLogo from './icon/github.png'
import reactLogo from './icon/react.png'
import typeScriptLogo from './icon/typescript.png'
import postgresLogo from './icon/postgreSQL.png'
import nodeLogo from './icon/node.png'

const Footer = () => {
  return (
    <div className='footer-box'>
      <div className="footer-content">
        <div className="footer-github">
          <a href="https://github.com/DudzinskiR/finance" ><img className='footer-github-icon' src={gitHubLogo} alt="github icon" /></a>
          <div className="footer-github-text">GitHub.com</div>
        </div>

        <div className='footer-contact'>
          <div className="footer-contact-title">Dane kontaktowe</div>
          <div className="footer-contact-name">Robert Dudziński</div>
          <div className="footer-contact-mail">dudzinski.robert97@gmail.com</div>
        </div>

        <div className='footer-stack'>
          <div className="footer-stack-title">Stack technologiczny</div>
          <div className="footer-stack-img-box">
            <div className="footer-stack-technology">
              <img className='footer-stack-logo' src={typeScriptLogo} alt="typescript icon" />
              <div className="footer-stack-technology-name">TypeScript</div>
            </div>

            <div className="footer-stack-technology">
              <img className='footer-stack-logo react-logo' src={reactLogo} alt="react icon" />
              <div className="footer-stack-technology-name">React.js</div>
            </div>

            <div className="footer-stack-technology">
              <img className='footer-stack-logo' src={nodeLogo} alt="node.js icon" />
              <div className="footer-stack-technology-name">Node.js</div>
            </div>

            <div className="footer-stack-technology">
              <img className='footer-stack-logo' src={postgresLogo} alt="postgreSQL icon" />
              <div className="footer-stack-technology-name">PostgreSQL</div>
            </div>
          </div>


        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-text">
          © Copyright 2023 - Robert Dudziński
        </div>
      </div>
    </div>
  )
}

export default Footer