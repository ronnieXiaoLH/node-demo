const RPCClient = require('@alicloud/pop-core').RPCClient
const { accessKeyId, accessKeySecret } = require('../config/constant')

function initVodClient(accessKeyId, accessKeySecret) {
  var regionId = 'cn-shanghai' // 点播服务接入地域
  var client = new RPCClient({
    //填入AccessKey信息
    accessKeyId: accessKeyId,
    accessKeySecret: accessKeySecret,
    endpoint: 'http://vod.' + regionId + '.aliyuncs.com',
    apiVersion: '2017-03-21'
  })

  return client
}

// 获取上传凭证
exports.getVod = async (req, res) => {
  const client = initVodClient(accessKeyId, accessKeySecret)

  try {
    const vodBack = await client.request(
      'CreateUploadVideo',
      {
        Title: 'this is a sample',
        FileName: 'filename.mp4'
      },
      {}
    )
    res.json({ vod: vodBack })
  } catch (error) {
    console.log('ErrorCode = ' + error.data.Code)
    console.log('ErrorMessage = ' + error.data.Message)
    console.log('RequestId = ' + error.data.RequestId)
  }
}
