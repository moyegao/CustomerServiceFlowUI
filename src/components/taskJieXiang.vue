<template>
  <div class="taskJieXiang" v-loading.fullscreen.lock="loading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0.8)">
    <table width="96%" border="0" align="center">
      <tbody>
        <tr>
          <td width="15%" height="25px" align="right" class="txt1" style="padding-top:15px;">任务编号&nbsp;</td>
          <td width="35%" height="25px" style="padding-top:15px;">
            <span class="line" style="display:inline-block;width:280px;height:20px;">{{taskinfo.taskNum}}</span>
          </td>
          <td align="right" class="txt1" width="15%" height="25px" style="padding-top:15px;">任务名称&nbsp;</td>
          <td width="35%" height="25px" style="padding-top:15px;">
            <span class="line" style="display:inline-block;width:280px;height:20px;overflow:hidden;">{{taskinfo.taskName}}</span>
          </td>
        </tr>
        <tr>
          <td height="20px" align="right" class="txt1" style="padding-top:15px;">责任人员&nbsp;</td>
          <td height="20px" style="padding-top:15px;">
            <span class="line" style="display:inline-block;width:280px;height:20px;">{{taskinfo.responsibleUserNames}}</span>
          </td>
          <td height="20px" align="right" class="txt1" style="padding-top:15px;">主办人员&nbsp;</td>
          <td height="20px" style="padding-top:15px;">
            <span class="line" style="display:inline-block;width:280px;height:20px;">{{taskinfo.sponsorUserName}}</span>
          </td>
        </tr>
        <tr>
          <td height="25" align="right" class="txt1">
            <font color="red" style="padding-top:15px;">*</font>结项说明&nbsp;
          </td>
          <td height="25" colspan="3" style="padding-top:15px;"><label>
              <textarea name="m_Desc" class="txtline" rows="6" style="height: 100px;width:90%;color:#666;" v-model="changeIdea1"></textarea>
            </label>
          </td>
        </tr>
        <tr>
          <td colspan="0.5" style="text-align:left;color:rgb(255, 0, 0);"></td>
          <td colspan="1" style="text-align:left;color:rgb(255, 0, 0);">
            <font color="red" style="padding-top:15px;">*</font>提示：结项申请必须上传附件
          </td>
        </tr>
        <!-- <tr>
          <td colspan="4" class="txt1" align="center" height="54">
            <a href="#" @click="showUpload"><span class="round2">上传附件</span></a> &nbsp;&nbsp;
            <a href="#" @click="doSave" id="startBtn"><span class="round2">提交</span></a> &nbsp;
            <a href="#" @click.prevent="doClose"><span class="round">关闭</span></a>
          </td>
        </tr>
        <tr>
          <td colspan="12" style="text-align:center; color:rgb(255, 0, 0);">提示：结项申请必须上传附件</td>
        </tr> -->
      </tbody>
    </table>
    <el-dialog title="文件上传" top="10px" :visible.sync="uploadDialogVisible" width="80%" height="600px" center>
      <klUpload :fatherList.sync="fileList" :fatherId.sync="uploadData.id" :type.sync="uploadData.type" ref="doUpload">
      </klUpload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible = false">返 回</el-button>
        <el-button type="primary" @click="confirmUpload">上 传</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import klUpload from './klUpload';
export default {
  components: {
    klUpload
  },
  props: ['taskJieXiangNeedData'],
  data() {
    return {
      fileList: [],
      uploadData: {
        id: -1,
        type: 3
      },
      uploadDialogVisible: false,
      taskinfo: {},
      boolean1: true,
      boolean2: false,
      urlData: {
        id: '',
        taskId: '',
        processId: '',
        processKey: '',
        formId: ''
      },
      changeIdea1: '',
      loading: false,
    }
  },
  mounted() {
    this.init();
    this.getTaskInfo();
    this.getFileList();
  },
  methods: {
    init() {
      //  this.urlData.id = this.$common.getQueryString('id');
      // this.urlData.formId = this.$common.getQueryString('formId');
      // this.urlData.taskId = this.$common.getQueryString('taskId');
      // this.urlData.processId = this.$common.getQueryString('processId');
      // this.urlData.processKey = this.$common.getQueryString('processKey');
      this.urlData.id = this.taskJieXiangNeedData.id;
      this.urlData.formId = this.taskJieXiangNeedData.formId;
      this.urlData.taskId = this.taskJieXiangNeedData.taskId;
      this.urlData.processId = this.taskJieXiangNeedData.processId;
      this.urlData.processKey = this.taskJieXiangNeedData.processKey;

      // that.taskJieXiangNeedData.id = row.id;
      // that.taskJieXiangNeedData.taskId = row.taskId;
      // that.taskJieXiangNeedData.processId = row.processId;
      // that.taskJieXiangNeedData.processKey = row.processKey;
      // that.taskJieXiangNeedData.formId = row.formId;
      // that.taskJieXiangNeedData.supervisionTaskId = row.id
      // that.taskJieXiangShow = true;
    },
    getTaskInfo() {
      var that = this;
      var id = that.urlData.id
      this.$common.commitParam(this, "/supervise/taskinfo/get.api", { "id": id }, {
        success: function (res) {
          that.taskinfo = res.data;
        }
      }, "get");
    },
    showUpload() {
      let that = this;
      let id = that.urlData.id;
      that.uploadData.id = id;
      that.uploadData.type = 3;
      let params = {
        businessId: id,
        type: 3
      };
      this.$common.commitParam(this, "/supervise/attachment/list.api", params,
        {
          success: function (res) {
            that.fileList = res.data;
            that.uploadDialogVisible = true;
          }
        }, "get");
    },
    getFileList() {
      let that = this;
      let id = that.urlData.id;
      that.uploadData.id = id;
      that.uploadData.type = 3;
      let params = {
        businessId: id,
        type: 3
      };
      this.$common.commitParam(this, "/supervise/attachment/list.api", params,
        {
          success: function (res) {
            that.fileList = res.data;
          }
        }, "get");
    },
    doSave() {
      var that = this;
      if (that.changeIdea1 == "") {
        this.$message({ message: '红色星号标记为必须填写！', type: 'warning' });
        return;
      }
      if (that.fileList.length == 0) {
        this.$message({ message: '请先上传附件！', type: 'warning' });
        return;
      }
      that.loading = true;
      var params = {
        "id": that.urlData.id,
        "comment": that.changeIdea1
      }
      if (that.urlData.taskId != null) {
        params.approvalTaskId = that.urlData.taskId;
      }
      if (that.urlData.processId != null) {
        params.processId = that.urlData.processId;
      }
      if (that.urlData.processKey != null) {
        params.processKey = that.urlData.processKey;
      }
      if (that.urlData.formId != null) {
        params.id = that.urlData.formId;
      }
      this.$common.commitParam(this, "/supervise/mytaskinfo/banjie.api", params,
        {
          success: function (res) {
            that.loading = false;
            if (res.code == 0) {
              that.$message({ message: '提交成功', type: 'success' });
              setTimeout(function () {
                that.doClose();
              }, 2000);
            } else {
              that.$message({ message: res.description, type: 'warning' });
            }
          },
          error: function (params) {
            that.loading = false;
          }
        }, "post", false);
    },
    choose(val) {
      var that = this;
      if (val == 1) {
        document.getElementById("txt").readOnly = false;
        that.boolean1 = true;
        that.boolean2 = false;
      } else if (val == 2) {
        document.getElementById("txt").readOnly = true;
        that.boolean1 = false;
        that.boolean2 = true;
        that.value611 = that.taskinfo.endDate;
      }
    },
    doClose() {
      // window.close();
      eventBus.$emit('taskJieXiangClose', 'true');
    },
    confirmUpload() {
      this.$refs.doUpload.line2upload();
    }
  }
}
</script>
<style lang="scss" >
.taskJieXiang {
  height: 100%;
  font-size: 14px;
  .tableBox {
    height: calc(100% - 90px);
  }
  .my-input1 {
    margin-right: 5px;
    float: left;
  }
  .el-dialog {
    width: 79%;
    margin: 0 auto;
    height: 93%;
  }
  .el-dialog__body {
    height: 78% !important;
  }
  .el-button + .el-button {
    margin-left: 5px;
  }
  .tools2 {
    font-size: 14px;
    color: #3bb3c3;
    height: 28px;
    width: 99%;
    margin-left: 1%;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #e4e4e4;
    padding-top: 8px;
  }
  .line {
    border: none;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #e0e0e0;
    color: #666666;
    font-family: "微软雅黑";
  }
  .round2 {
    height: 22px;
    border: 1px solid #3bb3c3;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    display: inline-block;
    background-color: #3bb3c3;
    color: #ffffff;
    font-family: "微软雅黑";
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
    padding-top: 3px;
    padding-right: 18px;
    padding-bottom: 3px;
    padding-left: 18px;
  }
  .round2:hover {
    background-color: #49c5d6;
  }
  .round {
    height: 22px;
    border: 1px solid #97d0d8;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    display: inline-block;
    background-color: #ffffff;
    color: #666666;
    font-family: "微软雅黑";
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
    padding-top: 3px;
    padding-right: 18px;
    padding-bottom: 3px;
    padding-left: 18px;
  }
  .round:hover {
    background-color: #3bb3c3;
    color: #ffffff;
  }
  .tablelist2 {
    border: 1px solid #e7e7e7;
    width: 100%;
    clear: both;
  }
  .tablelist2 th {
    /* background: url(../images/th.gif) repeat-x; */
    height: 40px;
    line-height: 40px;
    border-bottom: solid 1px #afced2;
    text-indent: 11px;
    text-align: center;
    font-family: "微软雅黑";
    font-size: 12px;
    color: #284e80;
    font-weight: normal;
  }
  .tablelist2 td {
    line-height: 22px;
    text-indent: 11px;
    border-right: dotted 1px #e7e7e7;
  }
  .ta {
    border-collapse: collapse;
    border-spacing: 0;
  }
  #table11 {
    height: calc(100% - 330px);
  }
  .el-table {
    height: 80%;
  }
  .el-dialog__body {
    padding: 20px 20px !important;
  }
  .my-input {
    width: 45%;
    display: inline-block;
    margin-bottom: 10px;
    margin-right: 10px;
    .el-input {
      width: calc(100% - 70px);
    }
    .text {
      display: inline-block;
      width: 70px;
      text-align: right;
    }
  }
  tbody span {
    font-size: 0.16rem;
  }
}
</style>
