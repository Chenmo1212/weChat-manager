<template>
  <div class="management">
    <el-container>

      <el-aside id="el-aside" v-if="!phoneWidth">
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen"
                 :collapse="isCollapse">
          <el-menu-item index="1">
            <i class="el-icon-s-data"></i>
            <span slot="title">数据</span>
          </el-menu-item>
          <el-menu-item index="2" @click="isAddKeywords = true">
            <i class="el-icon-plus"></i>
            <span slot="title">添加</span>
          </el-menu-item>
          <el-menu-item index="3" @click="isUploadFile = true">
            <i class="el-icon-upload2"></i>
            <span slot="title">上传</span>
          </el-menu-item>
          <el-menu-item index="4" @click="isUploadFile = true">
            <i class="el-icon-download"></i>
            <span slot="title">下载</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <el-table
          tooltip-effect="dark"
          v-loading="loading"
          :data="screenTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
          :default-sort="{prop: 'id', order: 'descending'}"
          :max-height="maxTableHeight"
          style="width: 100%">
          <el-table-column
            label="日期"
            sortable
            :width="dateCellWidth"
            prop="date">
          </el-table-column>
          <el-table-column
            label="关键词"
            :show-overflow-tooltip="true"
            prop="keywords">
          </el-table-column>
          <el-table-column
            label="内容"
            :show-overflow-tooltip="true"
            prop="content">
          </el-table-column>
          <el-table-column
            label="浏览"
            :width="cellWidth"
            sortable
            prop="num">
          </el-table-column>
          <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                placeholder="关键词搜索"
                v-model="search"
                @blur="searchBlur"
                @keyup.enter.native="searchData()">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="searchData"></i>
              </el-input>
            </template>
            <template slot-scope="scope">
              <el-button icon="el-icon-edit" :class="{'phoneStyle': phoneWidth}"
                         @click="handleEdit(scope.row)" circle></el-button>
              <el-button icon="el-icon-delete" :class="{'phoneStyle': phoneWidth}"
                         @click="handleDelete(scope.$index, scope.row)" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :small="smallPage"
            :page-sizes="[10, 20, 50, 100]"
            :layout="layout"
            :total="screenTableData.length">
          </el-pagination>
        </div>
      </el-main>

    </el-container>

    <!--添加关键词-->
    <update-keywords :isAddKeywords="isAddKeywords" :drawerSize='drawerSize' :dialogWidth='dialogWidth' ref="updateData"  @closeDrawer="updateKeyword"></update-keywords>

    <!--上传下载-->
    <upload-file :isUploadFile="isUploadFile" :drawerSize='drawerSize' @closeUploadDrawer="uploadFile"></upload-file>

    <!--menuBtn-->
    <nav class="cd-stretchy-nav" v-if="phoneWidth">
      <a class="cd-nav-trigger" href="javascript:void(0);" @click=trigger() @blur="trigger">
        <span aria-hidden="true"></span>
      </a>
      <ul class="cd-stretchy-nav-ul">
        <li><span @click="isAddKeywords = true"><i class="el-icon-plus"></i></span></li>
        <li><span @click="isUploadFile = true"><i class="el-icon-upload2"></i></span></li>
        <li><span @click="isUploadFile = true"><i class="el-icon-download"></i></span></li>
      </ul>
      <span aria-hidden="true" class="stretchy-nav-bg"></span>
    </nav>

  </div>
</template>

<script>
  import {getKeywordLists, getArticleLists, delKeywords} from '../../axios/api';
  import updateVue from './children/updateKeywords'
  import uploadVue from './children/uploadFile'

  export default {
    keywords: "management",
    data() {
      return {
        // 菜单是否折叠
        isCollapse: false,

        // 显示表格数据
        screenTableData: [],
        totalTableData: [],

        // 素材总列表
        materialLists: [],

        // 搜索内容
        search: '',

        // 页面大小
        pageSize: 10,
        currentPage: 1,

        // 屏幕宽度
        screenWidth: null,
        dialogWidth: null,

        // 表格宽高
        cellWidth: null,
        dateCellWidth: 90,
        maxTableHeight: 600,
        tableLoading: false,

        // 添加关键词抽屉
        drawer: false,
        isAddKeywords: false,
        loading: false,
        drawerSize: "40%",
        smallPage: false,
        layout: "total, sizes, prev, pager, next, jumper",
        // 上传关键词抽屉
        isUploadFile: false,

        phoneWidth: false,
      }
    },
    methods: {
      // 添加关键词更新数据
      updateKeyword(data) {
        console.log(data);
        if (data.flag && data.getKeywordLists) {
          console.log("情况1出现");
          this.getKeywordLists();
          this.isAddKeywords = false;
        } else if (data.flag) {
          // 选中的图文序号
          var index = data.data.index;
          this.screenTableData[index] = data.data.row;
        } else {
          this.isAddKeywords = false;
        }
      },
      handleOpen() {
        console.log("默认打开");
      },
      // 编辑关键词
      handleEdit(row) {
        // console.log(row);
        this.isAddKeywords = true;
        this.$refs.updateData.$emit('childMethod', row) // 触发监听事件
      },

      // 删除关键词
      handleDelete(index, row) {
        // console.log(index, row);
        const that = this;
        this.$confirm('确定删除该关键词吗？删除后不可恢复！')
          .then(_ => {
            // console.log("点了确定");
            // this.loading = true;
            // console.log(row._id.$oid);

            delKeywords(row._id.$oid).then(res => {
              // console.log(res);
              that.getKeywordLists();
              this.$notify({
                title: '成功',
                message: '关键词删除成功',
                type: 'success'
              });
            }).catch(err => {
              console.log(err);
              this.$notify.error({
                title: '错误',
                message: '关键词添加失败'
              });
            })


            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
              // this.openNotify( '关键词删除成功');
            }, 500);
          })
          .catch(_ => {
            console.log("点了取消");
          });

      },

      // 关闭上传抽屉
      uploadFile(data){
        console.log(data)
        if(data.flag){
          this.getKeywordLists();
          this.isUploadFile = false;
        } else {
          this.isUploadFile = data.flag;
        }
      },
      // 页面大小编辑
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
      },

      // 跳转页
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },

      // 搜索关键词
      searchData() {
        console.log("搜索");
        if (this.search === '') {
          this.$message('搜索内容不得为空');
          return;
        }

        let keywords = this.search;
        let arr = this.totalTableData;

        this.loading = true;

        // 清空屏幕上的数组
        this.screenTableData = [];

        // 动画关闭需要一定的时间
        setTimeout(() => {
          // 遍历数组
          for (var j = 0, len = arr.length; j < len; j++) {
            if (arr[j].keywords.toLowerCase().indexOf(keywords.toLowerCase()) >= 0 || arr[j].content.toLowerCase().indexOf(keywords.toLowerCase()) >= 0) {
              this.screenTableData.push(arr[j]);
            }
          }
          console.log(this.screenTableData)
          this.loading = false;
          // this.openNotify("搜索完成");
        }, 500);

      },
      // 搜索框失去焦点
      searchBlur() {
        console.log("搜索框失去焦点");
        if (this.search === "") this.screenTableData = this.totalTableData;
      },

      // 手机模式触发菜单
      trigger() {
        var stretchyNavs = document.getElementsByClassName("cd-stretchy-nav")[0];
        var time;
        if (stretchyNavs.className.indexOf("nav-is-visible") < 0) {
          stretchyNavs.className = "cd-stretchy-nav nav-is-visible";
          clearTimeout(time)
          document.getElementsByClassName("cd-stretchy-nav-ul")[0].style.display = "block"
        } else {
          stretchyNavs.className = "cd-stretchy-nav"
          time = setTimeout(function () {
            document.getElementsByClassName("cd-stretchy-nav-ul")[0].style.display = "none"
          }, 200)
        }
      },


      // 时间戳函数
      timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        return Y + M + D;
      },

      // 获取素材列表
      getArticleLists(begin) {

        console.log("获取素材列表");
        // console.log("begin：", begin);
        getArticleLists("news", begin, 4).then(res => {
          this.newsLists = [];
          console.log("数组：", this.newsLists);
          console.log("素材列表：", res.data);
          this.dialogLoading = false;
          this.newsTotal = res.data.material.total_count;
          this.newsLists = res.data.material.item;

          // 时间戳转日期
          for (var i = 0; i < 4; i++) {
            this.newsLists[i].content.update_date = this.timestampToTime(this.newsLists[i].content.update_time);
            this.newsLists[i].content.news_item[0].thumb_url = "http://img01.store.sogou.com/net/a/04/link?appid=100520029&url=" + this.newsLists[i].content.news_item[0].thumb_url;
          }
          // console.log(this.newsLists)
        }).catch(err => {
          console.log(err);
          this.$message('出错了，请刷新重试~');
        })
      },

      // 获取关键词列表
      getKeywordLists() {
        console.log("获取关键词列表");
        this.loading = true;
        const that = this;
        getKeywordLists().then(res => {
          // console.log(res.data);
          // console.log(res.data.arr);
          // console.log(JSON.parse(res.data.arr));
          that.totalTableData = JSON.parse(res.data.arr);
          that.screenTableData = that.totalTableData;
          that.loading = false;
        }).catch(err => {
          console.log(err)
        })
      }
    },
    components: {
      updateKeywords: updateVue,
      uploadFile: uploadVue,
    },
    created() {

      // 判断是否已经登录
      if (localStorage.getItem('hasLogin')){
        this.$message({
          message: '您已登录~',
          type: 'success'
        });
      } else if (this.$route.params.hasLogin === undefined || !this.$route.params.hasLogin) {
        this.$message("您尚未登录，请先登录后使用");
        this.$router.push({
          name: 'login', params: {
            checkedIndex: 0
          }
        });
        return;
      }

      this.getKeywordLists();

      // 屏幕宽度小于1200
      let screenWidth = document.body.offsetWidth;
      // console.log(screenWidth);
      if (screenWidth < 1200) {
        this.isCollapse = true;
        this.cellWidth = 68;
        this.dateCellWidth = 90;
        this.dialogWidth = "80%";
        this.maxTableHeight = 740;
        this.pageSize = 13;
      }
      if (screenWidth < 550) { // phone
        this.$notify({
          title: '提示',
          message: '检测到您的设备屏幕宽度过窄，请将手机横屏后刷新再操作',
          duration: 0
        });
      }

      // 时间戳函数
      Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
          "M+": this.getMonth() + 1,                 //月份
          "d+": this.getDate(),                    //日
          "h+": this.getHours(),                   //小时
          "m+": this.getMinutes(),                 //分
          "s+": this.getSeconds(),                 //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }
    },
    mounted() {
      // 根据屏幕做自适应
      // console.log(document.body.clientWidth)
      let screenWidth = document.body.clientWidth;
      console.log("当前屏幕宽度：", screenWidth);
      let left = document.getElementById("el-aside");
      if (screenWidth === 1920) {
        left.style.marginLeft = 200 + "px";
        left.style.width = 300 + "px";
        this.dialogWidth = "40%";
      }
      if (screenWidth >= 1200 && screenWidth < 1920) {
        left.style.marginLeft = 0;
        left.style.width = 300 + "px";
        this.dialogWidth = "60%";
        // console.log(left.style.marginLeft)
        // console.log(left.style.width)
      }
      if (screenWidth >= 768 && screenWidth < 1200) {
        left.style.marginLeft = 0;
        left.style.width = 100 + "px";
        this.drawerSize = "100%";
        this.smallPage = true;
        this.dialogWidth = "80%";
        // console.log(left.style.marginLeft)
        // console.log(left.style.width)
      }
      if (screenWidth < 768) {
        // left.style.marginLeft = 0;
        // left.style.width = 100 + "px";
        this.phoneWidth = true;
        this.drawerSize = "100%";
        this.smallPage = true;
        this.layout = "total, prev,jumper, next";
        this.dialogWidth = "90%";
      }

      // 表格数据
      // this.screenTableData = this.tempTableData;
      // console.log(this.screenTableData)
    },
  }
</script>

<style lang="scss" scoped>
  .el-main {
    .phoneStyle {
      padding: 4px !important;
    }

    .block {
      position: relative;

      .el-button {
        position: absolute;
        left: 0;
      }

      .el-pagination {
        margin-top: 10px;
        text-align: right;
      }
    }
  }

  .hidden {
    overflow: hidden;
  }

  .text-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  ul, li {
    list-style: none;
  }

  .cd-stretchy-nav {
    position: fixed;
    z-index: 1;
    bottom: 2rem;
    left: 0.4rem;

  }

  .cd-stretchy-nav .stretchy-nav-bg {
    position: absolute;
    z-index: 1;
    bottom: 0;
    /*right: 0;*/
    left: 0.4rem;
    width: 40px;
    height: 40px;
    border-radius: 30px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    -webkit-transition: height 0.2s, box-shadow 0.2s;
    transition: height 0.2s, box-shadow 0.2s;
  }

  .cd-stretchy-nav.nav-is-visible .stretchy-nav-bg {
    height: 100%;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }

  .cd-nav-trigger {
    position: absolute;
    z-index: 3;
    bottom: 0;
    /*right: 0;*/
    left: 0.4rem;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
    white-space: nowrap;
    color: transparent;
  }

  .cd-nav-trigger span, .cd-nav-trigger span::after, .cd-nav-trigger span::before {
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: #4d4d4d;
  }

  .cd-nav-trigger span {
    left: 50%;
    top: 50%;
    bottom: auto;
    right: auto;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    -webkit-transition: background-color 0.2s;
    transition: background-color 0.2s;
  }

  .cd-nav-trigger span::after, .cd-nav-trigger span::before {
    content: '';
    top: 0;
    left: 0;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: -webkit-transform 0.2s;
    transition: transform 0.2s;
  }

  .cd-nav-trigger span::before {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
  }

  .cd-nav-trigger span::after {
    -webkit-transform: translateY(6px);
    transform: translateY(6px);
  }

  .nav-is-visible .cd-nav-trigger span {
    background-color: transparent;
  }

  .nav-is-visible .cd-nav-trigger span::before {
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .nav-is-visible .cd-nav-trigger span::after {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .cd-stretchy-nav ul {
    position: relative;
    z-index: 2;
    padding-bottom: 35px;
    visibility: hidden;
    -webkit-transition: visibility 0.3s;
    transition: visibility 0.3s;
    padding-left: 0.5rem;
  }

  .cd-stretchy-nav ul span {
    position: relative;
    display: block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    color: #4d4d4d;
    font-size: 1.4rem;
    -webkit-transition: color 0.2s;
    transition: color 0.2s;
  }

  .cd-stretchy-nav.nav-is-visible ul {
    visibility: visible;
  }

  .cd-stretchy-nav.nav-is-visible ul span::after {
    -webkit-transform: translateY(-50%) scale(1);
    transform: translateY(-50%) scale(1);
    -webkit-animation: scaleIn 0.15s backwards;
    animation: scaleIn 0.15s backwards;
    -webkit-transition: opacity 0.2s;
    transition: opacity 0.2s;
  }

  .cd-stretchy-nav ul li::after {
    content: '';
    position: absolute;
    height: 22px;
    width: 22px;
    left: 0;
    right: 0;
    margin: auto;
    top: 50%;
    -webkit-transform: translateY(-50%) scale(0);
    transform: translateY(-50%) scale(0);
    background-size: contain;
    background-color: #000;
  }

  .nav-is-visible ul li span i::after {
    -webkit-animation-delay: 5s;
    animation-delay: 5s;
    background-size: contain;
  }

  .nav-is-visible ul a:nth-of-type(2) li span::after {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
    background-size: contain;
  }

  .nav-is-visible ul a:nth-of-type(3) li span::after {
    -webkit-animation-delay: 0.15s;
    animation-delay: 0.15s;
    background-size: contain;
    height: 50px;
    width: 50px;
  }

  .upload-drawer__content {

  }


</style>
