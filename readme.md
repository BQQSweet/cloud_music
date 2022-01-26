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
