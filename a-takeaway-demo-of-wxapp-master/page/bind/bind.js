var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: {},
    TypeId: 0,
    disabled:false,
  },
  onLoad: function (option) {
    var that = this;
    wx: wx.request({
      url: app.globalData.url,
      data: {
        m: 'smallapporder',
        c: 'SmallAppOrder',
        a: 'queryAllUerType',
      },
      success: function (res) {
        console.log("查询人员类型信息", res.data);
        that.setData({
          array: res.data,
        })
      },

    })
  },
  formSubmit: function (e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log('openid携带数据为：', app.globalData.openid)
    wx.request({
      url: app.globalData.url,
      data: {
        m: 'smallapporder',
        c: 'SmallAppOrder',
        a: 'insertUserInfo',
        XH: e.detail.value.XH,
        XM: e.detail.value.XM,
        Sex: e.detail.value.Sex,
        TypeId: that.data.TypeId,
        Sfzh: e.detail.value.Sfzh,
        Department: e.detail.value.Department,
        BindWxCode: app.globalData.openid,
        BindZfbCode: e.detail.value.BindZfbCode,
        BindYktCode: e.detail.value.BindYktCode
      },
      success: function (res) {
        console.log("绑定人员返回数据", res.data);

        if (res.data == true) {

          wx.showModal({
            title: '成功',
            content: '信息绑定成功',
            showCancel:false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.setData({
                 disabled:true
               })
               
              } 
            }
          })

        }
        if (res.data == false){
          wx.showToast({
            title: '身份绑定失败',
            icon: 'warn',
            duration: 2000
          })
        }
      }
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      TypeId: this.data.array[e.detail.value].ID,
    })
  },
})