import React from 'react';
import { graphql } from 'gatsby';
// import { Link } from 'gatsby';
import Layout from 'components/Layout';
import SEO from 'components/SEO';
import Hero from 'components/Hero';
import BlogPostCard from 'components/BlogPostCard';
import PageNavigation from 'components/PageNavigation';

const IndexPage = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="home" />
      <Hero />
      {/** wrap all posts here */}
      <main>
        <PageNavigation currentPage={pageContext.currentPage} numPages={pageContext.numPages} />
        {posts.map(({ node }, idx) => {
          //
          const title = node.frontmatter.title || node.fields.slug || 'no title';
          return (
            <BlogPostCard
              key={node.fields.slug}
              slug={node.fields.slug}
              title={title}
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
  query GetBlogPosts($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      filter: { frontmatter: { type: { eq: "post" }, published: { eq: true } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
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
