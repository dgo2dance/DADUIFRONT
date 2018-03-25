var api = require('../../../../utils/api.js');
var utilJs = require('../../../../utils/util.js');
Page({
  data: {
    items: [
      {name: '1', value: '是', checked: false}
    ],
    cityArray:[{id:0,value:'zhengzhou',name:'郑州' },{id:1,value:'luoyang',name:'洛阳'}],
    incomeArray:['5-8k','9-12k','13-18k'],
    degreeArray:['初中','高中','大专','本科','硕士','博士'],
    cityIndex: 0,
    degreeIndex:0,
    incomeIndex:0,
    date: '2016-09-01',
    allValue:'',
    userInfo: {},
    hasHouseChecked:false,
    hasCarChecked:false,
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

  onLoad: function(options){
    var that = this;
    requestData(that,options.id);

  },

  formSubmit: function(e) {
  	var that =this;
  	console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })

    if(e.detail.value.height.length==0){
	      wx.showToast({
	        title: '身高不得为空!',
	        icon: 'loading',
	        duration: 1500
	      })
	      setTimeout(function(){
	          wx.hideToast()
	        },2000)
    }else{
    	updateData(that,e.detail.value);
    }

    var id = e.currentTarget.id;

  }
})


/**
 * 请求数据  更新用户信息
 * @param that Page的对象，用其进行数据的更新
 * @param targetPage 请求的目标页码
 */
function updateData(that,value) {
   var sessionId= wx.getStorageSync('JSESSIONID');
    wx.request({
        url: api.userEditFirst(),
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
            var targetUrl = "../info02/info02";
		    wx.navigateTo({
		      url: targetUrl
		    });
        }
    });
}


function requestData(that,id) {
        console.log('SUCCESS-GET-DETAIL-00');
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

            res.data.data.birthdayTime=utilJs.formatDate(new Date(res.data.data.birthdayTime));

            // set the city
            for(var i in that.data.cityArray){
              if(that.data.cityArray[i].value==res.data.data.city){
                that.setData({
                    cityIndex:i
                  });
                break;
              }
            }

            // set the degree
            for(var m=0;m<that.data.degreeArray.length;m++){
              if(that.data.degreeArray[m]==res.data.data.degree){
                 that.setData({
                    degreeIndex:m
                  });
                break;
              }
            }

            // set the income
            for(var s=0; s<that.data.incomeArray.length;s++){
              if(that.data.incomeArray[s]==res.data.data.income){
                 that.setData({
                    incomeIndex:s
                  });
                break;
              }
            }

            //set has car
            if(res.data.data.isCar==1){
               that.setData({
                    hasCarChecked:true
                  });
            }

            // set has house
            if(res.data.data.isHouse==1){
               that.setData({
                    hasHouseChecked:true
                  });
            }
            //set isAlone
            if(res.data.data.isAlone==1){
              that.setData({
                    items: [{name: '1', value: '是', checked: true}]
                  });
            }

            that.setData({
               userInfo: res.data.data,
               hidden: true
            });
        }
    });

}
