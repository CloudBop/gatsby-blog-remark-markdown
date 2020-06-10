import React from 'react';
// import { Link } from 'gatsby';

import Layout from 'components/Layout';
// import Image from 'components/image';
import SEO from 'components/SEO';
import { graphql } from 'gatsby';

const IndexPage = ({ data }) => (
  <Layout>
    {console.log('data', data)}
    <SEO title="home" />
    <div className="hero">hero goes here</div>
    {/** wrap all posts here */}
    <main>
      <div className="blogpostcard">blog post paginate goes here</div>
    </main>
  </Layout>
);

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
