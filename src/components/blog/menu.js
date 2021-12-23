import React from "react"
import { Link } from "gatsby"

import * as styles from "./menu.module.css"

const Menu = ({ blogCategory }) => {
  // ------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className={styles.category}>
      <ul>
        <li>
          <Link to="/blog/" activeClassName={styles.active} title="全部">
            全部
          </Link>
        </li>
        {blogCategory.map(
          (item, index) =>
            item.count > 0 && (
              <li key={index}>
                <Link
                  to={`/blog/category/${item.name_English}/`}
                  title={item.name_Chinese}
                  activeClassName={styles.active}
                >
                  {item.name_Chinese}
                  <span>({item.count})</span>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
  // ------------------------------------------------------------------------------------------------------------------------------
}

export default Menu
