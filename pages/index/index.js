// index.js
// 获取应用实例
const app = getApp()

//start of page
Page({

  // start of data
  data: {
    dinerProfile: {},
    currentUser: null
  },
  // end of data


// start of getting res profile
  onLoad() {
    this.setData({
      currentUser: app.globalData.userInfo
    })
    
    const self = this;
    let restaurants = new wx.BaaS.TableObject("restaurant_hack")
    restaurants.find().then(
      (res) => {
        console.log("res_hack_find",res)
        self.setData({
          dinerProfile: res.data.objects[0]
        })
      })
    },
// end of getting res profile

userInfoHandler: function(userInfo) {
  let self = this
  wx.BaaS.auth.loginWithWechat(userInfo).then(
    (res) => {
    console.log('userInfo', res);
    self.setData({currentUser: res});
    wx.setStorageSync('userInfo', res)
    },
    err => {
      console.log('something went wrong!', err)
  })
},

goToDiner: function(){
  wx.navigateTo({
    url: '/pages/menu/menu',
  })
}





// end of page
})