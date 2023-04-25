const { Video } = require('../model')

// 创建视频
exports.createVideo = async (req, res) => {
  req.body.user = req.user._id
  try {
    const VideoModel = new Video(req.body)
    const dbBack = await VideoModel.save()
    res.json(dbBack)
  } catch (error) {
    res.status(500).json({ error })
  }
}

// 查询视频列表
exports.videoList = async (req, res) => {
  const { pageNum = 1, pageSize = 3 } = req.body
  try {
    const dbBack = await Video.find({})
      .skip((pageNum - 1) * pageSize)
      .limit(3)
      // 按创建时间倒序排序
      .sort({ createAt: -1 })
      // 关联 user
      .populate('user', '_id, username avatar')
    const total = await Video.countDocuments()
    res.json({ list: dbBack, total, pageNum, pageSize })
  } catch (error) {
    res.status(500).json({ error })
  }
}

// 查询视频详情
exports.video = async (req, res) => {
  try {
    const { videoId } = req.params
    const dbBack = await Video.findById(videoId).populate(
      'user',
      '_id, username avatar'
    )
    res.json(dbBack)
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.list = async (req, res) => {
  res.status(200).json({})
}
