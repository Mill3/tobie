import React from 'react'
import { Link } from 'gatsby'

import Layout from '@components/layout'

const Page = () => (
  <Layout>
    <h1>hi this is a Page testing</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Page
