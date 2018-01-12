const fs = require('fs')
const path = require('path')
const upyun = require('upyun')
const upyunConfig = {
  bucket: 'nb-static',
  operator: 'whmanlin',
  password: 'whmanlin',
  path: ''
}
const root = './dist'
// 利用upyun包准备上传工具
const service = new upyun.Service(upyunConfig.bucket, upyunConfig.operator, upyunConfig.password)
const client = new upyun.Client(service)
// 上传文件脚本
function uploadFile (remotePath, localPath, client) {
  let file = null
  try {
    file = fs.readFileSync(localPath)
  } catch (err) {
    console.log('\x1b[35m' + localPath + '\t上传失败\x1b[0m')
    return false
  }
  let uploadRes = client.putFile(remotePath, file)
  uploadRes.then(() => {
    console.log('\x1b[32m' + localPath + '\t上传成功\x1b[0m')
  }).catch(() => {
    console.log('\x1b[35m' + localPath + '\t上传失败\x1b[0m')
  })
}

function upload (uppath) {
  let res = fs.existsSync(uppath)
  if (res) {
    let res = fs.readdirSync(uppath)
    if (res.length === 0) {
      console.error(uppath + '目录没有文件')
      return false
    }
    for (let item of res) {
      if (fs.statSync(uppath + path.sep +item).isDirectory()) {
        upload(uppath + path.sep +item)
      } else {
        let remotePath = ''
        if (uppath !== root) {
          let uppathCopy = uppath
          remotePath = upyunConfig.path + uppathCopy.split(root)[1] + path.sep + item
        } else {
          remotePath = upyunConfig.path + path.sep + item
        }
        uploadFile(remotePath, path.resolve(__dirname, path.resolve(__dirname, uppath, item)), client)
      }
    }
  } else {
    console.error('打包资源不存在')
    return false
  }
}

upload(root)
