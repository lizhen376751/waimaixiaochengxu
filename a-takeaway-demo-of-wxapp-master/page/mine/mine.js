var app = getApp();
Page({
  data: {
    order: [],
    pageNo: 1,
    dropDown: true,
    pageSize: 10,
    isshow: true,
    bottomname: "数据加载中...",
    userInfo: app.globalData.userInfo
  },

  onLoad: function (option) {
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo
    })
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
  //下拉刷新
  onPullDownRefresh: function () {
    console.log("下拉刷新");
    this.setData({
      order: [],
    })
    this.queryByOpenid(1);
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    console.log('加载更多')
    if (this.data.dropDown == true) {
      this.setData({
        dropDown: false
      })
      this.queryByOpenid(this.data.pageNo);
    }
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
        a: 'queryOrdersByOpenid',
        openid: app.globalData.openid,
        pageNo: pageNo,
        pageSize: that.data.pageSize,
      },
      success: function (res) {
        var order1 = that.data.order;
        if (pageNo == 1) {
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
        });
        console.log(order1.length == 0)
        if (pageNo == 1 && order1.length==0){
          that.setData({
            bottomname: "暂无订单",
          });
        }
       
      }
    })
  }
});

