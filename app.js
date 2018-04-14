//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.request({
            url: 'http://172.28.11.40:8000/users/getuserinfo/',
            data: { "data": res.code },  // the code is a mock one
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              console.log('success')
              that.globalData.openid = res.data.openid
              console.log(res.data.openid)
              // success
            },
            fail: function (res) {
              console.log('fail')
              console.log(res)
              // fail
            },
            complete: function (res) {
              console.log('complete')
              console.log(res)
              // complete
            }
          })
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              console.log(res.encryptedData)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    openid: null
  }
})
// App({
//   onLaunch: function () {
//     wx.login({
//       success: function (res) {
//         if (res.code) {
//           //发起网络请求
//           wx.request({
//             url: 'https://test.com/onLogin',
//             data: {
//               code: res.code
//             }
//           })
//         } else {
//           console.log('登录失败！' + res.errMsg)
//         }
//       }
//     });
//   }
// })