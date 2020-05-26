'use strict'
// 收集依赖
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  // 删除一个依赖
  removeSub(sub) {
    remove(this.subs, sub)
  }
  // 添加一个依赖
  depend() {
    if (window.target) {
      this.addSub(window.target)
    }
  }
  // 通知依赖更新
  notity() {
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}

function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index >= 0) {
      return arr.splice(index, 1)
    }
  }
}
module.exports = Dep
