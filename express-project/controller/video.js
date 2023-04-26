const { Video, VideoComment, VideoLike, Subscribe } = require('../model')

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

    // 登录用户查看时，返回用户是否喜欢、不喜欢和关注的信息
    let isLike = false,
      isDislike = false,
      isSubscribe = false
    if (req.user) {
      const userId = req.user._id
      const videoLike = await VideoLike.findOne({
        user: userId,
        video: videoId
      })
      if (videoLike?.like === 1) {
        isLike = true
      } else if (videoLike?.like === -1) {
        isDislike = true
      }

      // 判断当前登录的用户是否关注了视频发布者
      const subscribe = await Subscribe.findOne({
        user: userId,
        channel: dbBack.user._id
      })
      if (subscribe) {
        isSubscribe = true
      }
    }
    res.json({ ...dbBack.toJSON(), isLike, isDislike, isSubscribe })
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

// 视频喜欢
exports.like = async (req, res) => {
  const { videoId } = req.params
  const userId = req.user._id

  const video = await Video.findById(videoId)
  if (!video) {
    return res.json({
      error: '视频不存在'
    })
  }

  let isLike = true
  const dbBack = await VideoLike.findOne({
    user: userId,
    video: videoId
  })

  if (!dbBack) {
    videoLikeModel = new VideoLike({
      like: 1,
      user: userId,
      video: videoId
    })
    await videoLikeModel.save()
  } else {
    if (dbBack.like === 1) {
      isLike = false
      await dbBack.deleteOne()
    } else {
      dbBack.like === 1
      await dbBack.save()
    }
  }

  video.likeCount = await VideoLike.countDocuments({
    video: videoId,
    like: 1
  })

  video.dislikeCount = await VideoLike.countDocuments({
    video: videoId,
    like: -1
  })

  await video.save()

  res.json({
    ...video.toJSON(),
    isLike
  })
}

// 视频不喜欢
exports.dislike = async (req, res) => {
  const { videoId } = req.params
  const userId = req.user._id

  const video = await Video.findById(videoId)
  if (!video) {
    return res.json({
      error: '视频不存在'
    })
  }

  let isDislike = true
  const dbBack = await VideoLike.findOne({
    user: userId,
    video: videoId
  })

  if (!dbBack) {
    videoLikeModel = new VideoLike({
      like: -1,
      user: userId,
      video: videoId
    })
    await videoLikeModel.save()
  } else {
    if (dbBack.like === -1) {
      isDislike = false
      await dbBack.deleteOne()
    } else {
      dbBack.like === -1
      await dbBack.save()
    }
  }

  video.likeCount = await VideoLike.countDocuments({
    video: videoId,
    like: 1
  })

  video.dislikeCount = await VideoLike.countDocuments({
    video: videoId,
    like: -1
  })

  await video.save()

  res.json({
    ...video.toJSON(),
    isDislike
  })
}

// 喜欢的视频列表
exports.likeList = async (req, res) => {
  const userId = req.user._id
  const { pageNum, pageSize } = req.body
  const list = await VideoLike.find({
    user: userId,
    like: 1
  })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
  const total = await VideoLike.countDocuments({
    user: userId,
    like: 1
  })
  res.json({
    list,
    total,
    pageNum,
    pageSize
  })
}

// 删除视频
exports.delete = async (req, res) => {
  const userId = req.user._id
  const { videoId } = req.params

  const video = await Video.findById(videoId)
  if (!video) {
    return res.json({
      error: '视频不存在'
    })
  }

  if (!video.user._id.equals(userId)) {
    return res.status(403).json({
      error: '没有权限删除'
    })
  }

  await video.deleteOne()
  res.json({
    msg: '删除成功'
  })
}
