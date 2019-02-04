#!/usr/bin/env node
const chalk = require('chalk')
const Spinner = require('cli-spinner').Spinner
const { basename, resolve } = require('path')
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
  let processDir = process.cwd()
  let rootName = basename(processDir)

  // 支持新建目录，然后进入该目录执行init
  if (!fileList.length && rootName === projectName) {
    projectName = '.'
  }

  notice.info(`Create project in ${chalk.yellow(resolve(processDir, projectName))}`)
  generate(projectName, templateName)
})

function generate(projectName, templateName) {
  let gitUrl = templates[templateName].git
  let gitBranch = templates[templateName].branch

  let cmdStr = `git clone ${gitUrl} ${projectName} --progress && cd ${projectName} && git checkout ${gitBranch}`

  let spinner = new Spinner('Fetch project...')
  spinner.setSpinnerString(0)
  spinner.start()
  // notice.info(`Fetch project from ${gitUrl} ...`)

  exec(cmdStr, err => {
    if (err) {
      notice.error(`Command failed: ${err.cmd}\n`, true, 1)
      process.exit()
    }

    spinner.stop()

    notice.success('Generation completed!', true, 1)
    notice.info('\nThen you can run:\n')
    notice.cmd(`cd ${projectName} && yarn`)
    notice.cmd('yarn dev\n')
  })
}
