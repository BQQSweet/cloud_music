// pages/login/index.js
//网络请求
import {
  http
} from '../../utils/wxUtils';
//弹窗组件
import {
  $Toast
} from '../../iview/base/index.js'
//表单验证
import {
  checkPhone,
  checkPassword
} from '../../utils/reg.js'
//api路径列表
import apis from '../../config/apis'
const api = apis.login
const app = getApp()
Page({
  data: {
    navHeight: app.globalData.navHeight,
    queryInfo: {
      phone: "",
      password: ""
    }
  },
  onLoad: function (options) {

  },
  //表单绑定
  bindChangeHanlder(e) {
    const {
      queryInfo
    } = this.data
    const {
      target: {
        id
      },
      detail: {
        detail: {
          value
        }
      }
    } = e
    queryInfo[id] = value
    this.setData({
      queryInfo
    })
  },
  //登录
  async login() {
    const {
      queryInfo
    } = this.data
    //前端验证
    if (!this.validation(queryInfo.phone, checkPhone) || !this.validation(queryInfo.password, checkPassword)) return
    const [err, res] = await http(api.cellphone.path, queryInfo)
    if (err) {
      console.log(err);
      return $Toast({
        content: err.msg,
        type: 'error',
        selector: "#login"
      })
    }

    $Toast({
      content: '登录成功',
      type: 'success',
      selector: "#login"
    })
    //存储token
    wx.setStorageSync('token', res.token)
    //存储个人信息
    wx.setStorageSync('profile', JSON.stringify(res.profile))
    wx.reLaunch({
      url: '/pages/my/index'
    })
  },
  //验证弹窗提示
  validation(v, fun) {
    const res = fun(v)
    if (!res.pass) {
      $Toast({
        content: res.msg,
        type: 'error',
        selector: "#login"
      })
    }
    return res.pass
  }
})