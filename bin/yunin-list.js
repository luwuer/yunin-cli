const { getList } = require('../lib/utils')
const notice = require('../lib/notice')
const templates = require('../templates.json')

const templateList = getList(templates)
console.log(templateList
)
notice.info(`\n${templateList.length} templates available:`)
templateList.forEach(template => {
  notice.info(`  · ${template.name}: ${template.des}`)
})

notice.info('')
