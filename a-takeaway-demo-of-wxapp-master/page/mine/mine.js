var app = getApp();
Page({
  data: {
    order: [],
    pageNo: 1,
    dropDown: true,
    pageSize: 10,
    isshow: true,
    bottomname: "数据加载中..."
  },

  onLoad: function (option) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    }),
      this.queryByOpenid(this.data.pageNo);
  },


  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },


  tapName: function (event) {
    var id = event.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '/page/order/order?id=' + id
    })

  },

  scrollbottom: function (event) {
    console.log("上拉加载!!!!");
    if (this.data.dropDown == true) {
      this.setData({
        dropDown: false
      })
      this.queryByOpenid(this.data.pageNo);
    }

  },

  srollertop: function () {
    console.log("下拉刷新!!!!");
    this.setData({
      order: [],
    })
    this.queryByOpenid(1);
  },

  queryByOpenid: function (pageNo) {
    this.setData({
      isshow: false
    })
    var that = this;
    wx.request({
      url: app.globalData.url,
      data: {
        m: 'smallapporder',
        c: 'SmallAppOrder',
        a: 'queryOrdersByOpenid',
        openid: app.globalData.openid,
        pageNo: pageNo,
        pageSize: that.data.pageSize,
      },
      success: function (res) {
        var order1 = that.data.order;
        if (pageNo == 1){
          order1 = [];
        }
        var order2 = res.data;
        for (var i = 0; i < order2.length; i++) {
          var order = order2[i];
          order1.push(order);
        }
        if (order2.length == that.data.pageSize) {
          that.setData({
            pageNo: pageNo + 1,
            isshow: true,
            dropDown: true,
          })
        } else {
          that.setData({
            isshow: false,
            bottomname: "到底了...",
            dropDown: false,
          })
        }

        that.setData({
          order: order1,
        })
      }
    })
  }
});

