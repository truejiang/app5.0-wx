// pages/buying/buying-detail/buying-detail.js

import utils from '../../../utils/index.js'
import wxCharts from '../../../utils/lib/js/wxcharts.js'

let lineChart = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topImgs: ['http://oqk0uz684.bkt.clouddn.com/buying-goods-detail.png', 'http://oqk0uz684.bkt.clouddn.com/buying-goods-detail.png', 'http://oqk0uz684.bkt.clouddn.com/buying-goods-detail.png'],
    teaName: '2017年鸡饼500g',
    remindTimeList: [
      { value: '1分钟', minutes: 1, isSelected: true},
      { value: '10分钟', minutes: 10, isSelected: false},
      { value: '30分钟', minutes: 30, isSelected: false},
      { value: '1小时', minutes: 60, isSelected: false},
      { value: '1天', minutes: 1440, isSelected: false},
      { value: '不提醒', minutes: 0, isSelected: false}
      ],
    remindShow: false,
    optionsList: [
      { name: '品牌', value: '陈升号' },
      { name: '名称', value: '2017鸡饼500g' },
      { name: '产地', value: '勐海茶区' },
      { name: '类型', value: '生茶' },
      { name: '生产日期', value: '2017年1月1日' },
      { name: '规格', value: '500g/饼、7饼/提、28饼/件' },
      { name: '出厂总量', value: '暂无数据' },
      { name: '预售单价', value: '￥3200/件' },
      { name: '预售时间', value: '2017年1月3日-1月5日' }
    ],
    banners: ['../../../images/base/options-banner.png'],
    nav: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '茶品详情',
    })

    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();

    console.log(simulationData)
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: '成交量1',
        data: simulationData.data
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '成交金额 (万元)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
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
    return utils.sharePage(this.data.teaName,0,)
  },
  /**
   * 选择提醒的内容
   */
  selectRemind(e) {
    let currentIndex = e.target.dataset.selectedIndex
    this.data.remindTimeList.forEach((ele, index) => {
      if (currentIndex === index) {
        ele.isSelected = true
      } else {
        ele.isSelected = false
      }
    })
    this.setData({
      remindTimeList: this.data.remindTimeList
    })
  },
  cancelRemindPage() {
    this.setData({
      remindShow: false
    })
  },
  saleToRemind(){
    this.setData({
      remindShow: true
    })
  },
  selectNav(e) {
    let flag = true
    e.target.dataset.navSelected === '0' ?  flag = true : flag = false
    this.setData({
      nav: flag
    })
  },
  createSimulationData() {
    let categories = []
    let data = []
    for (let i = 0; i < 10; i++) {
      categories.push('2018- ' + (i + 1))
      data.push(Math.random() * (20 - 10) + 10)
    }

    return {
      categories: categories,
      data: data
    }
  }
})