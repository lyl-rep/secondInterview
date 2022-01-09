<template>
  <div id="app">
    <div id="nav">
      <Index></Index>
    </div>
  </div>
</template>
<script>
import Index from "@/views/index.vue";
export default {
  components: {
    Index,//改改
  },
};
</script>
<style>
#app,#nav{
  width: 100%;
  height: 100%;
}
</style>
