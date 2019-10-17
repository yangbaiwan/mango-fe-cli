// Node.js lib
const path = require('path')
const fs = require('fs')
const { exec, spawn } = require('child_process');
// Cli Config
const CONSTANT = require('../config')

// Assets Packages
const download = require('download-git-repo')
const ora = require('ora')

module.exports = {
  clone_tpl(dir, frame) {
    // start download
    let spinner = ora('Cloning into folder...')
    let addr = CONSTANT[`${frame.toUpperCase()}_TEMPLATE`]
    spinner.start()
    download(addr, dir, { clone: true }, function (err) {
      if (err) {
        spinner.fail('Clone failed!')
        throw new Error(err)
      } else {
        spinner.succeed('Code has been cloned!')
      }
      process.exit();
    })
  },
  promisify_clone_tpl(dir, frame) {
    // start download
    let spinner = ora('Cloning into folder...')
    let addr = CONSTANT[`${frame.toUpperCase()}_TEMPLATE`]
    return new Promise((resolve, reject) => {
      spinner.start()
      download(addr, dir, { clone: true }, function (err) {
        if (err) {
          spinner.fail('Clone failed!')
          reject(err)
        } else {
          spinner.succeed('Code has been cloned!')
          resolve()
        }
      })
    })
  }
}