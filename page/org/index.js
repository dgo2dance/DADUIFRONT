
var api = require('../../utils/api.js');
var app = getApp();
Page({
  data: {
    items: []
  },

  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据,进行登录
    console.log('checkSession'+wx.checkSession());
    app.getUserInfo(loginRequest);
   // loginRequest(that.globalData.userInfo,that.globalData.openid)
    //向服务端发起请求，获取org信息
    getOrg(that);
  },

  //跳转到频道详细页
  kindToggle: function (e) {
    var id = e.currentTarget.dataset.id;
    var targetUrl = "pages/org/org?id="+id;
    console.log('targetUrl'+targetUrl);
        wx.navigateTo({
            url: targetUrl
        });
  },

});


/**
 * 请求登录
 */
function loginRequest(userInfo,openid) {
  console.log("longRequest");
  console.log(userInfo);
  wx.request({
    url: api.getLogin(),
    data:{
      "openid":openid,
      "nickname":userInfo.nickName,
      "gender":parseInt(userInfo.gender),
      "avatarUrl":userInfo.avatarUrl,
      "city":userInfo.city,
      "provience":userInfo.province,
      "country":userInfo.country
    },
    method:'POST',
    header: {'content-type': 'application/x-www-form-urlencoded'},
    success: function (res) {
          console.log('onRequest');
          console.log(res.data.data.sessionId);
          wx.setStorage({
           key:'JSESSIONID', 
            data:res.data.data.sessionId
             });
       //    that.setData({
      //     list: res.data.data.org;
     // })
    },
    fail:function(){
      console.log('fail');
    },
  });
};

/**
 * 获取组织信息
 */
function getOrg(that){
   console.log("getOrg");
   var sessionId= wx.getStorageSync('JSESSIONID');
   console.log("sessionId"+sessionId);
   wx.request({
    url: api.getOrgList(),
    data:{},
    method:'GET',
    header: {'Content-type': 'application/x-www-form-urlencoded',
             'Cookie':'SESSION='+sessionId},
    success: function (res) {
          console.log('SUCCESS-GET-ORG');
          console.log(res.data);
           that.setData({
           items: res.data.data
      })
    },
    fail:function(){
      console.log('FAIL-GET-ORG');
    },
  });
}