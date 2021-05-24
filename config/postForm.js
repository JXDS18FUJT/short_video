import config from './index';
module.exports =function(url,obj){
  console.log(obj)
 return new Promise(
   function(resolve,reject){
    let token= wx.getStorageSync("token")||""
    wx.uploadFile({
      url:config.host+url,
      filePath:obj.filePath,
      name:"file",
      formData:obj.formData,
      header:{
        "Authorization":"Bearer "+token,
        "token":token
      },
      success:(res)=>{
        res.data = JSON.parse(res.data)
        resolve(res)
      },
      fail:(error)=>{
        reject(error)

      }
    })
   },

)
}
