// pages/my/index.js
const app = getApp()
let startY = 0
let moveY = 0
let distanceY = 0
Page({
  data: {
    navHeight: app.globalData.navHeight,
    slideY: "translateY(0)",
    transition: "all 0.1s linear",
    isLogin: false,
    userInfo: {
      avatarUrl: '/assets/image/mv.jpg',
      nickname: '游客'
    },
    panelList: [{
        icon: "iconfont icon-xiaoxi",
        title: "我的消息"
      },
      {
        icon: "iconfont icon-haoyou",
        title: "我的好友"
      },
      {
        icon: "iconfont icon-geren",
        title: "个人主页"
      },
      {
        icon: "iconfont icon-gexingzhuangban",
        title: "个性装扮"
      }
    ]
  },
  onLoad: function () {
    this.isLogin()
    if (this.data.isLogin) {
      this.setData({
        userInfo: JSON.parse(wx.getStorageSync('profile'))
      })
    }
  },
  //touch处理函数
  handleTouchStart(event) {
    this.setData({
      transition: 'all 0.1s linear'
    })
    startY = event.touches[0].clientY
  },
  handleTouchMove(event) {
    moveY = event.touches[0].clientY
    distanceY = moveY - startY
    if (distanceY <= 0 || distanceY >= 100) return
    this.setData({
      slideY: `translateY(${distanceY}rpx)`
    })
  },
  handleTouchEnd() {
    this.setData({
      slideY: `translateY(0)`,
      transition: 'all 0.3s linear'
    })
  },
  //登录
  toLogin() {
    const {
      isLogin
    } = this.data
    if (isLogin) return
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  //判断是否登录
  isLogin() {
    const token = wx.getStorageSync('token')
    if (token) {
      this.setData({
        isLogin: true
      })
    }
  }
})