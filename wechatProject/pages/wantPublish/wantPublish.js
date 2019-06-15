// pages/wantPublish/wantPublish.js
import {
  $init,
  $digest
} from '../../utils/common.util'

const app = getApp();
Page({
  data: {
    titleCount: 0,
    titleMax: 12,
    contentCount: 0,
    contentMax: 500,
    images: {
      detail: [],
      detailMax: 6
    },
    want: {
      "type": "want_insert",
      "want_title": "",
      "want_create_name": "",
      "want_create_phone": "",
      "want_detail_word": "",
      "want_detail_imgs": ""
    }
  },
  onLoad(options) {
    $init(this);
  },
  handleTitleInput(e) {
    const value = e.detail.value
    this.data.titleCount = value.length //计算已输入的标题字数
    this.setData({
      ['want.want_title']: value
    });
    $digest(this)
  },
  handleNameInput(e) {//采购人
    const value = e.detail.value
    this.setData({
      ['want.want_create_name']: value
    });
    $digest(this)
  },
  handlePhoneInput(e) {//联系电话
    const value = e.detail.value
    this.setData({
      ['want.want_create_phone']: value
    });
    $digest(this)
  },
  handleContentInput(e) {
    const value = e.detail.value;
    this.data.contentCount = value.length //计算已输入的正文字数
    this.setData({
      ['want.want_detail_word']: value
    });
    $digest(this)
  },
  chooseImage(e) {
    var imgType = e.currentTarget.dataset['type'];
    var limit = (imgType == "cover") ? this.data.images.coverMax : imgType == "carousel" ? this.data.images.carouselMax : this.data.images.detailMax;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images[imgType].concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        this.data.images[imgType] = images.length <= limit ? images : images.slice(0, limit)
        $digest(this)
      }
    })
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    const imgType = e.currentTarget.dataset['type'];
    this.data.images[imgType].splice(idx, 1)
    $digest(this)
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const imgType = e.currentTarget.dataset['type'];
    const images = this.data.images[imgType]
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },
  submitForm(e) {
    var that = this;

    if (this.data.titleCount <= 0) {
      wx.showToast({
        title: '请输入商品名称',
        icon: 'none'
      });
      return;
    }
    // if (this.data.images.cover.length != 1) {
    //   wx.showToast({
    //     title: '请选择1张封面图',
    //     icon: 'none'
    //   });
    //   return;
    // }
    // if (this.data.images.carousel.length < 1) {
    //   wx.showToast({
    //     title: '请选择至少1张轮播图',
    //     icon: 'none'
    //   });
    //   return;
    // }
    if (this.data.want.want_create_name <= 0) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return;
    }
    if (this.data.want.want_create_phone <= 0) {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      });
      return;
    }
    if (this.data.contentCount <= 0) {
      wx.showToast({
        title: '请输入详情内容',
        icon: 'none'
      });
      return;
    }

    // tempFilePaths.concat(this.data.images.cover);
    // tempFilePaths.concat(this.data.images.carousel);
    // tempFilePaths.concat(this.data.images.detail);

    //console.log(tempFilePaths);
    //启动上传等待中...  
    wx.showToast({
      title: '正在上传...',
      icon: 'loading',
      mask: true,
      duration: 10000
    })

    var l_mark = that.data.images.detail.length;
    var img_arr = [];
    if (l_mark<=0){
      that.insertPro(img_arr);
      return;
    }
    var c_mark=0;
    for (var i = 0; i < l_mark; i++) {
      (function (i) {
        app.uploadAPI(that.data.images.detail[i], function (res) {
          c_mark++;

          var data = JSON.parse(res.data);
          console.log(res.data);
          if (data.code < 1) {
            wx.hideToast();
            wx.showModal({
              title: '第 ' + Number(i + 1) + ' 张详情图错误',
              content: String(data.msg),
              showCancel: false,
              success: function (res) { }
            })
            return;
          }
          img_arr[i] = app.globalData.domain + '/' + data.data;

          //如果是最后一张,则隐藏等待中  
          if (c_mark == l_mark) {
              that.insertPro(img_arr);
          }
        });
      })(i);
    }
    //   }
    // });
  },
  insertPro(img_arr) {
    const that = this;
    that.setData({
      ['want.want_detail_imgs']: img_arr.join("|"),
    });
    console.log(that.data.want);
    /////////新增商品 /////////////
    app.postAPI(that.data.want, function (res) {
      console.log(res.data);
      if (typeof res.data == 'object') {
        if (res.data.code == "1") {
          wx.showModal({
            title: '信息',
            content: res.data.msg,
            showCancel: false,
            success: function (res) { 
                wx.switchTab({
                  url: '../want/want',
                  success: function (e) {
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.onLoad();
                  }
                }) ;
            }
          })
        } else { }
      } else {
        console.log(typeof res.data);
      }
    });
  }

})