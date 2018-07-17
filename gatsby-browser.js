import detectLocale, { redirect } from './src/utils/detect-locale'

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

export const onInitialClientRender = () => {  
  console.warn('browser rendering')
  window.___GATSBYGRAM_INITIAL_RENDER_COMPLETE = true
}
