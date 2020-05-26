const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto) // 创建一个对象作为拦截器

// 数组改变自身的方法有7个
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
]

methodsToPatch.forEach(function (method) {
  const original = arrayProto[method] // 缓存原生方法
  Object.defineProperty(arrayMethods, method, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function mutator(...args) {
      const result = original.apply(this, args)
      const ob = this.__ob__
      ob.dep.notify()
      return result
    },
  })
})
