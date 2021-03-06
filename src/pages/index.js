import * as React from "react"
import { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Combobox from "../components/combobox"
import Dropdown from "../components/dropdown"

import LocationPin from "../assets/locationPin.svg"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../styles/index.module.scss"

const ViewItems = [
  {
      text: "List view"
  },
  {
      text: "Card view"
  },
  {
      text: "Stack view"
  }
];

const LocationItems = [
  {
    text: "Tokyo",
    item: <Link to="/Tokyo">Tokyo</Link>
  },
  {
    text: "Chiba", 
    item: <Link to="/Chiba">Chiba</Link>
  },
  {
    text:"Kanagawa",
    item: <Link to="/Kanagawa">Kanagawa</Link>
  }
];


const IndexPage = ({ data }) => {
  const [selView, setView] = useState("Card view");
  const [selLoc, setLoc] = useState("Location");
  const [postClass, setPostClass] = useState(styles.post);

  useEffect(
    () => {
      switch(selView) {
        case "List view":
          return setPostClass(styles.post);
        case "Card view":
          return setPostClass(styles.card);
        case "Stack view":
          return setPostClass(styles.stack);
        default:
          return setPostClass(styles.card);
      }
    },
    [selView]
  );

    return (
      <Layout>
        <Seo title="Home" />
        <div className={styles.componentCont}>
          <Combobox></Combobox>
          <div className={styles.dropdownCont}>
            <Dropdown items={LocationItems} 
              selectedItem={selLoc} 
              itemHandler={setLoc} />
            <Dropdown items={ViewItems}
              selectedItem={selView} 
              itemHandler={setView} />
          </div>
        </div>
        <div className={styles.content} style={{flexDirection: selView==="Card view" ? "row" : "column"}}>
          {data.allMdx.edges.map(post => {
            const img = getImage(post.node.frontmatter.image)
            // this returns for each post
            return (
              <div key={post.node.id} className={postClass}>
                <GatsbyImage image={img} 
                alt={post.node.frontmatter.title} className={styles.postImg}/>
                <div className={styles.postInfo}>
                  <h3>{post.node.frontmatter.title}</h3>
                  <p className={styles.desc}>{post.node.frontmatter.excerpt}</p>
                  <div className={styles.location}>
                    <LocationPin/>
                    <span>{post.node.frontmatter.city}, {post.node.frontmatter.location}</span>
                  </div>
                </div>
              </div>
            )
          })} 
        </div>
      </Layout>
    )
}

export const query = graphql`
  {
    allMdx {
      edges {
        node {
          frontmatter {
            city
            excerpt
            location
            title
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
