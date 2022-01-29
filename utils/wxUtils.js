import {
    DEVELOP_URL
} from "../config/request"
import {
    $Toast
} from '../iview/base/index'
import codeList from '../config/statusCode'
// 通过 wx.getSetting 查询一下用户是否授权
const getSetting = (setting) => {
    const scope = 'scope.' + setting
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result.authSetting[scope])
            },
            fail: (res) => {
                reject(res)
            },
        })
    })
}
const getStorage = (key) => {
    return new Promise((resolve, reject) => {
        wx.getStorage({
            key,
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}
const http = (url, data = {}, method = 'GET') => {
    return new Promise((resolve) => {
        wx.request({
            url: DEVELOP_URL + url,
            data,
            method,
            success: (res) => {
                if (res.data.code !== 200) {
                    resolve([res.data,null])
                } else {
                    resolve([null,res.data])
                }
            },
            fail: (err) => {
                resolve([err, null])
            }
        })
    })
}
export {
    getSetting,
    getStorage,
    http
}