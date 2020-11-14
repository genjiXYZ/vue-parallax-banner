<template>
  <div
    class="parallax-X"
    @mouseenter="baseSetting"
    @mousemove="handleMove"
    @mouseleave="handleLeave"
    ref="parallaxContainer"
    v-if="this.ParallaxConfig"
  >
    <div
      class="layer"
      v-for="(item, index) in ParallaxConfig.image"
      :key="`lly_${index}`"
    >
      <img
        :src="item"
        :style="{
          height: ParallaxConfig.height,
          width: ParallaxConfig.width,
        }"
        :ref="`nav${index}`"
      />
    </div>
  </div>
</template>

<script>
import bezier from "./bezier";
export default {
  name: "parallaxBanner",
  props: {
    ParallaxConfig: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      enterX: Number,
      curX: Number,
      navWidth: Number,
      leaveFlag: false,
      movRAF: "",
    };
  },
  computed: {
    percent() {
      return ((this.curX - this.enterX) / this.navWidth).toFixed(4) * 1;
    },
    translateOffset() {
      if (this.ParallaxConfig.translateOffset) {
        return this.ParallaxConfig.translateOffset;
      } else {
        return [0, 100, 120, 150, 250, 300];
      }
    },
    blurOffset() {
      if (this.ParallaxConfig.blurOffset) {
        return this.ParallaxConfig.blurOffset;
      } else {
        return [7, 0, 5, 5, -3, -6];
      }
    },
    mybezier() {
      return bezier(...this.ParallaxConfig.bezier);
    },
  },

  methods: {
    baseSetting(e) {
      this.enterX = e.clientX;
      this.navWidth = parseInt(
        getComputedStyle(this.$refs.parallaxContainer).width,
        10
      );
    },
    handleMove(e) {
      if (!this.leaveFlag) {
        this.curX = e.clientX;
        // cancelAnimationFrame(this.movRAF);
        this.movRAF = () => {
          this.transform(this.el, this.percent, this.translateOffset);
          this.blur(this.el, this.percent, this.blurOffset, 6);
        };
        requestAnimationFrame(this.movRAF);
      }
    },

    handleLeave() {
      this.leaveFlag = true;
      cancelAnimationFrame(this.movRAF);

      this.easing();
    },
    easing() {
      const nowTime = performance.now();
      const timeout = 200;
      let leavePercent = this.percent;
      const leaveRAF = (t) => {
        // // console.log("t: ", t);
        if (t - nowTime < timeout) {
          // // console.log("move");
          let easingPercent =
            leavePercent * this.mybezier(1 - (t - nowTime) / 200);
          // // console.log("easingPercent: ", easingPercent);
          this.transform(this.el, easingPercent, this.translateOffset);
          this.blur(this.el, easingPercent, this.blurOffset, 6);
          this.changeEyes(Math.floor(easingPercent * 4));
        } else {
          // // console.log("shouldStop");
          this.transform(this.el, 0, this.translateOffset);
          this.blur(this.el, 0, this.blurOffset, 6);

          cancelAnimationFrame(leaveRAF);
          return (this.leaveFlag = false);
        }

        requestAnimationFrame(leaveRAF);
      };

      requestAnimationFrame(leaveRAF);
    },
    transform(el, percent, offset) {
      el.forEach((nodeItem, index) => {
        const curOffset = offset[index];
        nodeItem.style.transform = `translateX(${curOffset * percent}px)`;
      });
    },

    blur(el, percent, baseBlur, ratio) {
      el.forEach((nodeItem, index) => {
        const curblur = baseBlur[index];
        nodeItem.style.filter = `blur(${Math.abs(
          percent * ratio + curblur
        )}px)`;
      });
    },

    changeEyes(i) {
      this.$refs.nav1[0].src = this.ParallaxConfig.pic[i >= 0 ? i : 3];
    },
  },

  mounted() {
    this.el = this.$refs.parallaxContainer.childNodes;
    this.blur(this.el, 0, this.blurOffset, 0);
  },
};
</script>

<style lang="css" scoped>
.parallax-X {
  width: 100vw;
  height: 9.375vw;
  min-width: 999px;
  background-color: grey;
  position: relative;
  overflow: hidden;
  min-height: 155px;
  user-select: none;
}

.layer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease-in-out 0s;
  user-select: none;

}

img {
  width: 3000px;
  height: 250px;

  object-fit: cover;
  vertical-align: middle;
  border-style: none;
  will-change: transform;
  user-select: none;

}
</style>
