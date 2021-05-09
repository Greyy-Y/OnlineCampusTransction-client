<template>
  <div id="app">
    <transition name="v"><router-view /></transition>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  height: 100vh;
}
.v-enter {
  opacity: 0.8;
}
.v-enter-active {
  transition: 0.5s;
}
.v-enter-to {
  opacity: 1;
}
.v-leave {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  transition: 0.5s;
}

// 隐藏滚动条
// ::-webkit-scrollbar {
// 	width: 0 !important;
// }
// ::-webkit-scrollbar {
// 	width: 0 !important;
// 	height: 0;
// }

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  /**/
}
::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  // background: #333;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  // background: #333;
}
::-webkit-scrollbar-corner {
  background: #e2e2e2;
}
</style>
