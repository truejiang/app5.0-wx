// pages/search-page/search-page.js
import utils from '../../utils/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topSeach:['2017老班章357g', '青云', '半坡老寨', '易武', '天韵', '老班章父子亲'],
    searchHistory: [],
    searchValue: '',
    searchWords: '搜索你感兴趣的茶品吧'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.setNavigationBarTitle({
      title: '搜索',
    })
    this.getSearchHistoryStorage('searchHistory')
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
   * 搜索后存储本地搜索记录
   */
  setSearchHistoryStorage(key, data) {
    utils.setStorageData(key, data)
  },
  /**
   * 获取本地的搜索记录
   */
  getSearchHistoryStorage(key) {
    let that = this
    utils.getStorageData('searchHistory', (data) => {
      console.log(data)
      that.setData({
        searchHistory: data.list
      })
    })
  },
  /**
   * 清除所有本地的搜索记录
   */
  removeAllSearchHistoryStorage() {
    utils.setSearchHistoryStorage('searchHistory', {list: []})
    utils.getSearchHistoryStorage('searchHistory')
  },
  /**
   * 清除单个搜索记录
   */
  removeSingleSearchHistoryStorage(e) {
    let index = e.target.dataset.searchIndex
    this.data.searchHistory.splice(index,1)

    this.setSearchHistoryStorage('searchHistory', { list: this.data.searchHistory})
    this.getSearchHistoryStorage('searchHistory')
  },
  search(e) {
    let searchHistoryList = []
    if (!!e) {
      searchHistoryList = this.data.searchHistory.concat(e.detail)
      this.setSearchHistoryStorage('searchHistory', {list: searchHistoryList})
      this.getSearchHistoryStorage('searchHistory')
    }
  }
})