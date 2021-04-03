
const app = getApp()

Page({

  data: {
    restaurant: null,
    meals: null,
    orders: [],
    currentUser: null,
    index: 0,
  },


  onLoad: function (options) {
    let Orders = new wx.BaaS.TableObject('orders_hack')
    const self = this

    Orders.expand('meal_id').find().then(
      (res) => {
        console.log('res', res);
        self.setData({
          orders: res.data.objects
        })
      },
      (err) => {
        console.log('err', err)
      }
    )

    // let Meals = new wx.BaaS.TableObject('meals_hack')
    // let query = new wx.BaaS.Query();
    // query.compare('meal_id', '=', options.id)
    // Meals.setQuery(query).find().then(
    //   (res) => {
    //     self.setData({
    //       meals: res.data.objects
    //     })
    //   },
    //   (err) => {
    //     console.log('err', err)
    //   }
    // )

    this.setData({
      currentUser: app.globalData.userInfo
    })
  },

  


  onReady: function () {

  },


  onShow: function () {

  },

  

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
  }
})