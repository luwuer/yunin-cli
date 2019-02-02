const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const notice = require('../lib/notice')
const { getNameList } = require('../lib/utils')

let templatesDir = `${__dirname}/../templates`
let templates = require(templatesDir)
let templateNameList = getNameList(templates)

module.exports = prompt([
  {
    type: 'list',
    name: 'name',
    choices: templateNameList,
    message: 'Template name:'
  }
]).then(({ name }) => {
  prompt([
    {
      type: 'confirm',
      message: `Confirm to remove ${name}?`,
      name: 'confirm'
    }
  ]).then(({ confirm }) => {
    if (!confirm) {
      notice.info('Remove has been canceled!')
      return
    }

    delete templates[name]

    writeFile(`${templatesDir}.json`, JSON.stringify(templates), 'utf-8', err => {
      if (err) {
        notice.error(err)
      }

      notice.success(`\n√ Template(${name}) has been removed!\n`)
    })
  })
})
