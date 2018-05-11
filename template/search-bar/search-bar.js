// template/search-bar/search-bar.js
import utils from '../../utils/index.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchWords: {
      type: 'String',
      value: '搜索你感兴趣的内容吧'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchValue: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    search(e){
      let searchHistoryList = []
      let searchV = e.detail.value ? e : this.data.searchValue
      this.triggerEvent('search', searchV.detail.value, {})
    },
    /**
     * 清空搜索框
     */
    removeSearchValue() {
      this.setData({
        searchValue: ''
      })
    },
    /**
     * 监听搜索框的输入
     */
    setSearchValue(e) {
      if (!!e.detail.value) {
        this.data.searchValue = e
      }
    }
  }
})
