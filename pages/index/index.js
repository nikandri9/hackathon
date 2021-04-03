// index.js
// 获取应用实例
const app = getApp()

//start of page
Page({

  // start of data
  data: {
    dinerProfile: {},
    // userInfo: userInfo: wx.getStorageSync('userInfo')
  },
  // end of data


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
    }


// end of page
})