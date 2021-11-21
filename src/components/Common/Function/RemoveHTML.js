/**
 * 將 html tag 轉成 字串
 * @param   {String} html html字符串
 * @return  {String}      處理過後字串
 */
const RemoveHTML = ({ html }) => {
  let tempText = html
    .replace(/<[^>]*>?/gm, "") // 去除HTML
    .replace(/(\r\n\t|\n|\r\t)/gm, "") // 去除換行

  return tempText
}

export default RemoveHTML
