const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const notice = require('../lib/notice')
const { getNameList } = require('../lib/utils')

let templatesDir = `${__dirname}/../templates`
let templates = require(templatesDir)
let templateNameList = getNameList(templates)

const questionList = [
  {
    type: 'list',
    name: 'name',
    choices: templateNameList,
    message: 'Template name:'
  },
  {
    type: 'confirm',
    message: `Confirm to delete this template?`,
    name: 'confirm'
  }
]

module.exports = prompt(questionList).then(({ name, confirm }) => {
  if (!confirm) {
    notice.info('Canceled deletion!')
    return
  }
  
  delete templates[name]

  writeFile(`${templatesDir}.json`, JSON.stringify(templates), 'utf-8', err => {
    if (err) {
      notice.error(err)
    }

    notice.success(`Template(${name}) has been deleted!`)
  })
})
