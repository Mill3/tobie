const path = require('path')
require('dotenv').config()

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@pages': path.resolve(__dirname, 'src/pages/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
        '@reducers': path.resolve(__dirname, 'src/reducers/'),
      },
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

exports.createPages = async ({ graphql, actions }) => {
  process.env.GATSBY_BUILD_TIME = Date.now()

  const { createPage } = actions

  const landingTemplate = path.resolve('./src/components/base/landing.js')
  const pageTemplate = path.resolve('./src/components/pages/page.js')
  const projectSingleTemplate = path.resolve('./src/components/projects/ProjectSingle.js')

  const result = await graphql(`
    {
      pages: allWpPage {
        edges {
          node {
            id
            title
            slug
            databaseId
            language {
              slug
              code
            }
            pages {
              showInNav
            }
          }
        }
      }

      projects: allWpProject {
        edges {
          node {
            id
            title
            slug
            databaseId
            language {
              slug
              code
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  // Derive unique language slugs from fetched content
  const languageSlugs = [
    ...new Set([
      ...result.data.pages.edges.map(({ node }) => node.language?.slug).filter(Boolean),
      ...result.data.projects.edges.map(({ node }) => node.language?.slug).filter(Boolean),
    ]),
  ]

  languageSlugs.forEach(language_slug => {
    // Create landing page for each language
    createPage({
      path: `/${language_slug}/`,
      component: landingTemplate,
      context: { language_slug },
    })

    // Create pages filtered by language
    result.data.pages.edges.forEach(({ node: page }) => {
      if (page.language?.slug === language_slug && page.pages?.showInNav === true) {
        createPage({
          path: `/${language_slug}/${page.slug}`,
          component: pageTemplate,
          context: {
            post_id: page.databaseId,
            slug: page.slug,
            language_slug,
          },
        })
      }
    })

    // Create project pages filtered by language
    result.data.projects.edges.forEach(({ node: project }) => {
      if (project.language?.slug === language_slug) {
        createPage({
          path: `/${language_slug}/projects/${project.slug}`,
          component: projectSingleTemplate,
          context: {
            post_id: project.databaseId,
            slug: project.slug,
            language_slug,
          },
        })
      }
    })
  })
}
