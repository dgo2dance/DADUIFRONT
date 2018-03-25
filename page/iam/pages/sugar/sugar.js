Page({
  data: {
    list: [{
        id: '003',
        name: '哈哈朋友圈',
        img:'001'
      }, {
        id: '003',
        name: 'YUTONG协会',
        img:'001'
      }]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },

  //获取当前圈子
  getOrg:function(){

  this.setData({
      list: list
    })


  }
})

