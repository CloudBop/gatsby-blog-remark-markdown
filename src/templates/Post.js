import React from "react"
import { graphql } from "gatsby"
// Components
import Layout from "components/Layout"
import Image from "components/Image"
import SEO from "components/SEO"
import { MDXRenderer } from "gatsby-plugin-mdx"

const Post = ({ data }) => {
  const post = data.mdx
  console.log(`post`, post)
  console.log(`data`, data)
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <Image fluid={post.frontmatter.image.childImageSharp.fluid} />
      <main>
        <h2>{post.frontmatter.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <MDXRenderer>{post.body}</MDXRenderer>
      </main>
    </Layout>
  )
}

export default Post

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
