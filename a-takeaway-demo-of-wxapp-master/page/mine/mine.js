var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
    order :[
      {
        id: 1,
        img: 'http://uploadimg.globrand.com/UploadFiles/Ware/201707/20170703_180650284.jpg',
        name: '杨国福麻辣烫',
        desc: '杨国福麻辣烫风味独特富含多种健康的绿色蔬菜、藻类、菌类、豆制品。麻、辣、鲜、香。让您回味无穷，流连忘返',
        address: '一楼三号窗口',
        foods :[
          {
            id: 1,
            name: '娃娃菜',
            pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
            sold: 1014,
            price: 2,
            num :2
          },
          {
            id: 2,
            name: '黄焖鸡米饭',
            pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
            sold: 1014,
            price: 2,
            num: 2
          }
        ],
        foodsnum:'10',
        paymoney:"33",
        paytime:"2017.10.28",
      },
      {
        id: 2,
        img: 'http://uploadimg.globrand.com/UploadFiles/Ware/201707/20170703_180650284.jpg',
        name: '杨国福麻辣烫',
        desc: '杨国福麻辣烫风味独特富含多种健康的绿色蔬菜、藻类、菌类、豆制品。麻、辣、鲜、香。让您回味无穷，流连忘返',
        address: '一楼三号窗口',
        foods: [
          {
            id: 1,
            name: '娃娃菜',
            pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
            sold: 1014,
            price: 2,
            num: 2
          },
          {
            id: 2,
            name: '黄焖鸡米饭',
            pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
            sold: 1014,
            price: 2,
            num: 2
          }
        ],
        foodsnum: '10',
        paymoney: "33",
        paytime: "2017.10.28",
      }
    ]
  },
  onLoad: function (option) {
    console.log("测试回话......."+option.query);
	},
	onShow: function () {
		this.setData({
			userInfo: app.globalData.userInfo
		});
	}
});

