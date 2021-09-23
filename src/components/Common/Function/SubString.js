/**
 * https://gist.github.com/roshanca/4214281
 * 擷取指定長度的中英文字串
 * @param  {String} str    擷取字串
 * @param  {Number} n      擷取長度（中文為英文的雙倍）
 * @param  {Boolon} hasDot 是否顯示...
 * @return {String}        擷取結果
 */
const SubString = ({ str, n, hasDot }) => {
  let r = /[^\0-\xff]/g // eslint-disable-line
  let m

  if (str.replace(r, "**").length > n) {
    m = Math.floor(n / 2)

    for (let i = m, l = str.length; i < l; i++) {
      if (str.substr(0, i).replace(r, "**").length >= n) {
        return hasDot ? str.substr(0, i) + "..." : str.substr(0, i)
      }
    }
  }
  return str
}

export default SubString
