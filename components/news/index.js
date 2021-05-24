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
    getPage(){
      api.monmentList({
        page:this.data.page,
        per_page:this.data.per_page,
        keyword:this.data.keyWord,
        type:"follower"
      }).then(res=>{
        this.setData({
          listData:res.data.data.data
  
        })
  
      })
  
    },

  },
  pageLifetimes: {
    load(){
      console.log("发现")

    },
    show() {
      this.getPage()
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  }
})