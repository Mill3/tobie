import { graphql } from 'gatsby'

export const workFragment = graphql`
fragment projectFragment on wordpress__wp_projects {
  id
  title
  slug
  language_slug
  featured_media {
    id
    media_type
    source_url
  }
  acf {
    video_embed
    images {
      id
      source_url
    }
  }
}
`