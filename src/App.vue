<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import login from './components/login.vue';
import Index from './components/Index.vue';
export default {
  name: 'App',
  components: {
    login,
    Index
  },
  data() {
    return {

    };
  },
  methods: {

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
  min-height: 100vh;
  /* 确保全屏高度 */
}


.el-row {
  display: block;
  /* 确保 el-row 显示 */
}
</style>