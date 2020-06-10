import React from 'react';
// import { Link } from 'gatsby';

import Layout from 'components/Layout';
// import Image from 'components/image';
import SEO from 'components/SEO';
import Hero from 'components/Hero';
import BlogPostCard from 'components/BlogPostCard';

import { graphql } from 'gatsby';

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="home" />
      <Hero />
      {/** wrap all posts here */}
      <main>
        {posts.map(({ node }, idx) => {
          //
          // const title = node.frontmatter.title;
          //
          return (
            <BlogPostCard
              key={idx}
              slug="/"
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              readingTime={node.fields.readingTime.text}
              excerpt={node.excerpt}
              image={node.frontmatter.image.childImageSharp.fluid}
            />
          );
        })}
      </main>
    </Layout>
  );
};

export default IndexPage;

export const indexQuery = graphql`
  query GetPosts {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "post" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          fields {
            readingTime {
              text
            }
          }
          frontmatter {
            date
            title
            image {
              childImageSharp {
                fluid(maxWidth: 200, maxHeight: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`;
