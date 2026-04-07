#!/usr/bin/env node
/**
 * Fixes cheerio 1.x incompatibility in gatsby-source-wordpress 6.x.
 *
 * cheerio sets __esModule:true without a .default export, causing
 * _interopRequireDefault to return the module as-is, making
 * _cheerio.default.load() throw "Cannot read properties of undefined".
 *
 * Fix: replace _cheerio.default.load with _cheerio.load.
 */

const fs = require('fs')
const path = require('path')

const file = path.join(
  __dirname,
  '../node_modules/gatsby-source-wordpress/dist/steps/source-nodes/create-nodes/process-node.js'
)

if (!fs.existsSync(file)) {
  console.log('fix-gatsby-source-wordpress: file not found, skipping')
  process.exit(0)
}

const original = fs.readFileSync(file, 'utf8')
const patched = original.replace('_cheerio.default.load', '_cheerio.load')

if (original === patched) {
  console.log('fix-gatsby-source-wordpress: already patched, skipping')
  process.exit(0)
}

fs.writeFileSync(file, patched)
console.log('fix-gatsby-source-wordpress: patch applied ✓')
