App({
  onLaunch: function () {
    let that = this
    // 展示本地存储能力
    wx.getUserInfo({
      success(res) {
        that.globalData.userInfo = res.userInfo
      }
    })
  },
  globalData: {
    userInfo: null,
    publishCommed: null,
    currentGoods: null
  }
})