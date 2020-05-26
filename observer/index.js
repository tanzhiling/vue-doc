'use stirct'
const Dep = require('./dep')
function def(obj, key, value) {
  Object.defineProperty(obj, key, {
    value,
    enumerable: true,
    writable: true,
    configurable: true,
  })
}
class Observer {
  constructor(value) {
    this.value = value
    // 添加转换标记
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      // 进行数组操作
    } else {
      this.walk(value)
    }
  }
  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }
}

// 把一个对象转换为可观察的对象
function defineReactive(obj, key, val) {
  if (typeof val === 'object') {
    new Observer(val)
  }
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend()
      return val
    },
    set(newVal) {
      if (newVal === val) {
        return
      }
      value = newVal
      dep.notity()
    },
  })
}
let car = new Observer({
  brand: 'BMW',
  price: 3000,
})
