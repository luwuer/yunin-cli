const chalk = require('chalk')

/**
 * @description 提示信息
 */
function Notice() { }

Notice.prototype = {
  constructor: Notice,
  _generateBlankStr: count => {
    let blankLineStr = ''
    for (let i = 0; i < count; i++) {
      blankLineStr += '\n'
    }

    return blankLineStr
  },
  /**
   * @param {String} msg 提示信息
   * @param {Boolean} symbol 显示符号
   * @param {Number} blankLine 显示信息前的空白行
   */
  success: function (msg, symbol = false, blankLine = 0) {
    let blankLineStr = this._generateBlankStr(blankLine)
    console.log(chalk.green(`${blankLineStr}${symbol && '√ '}${msg}`))
  },
  /**
   * @param {String} msg 提示信息
   * @param {Boolean} symbol 显示符号
   * @param {Number} blankLine 显示信息前的空白行
   */
  error: function (msg, symbol = false, blankLine = 0) {
    let blankLineStr = this._generateBlankStr(blankLine)
    console.log(chalk.red(`${blankLineStr}${symbol && '× '}${msg}`))
  },
  info: msg => {
    console.log(msg)
  },
  cmd: msg => {
    console.log(chalk.rgb(122, 122, 122)('$ '), chalk.rgb(26, 128, 162)(msg))
  },
  warn: msg => {
    console.log(chalk.yellow('warning:'), msg)
  }
}

// let notice = new Notice()
// notice.error('Command failed: 123\n', true, 1)
// notice.success('Command success: 123\n', true, 1)

module.exports = new Notice()
