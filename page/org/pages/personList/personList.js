
var api = require('../../../../utils/api.js');
Page({
    data: {

      items: [],
      hidden: false
    },
    onLoad: function (options) {
        var that = this;
        // 开始请求数据
        requestData(that, mCurrentPage + 1,options.id);
    },


    //保留暂时不用
    onItemClick: function (event) {
        var targetUrl ='';
        if (event.currentTarget.dataset.publishTime != null)
            targetUrl = targetUrl + "?publishTime=" + event.currentTarget.dataset.publishTime;
        wx.navigateTo({
            url: targetUrl
        });
    },


});

var mGenders = [];
var mSrcs = [];
var mTimes = [];
var mCurrentPage = -1;


/**
 * 请求数据  获取用户列表
 * @param that Page的对象，用其进行数据的更新
 * @param targetPage 请求的目标页码
 */
function requestData(that, targetPage, id) {
   var sessionId= wx.getStorageSync('JSESSIONID');
    wx.request({
        url: api.getUser(),
        header: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Cookie':'SESSION='+sessionId
        },
        data:{'orgId':id},
        method:'GET',
        success: function (res) {
            if (res == null ||
                res.data == null) {
                console.error(Constant.ERROR_DATA_IS_NULL);
                return;
            }


            // var i = 0;
            // for (; i < res.data.data.length; i++){
            //   console.log(res.data.data[i].gender);
            //   if(res.data.data[i].gender==0){
            //     res.data.data[i].gender=='M';
            //   }else if(res.data.data[i].gender==1){
            //     res.data.data[i].gender=='G';
            //   }
            //   console.log(res.data.data[i].gender);
            // }

            that.setData({
                items: res.data.data,
                hidden: true
            });

            mCurrentPage = targetPage;
        }
    });
}

