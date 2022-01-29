const app = getApp()
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    title: {
      type: String,
      value: "标题"
    },
    ifBack: {
      type: Boolean,
      value: true
    }
  },
  data: {
    navHeight: app.globalData.navHeight,
    statusHeight: app.globalData.statusHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBack() {
      wx.navigateBack()
    }
  }
})