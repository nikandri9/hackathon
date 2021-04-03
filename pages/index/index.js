// index.js
// 获取应用实例
const app = getApp()

//start of page
Page({

  // start of data
  data: {
    dinerProfile: {},
    userInfo: wx.getStorageSync('userInfo')
  },
  // end of data


// start of getting res profile
  onLoad: function (res) {
    console.log("onload",res)
    let page = this
    let restaurants = new wx.BaaS.TableObject("restaurant_hack")
    restaurants.find().then(
      (res) => {
        console.log("res_hack_find",res)
        page.setData({
          dinerProfile: res.data.objects[0]
        })
      })
    },
// end of getting res profile

userInfoHandler: function (data) {
  let page = this
  wx.BaaS.auth.loginWithWechat(data).then(
    (res) => {
      console.log("log-in",res)
      page.setData({
        userInfo: res
      })
      wx.setStorageSync('userInfo', res)
      // getApp().globalData.userInfo = res
    }
  )
},

goToDiner: function(){
  wx.navigateTo({
    url: '/pages/menu/menu',
  })
}





// end of page
})