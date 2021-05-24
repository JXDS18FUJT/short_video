// pages/news/index.js
const api = require("./../../config/api")
Component({
  data: {
    page:1,
    listData:[],
    per_page:10,
    keyWord:"",
    type:"follower"


  },
  methods:{
    lookImage(e){
      let url = e.currentTarget.dataset.url
      wx.previewMedia({
        sources:[{url}]
      })

    },
    loadDiscover(e){
      wx.showLoading({
        title: '加载中',
      })
     this.setData({
       page:++this.data.page
     })
     wx.hideLoading({
       success: (res) => {},
     })
    
     this.getPage(true)



    },
    getPage(isConcat){
      api.monmentList({
        page:this.data.page,
        per_page:this.data.per_page,
        keyword:this.data.keyWord,
        type:"follower"
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

  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {    this.getPage()},
    moved: function () { },
    detached: function () { },
  },
  pageLifetimes: {
    load(){
      console.log("发现")

    },
    show() {
      api.pubMp_barInfo().then(res=>{
        if(res.data.data.length==0){
          this.getTabBar().setData({
            selected: 0
          })
            return 
        }
       
    })

   
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  }
})