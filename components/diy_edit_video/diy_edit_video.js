// components/diy_edit_video/diy_edit_video.js
const api = require("./../../config/api")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    editItem: {
      type: Object,
      value: {
        is_show:1
      },
    }, //编辑item
    formType: {
      type: String,
      value: 'edit',
    }, //类型
    show:{
      type:Boolean,
      value:false
    }//是否展示


  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowAddVideoSelect:false,
    isShowAddVideo:false,
    videoStatusColumns: [
      { text: '显示',value:1 },
      { text: '隐藏',value:0 }
    ],
    editItem:{

    },

  },
  /**
   * 组件的方法列表
   */
  methods: {

    sendEditForm(e){
      console.log(this.data.type)
      if(this.data.formType=='edit'){
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
            var myEventDetail = {code:200,formType:'edit'} // detail对象，提供给事件监听函数
            var myEventOption = {composed:true} // 触发事件的选项
            this.triggerEvent('send', myEventDetail, myEventOption)
    
          }
        })

      }
      else if(this.data.formType=="add"){
        api.videoAdd({
          ...this.data.editItem
        }).then(res=>{
          if(res.data.code==200){
            this.setData({
              isShowAddVideo:false
            })
            
            wx.showToast({
              title: '成功',
            })
            var myEventDetail = {code:200,formType:'add'} // detail对象，提供给事件监听函数
            var myEventOption = {composed:true} // 触发事件的选项
            this.triggerEvent('send', myEventDetail, myEventOption)
    
          }
        })

      }

  
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

  }
})
