/**
 * ES5 for gatsby-node.js
 * 取得 日期
 * @param  {String} type   今日或明日 (today, tomorrow)
 * @param  {String} format 格式 (original, yyyy-mm-dd hh:mm:ss, yyyy-mm-dd 00:00:00, yyyy-mm-dd)
 * @return {String}        結果
 */

var GetDateTime = function ({ type, format }) {
  // ----------------------------------------------------------------
  // 取得現在日期

  const now = new Date().toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
    hour12: false,
  })
  let newDate = new Date(now)

  // ----------------------------------------------------------------
  // return new
  let newFormatDate = undefined

  // ----------------------------------------------------------------
  // type

  switch (type) {
    case "tomorrow":
      newDate = new Date(newDate + 86400000)
      break
    case "now":
      break
    default:
      break
  }

  // ----------------------------------------------------------------
  // format

  switch (format) {
    case "yyyy-mm-dd hh:mm:ss":
      // "2020-12-03 00:00:00"
      newFormatDate = `${newDate.getFullYear()}-${String(
        newDate.getMonth() + 1
      ).padStart(2, "0")}-${String(newDate.getDate()).padStart(
        2,
        "0"
      )} 00:00:00`

      break

    case "yyyy-mm-dd 00:00:00":
      // "2020-12-03 00:00:00"
      newFormatDate = `${newDate.getFullYear()}-${String(
        newDate.getMonth() + 1
      ).padStart(2, "0")}-${String(newDate.getDate()).padStart(
        2,
        "0"
      )} 00:00:00`

      break

    case "yyyy-mm-dd":
      // "2020-12-03"
      newFormatDate = `${newDate.getFullYear()}-${String(
        newDate.getMonth() + 1
      ).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}`
      break

    case "original":
      newFormatDate = newDate
      break
    default:
      newFormatDate = newDate
      break
  }

  return newFormatDate
}

module.exports.getDateTime = GetDateTime
