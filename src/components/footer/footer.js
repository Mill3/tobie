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
        allPages: allWordpressPage {
          edges {
            node {
              id
              title
              slug
              language_id  
              language_slug 
            }
          }
        }
      }
    `}
    render={data => (
      <footer className={`container-fluid ${styles.footer}`}>
        <div className="row align-items-end">
          <aside className="col mb-4">
            <Fade bottom={true} delay={250}>
              <Logo compact={true} byLine={false} headingWrapper="p" />
              {data.contact &&
                <div className="mt-4" dangerouslySetInnerHTML={{ __html : data.contact.content }} />
              }
            </Fade>
          </aside>
          <aside className="col-12 col-md-auto ml-md-auto">
            <Nav pages={data.allPages} credits={true} social={true} />
          </aside>
        </div>
      </footer>
    )}
  />
)

export default Footer
