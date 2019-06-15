// pages/toReg/toReg.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    toErr: '',
    registerInfo: {
      type: "register",
      "user_account": "",
      "user_pwd": "",
      "user_pwd2": "",
      "user_name": "",
      "user_addr": "",
      "user_phone": "",
      "user_active_code": ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  handleInput(e) { //采购人
    const _type = e.currentTarget.dataset['type'];
    const _registerInfo = 'registerInfo.' + _type;
    const value = e.detail.value

    this.setData({
      toErr: '',
      [_registerInfo]: value
    });


    if (_type == "user_account" && !app.globalData.pattJson.mobile.test(value)) {
      this.setData({
        toErr: _type
      });
      return;
    }
    if (_type == "user_pwd" && !app.globalData.pattJson.psw.test(value)) {
      this.setData({
        toErr: _type
      });
      return;
    }
    if (

      _type == "user_pwd2" && (
        this.data.registerInfo.user_pwd !== value || !app.globalData.pattJson.psw.test(value)
      )

    ) {
      this.setData({
        toErr: _type
      });
      return;
    }
    if (_type == "user_name" && !app.globalData.pattJson.cname.test(value)) {
      this.setData({
        toErr: _type
      });
      return;
    }
    if (_type == "user_addr" && !app.globalData.pattJson.cname.test(value)) {
      this.setData({
        toErr: _type
      });
      return;
    }
    if (_type == "user_phone" && !app.globalData.pattJson.phone.test(value)) {
      this.setData({
        toErr: _type
      });
      return;
    }
    if (_type == "user_active_code" && !app.globalData.pattJson.acode.test(value)) {
      this.setData({
        toErr: _type
      });
      return;
    }

  },
  toRegister() {
    const user_account = this.data.registerInfo.user_account;
    const user_pwd = this.data.registerInfo.user_pwd;
    const user_pwd2 = this.data.registerInfo.user_pwd2;
    const user_name = this.data.registerInfo.user_name;
    const user_addr = this.data.registerInfo.user_addr;
    const user_phone = this.data.registerInfo.user_phone;
    const user_active_code = this.data.registerInfo.user_active_code;


    if (!app.globalData.pattJson.mobile.test(user_account)) {
      wx.showToast({
        title: '账号错误，请填写正确的11位手机号',
        icon: 'none'
      })
      return;
    }
    if (!app.globalData.pattJson.psw.test(user_pwd)) {
      wx.showToast({
        title: '密码错误，请填写6-10位的字母或数字',
        icon: 'none'
      })
      return;
    }
    if (!app.globalData.pattJson.psw.test(user_pwd2) || user_pwd2 != user_pwd) {
      wx.showToast({
        title: '确认密码错误，请重复填写登录密码',
        icon: 'none'
      })
      return;
    }
    if (!app.globalData.pattJson.cname.test(user_name) || user_name.length < 1) {
      wx.showToast({
        title: '厂家名称为空或错误，请排除特殊字符',
        icon: 'none'
      })
      return;
    }
    if (!app.globalData.pattJson.cname.test(user_addr) || user_addr.length < 1) {
      wx.showToast({
        title: '厂家地址为空或错误，请排除特殊字符',
        icon: 'none'
      })
      return;
    }
    if (!app.globalData.pattJson.phone.test(user_phone)) {
      wx.showToast({
        title: '厂家电话格式错误',
        icon: 'none'
      })
      return;
    }
    if (!app.globalData.pattJson.acode.test(user_active_code)) {
      wx.showToast({
        title: '激活码无效，请联系客服',
        icon: 'none'
      })
      return;
    }
    const that = this;
    //注册
    app.postAPI(that.data.registerInfo, function(res) {
      console.log(res.data);
      if (typeof res.data == 'object') {
        if (res.data.code == "1") {

          wx.hideToast();

          wx.showModal({
            title: '恭喜您注册成功',
            content: '自动登录中……',
            showCancel: false,
            success: function(res) {
              console.log("恭喜您注册成功,自动登录中……");
            }
          });
          //登录
          app.toLogin({
            type: "login",
            "user_account": user_account,
            "user_pwd": user_pwd
          });
          return;
        }
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      } else {
        console.log(typeof res.data);
      }
    });
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