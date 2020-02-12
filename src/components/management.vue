<template>
  <div class="management">
    <el-container>

      <el-aside id="el-aside" v-if="!phoneWidth">
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleCloseKeywords"
                 :collapse="isCollapse">
          <el-menu-item index="1">
            <i class="el-icon-s-data"></i>
            <span slot="title">数据</span>
          </el-menu-item>
          <el-menu-item index="2" @click="isAddKeywords = true">
            <i class="el-icon-plus"></i>
            <span slot="title">添加</span>
          </el-menu-item>
          <el-menu-item index="3" @click="uploadKeywords = true">
            <i class="el-icon-upload2"></i>
            <span slot="title">上传</span>
          </el-menu-item>
          <el-menu-item index="4" @click="getArticleLists">
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
            :width="cellWidth"
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
                         @click="handleEdit(scope.$index, scope.row)" circle></el-button>
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
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="screenTableData.length">
          </el-pagination>
        </div>
      </el-main>

    </el-container>

    <!--新增抽屉-->
    <el-drawer
      title="添加新的关键词"
      :before-close="handleCloseKeywords"
      :visible.sync="isAddKeywords"
      direction="ltr"
      ref="drawer"
      :size="drawerSize"
      :withHeader=false
    >
      <div class="header">
        <h3>添加新的关键词</h3>
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
                <div style="text-align: left;">2：图文消息</div>
                <div class="card-box" @click="dialogVisible = true">
                  <i class="el-icon-plus add-news-icon"></i>
                </div>
                <el-card :body-style="{ padding: '0px' }" shadow="hover" style="width: 100%;">
                  <el-row style="width: 100%;">
                    <el-col :span="8" style="width: 100px; padding: 14px;">
                      <el-image
                        style="width: 100%; height: 60px;display: block;"
                        src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
                        fit="cover"
                        class="image">
                      </el-image>
                    </el-col>
                    <el-col :span="17">
                      <el-row style="padding: 14px 14px 14px 0;text-align: left;">
                        <el-row class="header text-ellipsis">好吃的汉堡好吃的汉堡好吃的汉堡好吃的汉堡</el-row>
                        <el-row class="content" :gutter="3">
                          <el-col :span="16" class="digest text-ellipsis">这是一个非常好吃的汉堡</el-col>
                          <el-col :span="8" class="date">2020-12-12</el-col>
                        </el-row>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>

            <!--图文类型-->
            <!--<el-row class="newsType" style="margin:10px 0">-->
            <!--<el-row style="text-align: left;">-->
            <!--<div style="text-align: left;">3：图文类型</div>-->
            <!--<el-checkbox-group v-model="form.row.checkNewsTypeList">-->
            <!--<el-col v-for="(item, index) in newsTypeArr" :span="6">-->
            <!--<el-checkbox :label="item"></el-checkbox>-->
            <!--</el-col>-->
            <!--</el-checkbox-group>-->
            <!--</el-row>-->
            <!--</el-row>-->
          </el-form-item>
        </el-form>

        <!--图文选择-->
        <el-dialog
          title="选择图文"
          :modal="false"
          :visible.sync="dialogVisible"
          width="50%">
          <el-row style="width: 100%;">
            <el-input
              placeholder="关键词搜索"
              v-model="search"
              @blur="searchBlur"
              @keyup.enter.native="searchData()">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="searchData"></i>
            </el-input>
            <el-divider></el-divider>
            <el-row class="newsCard-box" style="width: 100%;">
              <el-col v-for="(item,index) in 10" :span="22" :offset="1">
                <el-card :body-style="{ padding: '0px' }" shadow="hover" style="width: 100%;margin: 0 auto 10px;">
                  <el-row>
                    <el-col :span="8" style="width: 100px; padding: 14px;">
                      <el-image
                        style="width: 100%; height: 60px;display: block;"
                        src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
                        fit="cover"
                        class="image">
                      </el-image>
                    </el-col>
                    <el-col :span="16">
                      <el-row style="padding: 14px 14px 14px 0;text-align: left;">
                        <el-row class="header text-ellipsis">好吃的汉堡好吃的汉堡好吃的汉堡好吃的汉堡</el-row>
                        <el-row class="content" :gutter="5">
                          <el-col :span="16" class="digest text-ellipsis">这是一个非常好吃的汉堡</el-col>
                          <el-col :span="8" class="date">2020-12-12</el-col>
                        </el-row>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
              </el-row>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>


        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确定'
            }}
          </el-button>
        </div>
      </div>
    </el-drawer>

    <!--上传抽屉-->
    <el-drawer
      title="我是标题"
      :visible.sync="uploadKeywords"
      :size="drawerSize"
      :with-header="false">
      <div class="upload-drawer__content">
        <el-row>1. 请先下载模板，按照模板填写问题和答案</el-row>
      </div>
    </el-drawer>

    <!--menuBtn-->
    <nav class="cd-stretchy-nav" v-if="phoneWidth">
      <a class="cd-nav-trigger" href="javascript:void(0);" @click=trigger() @blur="trigger">
        <span aria-hidden="true"></span>
      </a>
      <ul class="cd-stretchy-nav-ul">
        <li><span @click="isAddKeywords = true"><i class="el-icon-plus"></i></span></li>
        <li><span @click="getToken"><i class="el-icon-upload2"></i></span></li>
        <li><span @click="getArticleLists"><i class="el-icon-download"></i></span></li>
      </ul>
      <span aria-hidden="true" class="stretchy-nav-bg"></span>
    </nav>

  </div>
</template>

<script>
  import {getArticleCount, getToken, getArticleLists, getKeywordLists, delKeywords, addKeywords} from '../axios/api';

  export default {
    keywords: "management",
    data() {
      return {
        // 菜单是否折叠
        isCollapse: false,

        // 显示表格数据
        screenTableData: [
          {
            date: 1,
            keywords: '王小虎',
            num: 1,
            content: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
          }, {
            date: 2,
            keywords: '王小虎',
            num: 2,
            content: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: 3,
            keywords: '王小虎',
            num: 3,
            content: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: 4,
            keywords: '王小虎',
            num: 4,
            content: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
          }, {
            date: 5,
            keywords: '王小虎',
            num: 5,
            content: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: 6,
            keywords: '王小虎',
            num: 6,
            content: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: 7,
            keywords: '王小虎',
            num: 7,
            content: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
          }, {
            date: 8,
            keywords: '王小虎',
            num: 8,
            content: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: 9,
            keywords: '王小虎',
            num: 9,
            content: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: 10,
            keywords: '王小虎',
            num: 10,
            content: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
          }, {
            date: 11,
            keywords: '王小虎',
            num: 11,
            content: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: 12,
            keywords: '王小虎',
            num: 12,
            content: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: 13,
            keywords: '王小虎',
            num: 13,
            content: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
          }, {
            date: 14,
            keywords: '王小虎',
            num: 14,
            content: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: 15,
            keywords: '王小虎',
            num: 15,
            content: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: 16,
            keywords: '王小虎',
            num: 16,
            content: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
          }, {
            date: 17,
            keywords: '王小虎',
            num: 17,
            content: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: 18,
            keywords: '王小虎',
            num: 18,
            content: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: 19,
            keywords: '王小虎',
            num: 1,
            content: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
          }, {
            date: 20,
            keywords: '王小虎',
            num: 20,
            content: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: 21,
            keywords: '王小虎',
            num: 21,
            content: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: 22,
            keywords: '王小虎',
            num: 22,
            content: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
          }, {
            date: 23,
            keywords: '王小虎',
            num: 23,
            content: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: 24,
            keywords: '王小虎',
            num: 24,
            content: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: 25,
            keywords: '王小虎',
            num: 25,
            content: '上海市普陀区金沙江路 1516 弄'
          }
        ],
        totalTableData: [
          {
            date: 1,
            keywords: '李小虎',
            num: 1,
            content: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
          }, {
            date: 2,
            keywords: '李小虎',
            num: 2,
            content: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: 3,
            keywords: '李小虎',
            num: 3,
            content: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: 4,
            keywords: '李小虎',
            num: 4,
            content: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
          }, {
            date: 5,
            keywords: '李小虎',
            num: 5,
            content: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: 6,
            keywords: '王小虎',
            num: 6,
            content: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: 7,
            keywords: '王小虎',
            num: 7,
            content: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
          }, {
            date: 8,
            keywords: '宋小虎',
            num: 8,
            content: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: 9,
            keywords: '宋小虎',
            num: 9,
            content: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: 10,
            keywords: '宋小虎',
            num: 10,
            content: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
          }, {
            date: 11,
            keywords: '宋小虎',
            num: 11,
            content: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: 12,
            keywords: '王小虎',
            num: 12,
            content: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: 13,
            keywords: '王小虎',
            num: 13,
            content: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
          }, {
            date: 14,
            keywords: '王小虎',
            num: 14,
            content: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: 15,
            keywords: '王小虎',
            num: 15,
            content: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: 16,
            keywords: '王小虎',
            num: 16,
            content: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
          }, {
            date: 17,
            keywords: '王小虎',
            num: 17,
            content: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: 18,
            keywords: '王小虎',
            num: 18,
            content: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: 19,
            keywords: '王小虎',
            num: 1,
            content: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
          }, {
            date: 20,
            keywords: '柯小虎',
            num: 20,
            content: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: 21,
            keywords: '柯小虎',
            num: 21,
            content: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: 22,
            keywords: '柯小虎',
            num: 22,
            content: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
          }, {
            date: 23,
            keywords: '柯小虎',
            num: 23,
            content: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: 24,
            keywords: '柯小虎',
            num: 24,
            content: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: 25,
            keywords: '王小虎',
            num: 25,
            content: '上海市普陀区金沙江路 1516 弄'
          }
        ],

        // 素材总列表
        materialLists: [],

        // 搜索内容
        search: '',

        // 页面大小
        pageSize: 10,
        currentPage: 1,

        // 屏幕宽度
        screenWidth: null,

        // 表格宽高
        cellWidth: null,
        maxTableHeight: 600,
        tableLoading: false,

        // 添加关键词抽屉
        drawer: false,
        isAddKeywords: false,
        loading: false,
        drawerSize: "40%",
        // 表单内容
        form: {
          index: '',  // 关键词的下标
          row: {      // 内容
            keywords: '', // 关键词，Str
            content: '',  // 根据关键词回复的内容，Str
            num: 100,     // 用户触发的次数， Int
            date: "2020-12-12",   // 新增关键词的时间（我转成日期字符串），Str
            news: {       // 图文内容， Obj（dict）
              title: "",      // 图文的标题，Str
              digest: "",     // 图文的摘要，Str
              update_time: "",    // 图文的更新时间， timestamp 10位时间戳格式
              cover: "",      // 图文封面图的链接，Str
              url: "",        // 图文的链接，Str
              type: ["win",], // 图文的类型，Arr（list）
            }
          },
        },
        dialogVisible: true,
        // newsTypeArr: ["Win","Mac","Android","iOS","教程","技巧","网站","小程序"],
        // checkNewsTypeList: [],
        // 表单标签宽度
        formLabelWidth: '15%',

        // 上传关键词抽屉
        uploadKeywords: false,

        phoneWidth: false,
      }
    },
    methods: {
      handleOpen() {
        console.log("默认打开");
      },
      // 编辑关键词
      handleEdit(index, row) {
        console.log(index, row);
        this.form.keywords = row.keywords;
        this.form.content = row.content;
        this.form.index = row.index;
        this.form.row = row;
        this.isAddKeywords = true;
      },
      // 删除关键词
      handleDelete(index, row) {
        console.log(index, row);
        const that = this;
        this.$confirm('确定删除该关键词吗？删除后不可恢复！')
          .then(_ => {
            console.log("点了确定");
            // this.loading = true;
            console.log(row._id.$oid);

            delKeywords(row._id.$oid).then(res=>{
              console.log(res)
              that.getKeywordLists()
            }).catch(err=>{
              console.log(err)
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
      // 手动关闭抽屉
      handleCloseKeywords(done) {
        if (this.loading) {
          return;
        }
        const that = this;
        that.$confirm('确定要提交新的关键词吗？')
          .then(_ => {
            console.log("点了确定");
            that.loading = true;
            that.form.row.date = new Date().Format("yyyy-MM-dd");
            that.screenTableData[that.form.index] = that.form.row;
            console.log(that.screenTableData[that.form.index]);
            console.log(that.form);

            var item = that.form.row;
            console.log(item);
            addKeywords(item).then(res=>{
              console.log(res);
              that.timer = setTimeout(() => {
                done();
                // 动画关闭需要一定的时间
                setTimeout(() => {
                  this.loading = false;
                }, 400);
              }, 2000);


            }).catch(err=>{
              console.log(err);
              that.timer = setTimeout(() => {
                done();
                // 动画关闭需要一定的时间
                setTimeout(() => {
                  this.loading = false;
                }, 400);
              }, 2000);
            })

            that.getKeywordLists()

          })
          .catch(_ => {
            console.log("点了取消");
            this.loading = false;
            this.isAddKeywords = false;
            this.form.row.keywords = "";
            this.form.row.content = "";
            this.form.row.date = null;
          });
      },
      cancelForm() {
        this.loading = false;
        this.isAddKeywords = false;
        this.form.row.keywords = "";
        this.form.row.content = "";
        this.form.row.date = null;
        clearTimeout(this.timer);
      },

      // 成功通知
      // openNotify(msg) {
      //   this.$notify({
      //     title: '成功',
      //     message: msg,
      //     type: 'success'
      //   });
      // },

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

      // 获取文章
      getArticle() {
        console.log("调用")
        getArticleCount().then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取token
      getToken() {
        this.$message({
          message: '警告哦，这个功能攻城狮还没做',
          type: 'warning'
        });
        console.log("获取token");
        getToken().then(res => {
          console.log(res.data.access_token)
          localStorage.setItem("token", res.data.access_token)
          console.log(localStorage.getItem("token"))
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取素材列表
      getArticleLists() {
        this.getToken();

        this.$message({
          message: '警告哦，这个功能攻城狮还没做',
          type: 'warning'
        });
        console.log("获取列表");
        getArticleLists("news", 0, 20).then(res => {
          console.log(res.data)
        }).catch(err => {
          console.log(err)
        })
      },

      getKeywordLists(){
        console.log("获取关键词列表");
        const that = this;
        getKeywordLists().then(res => {
          console.log(JSON.parse(res.data.arr));
          that.screenTableData = JSON.parse(res.data.arr)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    created() {
      // this.getKeywordLists();

      // 屏幕宽度小于1200
      let screenWidth = document.body.offsetWidth;
      // console.log(screenWidth);
      if (screenWidth < 1200) {
        this.isCollapse = true;
        this.cellWidth = 68;
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
      console.log(screenWidth)
      let left = document.getElementById("el-aside");
      if (screenWidth === 1920) {
        left.style.marginLeft = 200 + "px";
        left.style.width = 300 + "px";
      }
      if (screenWidth >= 1200 && screenWidth < 1920) {
        left.style.marginLeft = 0;
        left.style.width = 300 + "px";
        // console.log(left.style.marginLeft)
        // console.log(left.style.width)
      }
      if (screenWidth >= 992 && screenWidth < 1200) {
        left.style.marginLeft = 0;
        left.style.width = 100 + "px";
        this.drawerSize = "100%";
        // console.log(left.style.marginLeft)
        // console.log(left.style.width)
      }
      if (screenWidth < 768) {
        // left.style.marginLeft = 0;
        // left.style.width = 100 + "px";
        this.phoneWidth = true;
        this.drawerSize = "100%";
        // console.log(left.style.marginLeft)
        // console.log(left.style.width)
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


  /*添加关键词抽屉*/
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


  .upload-drawer__content {

  }

  .el-dialog {
    .newsCard-box {
      height: 400px;
      overflow: auto;
    }
    
    .el-card {
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
