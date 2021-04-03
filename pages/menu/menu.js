// pages/menu/menu.js
const app = getApp()

Page({

  data: {
    restaurant: null,
    meals: null,
    orders: [],
    currentUser: null,
    count: 0,
    totalPrice: 0
  },


  onLoad: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo,
      totalPrice: app.globalData.totalPrice
    })

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
        this.calculatePrice()
      }, (err) => {
        console.log('order failed saving', err)
      }
    )
  },

  calculatePrice() {
    let Order = new wx.BaaS.TableObject('orders_hack')
    const self = this
    Order.expand(['meal_id']).find().then(
      (res) => {
        console.log('You have meals', res);
        self.setData({
          orders: res.data.objects
        })
        const myOrders = this.data.orders
        let totalPrice = 0;
        for (let i = 0; i < myOrders.length; i += 1 ) {
          let number = myOrders[i].count
          let price = myOrders[i].meal_id.price
          console.log(number)
          console.log(price)
          totalPrice = totalPrice + (number * price)
        }
        console.log(totalPrice)
        this.setData({totalPrice})
        wx.setStorageSync('totalPrice', totalPrice)
      },
      (err) => {
        console.log('err', err)
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