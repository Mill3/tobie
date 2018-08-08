import { graphql } from 'gatsby'

export const workFragment = graphql`
fragment pageFragment on wordpress__PAGE {
  id
  title
  slug
  language_slug
  content
  featured_media {
    source_url
  }
  yoast_meta {
    yoast_wpseo_title
    yoast_wpseo_metadesc
    yoast_wpseo_canonical
  }
}
`