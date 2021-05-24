const api = require('./../../config/api')
Component({
  data:{
    hello:"world",
    isShowAddVideoSelect:false,
    isShowTrends:false, //发布动态
    systemInfo:{}, //设备的信息
    customNavHeight:0,//单位px
    userInfo:{},
    addVideoList:[],
    videoStatusName:'显示',
    videoStatus:0,
    videoPhone:'',
    videoWxNo:'',
    videoDesc:'',
    isShowAddVideo:false,
    videoStatusColumns: [
      { text: '显示',value:1 },
      { text: '隐藏',value:0 }
    ],
  },
  methods:{
    //保存上传视频的部分
    sendAddVideo(){
      if(this.data.addVideoList.length==0){
        wx.showToast({
          title: '请上传视频',
        })
      }
      api.videoAdd({
        content:this.data.videoDesc,
        url:this.data.addVideoList[0].url,
        is_show:this.data.videoStatus

      })
      

    },
     /**
   * 获取标题栏的高度(单位px)
   */
  //展示的
  setShow:function(e){
    this.setData({
        [e.currentTarget.dataset.key]:!this.data[e.currentTarget.dataset.key]
    })
},
//上传视频
uploadVideo(e){
  console.log(e,"视频已上传")
  api.uploadVideo({
    filePath:e.detail.file.url
  }).then(res=>{
    this.setData({
      addVideoList:[{
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
  getTitleBarHeight() {
    let statusBarHeight = wx.getSystemInfoSync().statusBarHeight;
    let capsuleButtonInfo = wx.getMenuButtonBoundingClientRect();
    console.log(capsuleButtonInfo)
    let gap = capsuleButtonInfo.top+capsuleButtonInfo.height+6;
    return gap
  },
  getVideoStatus(e){
    this.setShow(e)
    console.log(e)
    this.setData({
      videoStatusName:e.detail.value.text,
      videoStatus:e.detail.value.value
    })

  },
  getMyUserInfo(){
    api.userInfo().then(res=>{
      this.setData({
        userInfo:res.data.data
      })
      wx.setStorageSync('userInfo', res.data.data)

    })
  }
  },

  pageLifetimes: {
    show() {
      let  systemInfo =  wx.getSystemInfoSync()
      this.setData({
        systemInfo:systemInfo,
        customNavHeight:this.getTitleBarHeight()
      })
      this.getMyUserInfo()
      
      
    
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        })
      }
      api.pubMp_barInfo().then(res=>{
        if(res.data.data.length==0){
          this.getTabBar().setData({
            selected: 1
          })
            return 
        }
       
    })
      
    }
  }
})