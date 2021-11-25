// 台灣市話號碼

const ValidateLocalPhone = string => {
  const regexp = /(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}/

  return regexp.test(string)
}

export default ValidateLocalPhone
