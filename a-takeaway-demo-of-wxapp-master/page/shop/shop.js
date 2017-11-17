var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
    goods: [],
    //声明了一个对象,对象的标准是类似于map的形式,一个key对应一个value
    // 加入购物车的食物
		cart: {
      count: 0, //总共的数量
			total: 0, //总共的价格
			list: []  //选择的食物的id 以及数量
		},
    newlist:{},
		showCartDetail: false,
    pageNo : 1
	},
	onLoad: function (options) {
    var that = this;
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
        console.log("根据id请求窗口信息", res)
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
	},
	onShow: function () {},
  //点击食物的加号
	tapAddCart: function (e) {
    //传入食物id,调用添加方法
    this.addCart(e.target.dataset.id, e.target.dataset.rownumber-1);
	},
  tapAddfood: function (e) {
    //传入食物id,调用添加方法
    this.addCart(e.target.dataset.foodid,e.target.dataset.id);
  },

  //减去一种食物
	tapReduceCart: function (e) {
    this.reduceCart(e.target.dataset.foodid, e.target.dataset.id);
	},
  //添加到购物车的方法
  addCart: function (id,RowNumber) {
    var that = this;
    //如果这种食物的id,赋值给num,如果没有就是0
    var food = this.data.cart.list[RowNumber];
    if (food != null) {
      food.num += 1;
      that.data.cart.list[RowNumber] = food;
      that.countCart(id);
    }else{
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
         that.data.cart.list.push(food);
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
    var food = this.data.cart.list[RowNumber];
    if (food.num <= 1) {
      this.data.cart.list.splice(RowNumber,1);
      // delete this.data.cart.list[RowNumber];
		} else {
      this.data.cart.list[RowNumber].num = this.data.cart.list[RowNumber].num - 1;
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
        data :{
          m:'smallapporder',
          c: 'SmallAppOrder',
          a: 'querySellerFoodById',
          id: id
        },
        success:function(res){
           var goods = res.data;
           count += 1;
           total = Number(total)+Number(goods.je * 1);
           total = total.toFixed(2);
          //  count += that.data.cart.list[id];
          //  total += goods.je * that.data.cart.list[id];
           that.data.cart.count = count;
           that.data.cart.total = total;
           that.setData({
             cart: that.data.cart
           });
        },
        complete :function(res){
          console.log("根据食物id查询食物金额", res.data);
        }
      })
	},
  subtraction : function (id) {
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
    var foods = this.data.cart;
    //店铺相关信息
    var shop = this.data.shop;
    wx.request({
      url: app.globalData.url,
      data :{
        w:"",
        c:"",
        a:"",

      }
    })
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

