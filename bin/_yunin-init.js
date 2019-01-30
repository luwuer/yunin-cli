#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const chalk = require('chalk')

// 修改usage提示name
program._name = 'init'
program.usage('[project-name]').parse(process.argv)

// 项目名称
let projectName = program.args[0]

if (!projectName) {
  program.help() 
  return
}

const list = glob.sync('*')
let rootName = path.basename(process.cwd())

if (list.length) {
  let exit = !!list.filter(name => name === projectName).length

  if (exit) {
    console.log(chalk.bgRed(`ERROR: ${projectName}已存在`))
    return 
  }
} else if (rootName === projectName) {
  // 支持手动新建目录，然后进入目录执行init
  projectName = '.'
}

go()

function go () {
  // 预留，处理子命令
  console.log(path.resolve(process.cwd(), path.join('.', projectName)))
}