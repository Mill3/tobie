let path = require('path')
let dotenv = require('dotenv')


exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@pages': path.resolve(__dirname, 'src/pages/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
        '@reducers': path.resolve(__dirname, 'src/reducers/'),
      },
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}


/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = ({ graphql, actions }) => {

// ['COMMIT_REF',
//  'BRANCH',
//  'ALGOLIA_APPLICATION_ID',
//  'ALGOLIA_API_KEY',
//  'ALGOLIA_INDEX_PREFIX',
//  'ALGOLIA_INDEX_NAME'].forEach((variableName) => {
//   // only variables beginning with GATSBY_ are available client-side
//   process.env[`GATSBY_${variableName}`] = process.env[variableName];
// });

// dotenv.config();
// console.log(process.env);

// add current time to process env
// process.env.GATSBY_BRANCH = 'preview';
process.env.GATSBY_BUILD_TIME = Date.now();

const { createPage } = actions

return new Promise((resolve, reject) => {

  const landingTemplate = path.resolve(
    `./src/components/base/landing.js`
  )

  const postTemplate = path.resolve(
    `./src/pages/post.js`
  )

  const pageTemplate = path.resolve(
    `./src/components/pages/page.js`
  )

  const projectSingleTemplate = path.resolve(
    `./src/components/projects/ProjectSingle.js`
  )

  // const locale = "eu-US"

  // Main graphql Query for all edges content
  resolve(
    graphql(
    `
      {

        languages : allWordpressWpLanguage {
          edges {
            node {
              id
              slug
              wordpress_id
            }
          }
        }

        posts : allWordpressPost {
          edges {
            node {
              id
              title
              slug
            }
          }
        }

        pages : allWordpressPage {
          edges {
            node {
              id
              title
              slug
              language_id  
              language_slug 
            }
          }
        }

        projects : allWordpressWpProjects {
          edges {
            node {
              id
              title
              slug
              language_id  
              language_slug 
            }
          }
        }

      }
    `
    ).then(result => {

      // console.log(result.data)
      // return

      if (result.errors) {
        reject(result.errors)
      }

      // Each languages
      result.data.languages.edges.forEach(language => {
        
        let id = language.node.id
        let language_id = language.node.wordpress_id
        let language_slug = language.node.slug

        // create landing for language
        let path = `/${language_slug}/`;
        createPage({
          path: path,
          component: landingTemplate,
          context: {
            language_id: language_id,
            language_slug: language_slug
          }
        })
        
        // each posts
        // result.data.posts.edges.forEach(post => {

        //   // let id = post.node.id
        //   let post_id = post.node.wordpress_id
        //   let post_slug = post.node.slug
        //   let post_language_id = post.node.language_id
        //   let post_language_slug = post.node.language_slug
        //   let path = `/${language_slug}/post/${post_slug}`;

        //   if (post_language_id == language_id) {
        //     createPage({
        //       path: path,
        //       component: postTemplate,
        //       context: {
        //         post_id: post_id,
        //         post_slug: post_slug,
        //         language_slug: language_slug
        //       }
        //     })
        //   }

            
        //   })

        // each pages
 
        result.data.pages.edges.forEach(post => {

          // let id = post.node.id
          let post_id = post.node.wordpress_id
          let post_slug = post.node.slug
          let post_language_id = post.node.language_id
          let post_language_slug = post.node.language_slug
          let path = `/${language_slug}/${post_slug}`;

          if (post_language_id == language_id) {
            createPage({
              path: path,
              component: pageTemplate,
              context: {
                post_id: post_id,
                slug: post_slug,
                language_slug: language_slug
              }
            })
          }

        })
        

        // each projects
        result.data.projects.edges.forEach(post => {

          let post_id = post.node.wordpress_id
          let post_slug = post.node.slug
          let post_language_id = post.node.language_id
          let post_language_slug = post.node.language_slug
          let path = `/${language_slug}/projects/${post_slug}`

          // createPage({
          //   path: path,
          //   component: projectSingleTemplate,
          //   context: {
          //     post_id: post_id,
          //     slug: post_slug
          //   }
          // })

          if (post_language_id == language_id) {
            createPage({
              path: path,
              component: projectSingleTemplate,
              context: {
                post_id: post_id,
                slug: post_slug,
                language_slug: language_slug
              }
            })
          }

        })
        
      })

      return
    })
  )
})
}


