// 台灣手機號碼

const ValidateCellPhone = string => {
  const regexp = /09\d{2}(\d{6}|-\d{3}-\d{3})/

  return regexp.test(string)
}

export default ValidateCellPhone
