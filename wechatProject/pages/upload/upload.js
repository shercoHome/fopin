import {
  $init,
  $digest
} from '../../utils/common.util'

const app = getApp();

Page({

  data: {
    titleCount: 0,
    contentCount: 0,
    title: '',
    content: '',
    images: [],
    aboutImages:[]
  },

  onLoad(options) {
  
    $init(this)

   
  },
  onReady(){

  },
  chooseImage(e) {


    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        this.data.images = images.length <= 3 ? images : images.slice(0, 3)
        $digest(this)
      }
    })
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    $digest(this)
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },
  submitForm(e) {
    var that = this;

    // wx.chooseImage({
    //   count: 3, //最多可以选择的图片总数  
    //   sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
    //   success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
      //  var tempFilePaths = res.tempFilePaths;
    var tempFilePaths = this.data.images;
        console.log(tempFilePaths);
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        var uploadImgCount = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          wx.uploadFile({
            url: app.globalData.api + '/upload.php',
            filePath: tempFilePaths[i],
            name: 'uploadfile_ant',
            formData: {
              'imgIndex': i
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function(res) {
              uploadImgCount++;
            
               var data = JSON.parse(res.data);
              console.log(res.data);


              that.setData({
                aboutImages: that.data.aboutImages.concat(app.globalData.api + '/' + data.data)
              });

              // //服务器返回格式: { "code": "1/2", "msg": "1.jpg", "data": "https://test.com/1.jpg" }  
              // var productInfo = that.data.productInfo;
              // if (productInfo.bannerInfo == null) {
              //   productInfo.bannerInfo = [];
              // }
              // productInfo.bannerInfo.push({
              //   "catalog": data.Catalog,
              //   "fileName": data.FileName,
              //   "url": data.Url
              // });
              // that.setData({
              //   productInfo: productInfo
              // });

              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == tempFilePaths.length) {
                wx.hideToast();
              }
            },
            fail: function(res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function(res) {}
              })
            }
          });
        }
    //   }
    // });
  }

})