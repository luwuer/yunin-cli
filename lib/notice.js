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

module.exports = new Notice()

// const notice = new Notice()

// module.exports.success = notice.success
// module.exports.error = notice.error
// module.exports.info = notice.info
