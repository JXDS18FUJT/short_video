var app = getApp();
const api = require("./../config/api")
Component({
    data: {
        selected: 0,
        color: "rgba(255,255,255,0.7)",
        selectedColor: "#FFF",
        isIndex: !0,
        user:{
            text:"我的",
            path:"/pages/user/user"
        },
        extra:{
            text:"首页",
            path:"/pages/index/index"
        },
        list: [{
            text:"发现",
            path:"/pages/news/index"
        },{
            text:"我的",
            path:"/pages/user/merchant"
        }]
    },
    properties:{
        selected : {
            type: Number
          }
    },
    ready: function() {
        api.pubMp_barInfo().then(res=>{
            if(res.data.data.length==0){
                return 
            }
            this.setData({
                list:res.data.data
            })
        })

 
    },
    onShow:function(){

    },
    methods: {
        switchTab: function(t) {
            let that =this
            let token = wx.getStorageSync('token')||''
            let userMerchant = wx.getStorageSync('userInfo').user_merchant
            getApp().globalData.selected = parseInt(t.currentTarget.dataset.index)
            console.log('商户的属性',userMerchant)
            if(parseInt(t.currentTarget.dataset.index)==(this.data.list.length-1)&&!token){
                wx.switchTab({
                    url: '/pages/user/user',
                })
            }
            else if(parseInt(t.currentTarget.dataset.index)==(this.data.list.length-1)&&!userMerchant){
            
                wx.switchTab({
                    url: '/pages/user/user',
                })
            }
            else{
                wx.switchTab({
                    url: t.currentTarget.dataset.path,
                })
            }
  
        },
    }
});