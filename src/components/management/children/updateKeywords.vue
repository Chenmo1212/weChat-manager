<template>
  <div id="updateKeywords">
    <!--新增抽屉-->
    <el-drawer
      :before-close="handleCloseKeywords"
      :visible.sync="isAddKeywords"
      direction="ltr"
      ref="drawer"
      :size="drawerSize"
      :withHeader=false
      :destroy-on-close=true
    >
      <div class="header">
        <span style="font-size: 18px;font-weight: 700;margin: 20px 0;display: inline-block;">添加新的关键词</span>
        <span @click="clearForm" style="font-size: 14px;color: #8c939d;cursor: pointer;">清空内容</span>
      </div>
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="关键词" :label-width="formLabelWidth">
            <el-col :span="20">
              <el-input v-model="form.row.keywords" autocomplete="off" placeholder="多个关键词请用空格隔开：例如：美丽 漂亮 好看"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth">
            <!--文本消息-->
            <el-row class="textMsg">
              <el-col :span="20">
                <div style="text-align: left;">1：文本消息</div>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  placeholder="请输入内容"
                  v-model="form.row.content">
                </el-input>
                <div style="text-align: left;">请不要多于1000字否则无法发送！</div>
              </el-col>
            </el-row>
            <!--图文消息-->
            <el-row class="newsMsg">
              <el-col :span="20">
                <div style="text-align: left;">2：图文消息
                  <el-button plain size="mini" style="border:none" :disabled="checkedIndex === null"
                             @click.native="checkedIndex = null">重新选择
                  </el-button>
                </div>
                <div class="card-box" @click="dialogVisible = true" v-if="checkedIndex === null">
                  <i class="el-icon-plus add-news-icon"></i>
                </div>
                <el-card :body-style="{ padding: '0px' }" shadow="hover" v-else="checkedIndex !== null"
                         style="width: 100%;">
                  <el-row style="width: 100%;">
                    <el-col :span="8" style="padding: 14px;">
                      <el-image
                        style="width: 100%; height: 60px;display: block;"
                        :src="newsLists[checkedIndex].content.news_item[0].thumb_url"
                        fit="cover"
                        class="image">
                      </el-image>
                    </el-col>
                    <el-col :span="16">
                      <el-row style="padding: 14px 14px 14px 0;text-align: left;">
                        <el-row class="header text-ellipsis">{{newsLists[checkedIndex].content.news_item[0].title}}
                        </el-row>
                        <el-row class="content" :gutter="3">
                          <el-col :span="16" class="digest text-ellipsis">
                            {{newsLists[checkedIndex].content.news_item[0].digest}}
                          </el-col>
                          <el-col :span="8" class="date">{{newsLists[checkedIndex].content.update_date}}</el-col>
                        </el-row>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>

            <!--图文类型-->
            <el-row class="newsType" style="margin:10px 0">
              <el-row style="text-align: left;">
                <div style="text-align: left;">3：图文类型</div>
                <el-checkbox-group v-model="form.row.news.type">
                  <el-col v-for="(item, index) in newsTypeArr" :key="index" :span="6">
                    <el-checkbox :label="item"></el-checkbox>
                  </el-col>
                </el-checkbox-group>
              </el-row>
            </el-row>
          </el-form-item>
        </el-form>

        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' :'确定'}}
          </el-button>
        </div>
      </div>
    </el-drawer>

    <!--图文选择-->
    <el-dialog
      title="选择图文"
      :modal="false"
      :visible.sync="dialogVisible"
      @open="openDialog"
      :width="dialogWidth">
      <el-row style="width: 100%;">

        <el-divider></el-divider>

        <el-row class="newsCard-box" style="width: 100%;" v-loading="dialogLoading">
          <el-col v-for="(item, index) in newsLists" :key="index" :span="22" :offset="1">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" :class="{'checked': index === checkedIndex }"
                     @click.native="checkedIndex = index">
              <el-row>
                <el-col :span="8" style="padding: 14px;max-width: 100px">
                  <el-image
                    style="width: 100%; height: 60px;display: block;"
                    :src="item.content.news_item[0].thumb_url"
                    fit="cover"
                    class="image">
                  </el-image>
                </el-col>
                <el-col :span="16">
                  <el-row style="padding: 14px 14px 14px 0;text-align: left;">
                    <el-row class="header text-ellipsis">{{item.content.news_item[0].title}}</el-row>
                    <el-row class="content" :gutter="5">
                      <el-col :span="16" class="digest text-ellipsis">{{item.content.news_item[0].digest}}</el-col>
                      <el-col :span="8" class="date">{{item.content.update_date}}</el-col>
                    </el-row>
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-row>
      <el-pagination
        :page-size="4"
        @current-change="handleNewsCurrentChange"
        :current-page.sync="newsListPage"
        :layout="layout"
        :total="newsTotal">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
            <el-button @click.native="cancelDialog">取 消</el-button>
            <el-button type="primary" @click="submitDialog">确 定</el-button>
      </span>
    </el-dialog>
    <div class="header content"></div>
  </div>
</template>

<script>
  import {getArticleLists, updateKeywords, addKeywords} from '../../../axios/api';
  // import data from '../../../data.js'

  export default {
    name: "updateKeywords",
    //父组件通过props属性传递进来的数据
    props: ['isAddKeywords', 'drawerSize', 'dialogWidth', 'totalTableData'],
    data() {
      return {
        loading: false,

        // 表单标签宽度
        formLabelWidth: '15%',

        // // 是否添加关键词
        // isAddKeywords: true,

        // 抽屉宽度

        // 表单内容
        form: {
          index: '',  // 关键词的下标
          row: {      // 内容
            keywords: '', // 关键词，Str
            content: '',  // 根据关键词回复的内容，Str
            num: 0,     // 用户触发的次数， Int
            date: null,   // 新增关键词的时间（我转成日期字符串），Str
            news: {       // 图文内容， Obj（dict）
              title: "",      // 图文的标题，Str
              digest: "",     // 图文的摘要，Str
              update_time: "",    // 图文的更新时间， timestamp 10位时间戳格式
              cover: "",      // 图文封面图的链接，Str
              url: "",        // 图文的链接，Str
              type: [], // 图文的类型，Arr（list）
            }
          },
        },

        // 选择图文
        dialogVisible: false,
        newsListPage: 1,
        checkedIndex: null,
        isSelectNews: false,
        dialogLoading: false,
        newsTotal: null,
        newsLists: [],
        layout: 'prev, pager, next, jumper',
        // 选择类型
        newsTypeArr: ["win", "mac", "android", "ios", "course", "skill", "net", "smallSoft"],

        isUpdate: false,
      }
    },
    methods: {
      getNews(){
        console.log(data);
        console.log(this.totalTableData);
        // var win = data.win;
        // console.log(win)
        const keywordList = this.totalTableData;
        // const newsList = this.totalTableData;
        // 遍历关键词列表
        for (let i = 0; i<keywordList.length; i++){

        }
      },

      // 手动关闭抽屉(提交关键词)
      handleCloseKeywords(done) {
        if (this.loading) {
          return;
        }
        const that = this;
        that.$confirm('确定要提交新的关键词吗？')
          .then(_ => {
            let item;
            console.log("点了确定");
            that.loading = true;

            // 时间戳转换日期
            that.form.row.date = new Date().Format("yyyy-MM-dd");

            if(this.isUpdate){ // 更新数据
              // console.log(that.form);
              item = {};
              item.id = that.form.row._id.$oid;
              item.keywords = that.form.row.keywords;
              item.content = that.form.row.content;
              item.news = that.form.row.news;
              updateKeywords(item).then(res=>{
                console.log(res.data);
                that.timer = setTimeout(() => {
                  console.log("成功后关闭动画");
                  this.loading = false;
                  this.$emit('closeDrawer', {flag: true, data:'', getKeywordLists: true});
                  this.$notify({
                    title: '成功',
                    message: '关键词修改成功',
                    type: 'success'
                  });
                }, 400);

              }).catch(err=>{
                console.log(err.data)
              })

            } else {           // 添加数据
              let data = that.form.row;
              this.$emit('closeDrawer', {flag: true, data: data, getKeywordLists: false});

              item = that.form.row;
              console.log(item);
              addKeywords(item).then(res => {
                console.log("添加成功", res.data);
                that.timer = setTimeout(() => {
                  console.log("成功后关闭动画");
                  this.loading = false;
                  that.clearForm();
                  this.$emit('closeDrawer', {flag: true, data: data, getKeywordLists: true});
                  this.$notify({
                    title: '成功',
                    message: '关键词添加成功',
                    type: 'success'
                  });
                }, 400);

              })
                .catch(err => {
                console.log("添加失败", err);
                that.timer = setTimeout(() => {
                  done();
                  // 动画关闭需要一定的时间
                  setTimeout(() => {
                    this.loading = false;
                    this.$notify.error({
                      title: '错误',
                      message: '关键词添加失败'
                    });
                    // 子组件传父关闭抽屉
                    this.$emit('closeDrawer', {flag: false});
                    that.clearForm();
                  }, 400);
                }, 2000);
              });
            }
          })
          .catch(_ => {
            console.log("点了取消");
            this.loading = false;
            // 子组件传父关闭抽屉
            this.$emit('closeDrawer', {flag: false});
            // this.clearForm()
          });
      },

      // 取消 添加
      cancelForm() {
        console.log("取消添加")
        this.loading = false;
        // 子组件传父关闭抽屉
        this.$emit('closeDrawer', {flag: false});
        // this.clearForm();
        clearTimeout(this.timer);
      },
      // 清空表格
      clearForm() {  // 清空form
        console.log("清空form");
        this.form.index = "";
        this.form.row.keywords = "";
        this.form.row.content = "";
        this.form.row.num = "";
        this.form.row.date = null;
        this.form.row.news.title = "";
        this.form.row.news.digest = "";
        this.form.row.news.update_time = "";
        this.form.row.news.cover = "";
        this.form.row.news.url = "";
        this.form.row.news.type = [];
        this.checkedIndex = null;
      },

      // 更新数据
      updateData(){
        this.$on('childMethod', (res) => {
          // console.log('触发监听事件监听成功');
          // console.log(res);
          this.form.row = res;
          this.isUpdate = true;
          // console.log(this.form.row.news.type)
          this.checkedIndex = 0;

          let obj = {
            content: {
              news_item: [{
                thumb_url: null,
                title: null,
                digest: null,
              }],
              update_date: null,
            }};

          obj.content.news_item[0].thumb_url = res.news.cover;
          obj.content.news_item[0].title = res.news.title;
          obj.content.news_item[0].digest = res.news.digest;
          obj.content.update_date = this.timestampToTime(res.news.update_time);
          this.newsLists.push(obj)
        })
      },

      // 选择图文
      openDialog() {
        console.log("默认打开");
        this.dialogLoading = true;
        this.getArticleLists(0);
      },

      // 关闭dialog
      cancelDialog() {
        console.log("取消dialog")
        this.dialogVisible = false;
        this.checkedIndex = null;
      },

      // 确定dialog
      submitDialog() {
        console.log(this.newsLists[this.checkedIndex]);
        var item = this.newsLists[this.checkedIndex];
        console.log(item.content.news_item[0]);
        this.form.row.news.title = item.content.news_item[0].title;
        this.form.row.news.cover = "http://img01.store.sogou.com/net/a/04/link?appid=100520029&url=" + item.content.news_item[0].thumb_url;
        this.form.row.news.url = item.content.news_item[0].url;
        this.form.row.news.digest = item.content.news_item[0].digest;
        this.form.row.news.update_time = item.content.update_time;
        this.dialogVisible = false;
        console.log(this.form.row.news.update_time)
      },

      // 跳转页
      handleNewsCurrentChange(val) {
        this.newsListPage = val;
        console.log(`素材当前页: ${val}`);
        this.dialogLoading = true;
        this.getArticleLists(val * 4)
      },

      // 时间戳函数
      timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        return  M + D;
      },

      // 获取素材列表
      getArticleLists(begin) {

        console.log("获取素材列表");
        console.log("begin：", begin);
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
          console.log(this.newsLists)
        }).catch(err => {
          console.log(err);
          this.$message('出错了，请刷新重试~');
        })
      },
    },
    mounted() {
      this.updateData(); //事件监听

      // 获取dialog
      var dialog = document.getElementsByClassName("el-dialog")[0];
      var header = document.getElementsByClassName("header")[0];
      var content = document.getElementsByClassName("content")[0];
      // console.log(dialog)
      let screenWidth = document.body.clientWidth;
      if (screenWidth < 768) {
        this.layout = "total, prev,jumper, next";
        dialog.style.marginTop = 0;
        dialog.style.marginBottom = 0
        header.style.fontSize = "14px";
        content.style.fontSize = "12px";
      }
    }
  }
</script>

<style lang="scss" scoped>

  /*添加关键词抽屉*/
  /deep/ .el-drawer.ltr {
    overflow-y: auto;
  }

  /deep/ .el-drawer.ltr::-webkit-scrollbar {
    display: none
  }

  .text-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-drawer {
    .newsMsg {
      margin-top: 10px;

      .card-box {
        background-color: #fff;
        width: 100%;
        height: 90px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
      }

      .card-box:hover {
        border-color: #4d4d4d;
      }

      .add-news-icon {
        text-align: center;
        line-height: 90px;
        font-size: 17px;
        color: #8c939d;
      }

      .el-card {
        .header {
          color: #606266;
        }

        .content {
          font-size: 12px;
          color: #8c939d;
        }
      }
    }

    .demo-drawer__footer {
      margin: 20px 0;
    }
  }

  .el-dialog {
    .newsCard-box {
      height: 400px;
      overflow: auto;
    }

    .checked {
      border: 1px solid #4d4d4d;
    }

    .el-card {
      width: 100%;
      margin: 0 auto 10px;
      padding: 0;

      .header {
        color: #606266;
        line-height: 24px;
        font-size: 16px;
      }

      .content {
        font-size: 14px;
        line-height: 24px;
        margin-top: 10px;
        color: #8c939d;
      }
    }
  }
</style>
