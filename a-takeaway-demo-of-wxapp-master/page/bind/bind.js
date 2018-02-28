var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: {},
    TypeId: 0,
    disabled: false,
    popErrorMsg: null,
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

    /**
     * 首先判断是否有空的选项
     */
    if (!e.detail.value.XH) {
      that.setData(
        { popErrorMsg: "学号不能为空" }
      );
      that.ohShitfadeOut();
      return;
    }
    if (!e.detail.value.XM) {
      that.setData(
        { popErrorMsg: "姓名不能为空" }
      );
      that.ohShitfadeOut();
      return ;
    }
    if (!e.detail.value.Sex) {
      that.setData(
        { popErrorMsg: "性别不能为空" }
      );
      that.ohShitfadeOut();
      return;
    }
    if (!e.detail.value.Sfzh) {
      that.setData(
        { popErrorMsg: "身份证号不能为空" }
      );
      that.ohShitfadeOut();
      return;
    }
    if (!e.detail.value.Department) {
      that.setData(
        { popErrorMsg: "所属学院不能为空" }
      );
      that.ohShitfadeOut();
      return;
    }
    if (!e.detail.value.BindZfbCode) {
      that.setData(
        { popErrorMsg: "支付宝号不能为空" }
      );
      that.ohShitfadeOut();
      return;
    }
    if (!e.detail.value.BindYktCode) {
      that.setData(
        { popErrorMsg: "一卡通号不能为空" }
      );
      that.ohShitfadeOut();
      return;
    }
    console.log("判断表单是否有非空字段", that.data.popErrorMsg);

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

          /**
           * 点击提交之后存入数据库
           */
          wx.showModal({
            title: '成功',
            content: '信息绑定成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                /**
                 * 点击确定之后将按钮设置为不可用
                 */
                that.setData({
                  disabled: true
                })
                /**
                 * 接着跳转至首页
                 */

                wx.switchTab({
                  url: '../index/index'
                })

              }
            }
          })

        }
        if (res.data == false) {
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


  /**
   * 表单提交,错误显示定时器
   */
  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ popErrorMsg: '' });
      clearTimeout(fadeOutTimeout);
    }, 3000);
  },
})