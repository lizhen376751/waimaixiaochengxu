var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
    goods: [],
    //声明了一个对象,对象的标准是类似于map的形式,一个key对应一个value
		goods1: {
			1: {
				id: 1,
				name: '娃娃菜',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
				sold: 1014,
				price: 2
			},
			2: {
				id: 2,
				name: '金针菇',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/2.jpg',
				sold: 1029,
				price: 3
			},
			3: {
				id: 3,
				name: '方便面',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/2.jpg',
				sold: 1030,
				price: 2
			},
			4: {
				id: 4,
				name: '粉丝',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/2.jpg',
				sold: 1059,
				price: 1
			},
			5: {
				id: 5,
				name: '生菜',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/2.jpg',
				sold: 1029,
				price: 2
			},
			6: {
				id: 6,
				name: '白菜',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
				sold: 1064,
				price: 2
			},
			7: {
				id: 7,
				name: '杏鲍菇',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/2.jpg',
				sold: 814,
				price: 3
			},
			8: {
				id: 8,
				name: '香菇',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
				sold: 124,
				price: 3
			},
			9: {
				id: 9,
				name: '猴头菇',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
				sold: 102,
				price: 5
			}
		},
		goodsList: [
      //此种是集合的形式,每种集合里面是很多对象,对象是map形式的
			{
				id: 'hot',
				classifyName: '热销',
				goods: [1, 2, 3, 4, 5]
			},
			{
				id: 'new',
				classifyName: '新品',
				goods: [1, 3]
			},
			{
				id: 'vegetable',
				classifyName: '蔬菜',
				goods: [1, 6, 5]
			},
			{
				id: 'mushroom',
				classifyName: '蘑菇',
				goods: [2, 7, 8, 9]
			},
			{
				id: 'food',
				classifyName: '主食',
				goods: [3, 4]
			}
		],
    // 加入购物车的食物
		cart: {
      count: 0, //总共的数量
			total: 0, //总共的价格
			list: {}  //选择的食物的id 以及数量
		},
    newlist:{},
		showCartDetail: false,
    pageNo : 1
	},
	onLoad: function (options) {
    var that = this;
    console.log(app);
		var shopId = options.id;
    wx.request({
      url: app.globalData.url,
      data: {
        m: 'smallapporder',
        c: 'SmallAppOrder',
        a: 'querySeelerById',
        id: shopId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          shop: res.data
        })
      },
      complete: function (res) {
        console.log("网络请求信息为", res)
      }
    })
    wx.request({
      url: app.globalData.url,
      data :{
        m: 'smallapporder',
        c: 'SmallAppOrder',
        a: 'queryFoodsBySeelerId',
        id: shopId,
        pageNo :that.data.pageNo
      },
      success :function(res){
        that.setData({
          goods: res.data
        })
      },
      complete : function(res){
        console.log("请求窗口食物", res)
      }
    })

		for (var i = 0; i < app.globalData.shops.length; ++i) {
			if (app.globalData.shops[i].id == shopId) {
				this.setData({
          //进入页面根据店铺id请求数据
					shop: app.globalData.shops[i]
				});
				break;
			}
		}
	},
	onShow: function () {
		this.setData({
			classifySeleted: this.data.goodsList[0].id
		});
	},
  //点击食物的加号
	tapAddCart: function (e) {
    //传入食物id,调用添加方法
    this.addCart(e.target.dataset.id, e.target.dataset.RowNumber);
	},
  //减去一种食物
	tapReduceCart: function (e) {
		this.reduceCart(e.target.dataset.id);
	},
  //添加到购物车的方法
  addCart: function (id,RowNumber) {
    RowNumber = RowNumber-1;
    //如果这种食物的id,赋值给num,如果没有就是0
		var num = this.data.cart.list[id] || 0;
    //食物的数量加1
		this.data.cart.list[id] = num + 1;

		this.countCart();
	},
  //减去一种食物
	reduceCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		if (num <= 1) {
			delete this.data.cart.list[id];
		} else {
			this.data.cart.list[id] = num - 1;
		}
		this.countCart();
	},
  //计算总的数量和价格
	countCart: function () {
		var count = 0,
			total = 0;

		for (var id in this.data.cart.list) {
      //取出所有选中的食物进行循环,然后累计总的数量以及金额
			var goods = this.data.goods[id];
      //TODO 通过食物id查找食物的金额
			count += this.data.cart.list[id];
      total += goods.je * this.data.cart.list[id];
		}
		this.data.cart.count = count; 
		this.data.cart.total = total;
		this.setData({
			cart: this.data.cart
		});
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

		var scale = e.detail.scrollWidth / 570,
			scrollTop = e.detail.scrollTop / scale,
			h = 0,
			classifySeleted,
			len = this.data.goodsList.length;
		this.data.goodsList.forEach(function (classify, i) {
			var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
			if (scrollTop >= h - 100 / scale) {
				classifySeleted = classify.id;
			}
			h += _h;
		});
		this.setData({
			classifySeleted: classifySeleted
		});
	},
  //点击分类之后,跳转到相应的食物列表
	tapClassify: function (e) {
		var id = e.target.dataset.id;
    console.log("子元素的id"+id);
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
    var sss = this.data.cart;
    //店铺相关信息
    var shop = this.data.shop;
    
    wx.showModal({
      showCancel: false,
      title: '恭喜',
      content: '下单成功！',
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/page/order/order'
          })
        }
      }
    })
	}
});

