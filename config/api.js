import fly from './fly.js'
import postForm from './postForm'
// 获取视频地址
export const videoList = query=>{
  return fly.get('api/video/list',query)
}
// 获取视频信息
export const v1VideoInfo = query=>{
  return fly.get('v1/videoInfo',query)
}
// 获取店铺信息
export const v1ShopInfo = query=>{
  return fly.get('v1/shopInfo',query)
}
//微信登录
export const authWxlogin = query=>{
  return fly.post('api/auth/wxlogin',query)
}
//解析微信电话
export const userUpdatePhoneByWx = query=>{
  return fly.post('api/user/updatePhoneByWx',query)
}

//获取用户的信息
export const userInfo = query=>{
  return fly.post('api/user/info',query)
}

//微信记录的列表
export const record_to_wxList = query=>{
  return fly.post('api/record_to_wx/list',query)
}
//电话的记录
export const record_to_phoneList = query=>{
  return fly.get('api/record_to_phone/list',query)
}
//记录video的微信访问
export const  recordVideo_to_wx = query=>{
  return fly.get('api/record/video_to_wx',query)
}
//记录video的电话
export const  recordVideo_to_phone= query=>{
  return fly.get('api/record/video_to_phone',query)
}
//记录video的观看
export const  recordVideo_view= query=>{
  return fly.post('api/record/video_view',query)
}

//记录video的分享
export const recordVideo_share = query=>{
  return fly.get('api/record/video_share',query)
}
//关注别人
export const followerFollow = query=>{
  return fly.get('api/follower/follow',query)
}
// 我的关注列表
export const followerMyFollower = query=>{
  return fly.get('api/follower/myFollower',query)
}
//删除关注
export const followerDel = query=>{
  return fly.post('/api/follower/del',query)
}
//上传视频
export const uploadVideo = query=>{
  return postForm('/api/upload/video',query)

}

//上传图片
export const uploadImage = query=>{
  return postForm('/api/upload/image',query)

}
//上传更新编辑视频
export const videoUpdate = query=>{
  return fly.post('/api/video/update',query)

}

//上传添加视频
export const videoAdd = query=>{
  return fly.post('/api/video/add',query)
}
//我的视频
export const videoMy = query=>{
  return fly.get('api/video/my',query)
}
//删除视频
export const videoDel = query=>{
  return fly.post('api/video/del',query)
}
//发现我的
export const monmentMy = query=>{
  return fly.post('api/moment/my',query)
}
//发现(大众的)
export const monmentList = query=>{
  return fly.post('/api/moment/list',query)
}
//动态新增
export const momentAdd = query=>{
  return fly.post('/api/moment/add',query)
}

//动态的路由
export const pubMp_barInfo = query=>{
  return fly.post('/pub/mp_bar/info',query)
}

