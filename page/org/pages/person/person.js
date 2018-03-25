//index.js
//获取应用实例

var api = require('../../../../utils/api.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    list: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var that = this;
    console.log('onLoad');
     console.log('id'+options.id);   
     // 开始请求数据
    requestData(that,options.id);
 
  },

    kindToggle: function (e) {
    this.setData({
      list: list
    });
  }
})



/**
 * 请求数据  获取用户列表
 * @param that Page的对象，用其进行数据的更新
 * @param targetPage 请求的目标页码
 */
function requestData(that,id) {
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
                res.data == null) {
                console.error(Constant.ERROR_DATA_IS_NULL);
                return;
            }

            that.setData({
                userInfo: res.data.data,
                hidden: true
            });

            mCurrentPage = targetPage;
        }
    });
}
