import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Logo from '@components/logo/logo'

import styles from './footer.module.scss'

const Footer = ({ props }) => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        contact : wordpressWpTexts(slug : { eq: "contact" }) {
          ...textFragment
        }
      }
    `}
    render={data => (
      <footer className={`container-fluid ${styles.footer}`}>
        <div className="row">
          <aside className="col">
            <Logo compact={true} byLine={false} />
            {data.contact &&
              <div className="mt-4" dangerouslySetInnerHTML={{ __html : data.contact.content }} />
            }
          </aside>
        </div>
      </footer>
    )}
  />
)

export default Footer