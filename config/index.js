// let ENV = 'sit' // 正式环境
let ENV = 'sit' // 测试环境sis  正式环境sit
const SYS_INFO = {
  sit: {
    host: "https://sp.gzytw.com.cn/",
    baseURL: "https://sp.gzytw.com.cn/",
    header: {
      "content-type": "application/x-www-form-urlencoded"
    }
  },
  sis: {
    host: "http://192.168.31.100:96/",
    baseURL: "http://192.168.31.100:96/",
    header: {
      "content-type": "application/x-www-form-urlencoded"
    }
  }
};
let systemInfo = wx.getSystemInfoSync()
if(systemInfo.platform != 'devtools'){
  ENV = "sit"
}

export default { ...SYS_INFO[ENV], ENV };