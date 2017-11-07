// page/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopid :1,
    img: 'http://uploadimg.globrand.com/UploadFiles/Ware/201707/20170703_180650284.jpg',
    name: '杨国福麻辣烫',
    address: '一楼三号窗口',
    rmb:165,
    foods:[
      {
        id:1,
        img: 'http://uploadimg.globrand.com/UploadFiles/Ware/201707/20170703_180650284.jpg',
        num: 2,
        foodsname:"小白菜",
        pic:200
      },
      {
        id: 2,
        img: 'http://uploadimg.globrand.com/UploadFiles/Ware/201707/20170703_180650284.jpg',
        num: 2,
        foodsname: "小白菜",
        pic :120
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    //TODO 获取穿过来的订单id,然后根据订单号,查询数据
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  tapName :function(event){
    var id= event.currentTarget.dataset.shopid;
      wx.navigateTo({
        url: '/page/shop/shop?id=' + id
      })
    
  }
})