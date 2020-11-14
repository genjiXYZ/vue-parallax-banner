



## vue-parallax-banner

![](https://img.shields.io/badge/version-v0.063-9cf.svg)   ![](https://github.com/genjiXYZ/vue-parallax-banner/workflows/npm%20publish%20by%20action/badge.svg)  

[![npm](https://nodei.co/npm/vue-parallax-banner.png)](https://www.npmjs.com/package/vue-parallax-banner)

  看到B站 banner图 秋 感觉挺好看的! 
  之前做过`滚动的paralax`所以自己做一下试试!
  (趁着有图,赶紧弄个.有图很关键.以前没有图时候自己ps一点抠累死了.别跟我说ai抠图,得看情况),
  
  火狐浏览器有点bug  卡顿  应该是没写 -moz 或者 就不好说了 修复中 ... 

## demo

demo 图片版权归bilibili所有,此demo 仅为个人学习测试使用 如有侵权请联系 895939059@qq.com 删除.

gihub page ( 科学): https://genjixyz.github.io/vue-parallax-banner/

coding page : https://2nktve.coding-pages.com/

clone : 
```js 
git clone https://github.com/genjiXYZ/vue-parallax-banner.git
npm i 
npm run serve
```


## info



和官方 banner 区别

| 官方                           | this                                                 |
| ------------------------------ | ---------------------------------------------------- |
| 设置了 resize (){ dosomething} | 没弄                                                 |
| 计时器女孩眨眼 + 下一帧        | 鼠标滑出 女孩 眨眼 闭眼 睁眼 (根据滑出方向) + 下一帧 |

```
npm install
```

## how to use it

1. npm install

```npm
   npm i vue-parallax-banner
```

2. import

   全局 or 局部

```js
// vue   main.js    global import
import parallaxBanner from "vue-parallax-banner";
Vue.use(parallaxBanner);
```

```js
//local components import
import parallaxBanner from "vue-parallax-banner";
export default {
  components: {
    // HelloWorld,
    parallaxBanner,
  },
};
```

3. Config

```vue
<parallaxBanner :ParallaxConfig="localConfig" />
```

```js
export default {
  components: {
    parallaxBanner,
  },
  data() {
    return {
      localConfig: {
        image: [],      // 图片链接  有顺序的  第一个 z-index = 1  ,第二个 z-index = 2  
        height: `250px`, //  图片宽
        width: `3000px`, // 图片高
        bezier: [0, 0, 1, 1],   //当鼠标离开后,还原到默认setting动画的 贝塞尔曲线
        translateOffset: [0, 100, 120, 150, 250, 300], //图片translate 的最大 px,  
        blurOffset: [7, 0, 5, 5, -3, -6], // 图片的初始blur值(有方向) ,正负表示 鼠标左右运动 
        pic: "",//option  鼠标离开后女孩的动画图片链接 
      },
    };
  },
};
```


