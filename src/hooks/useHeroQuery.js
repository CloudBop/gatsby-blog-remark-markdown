import { useStaticQuery, graphql } from "gatsby"

export const useHeroQuery = () => {
  const data = useStaticQuery(graphql`
    query HeroQuery {
      mdx(frontmatter: { type: { eq: "hero" } }) {
        frontmatter {
          heroImage {
            childImageSharp {
              fluid(maxWidth: 2000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          heroImageBtnLink
          heroImageBtnText
          heroImageText
        }
      }
    }
  `)

  return data.mdx.frontmatter
}
