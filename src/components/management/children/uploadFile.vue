<template>
  <div id="uploadFile">
    <!--上传抽屉-->
    <el-drawer
      :visible.sync="isUploadFile"
      :size="drawerSize"
      :show-close=true
      :wrapperClosable="false"
      :with-header="false">
      <div class="header">
        <h3>上传/下载语料库</h3>
      </div>
      <div class="upload-drawer__content">
        <el-row class="container">
          <el-col :span="20" :offset="2">
            <el-row>
              1. 请先下载模板，按照模板填写问题和答案 <br>
              <el-button class="download" icon="el-icon-bottom" plain><a href="http://chenmo1212.site/web/mp/demo.xlsx">下载问答模板</a>
              </el-button>
              <el-button class="download" icon="el-icon-bottom" plain>导出Excel文件</el-button>
            </el-row>
            <el-row>
              2. 请选择填好的问答文件进行导入 <br>
              <el-col :span="12">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  accept=".xlsx"
                  :on-change="resetHandleChange"
                  :before-remove="beforeRemove"
                  :limit="1"
                  :on-exceed="resetHandleExceed"
                  :file-list="resetFileList">
                  <el-button size="small" type="primary" :disabled="resetDisabled">重置上传</el-button>
                </el-upload>
              </el-col>
              <el-col :span="12">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-change="addHandleChange"
                  :limit="1"
                  accept=".xlsx"
                  :on-exceed="addHandleExceed"
                  :file-list="addFileList">
                  <el-button size="small" type="primary" :disabled='addDisabled'>增补上传</el-button>
                </el-upload>
              </el-col>
              <el-col :span="17">
                <el-button style="margin: 30px 10px 0;display: inline-block;width: 100%;" size="small" @click="submitUpload" plain>上传到服务器</el-button>
              </el-col>
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
    props: ['isUploadFile','drawerSize', 'dialogWidth'],
    data() {
      return {
        addFileList: [],
        resetFileList: [],
        addDisabled: false,
        resetDisabled: false,
        // uploadKeywords: false
      }
    },
    methods: {
      // 取消
      cancelForm() {
        console.log("取消");
        // 子组件传父关闭抽屉
        this.$emit('closeUploadDrawer', {flag: false});
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.addDisabled = false;
        this.resetDisabled = false;
      },
      handlePreview(file) {
        console.log(file);
      },
      resetHandleChange(file, resetFileList){
        console.log("重置上传东西啦")
        this.addDisabled = true
      },
      addHandleChange(file, addFileList){
        console.log("增加上传东西啦")
        this.resetDisabled = true
      },
      addHandleExceed(addFileList) {
        this.$message.warning(`当前限制选择 1 个文件，您已经选择了 ${addFileList.length} 个文件，所以您不能再选择了~`);
      },
      resetHandleExceed(resetFileList) {
        this.$message.warning(`当前限制选择 1 个文件，您已经选择了 ${resetFileList.length} 个文件，所以您不能再选择了~`);
      },
      beforeRemove(file) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      submitUpload(){

      }
    }
  }
</script>

<style lang="scss" scoped>
  /*添加关键词抽屉*/
  /deep/ .el-drawer.rtl {
    overflow-y: auto;
  }

  /deep/ .el-drawer.rtl::-webkit-scrollbar {
    display: none
  }

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

          .upload-demo {
            background-color: #fff;
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
