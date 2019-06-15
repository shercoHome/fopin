// pages/wantOne/wantOne.js

//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proID:"1",
    want_detail_imgs: [],
    want: {
      id: "1",
      want_create_name: "加载中",
      want_create_phone: "加载中",
      want_create_time: "0000-00-00 00:00:00",
      want_detail_imgs: "",
      want_detail_word: "",
      want_mark1: "",
      want_mark2: "",
      want_mark3: "",
      want_title: "加载中"
    }
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  makePhoneCall() {
    const that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.want.want_create_phone
    })
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.want_detail_imgs;
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },
  indexINIT:function(){
    const that = this;
    app.postAPI({
      type: "want_show",
      id: that.data.proID
    }, function (res) {
      console.log(res.data);
      if (typeof res.data == 'object') {
        if (res.data.code == "1") {
          that.setData({
            want: res.data.data[0]
          });
          that.setData({
            want_detail_imgs: that.data.want.want_detail_imgs.split("|")
          });

        } else { }
      } else {
        console.log(typeof res.data);
      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    const that = this;
    ////////获取当前商品id//////
    if (options.id) {
      that.setData({
        proID: options.id
      });
      /////////加载 商品/////////////
      that.indexINIT();
  

    } else {
      wx.navigateBack({
        delta: 1
      });
      return;
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.indexINIT();
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 2000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})