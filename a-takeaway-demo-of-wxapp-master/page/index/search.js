var app = getApp();
var server = require('../../utils/server');
Page({
  data: {
    filterId: 1,
    searchWords: '',
    placeholder: '黄焖鸡米饭',
    shops: [],
    isshow: true,
    pageNo: 1,
    pageSize: 10,
  },
  onLoad: function () {
    var self = this;
  },
  onShow: function () {
 
  },
  inputSearch: function (e) {
    this.setData({
      searchWords: e.detail.value
    });
  },
  /**
    * 根据搜索框来进行查询数据
    */
  doSearch: function (e) {

    var that = this;
    var shopmsg = [];
    var search = this.data.searchWords;
    //调用搜索
    that.queryAllSeeler(that.data.pageNo);
  },

  scrolltolower: function () {
    var that = this;
    var shops1 = app.globalData.shops1;
    var shops = this.data.shops;
    for (var i = 0; i < shops1.length; i++) {
      shops.push(shops1[i]);
    }
    that.setData({
      isshow: false,
      shops: shops
    });
  },

  queryAllSeeler: function (pageNo) {
    console.log("模糊查询");
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 1500
    })
    var that = this;
    that.setData({
      isshow: false,
    })
    var shopmsg = that.data.shops;
    wx.request({
      url: app.globalData.url,
      data: {
        m: 'smallapporder',
        c: 'SmallAppOrder',
        a: 'queryAllSeeler',
        pageNo: pageNo,
        pageSize: that.data.pageSize,
        likeName: that.data.searchWords,
      },

      success: function (res) {

        for (var i = 0; i < res.data.length; i++) {
          var shop = res.data[i];
          shopmsg.push(shop);
        }
        if (res.data.length == that.data.pageSize) {
          that.setData({
            shops: shopmsg,
            pageNo: that.data.pageNo + 1,
            isshow: true,
            toptrue: true
          });
        } else {
          that.setData({
            shops: shopmsg,
            bottomname: '更多窗口接入中,敬请期待...',
            isshow: false,
            toptrue: false
          })
        }

      },

    })

  },


  tapFilter: function (e) {
    switch (e.target.dataset.id) {
      case '1':
        this.data.shops.sort(function (a, b) {
          return a.id > b.id;
        });
        break;
      case '2':
        this.data.shops.sort(function (a, b) {
          return a.sales < b.sales;
        });
        break;
      case '3':
        this.data.shops.sort(function (a, b) {
          return a.distance > b.distance;
        });
        break;
    }
    this.setData({
      filterId: e.target.dataset.id,
      shops: this.data.shops
    });
  }
});

