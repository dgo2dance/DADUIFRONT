//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){

    var that = this;
    if(this.globalData.userInfo){  

      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口

      wx.login({
        success: function (loginCode) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
            }
          });

          //调用微信api获取
          var appid = 'wx225f75e64eddaddd'; //填写微信小程序appid  
          var secret = '8dd43dd52ddf6eb0f52386cc222f85df';
            console.log(loginCode);
            wx.request({  
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx225f75e64eddaddd&secret=8dd43dd52ddf6eb0f52386cc222f85df&grant_type=authorization_code&js_code='+loginCode.code,  
            header: {  
                'content-type': 'application/json'  
            },  
            success: function(res) {  
              console.log("openid")
              console.log(res);             
              console.log(res.data.openid) //获取openid  
              that.globalData.openid = res.data.openid;
              typeof cb == "function" && cb(that.globalData.userInfo,that.globalData.openid)
            }  
          });
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    openid:null
  },

  //多张图片上传
  uploadimg:function(data){
      var sessionId= wx.getStorageSync('JSESSIONID');
   var that=this,i=data.i?data.i:0,success=data.success?data.success:0,fail=data.fail?data.fail:0;
   console.log('url'+data.url);
   console.log(data.path[i]);
       wx.uploadFile({
          url: data.url, 
          filePath: data.path[i],
          name: 'file',
          method:'POST',
          header: {'Cookie':'SESSION='+sessionId},
          success: (resp) => {
             success++;
             console.log(resp)
             console.log(i);
              //这里可能有BUG，失败也会执行这里
          },
          fail: (res) => {
              fail++;
              console.log('fail:'+i+"fail:"+fail);
          },
          complete: () => {
              console.log(i);
              i++;
          if(i==data.path.length){   //当图片传完时，停止调用          
              console.log('执行完毕');
              console.log('成功：'+success+" 失败："+fail);
          }else{//若图片还没有传完，则继续调用函数
              console.log(i);
              data.i=i;
              data.success=success;
              data.fail=fail;
              that.uploadimg(data);
            }
          }
      });
  }

})