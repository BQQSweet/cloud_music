// pages/my/index.js
const app = getApp()
let startY = 0
let moveY = 0
let distanceY = 0
Page({
  data: {
    navHeight: app.globalData.navHeight,
    slideY:"translateY(0)",
    transition:""
  },
  onLoad: function (options) {

  },
  //touch处理函数
  handleTouchStart(event) {
    this.setData({
      transition:''
    })
    startY=event.touches[0].clientY
  },
  handleTouchMove(event) {
    moveY=event.touches[0].clientY
    distanceY=moveY-startY
    if(distanceY<=0||distanceY>=100) return
    this.setData({
      slideY:`translateY(${distanceY}rpx)`
    })
  },
  handleTouchEnd() {
    this.setData({
      slideY:`translateY(0)`,
      transition:'all 1s linear'
    })
  }
})