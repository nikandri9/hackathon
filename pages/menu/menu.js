// pages/menu/menu.js
const app = getApp()

Page({

  data: {
    restaurant: null,
    meals: [],
    currentUser: null,
    index: 0,
  },


  onLoad: function (options) {
    let Meals = new wx.BaaS.TableObject('meals_hack')
    const self = this

    Meals.get(options.id).then(
      (res) => {
        console.log('res', res);
        self.setData({
          meals: res.data
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
      }
    )
  },
})