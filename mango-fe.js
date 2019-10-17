const inquirer = require('inquirer')
const tools = require('./tools/util')
const create_cmd = require('./tools/create')
const update_cmd = require('./tools/update')

const path = require('path')

// 问题列表，包含所有可选项
const questions = [
  // 选择命令类型
  {
    type: 'list',
    name: 'command',
    message: '选择命令：',
    choices: [
      "更新项目框架",
      "创建新项目"
    ],
    default: "更新项目框架"
  }
]

module.exports = {
  start() {
    inquirer.prompt(questions).then(
      answer => {
        if(answer.command === "更新项目框架") {
          let currentPath = path.resolve(__dirname)
          update_cmd.update_cmd(currentPath)
        }
        if(answer.command === "创建新项目") {
          create_cmd.create_new()
        }
      }
    )
  }
}