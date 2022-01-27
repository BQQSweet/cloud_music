const app = getApp();
import {
    http
} from '../../utils/wxUtils';
import apis from '../../config/apis'
const api = apis.index
Page({
    data: {
        navHeight: app.globalData.navHeight,
        bannerList: [],
        recommendList: [],
        systemInfo: wx.getStorageSync('systemInfo'),
        typeList: {
            android: 1,
            iphone: 2,
            ipad: 3
        },
        rankListId: "",
        currentIndex: 0,
        ids: [],
        rankList: []
    },
    onLoad: async function (options) {
        this.getBanners()
        this.getRecommendList()
        await this.getRankListId()
        await this.getRankList()
        console.log(this.data);
    },
    //排行榜切换
    swiperOnChange(c) {
        this.setData({
            currentIndex: c.detail.current
        })
    },
    //获取轮播图数据
    async getBanners() {
        const {
            typeList,
            systemInfo: {
                system: type
            }
        } = this.data
        const [err, res] = await http(api.banners.path, {
            type: typeList[type]
        })
        if (err) return
        this.setData({
            bannerList: res.banners
        })
    },
    //获取推荐歌单
    async getRecommendList() {
        const [err, res] = await http(api.recommendList.path, {
            limit: 10
        })
        if (err) return
        this.setData({
            recommendList: res.result
        })
    },
    //获取所有排行榜歌单id
    async getRankListId() {
        const [err, res] = await http(api.topList.path)
        if (err) return
        const idsArr = res.list.splice(0, 5)
        const ids = []
        idsArr.map(v => {
            ids.push(v.id)
        })
        this.setData({
            ids
        })
    },
    //获取排行榜
    getRankList() {
        const {
            ids
        } = this.data
        const rankList = []
        ids.map(async v => {
            const [err, res] = await http(api.rankList.path, {
                id: v
            })
            if (err) return
            const {
                name,
                id,
                tracks
            } = res.playlist
            rankList.push({
                name,
                id,
                tracks: tracks.splice(0, 3)
            })
            this.setData({
                rankList
            })
        })
    }
})