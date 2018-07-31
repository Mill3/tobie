let dotenv = require('dotenv')
let autoprefixer = require('autoprefixer')

dotenv.config()

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
    siteUrl: `${process.env.SITE_URL}`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sitemap'
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
          postCssPlugins: [autoprefixer()],
          precision: 8
      }
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: `${process.env.WORDPRESS_HOST}`,
        protocol: `${process.env.PROTOCOL}`,
        useACF: true,
        // Set verboseOutput to true to display a verbose output on `npm run develop` or `npm run build`
        // It can help you debug specific API Endpoints problems.
        verboseOutput: false,
        perPage: 100,
        auth: {
          // If auth.user and auth.pass are filled, then the source plugin will be allowed
          // to access endpoints that are protected with .htaccess.
          htaccess_user: `${process.env.WORDPRESS_USER}`,
          htaccess_pass: `${process.env.WORDPRESS_PASS}`,
          htaccess_sendImmediately: false
        },
        // Search and Replace Urls across WordPress content.
        // searchAndReplaceContentUrls: {
        //   sourceUrl: "https://source-url.com",
        //   replacementUrl: "https://replacement-url.com",
        // },
        // Set how many simultaneous requests are sent at once.
        concurrentRequests: 10,
        // Exclude specific routes using glob parameters
        // See: https://github.com/isaacs/minimatch
        // Example:  `["/*/*/comments", "/yoast/**"]` will exclude routes ending in `comments` and
        // all routes that begin with `yoast` from fetch.
        excludedRoutes: ["/*/*/comments", "/yoast/**"],
        // use a custom normalizer which is applied after the built-in ones.
        normalizer: function({ entities }) {
          // console.log(entities);
          
          return entities
        }
      },
    }
  ]
}
