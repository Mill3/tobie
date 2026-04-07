import { graphql } from 'gatsby'

export const workFragment = graphql`
fragment pageFragment on WpPage {
  id
  title
  slug
  language {
    slug
    code
  }
  content
  featuredImage {
    node {
      sourceUrl
    }
  }
  pages {
    showInNav
  }
}
`
