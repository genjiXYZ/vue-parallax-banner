<template>
  <div id="app">
    <parallaxBanner :ParallaxConfig="layerConfig" />


  </div>
</template>

<script>
export default {
  name: "App",
  components: {

  },
  data() {
    return {
      layerConfig: {
        image: [],
        height: `250px`,
        width: `3000px`,
        bezier: [0, 0, 1, 1],
        translateOffset: [0, 100, 120, 150, 250, 300],
        blurOffset: [7, 0, 5, 5, -3, -6],
        pic: "",
      },
    };
  },
  created() {
    for (let index = 0; index < 6; index++) {
      let localImage = require(`./assets/nav${index}.png`);
      this.layerConfig.image.push(localImage);
    }

    this.layerConfig.pic = [require(`./assets/nav1.png`),require(`./assets/big2.png`),require(`./assets/big3.png`),require(`./assets/big4.png`)];
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
*{margin: 0;}
</style>
