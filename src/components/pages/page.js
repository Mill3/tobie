import React from 'react'
// import { Link } from 'gatsby'
import { graphql } from 'gatsby'

import Layout from '@components/layout'

import styles from './pages.module.scss'

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
    console.log(this.props.data)
  }
  render() { 
    let {
      title,
      content
    } = this.props.data.page

    return (
      <Layout inverted={true} _hideHeader={true}>
        <section className={`container-fluid ${styles.page}`}>

          <div className="row">
            <aside className="col-12 col-md-8">
              <h1>{title}</h1>
              <div className="entry" dangerouslySetInnerHTML={{__html: content }} />
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