import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Fade from 'react-reveal/Fade'

import Nav from '@components/nav/nav'
import Logo from '@components/logo/logo'

import styles from './footer.module.scss'

const Footer = ({ props }) => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        contact : wordpressWpTexts(slug : { eq: "contact" }) {
          title
          content
        }
      }
    `}
    render={data => (
      <footer className={`container-fluid ${styles.footer}`}>
        <div className="row align-items-end">
          <aside className="col">
            <Fade bottom={true} delay={250}>
              <Logo compact={true} byLine={false} />
              {data.contact &&
                <div className="mt-4" dangerouslySetInnerHTML={{ __html : data.contact.content }} />
              }
            </Fade>
          </aside>
          <aside className="col-auto ml-auto">
            <Nav credits={true} />
          </aside>
        </div>
      </footer>
    )}
  />
)

export default Footer
