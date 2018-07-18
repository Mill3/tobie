import { graphql } from 'gatsby'

export const workFragment = graphql`
fragment pageFragment on wordpress__PAGE {
  id
  title
  slug
  language_slug
  content
}
`