<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    keywords: 'App',
    data() {
      return {
        activeIndex: '1',
        menuItems: ["首页", "后台", "目录", "添加"],
        checkedIndex: 0,
        account: "",
        password: "",
        remember: false,
        spanIndex: 7,
        screenWidth: null,
        loginStatus: "登录",
      }
    },
    methods:{

    }
  }
</script>

<style lang="scss">
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #4d4d4d !important;
    margin: 0;
    padding: 0;
  }
</style>
