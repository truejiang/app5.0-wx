// pages/index/index.js
import util from '../../utils/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[
      { id: 0, imgUrl: 'http://oqk0uz684.bkt.clouddn.com/recommend-banner1.png',name:'2017年老班章', status: '即将开抢',price: '1240', unit: '片'},
      { id: 1, imgUrl: 'http://oqk0uz684.bkt.clouddn.com/recommend-banner1.png', name: '2014年半坡老寨', status: '即将开抢', price: '3123', unit: '片'},
      { id: 2, imgUrl: 'http://oqk0uz684.bkt.clouddn.com/recommend-banner1.png', name: '2008青云', status: '即将开抢', price: '1024', unit: '片'},      
    ],
    recommendPageIndex: 1,
    topSearch: [
      { id: 0, imgUrl: '../../images/base/hot-search.png', name: '2006老班章', status: '即将开抢', price: '1240', unit: '片' },
      { id: 1, imgUrl: '../../images/base/hot-search.png', name: '2014年半坡老寨', status: '即将开抢', price: '3123', unit: '片' },
      { id: 2, imgUrl: '../../images/base/hot-search.png', name: '2008青云', status: '即将开抢', price: '1024', unit: '片' },
      { id: 0, imgUrl: '../../images/base/hot-search.png', name: '2006老班章', status: '即将开抢', price: '1240', unit: '片' },
      { id: 1, imgUrl: '../../images/base/hot-search.png', name: '2014年半坡老寨', status: '即将开抢', price: '3123', unit: '片' },
      { id: 2, imgUrl: '../../images/base/hot-search.png', name: '2008青云', status: '即将开抢', price: '1024', unit: '片' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.swiperList.map((e)=>{
      e.price = util.formatMoney(e.price)
    })
    this.data.topSearch.map((e) => {
      e.price = util.formatMoney(e.price)
    })
    this.setData({
      swiperList: this.data.swiperList,
      topSearch: this.data.topSearch
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.storageChargeModal()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 推荐茶品banner切换事件
   */
  changeRecommendBanner: function (e) {
    this.setData({
      recommendPageIndex: e.detail.current + 1
    })
  },
  /**
   * 仓储费弹出层
   */
  storageChargeModal(){
    wx.showModal({
      title: '',
      content: '您有一笔仓储费需要续期，这将会对您的卖茶及取茶功能产生影响，是否立即前往支付?',
      cancelText: '取消',
      cancelColor: '#888888',
      confirmColor: '#FEBE10',
      confirmText: '立即前往',
      success(res) {
        if(res.confirm) {
          wx.navigateTo({
            url: '../storage-charge-page/storage-charge-page',
          })
        } else if (res.cancel) {
          
        }
        
      }
    })
  },
  /**
   * 跳转到消息页面
   */
  pageRoutes(e){
    util.pageRouter(e.currentTarget.dataset.routes)
  }
})
