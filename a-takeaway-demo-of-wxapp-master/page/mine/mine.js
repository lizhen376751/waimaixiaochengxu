var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
    order :[
      // {
      //   id: 1,
      //   img: 'http://uploadimg.globrand.com/UploadFiles/Ware/201707/20170703_180650284.jpg',
      //   name: '杨国福麻辣烫',
      //   desc: '杨国福麻辣烫风味独特富含多种健康的绿色蔬菜、藻类、菌类、豆制品。麻、辣、鲜、香。让您回味无穷，流连忘返',
      //   address: '一楼三号窗口',
      //   foods :[
      //     {
      //       id: 1,
      //       name: '娃娃菜',
      //       pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
      //       sold: 1014,
      //       price: 2,
      //       num :2
      //     },
      //     {
      //       id: 2,
      //       name: '黄焖鸡米饭',
      //       pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
      //       sold: 1014,
      //       price: 2,
      //       num: 2
      //     }
      //   ],
      //   foodsnum:'10',
      //   paymoney:"33",
      //   paytime:"2017.10.28",
      // },
      // {
      //   id: 2,
      //   img: 'http://uploadimg.globrand.com/UploadFiles/Ware/201707/20170703_180650284.jpg',
      //   name: '杨国福麻辣烫',
      //   desc: '杨国福麻辣烫风味独特富含多种健康的绿色蔬菜、藻类、菌类、豆制品。麻、辣、鲜、香。让您回味无穷，流连忘返',
      //   address: '一楼三号窗口',
      //   foods: [
      //     {
      //       id: 1,
      //       name: '娃娃菜',
      //       pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
      //       sold: 1014,
      //       price: 2,
      //       num: 2
      //     },
      //     {
      //       id: 2,
      //       name: '黄焖鸡米饭',
      //       pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
      //       sold: 1014,
      //       price: 2,
      //       num: 2
      //     }
      //   ],
      //   foodsnum: '10',
      //   paymoney: "33",
      //   paytime: "2017.10.28",
      // }
    ]
  },
  onLoad: function (option) {
    var that = this;
   wx.request({
     url: app.globalData.url,
     data:{
       m: 'smallapporder',
       c: 'SmallAppOrder',
       a: 'queryOrdersByOpenid',
       openid:'oUpF8uMuAJO_M2pxb1Q9zNjWeS6o'
     },
     success :function(res){
       console.log("查询我的订单",res.data);
       that.setData({
         order: res.data
       })
     }
   })
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

  }
});

