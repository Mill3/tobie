import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import Fade from 'react-reveal/Fade'

import Layout from '@components/layout'

import close from '../../svg/close.svg'

import styles from './pages.module.scss'

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    let {
      title,
      content
    } = this.props.data.page

    return (
      <Layout inverted={true} hideHeader={true}>

        <Link to="/fr/" className={styles.btn__close}>
          <img src={close} alt="X" />
        </Link>

        

          <section className={`container-fluid ${styles.page}`}>

            <div className="row">
              <aside className="col-12 col-md-8">
                <Fade bottom={true} distance={'10%'}>
                  <header className={styles.page__header}>
                    <h1>{title}</h1>
                  </header>
                </Fade>
                <Fade bottom={true} distance={'4%'} delay={250}>
                  <div className="entry" dangerouslySetInnerHTML={{__html: content }} />
                </Fade>
              </aside>
            </div>
          
          </section>

        

      </Layout>
    );
  }
}

export default Page

export const pageQuery = graphql`
query pageSingle($slug: String!) {
  page : wordpressPage(slug : { eq: $slug }) {
    ...pageFragment
  }
}
`