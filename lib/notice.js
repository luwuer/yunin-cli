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
  console.log(chalk.yellow(msg))
}

module.exports = new Notice()
