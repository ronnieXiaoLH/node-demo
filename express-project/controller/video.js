const { Video, VideoComment } = require('../model')

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

// 添加评论
exports.comment = async (req, res) => {
  const { videoId } = req.params
  const userId = req.user._id

  const video = await Video.findOne({
    _id: videoId
  })
  if (!video) {
    return res.json({
      error: '视频不存在'
    })
  }

  const videoCommentModel = new VideoComment({
    content: req.body.content,
    video: videoId,
    user: userId
  })

  const comment = await videoCommentModel.save()
  video.commentCount++
  video.save()

  res.json({ comment })
}

// 查询评论列表
exports.commentList = async (req, res) => {
  const { videoId } = req.params
  const { pageNum = 1, pageSize = 3 } = req.body
  const list = await VideoComment.find({
    video: videoId
  })
    .populate('user', '_id username avatar')
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ createAt: -1 })

  const total = await VideoComment.countDocuments({
    video: videoId
  })
  res.json({ list, total, pageNum, pageSize })
}

// 删除评论
exports.delete = async (req, res) => {
  const { videoId, commentId } = req.params

  const video = await Video.findById(videoId)
  if (!video) {
    return res.json({
      error: '视频不存在'
    })
  }

  const comment = await VideoComment.findById(commentId)
  if (!comment) {
    return res.json({
      error: '评论不存在'
    })
  }

  if (comment.user.equals(req.user._id)) {
    return res.status(403).json({
      error: '没有权限删除'
    })
  }

  await comment.deleteOne()
  video.commentCount--
  await video.save()

  res.json({
    msg: '删除成功'
  })
}

exports.list = async (req, res) => {
  res.status(200).json({})
}
