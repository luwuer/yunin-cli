const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const notice = require('../lib/notice')

let templatesDir = `${__dirname}/../templates`
let templateLists = require(templatesDir)

notice.warn('No server support now! If you want to add remote templates, should to create pull requests on https://github.com/luwuer/yunin-web-cli or email me(html6@foxmail.com)')

const questionList = [
  {
    type: 'input',
    name: 'name',
    message: 'Local template name:',
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
  },
  {
    type: 'input',
    name: 'des',
    message: 'Description:'
  }
]

module.exports = prompt(questionList).then(({ name, git, branch, des }) => {
  templateLists[name] = {
    git,
    branch,
    des
  }

  writeFile(
    `${templatesDir}.json`,
    JSON.stringify(templateLists),
    'utf-8',
    err => {
      if (err) {
        notice.error(err)
      }

      notice.success('Template add completed!\n', true, 1)
    }
  )
})
