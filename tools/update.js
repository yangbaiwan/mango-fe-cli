// Node.js lib
const { exec, execSync } = require('child_process')
const inquirer = require('inquirer')
// tools
const { clone_tpl, promisify_clone_tpl } = require('./util')

const update_q = [
  {
    type: 'confirm',
    name: 'continue',
    message: '确定在当前目录更新框架？',
    default: true
  }
]

module.exports = {
  update_cmd(dir) {
    inquirer.prompt(update_q).then(
      answer => {
        if(answer.continue) {
          inquirer.prompt([{
            type: 'list',
            name: 'frame',
            message: '选择脚手架类型：',
            choices: [
              "Vue", "React"
            ],
            default: "Vue"
          }]).then(
            ans => {
              exec('git status --porcelain', (err, data) => {
                if (!err) {
                  data = data.split('\n')
                  data.pop()
                  if (!data.length) {
                    execSync(`mkdir _update_`)
                    promisify_clone_tpl(process.cwd()+'/_update_', ans.frame).then(
                      res => {
                        execSync(`cd _update_ && rm -rf src && cd .. && cp -fr _update_/* ./ && rm -rf _update_`)
                        process.exit()
                      }
                    )
                  } else {
                    console.log('当前Git工作区有未提交的文件，请处理后再同步！')
                  }
                } else {
                  console.log(err)
                }
              })
            }
          )
        } else {
          process.exit();
        }
      }
    )
  }
}