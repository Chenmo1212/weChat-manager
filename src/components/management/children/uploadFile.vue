<template>
  <div id="uploadFile">
    <!--上传抽屉-->
    <el-drawer
      :visible.sync="uploadKeywords"
      :size="drawerSize"
      :show-close=true
      :with-header="false">
      <div class="header">
        <h3>上传/下载语料库</h3>
      </div>
      <div class="upload-drawer__content">
        <el-row class="container">
          <el-col :span="20" :offset="2">
            <el-row>
              1. 请先下载模板，按照模板填写问题和答案 <br>
              <el-button class="download" icon="el-icon-bottom" plain><a href="http://chenmo1212.site/web/mp/demo.xlsx">下载问答模板</a></el-button>
              <el-button class="download" icon="el-icon-bottom" plain>导出Excel文件</el-button>
            </el-row>
            <el-row>
              2. 请选择填好的问答文件进行导入 <br>
              <el-button plain class="upload">重新上传</el-button>
              <el-button plain class="upload">增补上传</el-button>
              <span>支持格式：仅支持 .xlsx</span>
            </el-row>
            <el-row>
              <el-row class="header">Excel文件导入要求</el-row>
              <el-row class="content">
                <ul>
                  <li>Excel文件格式正确</li>
                  <li>一次性上传的文件问答条目不能超过1000条</li>
                  <li>问题栏或者答案栏不为空</li>
                  <li>每一组问答条目中，问句以空格隔开，答案仅为一个</li>
                  <li>不包含不当内容</li>
                </ul>
              </el-row>
            </el-row>
            <el-row>
              <el-button @click="cancelForm" style="width: 100px;line-height: 20px;font-size: 14px;">取消</el-button>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import {addExcel, resetExcel, downloadExcel} from '../../../axios/api';
  export default {
    name: "uploadFile",
    //父组件通过props属性传递进来的数据
    props: ['uploadKeywords', 'drawerSize', 'dialogWidth'],
    data() {
      return {}
    },
    methods: {
      // 取消
      cancelForm() {
        console.log("取消")
        // 子组件传父关闭抽屉
        this.$emit('closeDrawer');
      },
    }
  }
</script>

<style lang="scss" scoped>
  .upload-drawer__content {
    .container {
      .el-col {
        text-align: left;

        .el-row {
          margin: 20px 0;

          a {
            color: #4d4d4d;
            text-decoration: none;
          }
          .download {
            border: none;
            font-size: 14px;
            margin: 15px 10px 10px;
          }

          .download:hover {
            text-decoration: underline;
          }

          .upload {
            width: 100px;
            font-size: 14px;
            margin: 20px 10px 10px;
          }

          span {
            font-size: 14px;
            color: #8c939d;
          }

          .header {
            margin-bottom: 0;
            font-size: 15px;
          }

          .content {
            margin-top: 0;
            ul {
              background-color: #ededed;
              padding: 10px 0 10px 30px;
              font-size: 14px;
              color: #8c939d;
              li {
                padding-left: 20px;
                line-height: 30px;
              }
            }
          }
        }
      }

      /*margin: ;*/
      /*background: #000;*/
    }
  }

</style>
