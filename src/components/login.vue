<template>
  <div class="login">
    <el-row :gutter="10">
      <el-col :span="picSpan" class="hidden-sm-and-down">
        <div class="left-aside" id="left-aside">
          <div class="pic">
            <img src="../assets/new-year.png"/>
          </div>
        </div>
      </el-col>
      <el-col :span="loginSpan" style="text-align: center; margin: 0 auto">
        <el-row style="text-align: center;">
          <div style="height: 80%;width: 100%" class="right-aside">
            <el-col :span="18" :offset="3">
              <div class="login" id="login">
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
                  <el-button type="info" size="large" @click="toManagement" :loading="loading">{{ loading ? '登录中 ...' :
                    '登 录' }}
                  </el-button>
                </div>
              </div>
            </el-col>
          </div>
        </el-row>
      </el-col>
      <el-col :span="lineSpan" class="line">
        <div class="short-line"></div>
        <div class="long-line"></div>
      </el-col>

      <el-col :span="phoneSpan" class="phone">
        <div class="login">
          <el-col style="margin: 40px auto 80px"><img src="../assets/logo.png"/></el-col>
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
            <el-button type="info" size="large" @click="toManagement">登录</el-button>
          </div>
          <el-divider>关于</el-divider>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    keywords: "login",
    data() {
      return {
        account: "",
        password: "",
        remember: false,
        picSpan: 16,
        lineSpan: 1,
        loginSpan: 7,
        phoneSpan: 0,
        loading: false
      }
    },
    methods: {
      toManagement() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.$router.push({
            name: "management",
            params: {
              hasLogin: true
            }
          });
          this.$emit('getRouterName', {routeName: 'management', hasLogin: true});
          this.$message({
            message: '登录成功~',
            type: 'success'
          });
        }, 400);

      }
    },
    created() {
      if (this.$route.params.hasLogin){
        this.$emit('getRouterName', {routeName: 'login', hasLogin: false, checkedIndex: 0});
      }
    },
    mounted() {
      let screenWidth = document.body.offsetWidth;
      console.log(screenWidth);
      if (screenWidth < 1920 && screenWidth >= 1200) {
        this.loginSpan = 8;
        this.lineSpan = 0;
      } else if (screenWidth < 1200 && screenWidth >= 1025) {
        this.loginSpan = 12;
        this.picSpan = 12;
        this.lineSpan = 0;
        document.getElementById("left-aside").style.marginTop = "160px"
      } else if (screenWidth < 1025 && screenWidth >= 768) { // ipad Pro
        this.lineSpan = 0;
        this.loginSpan = 24;
        this.picSpan = 0;
        document.getElementById("login").style.height = "500px";
        document.getElementById("login").style.marginTop = "200px";
      } else if (screenWidth < 768 && screenWidth >= 415) { // ipad Pro
        this.lineSpan = 0;
        this.loginSpan = 24;
        this.picSpan = 0;
        document.getElementById("login").style.height = "400px";
      } else if (screenWidth < 415) { // phone
        this.lineSpan = 0;
        this.loginSpan = 0;
        this.picSpan = 0;
        this.phoneSpan = 24;
      }
      console.log(this.loginSpan);
      console.log(this.picSpan)
    }
  }
</script>

<style lang="scss" scoped>
  .el-main {
    margin: 50px 0;

    .left-aside {
      .pic {
        margin: 0 auto;

        img {
          max-width: 80%;
        }
      }
    }

    .right-aside {
      padding-top: 30px;

      .login {
        width: 90%;
        margin: 90px auto;
        padding-bottom: 40px;
        /*border: 2px solid #DCDFE6;*/
        border-radius: 8px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

        h3 {
          padding: 40px 0;
          color: #606266;
          width: 60%;
          margin: 0 auto;
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

    .phone {
      .login {
        padding-top: 20px;

        img {
          height: 60px;
        }

        /deep/ .el-input__inner {
          /*height: 60px;*/
          font-size: 15px;
          border: none;
          border-bottom: 1px solid #8c939d;
          border-radius: unset;
        }

        .el-input {
          margin-bottom: 20px;
          width: 80%;
        }

        .loginBtn {
          margin-top: 50px;

          .el-button {
            width: 80%;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
          }
        }

        .el-divider {
          margin: 100px auto 0;
          width: 50%;

          .el-divider__text {
            color: #8c939d;
          }
        }
      }
    }
  }
</style>
