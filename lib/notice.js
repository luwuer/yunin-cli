const chalk = require('chalk')

/**
 * @description 提示信息
 */
function Notice() { }

Notice.prototype.success = msg => {
  console.log(chalk.green(msg))
}

Notice.prototype.error = msg => {
  console.log(chalk.red(msg))
}

Notice.prototype.info = msg => {
  console.log(msg)
}

Notice.prototype.cmd = msg => {
  console.log(chalk.rgb(122, 122, 122)('$ '), chalk.rgb(26, 128, 162)(msg))
}

Notice.prototype.warn = msg => {
  console.log(chalk.yellow('warning:'), msg)
}

module.exports = new Notice()
