// pages/toLogin/toLogin.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    toErr: '',
    loginInfo: {
      type: "login",
      "user_account": "",
      "user_pwd": ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleInput(e) { 
    const _type = e.currentTarget.dataset['type'];
    const _loginInfo = 'loginInfo.' + _type;
    const value = e.detail.value

    this.setData({
      toErr: '',
      [_loginInfo]: value
    });

    // if (_type == "user_account" && !app.globalData.pattJson.mobile.test(value)) {
    //   this.setData({
    //     toErr: _type
    //   });
    //   return;
    // }
    // if (_type == "user_pwd" && !app.globalData.pattJson.psw.test(value)) {
    //   this.setData({
    //     toErr: _type
    //   });
    //   return;
    // }

  },
  toLogin() {
    const user_account = this.data.loginInfo.user_account;
    const user_pwd = this.data.loginInfo.user_pwd;

    if (!app.globalData.pattJson.mobile.test(user_account)||!app.globalData.pattJson.psw.test(user_pwd)) {
      wx.showToast({
        title: '账号或密码错误！',
        icon: 'none'
      })
      return;
    }

    //登录
    app.toLogin(this.data.loginInfo);
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

  }
})