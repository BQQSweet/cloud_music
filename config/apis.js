export default {
    index: {
        banners: {
            path: 'banner',
            auth: false
        },
        recommendList: {
            path: 'personalized',
            auth: false
        },
        topList: {
            path: 'toplist',
            auth: false
        },
        rankList: {
            path: 'playlist/detail',
            auth: false
        }
    },
    login: {
        cellphone: {
            path: 'login/cellphone',
            auth: false
        }
    },
    video: {
        videotags: {
            path: 'video/group/list',
            auth: false
        },
        videoList: {
            path: 'video/group',
            auth: false
        },
        videoDetail:{
            path: 'video/url',
            auth: false
        }
    }
}