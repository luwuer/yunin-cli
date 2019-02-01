const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { Notice } = require('../lib/utils')

let templatesDir = `${__dirname}/../templates`
let templates = require(templatesDir)
let templateNameLists = Object.keys.call(this, templates)

const questionLists = [
  {
    type: 'list',
    name: 'name',
    choices: templateNameLists,
    message: 'Template name:'
  },
  {
    type: 'confirm',
    message: `Confirm to delete this template?`,
    name: 'confirm'
  }
]

module.exports = prompt(questionLists).then(({ name, confirm }) => {
  if (!confirm) {
    Notice.info('Canceled deletion!')
    return
  }
  
  delete templates[name]

  writeFile(`${templatesDir}.json`, JSON.stringify(templates), 'utf-8', err => {
    if (err) {
      Notice.error(err)
    }

    Notice.success(`Template(${name}) has been deleted!`)
  })
})
