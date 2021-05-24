// pages/loginEntrance/loginEntrance.js
// 获取应用实例
const app = getApp()
// 获取应用实例
const api = require("../../config/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadIcon:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //微信登录
  wxLogin(e){
    wx.getUserProfile({
      desc:"获取登录信息"

    }).then(info=>{
      console.log(info)
      //开始登录
      wx.login(
        {
        timeout: 1000,
        success(code){
          api.authWxlogin({
            mp_code:code.code,
            wx_nickname:info.userInfo.nickName,
            avatar:info.userInfo.avatarUrl
          }).then(res=>{
            wx.setStorageSync('userInfo', res.data.data)
            wx.setStorageSync('token', res.data.data.token)
            wx.switchTab({
              url: '/pages/index/index'
            })
          })
        }
      })

    }).catch(err=>{
      wx.showToast({
        title: '登录失败',
        icon:"none"
      })
    })

 


  },
  // 路由函数
  go(e){
    console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})