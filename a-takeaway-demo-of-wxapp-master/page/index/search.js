var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
		filterId: 1,
		searchWords: '',
		placeholder: '黄焖鸡米饭',
		shops: app.globalData.shops,
    isshow:true
	},
	onLoad: function () {
		var self = this;
	},
	onShow: function () {
		//this.setData({
		//	showResult: false
		//});
	},
	inputSearch: function (e) {
		this.setData({
			searchWords: e.detail.value
		});
    if (e.detail.value == null || e.detail.value ==""){
      
      this.setData({shops: app.globalData.shops});
    }
	},
	doSearch: function(e) {
    /**
     * 根据搜索框来进行查询数据
     */
    var that = this;
    var shopmsg = [];
    var search = this.data.searchWords;
    for (var i = 0; i < app.globalData.shops.length; i++) {
      var shopname = app.globalData.shops[i].name;
      if (shopname.search(search)!=-1){
        shopmsg.push(app.globalData.shops[i]);
      }
     
    }
    that.setData({
      shops: shopmsg
    });

		this.setData({
			showResult: true
		});
	},
  scrolltolower:function(){
    var that = this;
    var shops1 = app.globalData.shops1;
    var shops = this.data.shops;
    for (var i = 0; i < shops1.length; i++) {
      shops.push(shops1[i]);
    }
    that.setData({
      isshow :false,
      shops: shops
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
	}
});

