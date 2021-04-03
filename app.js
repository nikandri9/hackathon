// app.js
let config = require('./keys')

App({
  onLaunch() {

    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)
     // 应用名称: {{app_name}}
    wx.BaaS.init(config.appKey)
    
    
  },
  globalData: {
    userInfo: null
  }
})
