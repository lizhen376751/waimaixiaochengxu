var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
    order :[],
    pageNo:1,
    dropDown:true,
    openid:'oUpF8uMuAJO_M2pxb1Q9zNjWeS6o',
    isshow:true,
    bottomname:"数据加载中..."
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
    this.queryByOpenid(this.data.openid, this.data.pageNo);
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
  scroll:function(event){
    if (this.data.dropDown==true){
      this.setData({
        dropDown: false,
        pageNo:this.data.pageNo+1,
      })
      this.queryByOpenid(this.data.openid, this.data.pageNo);
    }
   
  },
  queryByOpenid: function (openid, pageNo){
    this.setData({
      isshow:false
    })
    var that = this;
    wx.request({
      url: app.globalData.url,
      data: {
        m: 'smallapporder',
        c: 'SmallAppOrder',
        a: 'queryOrdersByOpenid',
        openid: that.data.openid,
        pageNo: that.data.pageNo,
      },
      success: function (res) {
        var order1 = that.data.order;
        var order2 = res.data;
        if (order1!=null){
          if (order2.length > 0) {
            for (var i = 0; i < order2.length; i++) {
              var order = order2[i];
              order1.push(order);
            }
          }else{
            that.setData({
              bottomname:"到底了..."
            })
          }
        }
        that.setData({
          order: order1,
          dropDown:true,
          // isshow:true,
        })
      }
    })
  }
});

