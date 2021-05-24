// app.js

App({
  
  onLaunch() {
                //获取当前的定位
                  wx.getLocation({
                    altitude: 'altitude',
                    success:function(res){
                      console.log(res)
                      wx.setStorageSync('location', res)

                    }
                  })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    selected:0
  }
})
