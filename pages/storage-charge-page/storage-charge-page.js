// pages/storage-charge-page/storage-charge-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storageChargeList: [
      { id: 0, name: '2016年老班章357g', price: '45', amount: '10', amountUnit:'片', overdueDays: '15', postponeTime: '2016-11-11'},
      { id: 0, name: '2014年半坡老寨327g', price: '32', amount: '8', amountUnit: '件',overdueDays: '3', postponeTime: '2018-11-11' },
      { id: 0, name: '2008年青云998g', price: '48', amount: '32', amountUnit: '片',overdueDays: '42', postponeTime: '2018-05-20' }
    ],
    totalFeePayable: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '仓储费收取',
    })
    this.checkFeePayable()
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
  
  },
  /**
   * 计算总计应缴费用
   */
  checkFeePayable(){
    let money = 0
    this.data.storageChargeList.forEach((e)=>{
      money += parseInt(e.price)
    })
    this.setData({
      totalFeePayable: money
    })
  }
})