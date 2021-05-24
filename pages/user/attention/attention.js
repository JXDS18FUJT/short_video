// pages/user/attention/attention.js
const api = require('./../../../config/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    per_page:10,
    keyWord:"",
    listData:[]

  },
  getSearch(){
    this.setData({
      page:1
    })
    this.getPage()

  },
  getPage(isConcat){
    api.followerMyFollower({
      page:this.data.page,
      per_page:this.data.per_page,
      keyword:this.data.keyWord
    }).then(res=>{
      console.log(res)
      if(isConcat){
        this.setData({
          listData:[...this.data.listData,...res.data.data.data]
        })
      }
      else{
        this.setData({
          listData:res.data.data.data
        })
      }
   
    })

  },
  cancelAttention(e){
    console.log(e)
    let index = Number(e.currentTarget.dataset.index)
    
    wx.showModal({
      title:"取消关注",
      content:"确定取消关注吗？",
    }).then(res=>{
      if(res.confirm){
        api.followerDel({
          to_user_id:e.currentTarget.dataset.id
        }).then(res=>{
          if(res.data.code==200){
            this.getPage()
            wx.showToast({
              title: '取消关注',
            })
          }
        })
      }
    })
    



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPage()

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