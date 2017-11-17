var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
		filterId: 1,
		address: '定位中…',
    isshow : true,
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
    pageNo:1,
    bottomname:'努力加载中…',
    toptrue :1
	},
	onLoad: function () {
		var self = this;
    //进入页面后请求数据
    wx.request({
      url: app.globalData.url, 
      data :{
        m:'smallapporder',
        c:'SmallAppOrder',
        a:'queryAllSeeler',
        pageNo: self.data.pageNo
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        self.setData({
          shops: res.data
        })
      },
      complete :function(res){
        console.log("网络请求信息为",res)
      }

    })
    wx.getSystemInfo({
      success: function (res) {
        console.log("获取到相应的高度", res);
        self.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })  
      }
    })
		wx.getLocation({
			type: 'gcj02',
			success: function (res) {
				var latitude = res.latitude;
				var longitude = res.longitude;
        //获取地理位置的请求(暂时无用)
				// server.getJSON('/waimai/api/location.php', {
				// 	latitude: latitude,
				// 	longitude: longitude
				// }, function (res) {
				// 	console.log(res)
				// 	if (res.data.status != -1) {
				// 		self.setData({
				// 			address: res.data.result.address_component.street_number
				// 		});
				// 	} else {
				// 		self.setData({
				// 			address: '定位失败'
				// 		});
				// 	}
				// });
			}
		})
	},
	onShow: function () {
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
		wx.navigateTo({url: 'search'});
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
	},
	
  tapName : function(e){
    console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/shop/shop?id=' + id
    })
  },
  toprequest :function(e){
    var that = this;
    var shopmsg = that.data.shops;
    if (that.data.toptrue==1){
      that.setData({
        toptrue :2
      });
    wx.request({
      url: app.globalData.url,
      data: {
        m: 'smallapporder',
        c: 'SmallAppOrder',
        a: 'queryAllSeeler',
        pageNo: that.data.pageNo+1
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.length>0){
          for (var i = 0; i < res.data.length; i++) {
            var shop = res.data[i];
            shopmsg.push(shop);
          }
          that.setData({
            shops: shopmsg,
            pageNo: that.data.pageNo + 1,
            isshow: false,
            toptrue: 1
          });
        }else{
          that.setData({
            bottomname :'更多窗口接入中,敬请期待...',
            isshow: false,
            toptrue: 1
          })
        }
        
      },
      complete: function (res) {
        console.log("网络请求信息为", res)
      }
    })
   
  }
  }
});

