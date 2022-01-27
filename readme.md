## 数据劫持原理
```javascript
let data = {
  username: "byy",
  age: 22,
};
const _this = {};
for (const item in data) {
  Object.defineProperty(_this, item, {
    get() {
      console.log("get()");

      return data[item];
    },
    set(value) {
      data[item] = value;
      //   console.log("set()", item);
    },
  });
}

console.log(_this);
_this.username = "bb";//修改_this的属性时 data也会被修改
console.log(_this);
console.log(data);
```

## 获取用户基本信息
1. 用户首次登录-->未授权
  ```javascript
      wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorageSync('userInfo', res.userInfo)//及时将用信息存储到本地
      }
    })
  ```
2. 用户已经授权-->再次登录
`读取本地存储的用户信息`
