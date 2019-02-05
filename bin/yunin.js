#!/usr/bin/env node
const program = require('commander')
const version = require('../package.json').version

/**
 * commander命令解释：
 *   commander支持git风格的子命令处理，可以根据子命令自动引导到以特定格式命名的命令执行文件，格式是[command]-[subcommand]
 *   如yunin hello可以找到/bin/yunin-hello.js
 */
program.version(version, '-v, --version')
  .usage('<command>')
  .command('init', 'init a new project')
  .command('list', 'show template list')
  .command('add', '[local] add a template')
  .command('remove', '[local] remove a template')
  .parse(process.argv)
