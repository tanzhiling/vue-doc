### Vue Observer

>object 变化检测

1. 通过Object.defineProperty方法实现对object数据的可观测，封装Observer类 实现对对象的属性转换成getter/setter形式来侦测变化
2. 外界通过Watcher读取数据，会触发getter从而将Watcher添加到依赖中
3. 当数据发送了变化 会触发setter 从而向Dep中的依赖发送通知
4. Wactcher接收到通知后 会向外界发送通知 