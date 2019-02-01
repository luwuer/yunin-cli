const chalk = require('chalk')

/**
 * @description 提示信息
 */
function Notice() {}

Notice.prototype.success = function(msg) {
  console.log(chalk.green(msg))
}

Notice.prototype.error = function(msg) {
  console.log(chalk.red(msg))
}

Notice.prototype.info = function(msg) {
  console.log(msg)
}

module.exports.Notice = new Notice()
