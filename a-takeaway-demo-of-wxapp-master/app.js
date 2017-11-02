var server = require('./utils/server');
App({
	onLaunch: function () {
		console.log('App Launch')
		var self = this;
		var rd_session = wx.getStorageSync('rd_session');
		console.log('rd_session=', rd_session)
		if (!rd_session) {
			self.login("lizhen");
		} else {
			wx.checkSession({
				success: function () {
					// 登录态未过期
					console.log('登录态未过期')
					self.rd_session = rd_session;
					self.getUserInfo();
				},
				fail: function () {
					//登录态过期
					self.login();
				}
			})
		}
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	},
	globalData: {
		hasLogin: false,
		shops: [
			{
				id: 1,
        img: 'http://uploadimg.globrand.com/UploadFiles/Ware/201707/20170703_180650284.jpg',
				name: '杨国福麻辣烫',
        desc: '杨国福麻辣烫风味独特富含多种健康的绿色蔬菜、藻类、菌类、豆制品。麻、辣、鲜、香。让您回味无穷，流连忘返',
        address: '一楼三号窗口'

			},
			{
				id: 2,
        img: 'http://sem.g3img.com/g3img/xxszpxxc/20160106083338_63723.png',
				name: '黄焖鸡米饭',
        desc: '主要食材是鸡腿肉，配以青椒、香菇等焖制而成，味道美妙，具有肉质鲜美嫩滑的特点',
        address: '一楼二号窗口'

			},
			{
				id: 3,
        img: 'http://imgs.douguo.com/upload/keditor_img/20170728/20170728172231_13444.jpg',
				name: '粥面故事',
        desc: '玉米粥,南瓜粥,虾粥,小米粥,瘦肉粥,八宝粥,田园时蔬粥,蔬菜粥,香菇鸡肉粥,山药粥,红糖黑米粥',
        address: '一楼一号窗口'
			},
			{
				id: 4,
        img: 'http://s2.nuomi.bdimg.com/upload/deal/2014/7/V_L/1246951-g8dz5rcse2-13810114425535619.jpg',
				name: '东北兄弟小炒',
        desc: '白肉血肠、锅包肉、东北乱炖（其实不是东北菜）、溜肉段、地三鲜、猪肉炖粉条、小鸡炖榛蘑、扒熊掌、拔丝地瓜、酱骨架',
        address: '二楼三号窗口'
			}
		],
    shops1: [
      {
        id: 1,
        img: 'http://uploadimg.globrand.com/UploadFiles/Ware/201707/20170703_180650284.jpg',
        name: '杨国福麻辣烫1',
        desc: '杨国福麻辣烫风味独特富含多种健康的绿色蔬菜、藻类、菌类、豆制品。麻、辣、鲜、香。让您回味无穷，流连忘返',
        address: '一楼三号窗口'

      },
      {
        id: 2,
        img: 'http://sem.g3img.com/g3img/xxszpxxc/20160106083338_63723.png',
        name: '黄焖鸡米饭2',
        desc: '主要食材是鸡腿肉，配以青椒、香菇等焖制而成，味道美妙，具有肉质鲜美嫩滑的特点',
        address: '一楼二号窗口'

      },
      {
        id: 3,
        img: 'http://imgs.douguo.com/upload/keditor_img/20170728/20170728172231_13444.jpg',
        name: '粥面故事3',
        desc: '玉米粥,南瓜粥,虾粥,小米粥,瘦肉粥,八宝粥,田园时蔬粥,蔬菜粥,香菇鸡肉粥,山药粥,红糖黑米粥',
        address: '一楼一号窗口'
      },
      {
        id: 4,
        img: 'http://s2.nuomi.bdimg.com/upload/deal/2014/7/V_L/1246951-g8dz5rcse2-13810114425535619.jpg',
        name: '东北兄弟小炒4',
        desc: '白肉血肠、锅包肉、东北乱炖（其实不是东北菜）、溜肉段、地三鲜、猪肉炖粉条、小鸡炖榛蘑、扒熊掌、拔丝地瓜、酱骨架',
        address: '二楼三号窗口'
      }
    ]
	},
	rd_session: null,

	login: function(pp) {
		var self = this;
		wx.login({
			success: function (res) {
        console.log(pp + "登录了..." + res);
				console.log('wx.login', res)
				server.getJSON('/WxAppApi/setUserSessionKey', {code: res.code}, function (res) {
					console.log('setUserSessionKey', res)
					self.rd_session = res.data.data.rd_session;
					self.globalData.hasLogin = true;
					wx.setStorageSync('rd_session', self.rd_session);
					self.getUserInfo();
				});
			}
		});
	},
	getUserInfo: function() {
		var self = this;
		wx.getUserInfo({
			success: function(res) {
				console.log('getUserInfo=', res)
				self.globalData.userInfo = res.userInfo;
				server.getJSON('/WxAppApi/checkSignature', {
					rd_session: self.rd_session,
					result: res
				}, function (res) {
					console.log('checkSignature', res)
					if (res.data.errorcode) {
						// TODO:验证有误处理
					}
				});
			}
		});
	}
})
