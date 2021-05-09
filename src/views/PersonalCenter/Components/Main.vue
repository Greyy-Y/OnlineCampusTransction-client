<template>
  <div class="info1">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "UserMain"
};
</script>

<style lang="scss" scoped>
.info1 {
  width: 100%;
  background: white;
  height: 700px;
  overflow: scroll;
  min-height: 700px;
}
</style>
