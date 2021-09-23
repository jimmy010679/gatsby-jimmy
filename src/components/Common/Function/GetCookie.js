/**
 * 取得 Cooke Name
 * @param  {String} name   要取得名稱
 * @return {String}        結果
 */

//const isBrowser = typeof window !== `undefined`

const GetCookie = ({ name }) => {
  if (!isBrowser) return false

  // Split cookie string and get all individual name=value pairs in an array
  let cookieArr = document.cookie.split(";")

  // Loop through the array elements
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=")

    // Removing whitespace at the beginning of the cookie name and compare it with the given string
    if (name === cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1])
    }
  }

  // Return null if not found
  return null
}

export default GetCookie
