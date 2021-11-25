// 台灣自然人憑證(2碼英文字母加上14碼數字)

const ValidateCertificated = string => {
  var regexp = /^[a-zA-Z]{2}[0-9]{14}$/

  return regexp.test(string)
}

export default ValidateCertificated
