// pages/user/wxRecord/wxRecord.js
const api = require("./../../../config/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:['','',''],
    page:1,
    keyWord:"",
    per_page:10,

  },
  getSearch(){
    this.getPage()

  },

  getPage(isConcat){
    api.record_to_wxList({
      page:this.data.page,
      per_page:this.data.per_page,
      keyword:this.data.keyWord

    }).then(res=>{
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
//复制微信号
  copyWxNo(e){
  wx.setClipboardData({
          data:e.currentTarget.dataset.text
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
    this.setData({
      page:++this.data.page
    })
    this.getPage(true)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})