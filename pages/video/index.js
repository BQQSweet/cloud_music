// pages/video/index.js
const app = getApp()
import apis from "../../config/apis"
import {
  http
} from "../../utils/wxUtils"
const api = apis.video
Page({
  data: {
    navHeight: app.globalData.navHeight,
    active: 0,
    tabsList: [],
    videoList: [],
    currentPlay: null,
    currentIndex:null
  },
  onLoad: async function (options) {
    await this.getVideoTags()
    this.getVideoList()
  },
  // tab change 处理函数
  async onChange({
    detail
  }) {
    this.setData({
      active: detail.name
    })
    this.getVideoList()
  },
  // 获取视频标签列表
  async getVideoTags() {
    const [err, res] = await http(api.videotags)
    if (err) return
    this.setData({
      active: res.data[0].id,
      tabsList: res.data.splice(0, 14)
    })
  },
  // 获取标签对应的视频数据
  async getVideoList() {
    const {
      active: id
    } = this.data
    const [err, res] = await http(api.videoList, {
      id
    })
    if (err) return
    this.setData({
      videoList: res.datas,
      show: true
    })
    setTimeout(() => {
      this.setData({
        show: true,
      })
    }, 500);
  },
  // 播放视频
  async playVideo({
    target: {
      dataset: {
        index,
        id
      }
    }
  }) {
    const {
      videoList,
      currentIndex
    } = this.data
    this.initVideoList(currentIndex)
    this.currentPlay = wx.createVideoContext(`v-${index}`)
    const [err, res] = await http(api.videoDetail, {
      id
    })
    if (err) return
    videoList[index].data.urlInfo = res.urls[0].url
    videoList[index].displayed = true
    this.setData({
      videoList,
      currentIndex: index,
    })
  },
  // 初始化播放列表
  initVideoList(i) {
    const {
      currentPlay
    } = this
    const {
      videoList
    } = this.data
    if (currentPlay) {
      currentPlay.stop()
      videoList[i].displayed = false
      this.setData({
        videoList,
      })
    }
  }
})