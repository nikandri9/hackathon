// app.js
let config = require('./key')

App({
  onLaunch() {

    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)
     // 应用名称: {{app_name}}
    wx.BaaS.init(config.appKey)
    
    const self = this
    wx.BaaS.auth.getCurrentUser().then(
      (res) => {
      self.globalData.userInfo = res;
      wx.setStorageSync('userInfo', res);
      }
    )
    },
    globalData: {
      userInfo: wx.getStorageSync('userInfo'),
      totalPrice: wx.getStorageSync('totalPrice')
    }

})