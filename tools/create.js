// Node.js lib
const { execSync } = require('child_process')
const inquirer = require('inquirer')
const { promisify_clone_tpl } = require('./util')
const fs = require('fs')
const path = require('path')
const resolve = (file, dir) => path.resolve(process.cwd(), dir, file)

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
        execSync(`mkdir ${ans.project_name}`)
        promisify_clone_tpl(ans.project_name, ans.frame).then(
          success => {
            execSync(`cd ${ans.project_name}`)
            let originPkg = require(resolve('package.json', ans.project_name))
            originPkg.name = ans.project_name
            fs.writeFileSync(resolve('package.json', ans.project_name), JSON.stringify(originPkg, null, 2))
            console.log(`${ans.project_name} 项目创建完成，执行 cd ${ans.project_name} && yarn install`)
            process.exit()
          }
        )
      }
    )
  }
}