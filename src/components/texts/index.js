import { graphql } from 'gatsby'

export const textFragment = graphql`
fragment textFragment on wordpress__wp_texts {
  id
  slug
  title
  content
  acf {    
    image {
      id
      source_url
    }
    video {
      id
      source_url
    }
  }
}
`