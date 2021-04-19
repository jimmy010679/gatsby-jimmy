// 是否有值

const ValidateHasValue = string => {
  const regexp = /\S/

  return regexp.test(string)
}

export default ValidateHasValue
