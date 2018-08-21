import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Fade from 'react-reveal/Fade'

import { connect } from 'react-redux'
// import { store } from '@reducers'

import Layout from '@components/layout'
import Seo from '@utils/Seo'

import close from '../../svg/close.svg'

import styles from './pages.module.scss'

class Page extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() { 
    let {
      title,
      content
    } = this.props.data.page    

    return (
      <Layout inverted={true} hideHeader={true}>

        <Seo 
          title={this.props.data.page.yoast_meta ? this.props.data.page.yoast_meta.yoast_wpseo_title : title}
          description={this.props.data.page.yoast_meta ? this.props.data.page.yoast_meta.yoast_wpseo_metadesc : null}
          image={this.props.data.page.featured_media ? this.props.data.page.featured_media.source_url : null}
          languageSlug={this.props.pageContext.language_slug}
        />

        <Link to={`/${this.props.LocaleState.locale}/`} className={styles.btn__close}>
          <img src={close} alt="X" />
        </Link>

        <section className={`container-fluid ${styles.page}`}>

          <div className="row">
            <aside className="col-12 col-md-8">
              <Fade bottom={true} distance={'10%'}>
                <header className={styles.page__header}>
                  <h1 dangerouslySetInnerHTML={{ __html : title }} />
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

// export default Page

const mapStateToProps = store => {
  return {
    LocaleState: store.LocaleState
  }
}

export default connect(
  mapStateToProps,
  null
)(Page)


export const pageQuery = graphql`
query pageSingle($slug: String!) {
  page : wordpressPage(slug : { eq: $slug }) {
    ...pageFragment
  }
}
`