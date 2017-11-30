// page/order.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SellerID :'',
    img: 'http://uploadimg.globrand.com/UploadFiles/Ware/201707/20170703_180650284.jpg',
    SellerName: '',
    SellerSite: '',
    ordermount:'',
    ordertime :'',
    restaurantorders :'',
    foods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    //TODO 获取穿过来的订单id,然后根据订单号,查询数据
    wx.request({
      url: app.globalData.url,
      data :{
        m: 'smallapporder',
        c: 'SmallAppOrder',
        a: 'queryDetailsByOrder',
        restaurantorders: id
      },
      success : function(res){
        that.setData({
          SellerID: res.data.sellerID,
          SellerName: res.data.sellerName,
          ordermount: res.data.ordermount,
          SellerSite: res.data.sellerSite,
          ordertime: res.data.ordertime,
          restaurantorders: res.data.restaurantorders,
         
        });
        wx.request({
          url: app.globalData.url,
          data: {
            m: 'smallapporder',
            c: 'SmallAppOrder',
            a: 'queryFoodsByOrder',
            restaurantorders: id
          },
          success:function(res){
            that.setData({foods: res.data})
          }
        })
      }
    })
  },
  tapName :function(event){
    var id= event.currentTarget.dataset.shopid;
      wx.navigateTo({
        url: '/page/shop/shop?id=' + id
      })
    
  }
})