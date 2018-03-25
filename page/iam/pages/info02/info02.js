var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']]
var api = require('../../../../utils/api.js');
var app = getApp();
Page({
  data: {
    items: [
      {name: 'yes', value: '是', checked: 'false'}
    ],

    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9]

  },
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },

  sourceTypeChange: function (e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange: function (e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange: function (e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },

  formSubmit: function(e) {
    var that =this;
    console.log('进入FORM提交页面', e.detail.value);
    
    // 调用接口保存基础信息
    updateData(that,e.detail.value);

    //调用接口上传图片
    uploadimg(that);
    var targetUrl = "../org/pages/info02/info02";
     wx.navigateTo({
          url: targetUrl
        });
  },

  onLoad: function(options){
    var that = this;
    requestData(that,options.id);
    previewImage();
  }

})

/**
 * 请求数据  更新用户第二部信息
 * @param that Page的对象，用其进行数据的更新
 * @param targetPage 请求的目标页码
 */
function updateData(that,value) {
   var sessionId= wx.getStorageSync('JSESSIONID');
    wx.request({
        url: api.userEditSecond(),
        header: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Cookie':'SESSION='+sessionId
        },
        data:value,
        method:'POST',
        success: function (res) {
            if (res == null ||
                res.data == null) {
                console.error(Constant.ERROR_DATA_IS_NULL);
                return;
            }
        }
    });
}

/**
*图片上传
**/
function uploadimg(that){//这里触发图片上传的方法
       var imageList=that.data.imageList;
       console.log('uploading img');
       app.uploadimg({
           i:0,
           url:api.userImgUpload(),//这里是你图片上传的接口
           path:imageList//这里是选取的图片的地址数组
        });
  }


//获取已存在数据
function requestData(that,id) {
  var imageList=that.data.imageList;
  console.log("---second get data");
    var sessionId= wx.getStorageSync('JSESSIONID');
    wx.request({
        url: api.userDetail(),
        header: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Cookie':'SESSION='+sessionId
        },
        data:{'userId':id},
        method:'GET',
        success: function (res) {
            if (res == null ||
                res.data == null ||
                res.data.data == null ||
                res.data.data.length <= 0) {
                return;
            }

            for(var i in res.data.data.userImg){
              console.log(res.data.data.userImg[i].imgPath);
              imageList.push(res.data.data.userImg[i].imgPath);
            }
            console.log("-imageList-"+imageList);
            that.setData({
               userInfo: res.data.data,
               hidden: true,
               imageList:imageList,
            });

        }
    });
}

