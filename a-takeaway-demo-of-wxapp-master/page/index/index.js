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
		shops: app.globalData.shops
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
    })
		wx.getLocation({
			type: 'gcj02',
			success: function (res) {
				var latitude = res.latitude;
				var longitude = res.longitude;
				server.getJSON('/waimai/api/location.php', {
					latitude: latitude,
					longitude: longitude
				}, function (res) {
					console.log(res)
					if (res.data.status != -1) {
						self.setData({
							address: res.data.result.address_component.street_number
						});
					} else {
						self.setData({
							address: '定位失败'
						});
					}
				});
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
	toNearby: function () {
		var self = this;
		self.setData({
			scrollIntoView: 'nearby'
		});
		self.setData({
			scrollIntoView: null
		});
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
    var name = this.data.shops[e.currentTarget.dataset.id-1].name;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/shop/shop?id=' + id
    })
  },
  toprequest :function(e){
    var that = this;
    var shopmsg = that.data.shops;
    for (var i = 0; i < app.globalData.shops1.length; i++) {
      shopmsg.push(app.globalData.shops1[i]);
    }
    that.setData({
      shops: shopmsg,
      isshow: false,
    });
  }
});

