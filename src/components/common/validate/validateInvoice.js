// 台灣電子發票手機條碼(斜線(/)加上7碼數字或大寫字母)

const ValidateInvoice = string => {
  const regexp = /^\/{1}[0-9A-Z]{7}$/

  return regexp.test(string)
}

export default ValidateInvoice
