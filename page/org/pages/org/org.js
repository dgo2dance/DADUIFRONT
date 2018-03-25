
var api = require('../../../../utils/api.js');
Page({
    data: {
      id:{},
      items: [{
        image: "111.png",
        title: '漂亮的人',
        subTitle: 'ddd',
        actor: '通过@will',
        num: '100人在频道中',
        score: '10',
        action: 'rr'
      }],
        hidden: false
    },
    onLoad: function (options) {
        var that = this;
        console.log('id'+options.id);
     //   requestData(options.id);
         that.setData({
               id:options.id
            })
        requestData(that, mCurrentPage + 1,options.id);
    },


    toWrite: function (e){
    var id = e.currentTarget.id;
    var targetUrl = "../write/write";

    wx.navigateTo({
      url: targetUrl
    });
  },

    onPostClick: function (event) {
        console.log("onPostClick");
       
    }
});

var mTitles = [];
var mSrcs = [];
var mTimes = [];
var mCurrentPage = -1;

/**
 * 请求数据
 * @param that Page的对象，用其进行数据的更新
 * @param targetPage 请求的目标页码
 * @param id  圈子ID
 */
function requestData(that, targetPage,id) {

    console.log('api'+api.getCon());
    var sessionId= wx.getStorageSync('JSESSIONID');
    wx.request({
        url: api.getCon(),
        header: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Cookie':'SESSION='+sessionId
        },
        data:{'orgId':id},
        method:'GET',
        success: function (res) {
             console.log('SUCCESS-GET-ORGCON');
          console.log(res.data);
            if (res == null ||
                res.data == null ||
                res.data.data == null ||
                res.data.data.length <= 0) {

                return;
            }
            that.setData({
               items: res.data.data,
                hidden: true
            });

            mCurrentPage = targetPage;
        }
    });
}




