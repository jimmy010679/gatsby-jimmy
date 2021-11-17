/**
 * 將 html tag 轉成 字串
 * @param   {String} html html字符串
 * @return  {String}      處理過後字串
 */
const isBrowser = typeof window !== `undefined`

const RemoveHTML = ({ html }) => {
  if (!isBrowser) return false

  let tmp = document.createElement("DIV")
  tmp.innerHTML = html

  return (
    tmp.textContent.replace(/(?:\r\n|\r|\n)/g, " ") ||
    tmp.innerText.replace(/(?:\r\n|\r|\n)/g, " ") ||
    ""
  )
}

export default RemoveHTML
