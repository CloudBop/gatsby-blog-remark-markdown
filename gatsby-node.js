/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// You can delete this file if you're not using it
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
//
// create page slug inside post - fields
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  //
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({
      node,
      getNode,
      basePath: `content`
    });
    //
    // - creates new field in graphql for slug
    //
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
};
//
exports.createPages = async ({ graphql, actions }) => {
  //
  const { createPage } = actions;
  const content = await graphql(`
  {
    posts: allMarkdownRemark(
      filter: {
        frontmatter: { type: {eq: "post" } } 
      }
    ) {
      edges {
        node {
          frontmatter {
            published
          }
          fields {
            slug
          }     
        }
      }
    }

    pages: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "page"} } }
    ) {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
  `);
  //
  const allPosts = content.data.posts.edges;
  const allPages = content.data.pages.edges;

  // create indiviudal posts
  allPosts.forEach(({ node }) => {
    if (node.frontmatter.published) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/Post.js`),
        context: {
          slug: node.fields.slug
        }
      });
    }
  });
  //
  allPages.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/Page.js`),
      context: {
        slug: node.fields.slug
      }
    });
  });
  //
  const postsPerPage = 5;
  const numPages = Math.ceil(allPosts.length / postsPerPage);
  // create arr - as seen in docs
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve(`./src/templates/Home.js`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    });
  });
};
//
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [ path.resolve(__dirname, 'src'), 'node_modules' ]
    }
  });
};
