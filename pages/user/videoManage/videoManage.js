// pages/user/videoManage/videoManage.js
const api = require("./../../../config/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    isShowAddVideoSelect:false,
    isShowAddVideo:false,
    videoStatusColumns: [
      { text: '显示',value:1 },
      { text: '隐藏',value:0 }
    ],
    page:1,
    per_page:10,
    keyWord:"",
    editItem:{

    },

  },
  sendEditForm(e){
    api.videoUpdate({
      ...this.data.editItem
    }).then(res=>{
      if(res.data.code==200){
        this.setData({
          isShowAddVideo:false
        })
        wx.showToast({
          title: '成功',
        })

      }
    })

  },
  setEditFormVideoStatus(e){
    this.setShow(e)
    console.log(e)
    this.setData({
      "editItem.is_show":e.detail.value.value
    })


  },
    //更新更新表单的方法
    updateEditFormInput(e){
      console.log(e)
      
      let key = "editItem"+'.'+e.currentTarget.dataset.key
      this.setData({
        [key]:e.detail
      })
    },
        //更新更新表单的方法
        updateFormInput(e){
          console.log(e)
          
          let key = e.currentTarget.dataset.key
          this.setData({
            [key]:e.detail
          })
        },
  //上传视频便且生成fileList
uploadVideo(e){
  console.log(e,"视频已上传")
  api.uploadVideo({
    filePath:e.detail.file.url
  }).then(res=>{
    this.setData({
      "editItem.url":res.data.data,
      "editItem.videoFileList":[{
        url:res.data.data,
        name:e.detail.file.url
      }]
    }).catch(err=>{
      wx.showToast({
        title: '上传失败',
        icon:"none"
      })
    })

  })
},
//上传图片
uploadImage(e){
  api.uploadImage({
    filePath:e.detail.file.url
  }).then(res=>{
    this.setData({
      "editItem.cover":res.data.data,
      "editItem.coverFileList":[{
        url:res.data.data,
        name:e.detail.file.url
      }]
    }).catch(err=>{
      wx.showToast({
        title: '上传失败',
        icon:"none"
      })
    })

  })

},
  //创建编辑的项目
  createEditItem(e){
    e.currentTarget.dataset.item.videoFileList = [{
      name: e.currentTarget.dataset.item.title,
      url:e.currentTarget.dataset.item.url,
      type:'video'
    }]
    e.currentTarget.dataset.item.coverFileList = [{
      name:e.currentTarget.dataset.item.title,
      url:e.currentTarget.dataset.item.cover,
      type:'image'
    }]
    this.setData({
      editItem: e.currentTarget.dataset.item
    })
   

  },
//方法开始
editVideo(e){
  // this.setShow(e)
  console.log(e)
  this.setShow(e)
  this.createEditItem(e)
},
delMyVideo(e){
  console.log(e)
  wx.showModal({
    title:"删除视频",
    content:"是否删除视频"
  }).then(res=>{
    if(res.confirm){
      api.videoDel({
        video_id:[e.currentTarget.dataset.id]
      }).then(res=>{
        if(res.data.code==200){
          wx.showToast({
            title: '删除成功',
          })
        }
      })
    }
  })
  // api.videoDel({
  //   video_id:e.curren
  // })

},

setShow:function(e){
  this.setData({
      [e.currentTarget.dataset.key]:!this.data[e.currentTarget.dataset.key]
  })
},
getSearch(){
  this.setData({
    page:1
  })
  this.getPage()

},
getPage(isConcat){
  api.videoMy({
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