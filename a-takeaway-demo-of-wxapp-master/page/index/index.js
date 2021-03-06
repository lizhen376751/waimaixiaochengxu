var app = getApp();
var server = require('../../utils/server');
Page({
  data: {
    filterId: 1,
    address: '定位中…',
    isshow: true,
    banners: [
      {
        id: 3,
        img: 'http://file.youboy.com/a/122/74/62/4/18990844.jpg',
        url: '',
        name: '百亿巨惠任你抢'
      },
      {
        id: 1,
        img: 'http://www.foodaily.com/file/upload/201408/14/11-02-01-55-101.jpg',
        url: '',
        name: '告别午高峰'
      },
      {
        id: 2,
        img: 'http://bpic.ooopic.com/16/12/38/16123893-4f9c474840cdeafe72c6fdc574dc1790-1.jpg',
        url: '',
        name: '金牌好店'
      }
    ],
    shops: [],
    pageNo: 1,
    pageSize: 10,
    bottomname: '努力加载中…',
    toptrue: true,
    placeholder: "黄焖鸡米饭",
    searchWords: '黄焖鸡米饭',
  },
  onLoad: function () {
    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    }),
    self.queryAllSeeler(1,"");
    
  },
  //下拉刷新
  onPullDownRefresh: function () {
    console.log("下拉刷新");
    this.setData({
      shops: [],
    })
    this.queryAllSeeler(1, "");
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    console.log('加载更多')
    if (this.data.toptrue == true) {
      this.setData({
        toptrue: false,
      })
      this.queryAllSeeler(this.data.pageNo, this.data.searchWords)
    }
  },

  doSearch: function () {
    this.setData({
      shops: [],
    });
    this.queryAllSeeler(1, this.data.searchWords);
  },
  inputSearch: function (e) {
    this.setData({
      searchWords: e.detail.value
    });
    if (this.data.searchWords.length == 0) {
      this.setData({
        shops: [],
      });
      this.queryAllSeeler(1,"");
    }
  },

  onScroll: function (e) {
    if (e.detail.scrollTop > 100 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 100 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }
  },
  tapSearch: function () {
    wx.navigateTo({ url: 'search' });
  },


  tapName: function (e) {
    console.log(e);
    var that = this;
    var id = e.currentTarget.dataset.id;
    var opneid =
      wx.request({
        url: app.globalData.url,
        data: {
          m: 'smallapporder',
          c: 'SmallAppOrder',
          a: 'queryUserInfoBindByOpenid',
          openid: app.globalData.openid,
        },
        success: function (res) {
          console.log("根据openid查询是否绑定", res.data);
          var data = res.data;
          var tourl;
          //如果已经绑定就跳转至原页面
          if (data == true) {
            tourl = '/page/shop/shop?id=' + id
          }
          //如果没有绑定则跳转至绑定页面
          if (data == false) {
            tourl = '/page/bind/bind'
          }
          wx.navigateTo({
            url: tourl
          })
        }
      })

  },
  toprequest: function () {
    this.setData({
      shops: [],
    })
    this.queryAllSeeler(1);
  },
  bottomrequest: function (e) {
    if (this.data.toptrue == true) {
      this.setData({
        toptrue: false,
      })
      this.queryAllSeeler(this.data.pageNo, this.data.searchWords)
    }

  },
  queryAllSeeler: function (pageNo,searchWords) {
    wx.showToast({
      title: '数据加载中...',
      icon: 'loading',
      duration: 1000
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
        likeName: searchWords,
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

  }

});

