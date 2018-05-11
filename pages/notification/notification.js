// pages/notification/notification.js
import util from '../../utils/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    notifList: [
      { id: 0, title: '茶品出售', unread: 1, time: '2018-01-10 10:22', content: '您有一笔茶品出售收入，金额3,200元，收入将在一个星期内到账。'},
      { id: 1, title: '应收茶款', unread: 0, time: '2018-02-19 19:10', content: '您有一笔应收茶款收入，金额3,200元，请注意查收。' },
      { id: 2, title: '买茶支出', unread: 1, time: '2018-05-08 16:21', content: '您有一笔新茶买入支出，金额3,200元，请注意查收。' },
      { id: 3, title: '物流及包装费', unread: 0, time: '2016-10-10 10:22', content: '您有一笔物流及包装费支出，金额3,200元，点击查看详情。' },
      { id: 4, title: '到货提醒', unread: 0, time: '2017-10-10 10:22', content: '您取的2016年老班章357g已签收，点击查看详情。' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '通知类消息',
    })
    this.data.notifList.map((e)=> {
      e.time = util.formatTime(e.time)
    })
    console.log(this.data.notifList)
    this.setData({
      notifList: this.data.notifList
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
  
  }
})