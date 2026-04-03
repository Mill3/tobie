let dotenv = require('dotenv')
dotenv.config()

module.exports = {
  siteMetadata: {
    title: `Tobie Marier Robitaille`,
    siteUrl: `${process.env.SITE_URL}`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-sass`,
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `${process.env.PROTOCOL}://${process.env.WORDPRESS_HOST}/graphql`,
        verbose: true,
        develop: {
          hardCacheMediaFiles: true,
        },
        production: {
          hardCacheMediaFiles: false,
        },
      },
    },
  ],
}
