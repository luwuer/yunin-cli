exports.getNameList = templates => Object.keys.call(this, templates)

// exports.getList = templates => Object.values.call(this, templates)

exports.getList = templates => {
  let list = []
  for (let name in templates) {
    list.push(Object.assign({ name }, templates[name]))
  }

  return list
}
