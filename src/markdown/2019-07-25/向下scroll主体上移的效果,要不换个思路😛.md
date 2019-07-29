## 向下scroll时主体上移，要不换个思路？😊
---

blog在进行scroll的时候，页面两个地方会发生变化:

1. header背景 & header文字颜色
2. 页面白色主体部分(main-container)会随着scroll向下而整体上移， 随着scroll的向上而下移

对于第二点，正常思路：在scroll时动态计算main-container的translateY即可，但这涉及到一个问题：  

*  main-container上移，**但包裹它的main元素的高度不会受其子元素translateY的位移影响**。这意味着，在main-container上移时，main高度不变，致使下面视觉空白增大。footer与main是平级关系，footer的视觉高度就会随着scroll向下而变大，scroll向上变小。  

*  一种解决办法是，scroll时让<main>整个上移，但main在标准流中，加之它是主体部分，无疑会觉得这个操作「很重」。  

*  另一种则是换个思路，在scroll时，让顶部脱离标准流（position:absolute）的背景图片“下移”，在视觉上造成主体部分上移的效果，这样操作相对轻量很多。


