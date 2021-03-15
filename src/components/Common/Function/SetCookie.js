const isBrowser = typeof window !== `undefined`

const SetCookie = ({
  name,
  setValue,
  expiresMinutes,
  sameSite,
  secure,
  priority,
}) => {
  if (!isBrowser) return false

  /*
    name = 名
    setValue = 值
    expiresMinutes = 分鐘計算
    sameSite
    secure
    priority
  */
  let expiresDate = new Date()
  expiresDate.setTime(+expiresDate + expiresMinutes * 60000) // 60000 = 1min

  if (document.domain === "localhost" || document.domain === "192.168.66.165") {
    // access
    document.cookie =
      name +
      "=" +
      setValue +
      "; path=/; expires=" +
      expiresDate.toUTCString() +
      "; Priority=" +
      priority +
      ";"
  } else {
    // access
    document.cookie =
      name +
      "=" +
      setValue +
      "; domain=" +
      "myrenta.com" +
      //document.domain +
      "; path=/;expires=" +
      expiresDate.toUTCString() +
      "; SameSite=" +
      sameSite +
      "; secure=" +
      secure +
      "; Priority=" +
      priority +
      ";"
  }
}

export default SetCookie
