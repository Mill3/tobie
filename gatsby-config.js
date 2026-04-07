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
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          includePaths: [require('path').resolve(__dirname, 'src/style')],
        },
        cssLoaderOptions: {
          esModule: false,
          modules: {
            namedExport: false,
          },
        },
      },
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
        debug: {
          disableCompatibilityCheck: true,
        },
      },
    },
  ],
}
