import React from "react"
import { Link } from "gatsby"

import * as styles from "./breadcrumb.module.css"

const Breadcrumb = ({ data }) => {
  return (
    <div className={styles.breadcrumb}>
      <ul>
        <li>
          <Link to="/" title="首頁">
            首頁
          </Link>
        </li>
        {data.map((item, i) => (
          <li key={i}>
            <Link to={item.link} title={item.title}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Breadcrumb
