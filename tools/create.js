// Node.js lib
const { exec } = require('child_process')
const inquirer = require('inquirer')
const { clone_tpl } = require('./util')

// Create Questions
const create_q = [
  {
    type: 'input',
    name: 'project_name',
    message: '请输入新项目名称：',
    default: 'my-new-project'
  },
  {
    type: 'list',
    name: 'frame',
    message: '选择脚手架类型：',
    choices: [
      "Vue", "React"
    ]
  }
]

module.exports = {
  create_new() {
    inquirer.prompt(create_q).then(
      ans => {
        exec(`mkdir ${ans.project_name}`)
        clone_tpl(ans.project_name, ans.frame)
      }
    )
  }
}