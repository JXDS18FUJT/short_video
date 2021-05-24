// index.js
// 获取应用实例
const app = getApp()
// 获取应用实例

const api = require("./../../config/api")



const firstRunAppCacheKey = "firstRunApp_1";

//设置定时器发送观看数
let sendView
Component({
  methods: {
    /**
     * 准备事件
     */
    onReady() {
      let that = this;
      this.getVideoList()
      this.goDiscover()
      // this.getShopInfo()
      // this.getVideoInfo()

      wx.getSystemInfo({
        success(res){
          if (res.safeArea.top > 20) { //x及以上的异形屏top为44，非异形屏为20
            that.setData({
              hasBottomLine: true,
            })
          }
        },
        fail(err){
          console.error(err);
        }
      })


    },
    onLoad: function (a) {
      //发送第一条记录的观看
      let that = this;


      // 第一次打开页面，提示可以下滑
      if(!wx.getStorageSync(firstRunAppCacheKey)){
        that.setData({
          showGuide: true,
        })
      }


    },
    goDiscover() {
      //   api.pubMp_barInfo().then(res=>{
      //     console.log(res)
      //     if(res.data.data==="1"){

      //     }
      //     else{
      //       wx.reLaunch({
      //         url: '/pages/news/index',
      //       })

      //     }

      // })

    },
    tapToMap: function (e) {
      let name = e.currentTarget.dataset.name
      let address = e.currentTarget.dataset.adress
      let location = wx.getStorageSync('location')
      if (!location) {
        wx.getLocation({
          altitude: 'altitude',
          success: function (res) {
            wx.setStorageSync('location', res)
          }
        })
        return wx.showToast({
          title: '地址信息错误,请再次点击',
        })
      }
      wx.openLocation({
        latitude: Number(location.latitude),
        longitude: Number(location.longitude),
        scale: 18,
        name: name,
        address: address
      })
    },
    getWxCode: function () {

    },
    //关注你
    flowerYou(e) {
      let to_user_id = this.data.videoObjList[this.data.current].user.user_id
      api.followerFollow({
        to_user_id
      }).then(res => {
        if (res.data.code == 200) {
          wx.showToast({
            title: '已经关注',
          })
          let keys = this.data.videoObjList.map((item, index) => {
            this.setData({
              [`videoObjList[${index}].is_follow`]: true
            })
            return ''

          })
          console.log(keys)
          // let key = `videoObjList[${this.data.current}].is_follow`


        }
      })


    },
    //关闭海报的展示
    closePhoster() {
      this.setData({
        isShowPoster: !this.data.isShowPoster
      })


    },
    recordShare() {
      let current = this.data.current
      api.recordVideo_share({
        video_id: this.data.videoObjList[current].video_id
      }).then(res => {

      })

    },
    recordView() {
      if (this.data.videoObjList.length == 0) {
        return
      }
      let current = this.data.current
      api.recordVideo_view({
        video_id: this.data.videoObjList[current].video_id
      }).then(res => {

      })

    },
    recordPhone() {
      let current = this.data.current
      api.recordVideo_to_phone({
        video_id: this.data.videoObjList[current].video_id
      }).then(res => {

      })

    },
    recordWx() {
      let current = this.data.current
      api.recordVideo_to_wx({
        video_id: this.data.videoObjList[current].video_id
      }).then(res => {

      })

    },
    //选择分享
    selectShare: function (e) {

      this.recordShare()
      this.setData({
        isShowIntro: false
      })
      if (e.detail.icon === 'poster') {
        this.setData({
          isShowPoster: true,

        })


      }



    },
    //小程序分享
    onShareAppMessage(e) {

      if (e.form == 'button') {
        return {
          title: "分享给朋友",

        }
      }
      else {
        return {
          title: "分享到朋友圈"
        }
      }




    },
    //加载视频
    loadMoreVideo(e) {
      //加载视频
      let that = this
      if(e.detail.source == 'autoplay' || e.detail.source == 'touch'){
        if ((e.detail.current) == (this.data.videoObjList.length - 4)) {
          this.setData({
            page: ++this.data.page
          })
          this.getVideoList(true)
          //发送观看
  
  
        }
      }
      


    },
    getVideoInfo() {
      api.v1VideoInfo().then(res => {
        this.setData({
          videoInfo: res.data.data
        })
      })

    },
    getShopInfo: function () {
      api.v1ShopInfo().then(res => {
        this.setData({
          shopInfo: res.data.data
        })
      })

    },
    //获取视频列表
    getVideoList: function (isConcat) {
      let that = this
      api.videoList({
        page: this.data.page,
        per_page: this.data.per_page
      }).then(res => {
        if (res.data.data.data.length == 0) {
          // wx.showToast({
          //   title: '没有更多视频了',
          //   icon:'none'
          // })
        }

        // TODO: 这里是测试数据
        // res.data.data.data = [
        //   res.data.data.data[0],
        //   res.data.data.data[1],
        //   res.data.data.data[2],
        // ];

        if (isConcat) {
          this.setData({
            videoObjList: [...this.data.videoObjList, ...res.data.data.data]
          })


        } else {
          this.setData({
            videoObjList: res.data.data.data
          })
        }

        //然后记录定时
        if (this.data.page == 1) {
          this.sendView(this.data.videoObjList[0].video_id, 5000)
        }



      })
    },
    closeSheet(e) {
      this.setData({
        showShare: false,
        isShowIntro: true
      })

    },
    //显示状态
    setShow: function (e) {
      this.setData({
        [e.currentTarget.dataset.key]: !this.data[e.currentTarget.dataset.key]
      })
    },
    //定时记录
    sendView(video_id, seconds) {
      let that = this
      sendView = setTimeout(function () {
        api.recordVideo_view({
          video_id
        })
      }.bind(that), seconds)
    },
    swiperChange: function (t) {
      clearTimeout(sendView)
      console.log(t)
      let that = this
      if ("touch" == t.detail.source) {
        var e = this.data.current, i = t.detail.current;
        if (e == i) return;
        this.setData({
          current: i,
          currentVideoId: t.detail.currentItemId //当前的播放视频id
        })
        //停止上面和前面的视频播放
        if (this.data.current > 0) {
          wx.createVideoContext(String(that.data.videoObjList[that.data.current - 1].video_id)).pause()
          if ((that.data.current + 1) < this.data.videoObjList.length) {
            wx.createVideoContext(String(that.data.videoObjList[that.data.current + 1].video_id)).pause()
          }

        }
        else if (this.data.current == 0) {
          wx.createVideoContext(String(that.data.videoObjList[that.data.current + 1].video_id)).pause()

        }
        //视频疏导底部然后加载

        //播放视频
        wx.createVideoContext(t.detail.currentItemId).play()
        this.sendView(this.data.videoObjList[that.data.current - 1].video_id, 5000)





        // this.lazyVideo(), this.currentPlay(e, i);
      }

    },
    lazyVideo: function () {

    },
    currentPlay: function (t, e) {
      var i = this.getVideoObj("video", t);
      this.pauseVideo(i);
      var a = this.getVideoObj("video", e);
      this.playVideo(a);

    },
    eventPlay: function (e) {
      console.log(e)
      this.setData({
        playStatus: !1
      });

    },
    playVideo: function (t) {
      t && t.play();
    },
    pauseVideo: function (t) {
      t && t.pause();
    },
    deleteVideoObJ: function (t) {
      t && t.stop();
    },
    getVideoObj: function (t) {
      return wx.createVideoContext(t);
    },
    formArrayVideo: function () {
      var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [], i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : [], a = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 3, o = t.concat(e, i), s = Math.floor(o.length / a), n = o.slice(0, s * a) || [], d = o.slice(s * a, o.length) || [];
      return n.length < 1 ? {
        list: o,
        residue: []
      } : {
        list: n,
        residue: d
      };
    },
    getUserInfo: function (t) {

    },
    loginToContact: function (e) {
      var i = this;

    },
    getUserInfo() {
      api.userInfo().then(res => {
        wx.setStorageSync('userInfo', res.data.data)
        this.setData({
          userInfo: wx.getStorageSync('userInfo')
        })
      })

    },
    loginToCall: function (e) {
      let that = this
      wx.checkSession({
        success() {

          api.userUpdatePhoneByWx({
            ...e.detail
          }).then(res => {
            that.getUserInfo()
            wx.makePhoneCall({
              phoneNumber: e.currentTarget.dataset.phone,
            })
          })

          //session_key 未过期，并且在本生命周期一直有效
        },
        fail() {
          // session_key 已经失效，需要重新执行登录流程
          wx.login({
            timeout: 1000,
            success(code) {
              api.authWxlogin({
                mp_code: code.code,
              }).then(res => {
                wx.setStorageSync('userInfo', res.data.data)
                wx.setStorageSync('token', res.data.data.token)
                that.setData({
                  userInfo: res.data.data
                })
                api.userUpdatePhoneByWx({
                  ...e.detail
                }).then(res => {
                  that.getUserInfo()
                  wx.makePhoneCall({
                    phoneNumber: e.currentTarget.dataset.phone,
                  })
                })

              })
            }
          }) //重新登录
        }
      }

      ).then(res => {

      })






    },
    userAuth: function (t, e, a) {

    },
    onShareAppMessage: function () {

    },
    videoProgress: function (e) {

      this.setData({
        progress: e.detail.buffered,
      })

    },
    videoUpdate: function (e) {

      if (e.currentTarget.dataset.index !== this.data.current) {
        return
      }
      let sliderValue = e.detail.currentTime / e.detail.duration * 100;
      this.setData({
        progress: sliderValue,
      })

    },
    openInfo: function () {
      wx.navigateTo({
        url: "../mall/info?id=" + this.data.shopId
      });
    },
    openItem: function (t) {
      wx.navigateTo({
        url: "../mall/detail?item_id=" + t.currentTarget.dataset.id
      });
    },
    hideGoods: function () {
      this.setData({
        showGoods: !1
      });
    },
    tapToCall: function (e) {
      this.recordPhone()
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone
      })

    },
    tabVideo: function (e) {
      var t = this.data.playStatus, i = this.getVideoObj(String(this.data.videoObjList[this.data.current].video_id));
      t ? this.playVideo(i) : this.pauseVideo(i), this.setData({
        playStatus: !t
      });


    },
    tapToContact: function () {
      this.recordWx()
      this.setData({
        isShowWxNo: true
      })

    },
    //复制微信号
    copyWxNo(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.text
      })
    },
    //保存图片的二维码
    saveCodeImg(e) {
      if (!e.currentTarget.dataset.url) {
        return wx.showToast({
          title: '图片不存在',
          icon: "error"
        })

      }

      wx.downloadFile({
        url: e.currentTarget.dataset.url,
        timeout: 10000,
        success(res) {
          console.log(res.tempFilePath)
          wx.saveFile({
            tempFilePath: res.tempFilePath,
            success(result) {
              wx.showToast({
                title: '成功保存到本地',
              })


            }
          })

        }
      })

    },
    closeContact: function () {
      this.setData({
        showWechat: !1
      });
    },
    /**
     * 关闭初次启动引用的提示框
     */
    closeGuide: function () {
      this.setData({
        showGuide: false,
      });
      wx.setStorageSync(firstRunAppCacheKey,"no");
    },
    autoUpdate: function () {
      var e = wx.getUpdateManager();
      e.onCheckForUpdate(), e.onUpdateReady(function () {
        wx.showModal({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          success: function (t) {
            t.confirm && e.applyUpdate();
          }
        });
      });
    },
    videoClick: function () {

    }

  },
  data: {
    page: 1,
    per_page: 10,
    circular: !1,
    isShowWxNo: false, //展示微信号
    isShowPoster: false,//展示海报
    videoInfo: {
      index: 0
    },
    shareOptions: [
      [
        { name: '微信', icon: 'wechat', 'openType': 'share' },
        { name: '朋友圈', icon: 'https://img01.yzcdn.cn/vant/share-sheet-wechat-moments.png', 'openType': 'share' },

      ],
      [
        { name: '分享海报', icon: 'poster' },
      ],
    ],
    current: 0,
    playStatus: !1,
    videoObjList: {
      0: {},
      1: {},
      2: {}
    },
    paging: {
      page: 1,
      size: 9
    },
    isShowIntro: true,
    shopInfo: {},
    showAlert: !1,
    userInfo: wx.getStorageSync("userInfo"),
    showGoods: !1,
    showGuide: false,
    showShare: !1, //展示share分享

    hasBottomLine: false, //底部是否有线条，iPhoneX等需要留出距地50rpx

  },
  pageLifetimes: {
    show() {





      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
})
