#!/usr/bin/env node

const program = require('commander')

/**
 * commander命令解释：
 *   commander支持git风格的子命令处理，可以根据子命令自动引导到以特定格式命名的命令执行文件，格式是[command]-[subcommand]
 *   如yunin hello可以找到/bin/yunin-hello.js
 */
program.version('1.0.0')
	.usage('<command> [project-name]')
	.command('hello', 'hello world')
	.command('init', 'init a new project')
	.command('add', 'add a template')
	.command('del', 'delete a template')
  .parse(process.argv)
