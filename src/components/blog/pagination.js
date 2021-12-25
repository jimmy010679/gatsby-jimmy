import React from "react"
import { Link } from "gatsby"

import * as styles from "./pagination.module.css"

const Pagination = ({ urlPath, currentPage, numPages, pathname }) => {
  // ------------------------------------------------------------------------------------------------------------------------------

  const isFirst = currentPage === 1
  const isLast = currentPage === numPages

  const prevPage =
    currentPage - 1 === 1
      ? urlPath
      : `${urlPath}${(currentPage - 1).toString()}`
  const nextPage = `${urlPath}${(currentPage + 1).toString()}/`

  // ------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className={styles.pagination}>
      <div className={styles.prev}>
        {!isFirst ? (
          <Link to={prevPage} rel="prev" title="上一頁">
            ← Previous Page
          </Link>
        ) : (
          <Link
            to={pathname}
            className={styles.noDrop}
            rel="prev"
            title="上一頁"
          >
            ← Previous Page
          </Link>
        )}
      </div>
      <div className={styles.next}>
        {!isLast ? (
          <Link to={nextPage} rel="next" title="下一頁">
            Next Page →
          </Link>
        ) : (
          <Link
            to={pathname}
            className={styles.noDrop}
            rel="next"
            title="下一頁"
          >
            Next Page →
          </Link>
        )}
      </div>
    </div>
  )
  // ------------------------------------------------------------------------------------------------------------------------------
}

export default Pagination
