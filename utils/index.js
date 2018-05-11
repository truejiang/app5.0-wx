/**
 * 通用方法的集合 util
 */
import config from './config.js'
import wxCharts from './lib/js/wxcharts.js'

// request option 的默认参数
const DEFAULT_REQUEST_OPTIONS = {
  url: '',
  data: {},
  header: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  dataType: 'json'
}

const util = {
  /**
   * 数字转换货币格式
   * s => 传入要转换的数字
   * n => 保留小数点后面几位数，默认为0
   */
  formatMoney(s, n = 0) {
    let floatn = (n >= 0 && n <= 20) ? n : 0
    let ss = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(floatn) + ''
    let l = ss.split('.')[0].split('').reverse(),
      r = ss.split('.')[1],
      t = ''
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '')
    }

    if (floatn < 2) {
      return t.split('').reverse().join('')
    } else {
      return t.split('').reverse().join('') + '.' + r
    }
  },
  /**
   * 格式化时间，如果今天之前的只显示月日，如果今天内的显示小时和分，如果超过今年的显示年份
   */
  formatTime(time) {
    let msgTime = new Date(time)
    let nowTime = new Date()
    // 如果消息年份小于当前的年份则直接返回年份
    if (msgTime.getFullYear() < nowTime.getFullYear()) {
      return msgTime.getFullYear()
    }
    // 如果消息月份小于当前的月份 或者 月份相等，但是日期小于 直接返回月-日的格式
    if (msgTime.getMonth() < nowTime.getMonth() || (msgTime.getMonth() === nowTime.getMonth() && msgTime.getDate() < nowTime.getDate())) {
      return `${this.formatTimeV2(msgTime.getMonth() + 1)}-${this.formatTimeV2(msgTime.getDate())}`
    }
    // 剩下一种情况返回小时-分的格式
    return `${this.formatTimeV2(msgTime.getHours())}:${this.formatTimeV2(msgTime.getMinutes())}`
  },
  /**
   * 给小于10的时间加个0
   */
  formatTimeV2(time) {
    return time < 10 ? `0${time}` : time
  },
  /**
   * 接口请求 request 方法
   * @arguments
   * opt 请求的参数配置-Object
   */
  request(opt) {
    let options = Object.assign({}, DEFAULT_REQUEST_OPTIONS, opt)
    let { url, data, header, method, dataType } = options
    let self = this
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: header,
        method: method,
        dataType: dataType,
        success(res) {
          if (res && res.statusCode === 200 && res.data) {
            resolve(res.data)
          } else {
            self.alert('提示', res)
            reject(res)
          }
        },
        fail(err) {
          self.log(err)
          self.alert('提示', err)
          reject(err)
        }
      })
    })
  },
  /**
   * 本地存储数据 setStorageData 封装
   * @arguments
   * key type:String 要存储在本地的数据名
   * value type:Object/String 存储的数据值，默认为空
   * callback type:function 成功后调用的函数
   */
  setStorageData(key, value = '', callback) {
    wx.setStorage({
      key: key,
      data: value,
      success(res) {
        callback && callback(res)
      }
    })
  },
  /**
   * 读取本地存储数据 getStorageData 封装
   * @arguments
   * key type:String 需要读取的本地数据key名
   * callback type:Function 操作成功后执行的函数
   */
  getStorageData(key, callback) {
    let slef = this
    wx.getStorage({
      key: key,
      success: function (res) {
        callback && callback(res.data)
      },
      fail(err) { }
    })
  },
  /**
   * 清除本地搜索记录 clearStorageData 封装
   * @arguments
   * key type:String 需要删除的数据key名
   * 这次试着用Promise写
   */
  removeStorageData(key) {
    return new Promise((resolve, reject) => {
      wx.removeStorage({
        key: key,
        success: function (res) {
          resolve(res)
        },
        fail: function (err) {
          reject(res)
        }
      })
    })
  },
  /**
   * 分享页面的配置函数
   * @arguments
   * title type: String 分享的标题
   * contentId type: Number 分享的页面Id 默认请传空
   * path type: String 分享的路径 默认请传空
   * successCb type: Function 成功后的方法
   * failCb type: Function 失败后的方法
   */
  sharePage(title = config.defaultShareTitle, contentId = 0, path = '/pages/index/index', successCb, failCb) {
    return {
      // 分享出去的内容标题
      title: title,

      // 用户点击分享出去的内容，跳转的地址
      // contentId为文章id参数；share参数作用是说明用户是从分享出去的地址进来的，我们后面会用到
      path: path,

      // 分享成功
      success: function (res) { },

      // 分享失败
      fail: function (res) { }
    }
  },
  /**
   * 路由跳转
   * @arguments
   * path type:String 跳转的页面路径
   */
  pageRouter(path) {
    wx.navigateTo({
      url: path
    })
  },
  /**
   * wxCharts绘制的封装方法
   * @arguments
   * opts type:Object
   * 其中categories的数据结构是 {categories:[Array], data: [Array]}对应X轴和Y轴
   */
  drawWxCharts(opts) {
    let { canvasId, width, height, type, categories, series, yAxisTitle} = opts
    let windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: '成交量1',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
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
  }
}

export default util