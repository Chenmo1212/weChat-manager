<template>
  <div class="hello">
    <el-container>
      <el-header>
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
              <div>{{loginStatus}}</div>
            </div>
          </el-col>
        </el-row>
      </el-header>

      <!--content-->
      <el-main>
        <el-row :gutter="10">
          <el-col :span="16" class="hidden-sm-and-down">
            <div class="left-aside">
              <div class="pic">
                <img src="../assets/new-year.png"/>
              </div>
            </div>
          </el-col>
          <el-col :span="7">
            <div style="height: 600px;width: 100%" class="right-aside">
              <div class="login">
                <h3>陌尘众享管理后台</h3>
                <el-input
                  placeholder="请输入账号"
                  v-model="account"
                  prefix-icon="el-icon-user"
                  size="large"
                  class="input"
                  maxlength="10"
                  clearable>
                </el-input>
                <el-input
                  placeholder="请输入密码"
                  v-model="password"
                  prefix-icon="el-icon-lock"
                  size="large"
                  show-password
                  maxlength="16"
                  clearable>
                </el-input>
                <div style="text-align: left; width: 80%;margin: 0 auto;">
                  <el-checkbox v-model="remember">记住密码</el-checkbox>
                </div>
                <div class="loginBtn">
                  <el-button type="info" size="large">登录</el-button>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="1" class="line">
            <div class="short-line"></div>
            <div class="long-line"></div>
          </el-col>
        </el-row>
      </el-main>

      <!--footer-->
      <el-footer>
        <el-row class="footer-icon">
          <el-col :span="8"><a href="https://github.com/Chenmo1212" target="_blank"><img src="../assets/github.png"/></a></el-col>
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
    methods: {
      checkMenu(index) {
        this.checkedIndex = index;
        console.log(this.checkedIndex)
      }
    },
    // mounted () {
    //   const that = this;
    //   window.onresize = () => {
    //     return (() => {
    //       window.screenWidth = document.body.clientWidth
    //       that.screenWidth = window.screenWidth
    //     })()
    //   }
    // },
    // watch:{
    //   screenWidth(val){
    //     // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
    //     if(!this.timer){
    //       // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
    //       this.screenWidth = val
    //       this.timer = true
    //       let that = this
    //       setTimeout(function(){
    //         // 打印screenWidth变化的值
    //         console.log(that.screenWidth)
    //         that.timer = false
    //       },400)
    //     }
    //   }
    // }
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

  .el-main {
    margin: 50px 0px;

    .left-aside {
      .pic {
        margin: 0 auto;

        img {
          max-width: 80%;
        }
      }
    }

    .right-aside {
      padding-top: 10px;

      .login {
        margin: 90px auto;
        width: 420px;
        height: 400px;
        /*border: 2px solid #DCDFE6;*/
        border-radius: 8px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

        h3 {
          padding: 30px 0;
          color: #606266;
        }

        .el-input {
          width: 80%;
          margin-bottom: 20px;
        }

        /deep/ .el-input__inner {
          height: 50px;
          font-size: 15px;
        }

        /deep/ .el-input__inner:focus {
          outline: none;
          border-color: #a7a7b2;
        }

        .loginBtn {
          margin-top: 30px;

          .el-button {
            width: 80%;
          }
        }
      }
    }
    
    .line {
      .short-line {
        width: 1px;
        height: 100px;
        margin-top: -20px;
        background-color: #8c939d;
      }
      .long-line {
        width: 1px;
        height: 500px;
        margin-left: 20px;
        margin-top: -150px;
        background-color: #8c939d;
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
