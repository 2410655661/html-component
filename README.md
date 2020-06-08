# html-component

## 利用customElements实现自定义组件

核心是继承了HTMLElement，在element的基础上进行扩展；
需要注意的是，自定义标签必须中间添加连字符，避免与原生标签产生冲突；

## 事件绑定机制

通过监听document的click事件，来获取target，通过this与dataset结合来实现事件的绑定，一定程度上减少了addEventListener监听的同时，提升代码简洁性

## 使用方法

通过data-XXX来实现传参；
params：

    | title | content |
    | 标题   | 内容    |
