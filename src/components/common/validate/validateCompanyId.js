// 台灣公司統一編號(由8位數字組成)

const ValidateCompanyId = string => {
  var regexp = /^[0-9]{8}$/

  return regexp.test(string)
}

export default ValidateCompanyId
