var app = getApp();
var server = require('../../utils/server');
Page({
  data: {
    goods: [],
    cart: {
      count: 0, //总共的数量
      total: 0, //总共的价格
      list: {}  //选择的食物的id 以及数量
    },
    showCartDetail: false,
    pageNo: 1,
    pageSize: 10,
    shopId: null,
    topdown: true,
    isshow: true,
    bottomname: "数据加载中...",
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      shopId: options.id
    })
    wx.request({
      url: app.globalData.url,
      data: {
        m: 'smallapporder',
        c: 'SmallAppOrder',
        a: 'querySeelerById',
        id: that.data.shopId
      },
      success: function (res) {
        that.setData({
          shop: res.data
        })
      },
    })
    that.requestFoodsBySeelerId(that.data.shopId, 1);

  },
  bindbottom() {
    this.setData({
      goods: [],
    })
    this.requestFoodsBySeelerId(this.data.shopId, 1);
  },
  bindtop: function () {
    if (this.data.topdown == true) {
      this.setData({
        topdown: false,
        isshow: false,
      })
      this.requestFoodsBySeelerId(this.data.shopId, this.data.pageNo);
    }
  },
  //根据店铺id查询食物列表
  requestFoodsBySeelerId: function (id, pageNo) {
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 500
    })
    var that = this;
    wx.request({
      url: app.globalData.url,
      data: {
        m: 'smallapporder',
        c: 'SmallAppOrder',
        a: 'queryFoodsBySeelerId',
        id: id,
        pageNo: pageNo,
        pageSize: that.data.pageSize,
      },
      success: function (res) {
        var goods1 = that.data.goods;
        var goods2 = res.data;
        if (goods2.length > 0) {
          for (var i = 0; i < goods2.length; i++) {
            var good = goods2[i];
            goods1.push(good);
          }
        }
        if (goods2.length == that.data.pageSize) {
          that.setData({
            pageNo: pageNo + 1,
            topdown: true,
            isshow: true,
          })
        } else {
          that.setData({
            topdown: false,
            isshow: false,
            bottomname: "我是有底线的...",
          });

        }
        that.setData({
          goods: goods1,
        });
      },

    })
  },


  onShow: function () { },
  //点击食物的加号
  tapAddCart: function (e) {
    //传入食物id,调用添加方法
    this.addCart(e.target.dataset.id, e.target.dataset.rownumber - 1);
  },
  tapAddfood: function (e) {
    //传入食物id,调用添加方法
    this.addCart(e.target.dataset.foodid, e.target.dataset.id);
  },

  //减去一种食物
  tapReduceCart: function (e) {
    this.reduceCart(e.target.dataset.foodid, e.target.dataset.id);
  },
  //添加到购物车的方法
  addCart: function (id, RowNumber) {
    var that = this;
    //如果这种食物的id,赋值给num,如果没有就是0
    var food = this.data.cart.list[id];
    if (food != null) {
      food.num += 1;
      that.data.cart.list[id] = food;
      that.countCart(id);
    } else {
      wx.request({
        url: app.globalData.url,
        data: {
          m: 'smallapporder',
          c: 'SmallAppOrder',
          a: 'querySellerFoodById',
          id: id
        },
        success: function (res) {
          food = res.data;
          food.num = 1;
          that.data.cart.list[id] = food;
          that.countCart(id);
        },
        complete: function (res) {
          console.log("根据食物id查询食物金额", res.data);
        }
      })
    }


  },
  //减去一种食物
  reduceCart: function (id, RowNumber) {
    var food = this.data.cart.list[id];
    if (food.num <= 1) {
      // this.data.cart.list.splice(RowNumber,1);
      delete this.data.cart.list[id];
    } else {
      this.data.cart.list[id].num = this.data.cart.list[id].num - 1;
    }
    this.subtraction(id);
  },
  //计算总的数量和价格
  countCart: function (id) {
    var that = this;
    var count = that.data.cart.count;
    var total = that.data.cart.total;
    //TODO 通过食物id查找食物的金额
    wx.request({
      url: app.globalData.url,
      data: {
        m: 'smallapporder',
        c: 'SmallAppOrder',
        a: 'querySellerFoodById',
        id: id
      },
      success: function (res) {
        var goods = res.data;
        count += 1;
        total = Number(total) + Number(goods.je * 1);
        total = total.toFixed(2);
        //  count += that.data.cart.list[id];
        //  total += goods.je * that.data.cart.list[id];
        that.data.cart.count = count;
        that.data.cart.total = total;
        that.setData({
          cart: that.data.cart
        });
      },
      complete: function (res) {
        console.log("根据食物id查询食物金额", res.data);
      }
    })
  },
  subtraction: function (id) {
    var that = this;
    var count = that.data.cart.count;
    var total = that.data.cart.total;
    //TODO 通过食物id查找食物的金额
    wx.request({
      url: app.globalData.url,
      data: {
        m: 'smallapporder',
        c: 'SmallAppOrder',
        a: 'querySellerFoodById',
        id: id
      },
      success: function (res) {
        var goods = res.data;
        count -= 1;
        total = Number(total) - Number(goods.je * 1);
        total = total.toFixed(2);
        //  count += that.data.cart.list[id];
        //  total += goods.je * that.data.cart.list[id];
        that.data.cart.count = count;
        that.data.cart.total = total;
        that.setData({
          cart: that.data.cart
        });
      },
      complete: function (res) {
        console.log("根据食物id查询食物金额", res.data);
      }
    })
  },
  //滚动时触发
  onGoodsScroll: function (e) {
    if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }

    // var scale = e.detail.scrollWidth / 570,
    //   scrollTop = e.detail.scrollTop / scale,
    //   h = 0,
    //   classifySeleted,
    //   len = this.data.goodsList.length;
    // this.data.goodsList.forEach(function (classify, i) {
    //   var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
    //   if (scrollTop >= h - 100 / scale) {
    //     classifySeleted = classify.id;
    //   }
    //   h += _h;
    // });
  },

  //点击分类之后,跳转到相应的食物列表
  tapClassify: function (e) {
    var id = e.target.dataset.id;
    console.log("子元素的id" + id);
    this.setData({
      classifyViewed: id
    });
    var self = this;
    setTimeout(function () {
      self.setData({
        classifySeleted: id
      });
    }, 100);
  },
  showCartDetail: function () {
    this.setData({
      showCartDetail: !this.data.showCartDetail
    });
  },
  hideCartDetail: function () {
    this.setData({
      showCartDetail: false
    });
  },
  submit: function (e) {
    //购物车相关信息
    var foods = this.data.cart;
    //店铺相关信息
    var shop = this.data.shop;
    wx.request({
      url: app.globalData.url,
      data: {
        m: "smallapporder",
        c: "SmallAppOrder",
        a: "placeOrder",
        foods: foods,
        shop: shop,
        openid: app.globalData.openid,
        nickName: app.globalData.userInfo.nickName,
      },
      success: function (res) {
        console.log("结算请求返回数据", res);
        var restaurantorders = res.data.restaurantorders;
        if (!restaurantorders.length == 0) {
          wx.showToast({
            title: '下单成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              wx.redirectTo({
                url: '/page/order/order?id=' + restaurantorders
              })
            }
          })

        } else {
          wx.showToast({
            title: '下单失败',
            icon: 'warn',
            duration: 2000
          })
        }

      }
    })


    // wx.showModal({
    //   showCancel: false,
    //   title: '恭喜',
    //   content: '下单成功！',
    //   success: function (res) {
    //     if (res.confirm) {
    //       wx.redirectTo({
    //         url: '/page/order/order'
    //       })
    //     }
    //   }
    // })


    //微信支付暂时不用
    // wx.requestPayment({
    //   'timeStamp': res.data.timeStamp,
    //   'nonceStr': res.data.nonceStr,
    //   'package': res.data.package1,
    //   'signType': res.data.signType,
    //   'paySign': res.data.paySign,
    //   'success': function (res) {
    //     console.log("支付成功,然后页面跳转", restaurantorders);
    //     wx.redirectTo({
    //       url: '/page/order/order?id='+restaurantorders
    //     })
    //   },
    //   'fail': function (res) {
    //     console.log("支付失败,然后模拟页面跳转", restaurantorders);
    //     wx.redirectTo({
    //       url: '/page/order/order?id='+restaurantorders
    //     })
    //   }
    // })
  }
});

