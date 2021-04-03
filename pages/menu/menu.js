// pages/menu/menu.js
const app = getApp()

Page({

  data: {
    restaurant: null,
    meals: null,
    currentUser: null,
    index: 0,
  },


  onLoad: function (options) {
    let Meals = new wx.BaaS.TableObject('meals_hack')
    const self = this

    Meals.find().then(
      (res) => {
        console.log('res', res);
        self.setData({
          meals: res.data.objects
        })
      },
      (err) => {
        console.log('err', err)
      }
    )

    this.setData({
      currentUser: app.globalData.userInfo
    })
  },

  


  onReady: function () {

  },


  onShow: function () {

  },

  createOrder: function(e) {
    console.log('create order', e)
    let Order = new wx.BaaS.TableObject('orders_hack')
    let newOrder = Order.create()
    newOrder.set({
      meal_id: e.currentTarget.dataset.id,
      user_id: this.data.currentUser.id,
      count: 1
    })

    newOrder.save().then(
      (res) => {
        console.log('Your order is saved', res)
        wx.showToast({
          title: 'Saved',
        })
      }, (err) => {
        console.log('order failed saving', err)
      }
    )
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
  },

  goToOrder: function() {
    wx.navigateTo({
      url: '/pages/myorder/myorder',
    })
  }
})