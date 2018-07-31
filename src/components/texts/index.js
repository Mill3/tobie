import { graphql } from 'gatsby'

export const textFragment = graphql`
fragment textFragment on wordpress__wp_texts {
  id
  slug
  title
  content
  acf {    
    image {
      source_url
    }
    video_embed
    video_preview {
      source_url
    }
    video_full {
      source_url
    }
  }
}
`