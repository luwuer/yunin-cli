const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { Notice } = require('../lib/utils')

let templatesDir = `${__dirname}/../templates`
let templateLists = require(templatesDir)

const questionLists = [
  {
    type: 'input',
    name: 'name',
    message: 'Template name:',
    validate(val) {
      if (templateLists[val]) {
        return 'Template is existed!'
      } else if (val === '') {
        return 'Name is required!'
      } else {
        return true
      }
    }
  },
  {
    type: 'input',
    name: 'git',
    message: 'Git repository(url):',
    validate(val) {
      if (val !== '') {
        return true
      }

      return 'Git repository is required!'
    }
  },
  {
    type: 'input',
    name: 'branch',
    message: 'Branch:',
    default: 'master'
  }
]

module.exports = prompt(questionLists).then(({ name, git, branch }) => {
  templateLists[name] = {
    git,
    branch
  }

  writeFile(
    `${templatesDir}.json`,
    JSON.stringify(templateLists),
    'utf-8',
    err => {
      if (err) {
        Notice.error(err)
      }

      Notice.success('Template add successful!')
    }
  )
})
