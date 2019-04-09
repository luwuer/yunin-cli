exports.getNameList = templates => Object.keys(templates)

exports.getList = templates => {
  let list = []
  for (let name in templates) {
    list.push(Object.assign({ name }, templates[name]))
  }

  return list
}
