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
    video_embed
    video_preview {
      id
      source_url
    }
    video_full {
      id
      source_url
    }
  }
}
`