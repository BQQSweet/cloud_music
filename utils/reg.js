const checkPhone = (p) => {
  const reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/
  const res = {
    pass: true,
    msg: ''
  }
  if (!p) {
    res.msg = '手机号不能为空'
    res.pass = false
  } else if (!reg.test(p)) {
    res.msg = "请输入正确的手机号"
    res.pass = false
  }
  return res
}
const checkPassword = (p) => {
  const passLength=6
  const res = {
    pass: true,
    msg: ''
  }
  if (!p) {
    res.pass = false
    res.msg = "密码不能为空"
  } else if (p.length < passLength) {
    res.pass = false
    res.msg=`密码长度不能小于${passLength}位`
  }
  return res
}
export {
  checkPhone,
  checkPassword
}