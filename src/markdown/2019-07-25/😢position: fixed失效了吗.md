## position: fixed 失效了??? 😢
---

Blog中几个*position: fixed*的地方：

1.    header
2.    小屏幕上的side menu

在小屏幕上的交互行为是当右侧side menu向左出现时，整个页面也会朝左侧移动(包括header)，所以整个页面的wrap-container会发生transform。

####  

<blockquote>
    而父元素transform，子元素的fixed定位会失效
</blockquote>

  
####

所以，当把header和sidemenu这两个组件写在wrap-container里面，他们的fixed定位在wrap-container存在transform时就失效了。
  
####


因此，当我们需要元素相对于视口定位时，需要把它写在最外层。

```js
现在的dom结构(伪代码)
    - Header
    - wrap-container
    ...
    - SideMenu

之前的dom结构(伪代码)
    - wrap-container
        - Header
        ...
        - SideMenu

```

