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
      languages: allWpLanguage {
        edges {
          node {
            id
            slug
            databaseId
          }
        }
      }

      pages: allWpPage {
        edges {
          node {
            id
            title
            slug
            databaseId
            language {
              slug
              locale
            }
            acfPageFields {
              showInNav
            }
          }
        }
      }

      projects: allWpProjects {
        edges {
          node {
            id
            title
            slug
            databaseId
            menuOrder
            language {
              slug
              locale
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  result.data.languages.edges.forEach(({ node: language }) => {
    const language_id = language.databaseId
    const language_slug = language.slug

    createPage({
      path: `/${language_slug}/`,
      component: landingTemplate,
      context: { language_id, language_slug },
    })

    result.data.pages.edges.forEach(({ node: page }) => {
      const page_language_slug = page.language?.slug
      const showInNav = page.acfPageFields?.showInNav

      if (page_language_slug === language_slug && showInNav === true) {
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

    result.data.projects.edges.forEach(({ node: project }) => {
      const project_language_slug = project.language?.slug

      if (project_language_slug === language_slug) {
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
