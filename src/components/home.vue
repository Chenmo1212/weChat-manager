<template>
  <div class="hello">
    <el-container>

      <el-header v-show="isShowHeader">
        <el-row :gutter="20">
          <el-col :span="4" class="hidden-xs-only">
            <div id="logo">
              <img src="../assets/logo.png"/>
            </div>
          </el-col>
          <el-col :span="16" class="hidden-xs-only">
            <div class="menu">
              <el-row :gutter="10">
                <div v-for="(item, index) in menuItems">
                  <el-col :span="6" :class="{'menu-item':true, 'checked':checkedIndex === index}"
                          @click.native="checkMenu(index)">{{item}}
                  </el-col>
                </div>
              </el-row>
            </div>
          </el-col>
          <el-col :span="24" class="hidden-sm-and-up">
            <div class="menu">
              <el-row :gutter="10">
                <div v-for="(item, index) in menuItems">
                  <el-col :span="6" :class="{'menu-item':true, 'checked':checkedIndex === index}"
                          @click.native="checkMenu(index)">{{item}}
                  </el-col>
                </div>
              </el-row>
            </div>
          </el-col>
          <el-col :span="4" class="hidden-xs-only">
            <div class="login-status">
              <div @click="isLogin">{{loginStatus}}</div>
            </div>
          </el-col>
        </el-row>
      </el-header>

      <!--content-->
      <el-main>
        <router-view v-on:getRouterName="getRouterName"></router-view>
      </el-main>

      <!--footer-->
      <el-footer id="el-footer">
        <el-row class="footer-icon">
          <el-col :span="8"><a href="https://github.com/Chenmo1212" target="_blank"><img
            src="../assets/github.png"/></a></el-col>
          <el-col :span="8">
            <el-popover
              placement="top-start"
              title="扫码添加QQ好友"
              width="160"
              trigger="hover">
              <img src="../assets/qqcode.png" height="151" width="151"/>
              <el-button slot="reference"><img src="../assets/qq.png"/></el-button>
            </el-popover>
          </el-col>
          <el-col :span="8">
            <el-popover
              placement="top-start"
              title="扫码添加微信好友"
              width="160"
              trigger="hover">
              <img src="../assets/weixincode.png" height="151" width="151"/>
              <el-button slot="reference"><img src="../assets/weixin.png"/></el-button>
            </el-popover>
          </el-col>
        </el-row>
        <el-row class="copyright">Copyright ©, Chen Mo Design, 2020</el-row>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        menuItems: ["首页", "后台", "目录", "添加"],
        checkedIndex: 0,
        spanIndex: 7,
        screenWidth: null,
        loginStatus: "登录",
        isShowHeader: true,
        hasLogin: false
      }
    },
    created() {
      console.log(localStorage.getItem('hasLogin'));
      this.hasLogin = !!localStorage.getItem('hasLogin');

      console.log('this.hasLogin',this.hasLogin);
      console.log(this.$route.name);
      if (this.$route.name === "login") {
        this.checkedIndex = 0
      } else if (this.$route.name === "management") {
        this.checkedIndex = 1
      }
    },
    methods: {
      checkMenu(index) {
        this.checkedIndex = index;
        console.log(this.checkedIndex);
        if (index === 1) {
          this.$router.push({
            name: "management",
            params: {
              hasLogin: true
            }
          });
        }
        if (index === 0) this.$router.push({name: "login"})
      },
      getRouterName(obj) {
        console.log(obj);
        if (obj.routeName === "management") {
          this.checkedIndex = 1
        }
        this.hasLogin = obj.hasLogin;
        this.checkedIndex = obj.checkedIndex;
        console.log("是否登录", this.hasLogin)
      },
      // 是否登录
      isLogin(){
        localStorage.clear();
      }
    },
    mounted() {
      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }

      let screenWidth = document.body.offsetWidth;
      console.log(screenWidth);
      if (screenWidth <= 415) { // phone
        this.isShowHeader = false
      }

      console.log("是否登录", this.hasLogin);
      if (this.hasLogin) {
        this.$router.push({name: "management"});
      } else {
        this.$router.push({name: "login"});
      }
    },

    watch:{
      screenWidth(val){
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if(!this.timer){
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function(){
            // 打印screenWidth变化的值
            console.log(that.screenWidth);
            location.reload();
            that.timer = false
          },400)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .el-header {
    margin-top: 20px;

    #logo {
      img {
        max-height: 60px;
      }
    }

    .menu {
      margin: 0 auto;
      max-width: 300px;
      min-height: 60px;
      line-height: 60px;
      color: #909399;

      .menu-item {
        position: relative;
        padding: 0 10px;
        transition-property: all;
        transition-duration: 0.2s;
        transition-timing-function: linear;
        cursor: pointer;
      }

      .menu-item::before { /* 伪元素来做下划线 */
        content: "";
        position: absolute;
        top: 0;
        left: 100%;
        width: 0; /* 一开始宽度为0下划线也为0看不出来 */
        height: 100%;
        border-bottom: 2px solid #4d4d4d;
        transition: all 0.2s linear;
      }

      .menu-item:hover::before {
        width: 100%; /* hover后宽度显示出来下划线也显示出来 */
        top: 0;
        left: 0;
        transition-delay: 0.1s;
        border-bottom-color: #4d4d4d;
        color: #000000;
      }

      .menu-item:active {
        color: #fff;
      }

      .menu-item:hover ~ .menu-item:before { /*~ 选择器：查找指定元素后面的所有兄弟结点*/
        left: 0; /*处于hover后面元素的下划线从左侧开始显示*/
      }

      .checked::before {
        width: 100%; /* hover后宽度显示出来下划线也显示出来 */
        top: 0;
        left: 0;
        transition-delay: 0.1s;
        border-bottom-color: #4d4d4d;
      }

      .menu-item:hover,
      .checked {
        color: #4d4d4d;
      }
    }

    .login-status {
      height: 60px;
      line-height: 60px;
      text-align: center;

      div {
        display: inline-block;
        width: 67px;
        color: #8c939d;
        cursor: pointer;
      }

      div:hover {
        color: #4d4d4d;
        text-decoration: underline;
      }
    }
  }


  .el-footer {
    .footer-icon {
      width: 300px;
      margin: 0 auto;

      .el-col {
        .el-button {
          border: none;
          padding: 0;
        }

        .el-button:hover {
          background-color: #fff;
        }

        img {
          max-width: 30px;
        }
      }
    }

    .copyright {
      font-size: 14px;
      margin-top: 5px;
      color: #8c939d;
    }
  }
</style>
