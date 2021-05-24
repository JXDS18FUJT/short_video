import config from './index';
import Fly from './wx.js';

const fly = new Fly();
const app = getApp();

// 实例级配置
fly.config.baseURL = config.baseURL
fly.config.headers = { ...config.header }
fly.config.timeout = 20000

// 请求拦截器

fly.interceptors.request.use(
  
  (request) => {
    let token=app.globalData.token || wx.getStorageSync("token")
    let lat=app.globalData.lat   
    let lng=app.globalData.lng
    let location = wx.getStorageSync('location')
    request.headers["Authorization"]="Bearer "+token
    request.headers["token"]=token
    request.headers["latitude"]=location.latitude
    request.headers["longitude"]=location.longitude
    request.headers["sys_type"]="xcx"
    return request;
  }
)
// 返回拦截器
fly.interceptors.response.use(
  (response) => {
    if(response.data.code==401){
      wx.showModal({
        content:"您还未登录",
        cancelColor: '#333333',
        confirmText:"我要登录",
        cancelText:"取消",
        confirmColor:"#3377ff"
      }).then(res=>{
        if(res.confirm){
          wx.navigateTo({
            url: '/pages/loginEntrance/loginEntrance',
          })
        }
      })
   
        return

    }
    if(response.data.code==400){
      
      wx.showToast({
        title: response.data.msg,
        icon:"none"
      })
  }
    if(response.data.code==300){
      wx.showToast({
        title: response.data.msg,
        icon: 'none',
        duration: 1000
      })
  }
    // 刷新token
    if (response.headers.token && response.headers.token.length) {
      app.globalData.token = response.headers.token[0];
    }
  
    return response;
  },

  // 发生网络错误后会走到这里
  (err) => {
    wx.hideLoading();
    setTimeout(() => {
      wx.showToast({ title: '网络错误', icon: 'none' });
    }, 300)
    return Promise.reject(err);
  }
)


export default fly;