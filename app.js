// app.js
import {
  getDeviceSystem
} from 'utils/util'

App({
  async onLaunch() {
    //动态获取设备状态栏高度
    this.getStatusBarHeight()
    //获取设备信息
    await this.getDeviceInfo()
  },
  //全局数据
  globalData: {
    userInfo: null,
    navHeight: 0,
    statusHeight: 0
  },
  /*
    --------自定义方法----------
  */
  //获取设备顶部高度
  getStatusBarHeight() {
    // 获取状态栏高度
    const {
      statusBarHeight
    } = wx.getSystemInfoSync();
    // 得到右上角菜单的位置尺寸
    const menuButtonObject = wx.getMenuButtonBoundingClientRect();
    const {
      top,
      height
    } = menuButtonObject;
    // 计算导航栏的高度
    // 此高度基于右上角菜单在导航栏位置垂直居中计算得到
    const navBarHeight = height + (top - statusBarHeight) * 2;
    // 计算状态栏与导航栏的总高度
    const statusNavBarHeight = statusBarHeight + navBarHeight;
    this.globalData.navHeight = statusNavBarHeight;
    this.globalData.statusHeight = statusBarHeight
  },
  //获取设备信息
  getDeviceInfo() {
    return new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success(res) {
          const systemInfo = getDeviceSystem(res.system)
          wx.setStorageSync('systemInfo', systemInfo)
          resolve(1)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
})