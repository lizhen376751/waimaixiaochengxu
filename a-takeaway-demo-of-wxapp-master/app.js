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
    url:'https://lizhen.ngrok.xiaomiqiu.cn/app.ZMTManage/index.jsp',
		hasLogin: false,
	},
	rd_session: null,

	login: function(pp) {
		var self = this;
		wx.login({
			success: function (res) {
        console.log("李振测试", res);
        //res.code获取code,继而获取相关的信息,openid什么的...
        self.getUserInfo();
			}
		});
	},
	getUserInfo: function() {
    var self = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              console.log('获取用户信息', res)
              self.globalData.userInfo = res.userInfo;
            }
          });
        }
      }
    })
	
	
	}
})
