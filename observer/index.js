'use stirct'
const Dep = require('./dep')
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)
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
    this.dep = new Dep()
    // def(value, '__ob__', this)
    if (Array.isArray(value)) {
      // 进行数组操作
      const augment = hasProto ? protoAugment : copyAugment
      augment(value, arrayMethods, arrayKeys)
      this.observerArray(value)
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
  // 深度检测
  observerArray(items) {
    for (let i = 0, len = items.length; i < len; i++) {
      observer(items[i])
    }
  }
}
const hasProto = '__proto__' in {} // 判断__proto__是否可用

function protoAugment(target, src, keys) {
  target.__proto__ = src
}

function copyAugment(target, src, keys) {
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}

// 把一个对象转换为可观察的对象
function defineReactive(obj, key, val) {
  const dep = new Dep()
  let childOb = observer(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (childOb) {
        childOb.dep.depend()
      }
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
/**
 * 尝试为value创建一个0bserver实例，如果创建成功，直接返回新创建的Observer实例。
 * 如果 Value 已经存在一个Observer实例，则直接返回它
 */
function observer(value, asRootData) {
  if (isObject(value) || value instanceof VNode) {
    return
  }
  let ob
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }
  return ob
}
let car = new Observer({
  brand: 'BMW',
  price: 3000,
})
