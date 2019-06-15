// pages/want/want.js


//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wants:[]
  },
  //事件处理函数
  toDetailByID: function (e) {
    var id = e.currentTarget.dataset['did'];
    console.log("id=" + id);
    wx.navigateTo({
      url: '../wantOne/wantOne?id=' + id
    })
  },
  makePhoneCall(e) {
    var _phone = e.currentTarget.dataset['phone'];
    console.log("phone=" + _phone);
    const that = this;
    wx.makePhoneCall({
      phoneNumber: _phone
    })
  },
  toPublish(){
    wx.navigateTo({
      url: '../wantPublish/wantPublish'
    });
  },
  indexINIT(){
    const that = this;
    /////////加载 求购信息/////////////
    app.postAPI({
      type: "want_show"
    }, function (res) {
      console.log(res.data);
      if (typeof res.data == 'object') {
        that.setData({
          wants: res.data.data
        });
      } else {
        console.log(typeof res.data);
      }
    });


    /////////发布 求购信息/////////////
    // app.postAPI({
    //   type: "want_insert",
    //   "want_title":"我要一个美女333",
    //   "want_create_name": "楚留香333",
    //   "want_create_phone": "13333333",
    //   "want_detail_word": "如图所示的美女33",
    //   "want_detail_imgs": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3495664529,3093302813&fm=26&gp=0.jpg|https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2001744954,2591704808&fm=11&gp=0.jpg"
    // }, function (res) {
    //   console.log(res.data);
    //   if (typeof res.data == 'object') {
    //     that.setData({
    //       wants: res.data.data
    //     });
    //   } else {
    //     console.log(typeof res.data);
    //   }
    // });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.indexINIT();
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
    this.indexINIT();
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 2000);
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

  }
})