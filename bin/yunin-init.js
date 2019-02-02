#!/usr/bin/env node
const { basename } = require('path')
const { sync } = require('glob')
const { exec } = require('child_process')
const { prompt } = require('inquirer')
const { getNameList } = require('../lib/utils')
const notice = require('../lib/notice')
const templates = require('../templates.json')

const templateNameList = getNameList(templates)
const fileList = sync('*')

const questionList = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Project name:',
    validate(val) {
      if (fileList.length) {
        let exit = !!fileList.filter(name => name === val).length
        if (exit) {
          return `File(./${val}) is existed!`
        }
      }

      return true
    }
  },
  {
    type: 'list',
    name: 'templateName',
    choices: templateNameList,
    message: 'Template name:'
  }
]

prompt(questionList).then(({ projectName, templateName }) => {
  let rootName = basename(process.cwd())

  // 支持新建目录，然后进入该目录执行init
  if (!fileList.length && rootName === projectName) {
    projectName = '.'
  }

  generate(projectName, templateName)
})

function generate(projectName, templateName) {
  let gitUrl = templates[templateName].git
  let gitBranch = templates[templateName].branch

  let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${gitBranch}`

  notice.info(`Fetch project from ${gitUrl} ...`)

  exec(cmdStr, err => {
    if (err) {
      notice.error(`\n× Command failed: ${err.cmd}\n`)
      process.exit()
    }

    notice.success('\n√ Generation completed!')
    notice.info('\nThen you can run:')
    notice.cmd(`\n  cd ${projectName} && yarn install\n`)
  })
}
