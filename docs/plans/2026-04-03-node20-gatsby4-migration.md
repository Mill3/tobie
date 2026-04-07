# Node 20 / Gatsby 4 Migration Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the project from Node 14 / Gatsby 2 to Node 20 / Gatsby 4 with React 17.

**Architecture:** Upgrade core framework (Gatsby 2→4, React 16→17), replace node-sass with sass (Dart Sass), migrate gatsby-source-wordpress 3→6 (REST API → WPGraphQL), and fix deprecated React string refs in ReelPlayer.js.

**Tech Stack:** Node 20.11.0, Gatsby 4.25, React 17.0.2, sass (Dart Sass), gatsby-source-wordpress 6.x, WPGraphQL WordPress plugin

---

## ⚠️ Pre-requisite (manual step — do this first)

Install the **WPGraphQL** plugin on the WordPress instance at `admin.tobiemarierrobitaille.com`:

1. Log in to WordPress admin
2. Plugins → Add New → search "WPGraphQL"
3. Install and activate **WPGraphQL** (by Jason Bahl)
4. Also install and activate **WPGraphQL for ACF** (exposes ACF fields in GraphQL)
5. Verify the GraphQL endpoint is live at: `https://admin.tobiemarierrobitaille.com/graphql`

> You can test the endpoint with a browser — it should return a JSON response.

---

## Task 1: Update Node version config

**Files:**
- Modify: `.nvmrc`
- Modify: `package.json`

**Step 1: Update .nvmrc**

Replace the content of `.nvmrc` with:
```
20.11.0
```

**Step 2: Add engines field to package.json**

In `package.json`, add after the `"license"` field:
```json
"engines": {
  "node": ">=20.0.0",
  "yarn": ">=1.22.0"
},
```

**Step 3: Switch to Node 20 locally**

```bash
nvm install 20.11.0
nvm use 20.11.0
node --version
# Expected: v20.11.0
```

**Step 4: Commit**

```bash
git add .nvmrc package.json
git commit -m "chore: update Node version to 20.11.0"
```

---

## Task 2: Replace node-sass with Dart Sass

**Files:**
- Modify: `package.json`

> `node-sass` requires Python 2.7 native bindings — it cannot install on Node 20. Dart Sass (`sass`) is a pure JS replacement.

**Step 1: Remove node-sass, install sass**

```bash
yarn remove node-sass
yarn add sass
```

**Step 2: Verify package.json**

`node-sass` should be gone, `sass` should appear in `dependencies`.

**Step 3: Commit**

```bash
git add package.json yarn.lock
git commit -m "chore: replace node-sass with sass (dart sass)"
```

---

## Task 3: Upgrade Gatsby core and React

**Files:**
- Modify: `package.json`

**Step 1: Remove all old Gatsby and React packages**

```bash
yarn remove gatsby gatsby-plugin-react-helmet gatsby-plugin-sass gatsby-plugin-sitemap gatsby-source-wordpress react react-dom react-helmet
```

**Step 2: Install Gatsby 4, React 17, and updated plugins**

```bash
yarn add gatsby@^4.25.0 react@^17.0.2 react-dom@^17.0.2
yarn add gatsby-plugin-sass@^5.0.0
yarn add gatsby-plugin-sitemap@^5.0.0
yarn add gatsby-source-wordpress@^6.0.0
yarn add gatsby-plugin-react-helmet@^6.0.0 react-helmet@^6.1.0
```

**Step 3: Update prettier**

```bash
yarn remove prettier
yarn add --dev prettier@^3.0.0
```

**Step 4: Commit**

```bash
git add package.json yarn.lock
git commit -m "chore: upgrade to Gatsby 4, React 17, updated plugins"
```

---

## Task 4: Update gatsby-config.js

**Files:**
- Modify: `gatsby-config.js`

The `gatsby-source-wordpress` v6 uses WPGraphQL instead of the REST API. The config is completely different — no more `baseUrl`, `protocol`, `useACF`, `normalizer`, `auth`, etc.

**Step 1: Rewrite gatsby-config.js**

Replace the entire file content with:

```js
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
```

> **Note:** The `normalizer` function from v3 (which fixed ACF file fields with `___NODE` keys) is no longer needed — WPGraphQL for ACF handles relationships natively.

**Step 2: Commit**

```bash
git add gatsby-config.js
git commit -m "feat: update gatsby-source-wordpress config to v6 (WPGraphQL)"
```

---

## Task 5: Update gatsby-node.js GraphQL queries

**Files:**
- Modify: `gatsby-node.js`

`gatsby-source-wordpress` v6 changes all GraphQL type names:

| v3 (old) | v6 (new) |
|----------|----------|
| `allWordpressPost` | `allWpPost` |
| `allWordpressPage` | `allWpPage` |
| `allWordpressWpProjects` | `allWpProjects` (verify exact name after WPGraphQL install) |
| `allWordpressWpLanguage` | `allWpLanguage` (verify exact name after WPGraphQL install) |

Also, `wordpress_id` is now just `databaseId` in v6.

Also, `push` from `gatsby` is removed in Gatsby 4 — use `navigate` instead (this affects `gatsby-browser.js`, handled in Task 6).

**Step 1: Rewrite gatsby-node.js**

Replace the entire file content with:

```js
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

    // create landing for language
    createPage({
      path: `/${language_slug}/`,
      component: landingTemplate,
      context: { language_id, language_slug },
    })

    // each page
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

    // each project
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
```

> **Important:** The exact GraphQL field names (`allWpLanguage`, `allWpProjects`, `acfPageFields`, `showInNav`, `language.slug`) depend on how WPGraphQL exposes the data. After running `gatsby develop` for the first time, open GraphiQL at `http://localhost:8000/___graphql` to explore the actual schema and adjust field names if needed.

**Step 2: Commit**

```bash
git add gatsby-node.js
git commit -m "feat: update createPages GraphQL queries for gatsby-source-wordpress v6"
```

---

## Task 6: Update gatsby-browser.js

**Files:**
- Modify: `gatsby-browser.js`

In Gatsby 4:
- `push` from `gatsby` is **removed** — use `navigate` instead
- The `Router` wrapper from `react-router-dom` is no longer needed (Gatsby handles routing internally)

**Step 1: Rewrite gatsby-browser.js**

Replace the entire file content with:

```js
import React from 'react'
import { navigate } from 'gatsby'
import { Provider } from 'react-redux'

import createStoreMethod from './src/store'
import detectLocale from '@utils/detect-locale'

let store = createStoreMethod()

const ConnectedRootElement = ({ element }) => <Provider store={store}>{element}</Provider>

export const wrapRootElement = ConnectedRootElement

export const onInitialClientRender = () => {
  window.___GATSBYGRAM_INITIAL_RENDER_COMPLETE = true

  const detectedLocale = detectLocale()

  store.dispatch({ type: 'SET_LOCALE', locale: detectedLocale })

  if (window.location.pathname === '/') {
    navigate(`/${detectedLocale}/`)
  }
}
```

**Step 2: Commit**

```bash
git add gatsby-browser.js
git commit -m "fix: replace gatsby push with navigate in gatsby-browser"
```

---

## Task 7: Fix deprecated string refs in ReelPlayer.js

**Files:**
- Modify: `src/components/reel/ReelPlayer.js`

String refs (`this.refs.player`, `this.refs.playerContainer`) and `ReactDOM.findDOMNode()` are deprecated. Replace with `React.createRef()`.

**Step 1: Update the constructor and refs**

In `constructor()`, add after `this.setFullVideo = this.setFullVideo.bind(this)`:
```js
this.playerRef = React.createRef()
this.playerContainerRef = React.createRef()
```

**Step 2: Replace all `this.refs.player` usages**

| Old | New |
|-----|-----|
| `this.refs.player` | `this.playerRef.current` |
| `this.refs.playerContainer` | `this.playerContainerRef.current` |
| `ReactDOM.findDOMNode(this.refs.player)` | `this.playerRef.current` |
| `ReactDOM.findDOMNode(this.refs.playerContainer)` | `this.playerContainerRef.current` |

**Step 3: Update JSX refs**

In the `render()` method:
- Change `ref="playerContainer"` → `ref={this.playerContainerRef}`
- Change `ref="player"` → `ref={this.playerRef}`

**Step 4: Remove ReactDOM import** (no longer needed)

Remove: `import ReactDOM from 'react-dom'`

**Step 5: Commit**

```bash
git add src/components/reel/ReelPlayer.js
git commit -m "fix: replace deprecated string refs with React.createRef() in ReelPlayer"
```

---

## Task 8: First build attempt & schema inspection

**Step 1: Delete node_modules and reinstall**

```bash
rm -rf node_modules .cache public
yarn install
```

**Step 2: Run gatsby develop**

```bash
yarn develop
```

**Step 3: Open GraphiQL and inspect schema**

Go to `http://localhost:8000/___graphql`

Run this query to explore what types are available from WPGraphQL:
```graphql
{
  __schema {
    types {
      name
    }
  }
}
```

Look for types starting with `Wp` — these are your content types.

**Step 4: Verify GraphQL field names**

Check that `allWpLanguage`, `allWpPage`, `allWpProjects` exist. If not, note the actual names and update `gatsby-node.js` accordingly.

Also verify ACF field names match what's used in `gatsby-node.js` (`acfPageFields.showInNav`, etc.).

**Step 5: Fix any GraphQL errors and commit**

```bash
git add gatsby-node.js
git commit -m "fix: adjust GraphQL field names to match WPGraphQL schema"
```

---

## Task 9: Update page/component GraphQL queries in src/

**Files:**
- Modify: all `.js` files in `src/` that contain GraphQL queries

In Gatsby 4 with gatsby-source-wordpress v6, any GraphQL queries in page components or templates that reference old type names (e.g. `wordpressPage`, `wordpressPost`, `allWordpressWpProjects`) need to be updated to the new WPGraphQL names.

**Step 1: Find all files with WordPress GraphQL queries**

```bash
grep -r "allWordpress\|wordpress_id\|wordpressPage\|wordpressPost" src/ --include="*.js" -l
```

**Step 2: For each file found, update type names**

Common replacements:
- `wordpressPage` → `wpPage`
- `wordpressPost` → `wpPost`
- `allWordpressPage` → `allWpPage`
- `allWordpressPost` → `allWpPost`
- `wordpress_id` → `databaseId`
- `featured_media` → `featuredImage { node { sourceUrl } }`
- `acf { field_name }` → depends on WPGraphQL ACF config (check GraphiQL)

**Step 3: Test each page in the browser after updating**

**Step 4: Commit all query updates**

```bash
git add src/
git commit -m "feat: update all GraphQL queries for gatsby-source-wordpress v6 schema"
```

---

## Task 10: Production build verification

**Step 1: Run full build**

```bash
yarn build
```

Expected: Build completes without errors.

**Step 2: Serve and test locally**

```bash
yarn serve
```

Open `http://localhost:9000` and verify:
- Language redirect works on `/`
- Pages load correctly
- Projects load correctly
- Reel player works (play, fullscreen, close)
- ACF fields display correctly

**Step 3: Final commit**

```bash
git add .
git commit -m "chore: Node 20 / Gatsby 4 migration complete"
```

---

## Notes

- **WPGraphQL schema discovery is required** — after installing WPGraphQL on WordPress, the exact GraphQL field names must be verified in GraphiQL before the queries will work. Tasks 5 and 9 both depend on this.
- **ACF fields** — if ACF fields don't appear in GraphQL, ensure the "WPGraphQL for ACF" plugin is active and that ACF field groups have "Show in GraphQL" enabled in their settings.
- **Custom post type `projects`** — for `allWpProjects` to work, the CPT must be registered with `show_in_graphql: true` in WordPress. If it's registered by a plugin, that plugin may need a WPGraphQL integration.
- **Language plugin** — the `allWpLanguage` query assumes a language plugin is registered with WPGraphQL. Verify this in GraphiQL.
