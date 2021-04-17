import React from "react"
import { graphql } from "gatsby"
// Components
import Layout from "components/Layout"
import Image from "components/Image"
import Seo from "components/SEO"
import { MDXRenderer } from "gatsby-plugin-mdx"

const Page = ({ data }) => {
  const page = data.mdx

  return (
    <Layout>
      <Seo title={page.frontmatter.title} />
      <Image fluid={page.frontmatter.image.childImageSharp.fluid} />
      <main>
        <h2>{page.frontmatter.title}</h2>
        {/* <div dangerouslySetInnerHTML={{ __html: page.html }} /> */}
        <MDXRenderer>{page.body}</MDXRenderer>
      </main>
    </Layout>
  )
}

export default Page

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date
        image {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
