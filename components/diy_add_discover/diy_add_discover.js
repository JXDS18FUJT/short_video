// components/diy_edit_discover/diy_edit_discover.js
const api = require("./../../config/api")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean,
      value:false
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    fileList:[],
    addForm:{
      content:"",
      imgs:[]

    }

  },

  /**
   * 组件的方法列表
   */
  methods: {
    sendEditForm(e){
      if(this.data.addForm.imgs.length==0){
        wx.showToast({
          title: '没上传图片',
          icon:"error"
        })
        return 
      }
      api.momentAdd({
        ...this.data.addForm
      }).then(res=>{
        this.setData({
          show:false
        })
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
      let urlObj = {
        url: res.data.data,
        name:`图片1`
      }
      this.setData({
        "addForm.imgs":[...this.data.addForm.imgs,res.data.data],
        fileList:[...this.data.fileList,urlObj]
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
