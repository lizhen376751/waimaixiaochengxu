var server = require('./utils/server');
App({
  onLaunch: function () {
    var self = this;
    wx.checkSession({
      success: function () {
        console.log('登录态未过期')
        //判断openid是否存在,如果存在就不用登录,如果不存在就需要重新登录获取
        if (!self.globalData.openid){
          //获取用户信息
          self.login();
        }else{
          self.getUserInfo();
        }
      
        
      },
      fail: function () {
        //登录态过期,进行登录
        self.login();
      }
    })

  },

  globalData: {
    url: 'https://ma.ustb.edu.cn/app.ZMTManage/index.jsp',
    hasLogin: false,
  },
  rd_session: null,

  login: function () {
    var self = this;
    wx.login({
      success: function (res) {
        console.log("李振测试", res);
        //res.code获取code,继而获取相关的信息,openid什么的...
        self.getOpenid(res.code);
        self.getUserInfo();
      }
    });
  },
  getOpenid: function (js_code){
    var self = this;
    wx.request({
      url: self.globalData.url,
      data: {
        m: "smallapporder",
        c: "SmallAppOrder",
        a: "getOpenid",
        js_code: js_code
      },
      success: function (res) {
        console.log("获取到的openid为",res.data)
        self.globalData.openid = res.data.openid;
        self.globalData.session_key = res.data.session_key;
      }
    })
  },
  getUserInfo: function () {
    var self = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              console.log('获取用户信息', res)
              //获取到了用户信息
              self.globalData.userInfo = res.userInfo;

            }
          });
    
        }
      }
    })


  }
})
