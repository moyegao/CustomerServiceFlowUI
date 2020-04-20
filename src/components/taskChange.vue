<template>
  <div class="taskChange" v-loading.fullscreen.lock="loading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0.8)">
    <br>
    <table width="100%" border="0" align="center">
      <tbody>
        <tr>
          <td width="15%" height="25px" align="right" class="txt1">督办名称&nbsp;</td>
          <td height="25px" colspan="3"><span class="line" style="display:inline-block;width:874px;height:25px;">{{taskinfo.taskName}}</span></td>
        </tr>
        <tr>
          <td width="15%" height="25px" align="right" class="txt1">督办来源&nbsp;</td>
          <td width="35%" height="25px">
            <span class="line" style="display:inline-block;width:280px;height:20px;">{{taskinfo.sourceName}}</span>
          </td>
          <td align="right" class="txt1" width="15%" height="25px">来源说明&nbsp;</td>
          <td width="35%" height="25px">
            <span class="line" style="display:inline-block;width:280px;height:20px;">{{taskinfo.sourceDesc}}</span>
          </td>
        </tr>
        <tr>
          <td height="20px" width="15%" align="right" class="txt1">责任部门&nbsp;</td>
          <td height="20px">
            <span class="line" style="display:inline-block;width:280px;height:20px;">{{taskinfo.responsibleDeptNames}}</span>
          </td>
          <td height="20px" width="15%" align="right" class="txt1">责&nbsp;任&nbsp;&nbsp;人&nbsp;</td>
          <td height="20px">
            <span class="line" style="display:inline-block;width:280px;height:20px;">{{taskinfo.responsibleUserNames}}</span>
          </td>
        </tr>
        <tr>
          <td height="20px" width="15%" align="right" class="txt1">协办部门&nbsp;</td>
          <td height="20px"><span class="line" style="display:inline-block;width:280px;height:20px;">{{taskinfo.assistDeptNames}}</span> </td>
          <td height="20px" width="15%" align="right" class="txt1">协&nbsp;办&nbsp;&nbsp;人&nbsp;</td>
          <td height="20px"><span class="line" style="display:inline-block;width:280px;height:20px;">{{taskinfo.assistUserNames}}</span> </td>
        </tr>
        <tr>
          <td height="20px" width="15%" align="right" class="txt1">重要程度&nbsp;</td>
          <td height="20px">
            <span class="line" style="display:inline-block;width:280px;height:20px;">{{taskinfo.important}}</span>
          </td>
          <td align="right" width="15%" class="txt1" height="20px">分管领导&nbsp;</td>
          <td height="20px">
            <span class="line" style="display:inline-block;width:280px;height:20px;">{{taskinfo.leaderUserNames}}</span>
          </td>
        </tr>
        <tr>
          <td height="20" align="right" width="15%" class="txt1">开始时间&nbsp;</td>
          <td height="20"><span class="line" style="display:inline-block;width:280px;height:20px;">{{taskinfo.beginDate}}</span> </td>
          <td align="right" class="txt1" width="15%" height="20">结束时间&nbsp;</td>
          <td height="20">
            <span v-if="boolean1" class="line" style="display:inline-block;width:280px;height:20px;">{{taskinfo.endDate}}</span>
            <div v-if="!boolean1" class="block" style="width:280px;">
              <el-date-picker size="mini" v-model="value611" type="date" align="right" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:100%;" @blur="getDate">
              </el-date-picker>
            </div>
          </td>
        </tr>
        <tr>
          <td height="25" align="right" class="txt1">原&nbsp;编&nbsp;&nbsp;号&nbsp;</td>
          <td height="25"><span class="line" style="display:inline-block;width:280px;height:20px;">{{taskinfo.oldTaskNum}}</span> </td>
          <td height="25" align="right" class="txt1">
            <font color="red">*</font>变更类型&nbsp;
          </td>
          <td height="25">
            <el-select v-model="value123" clearable size="mini" style="width:280px" @change="choose">
              <el-option label="工作内容变更" key="1" value="1"></el-option>
              <el-option label="工作时限变更" key="2" value="2"></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td height="25" align="right" class="txt1"><font color="red">*</font>督办事宜&nbsp;</td>
          <td height="25" colspan="3"><label>
							 <span v-if="!boolean1" class="line" style="height: 100px;width:80%;color:#666;">{{taskinfo.taskDesc}}</span>
              <textarea v-if="boolean1" name="m_DBSY" id="txt" class="txtline" rows="6" style="height: 100px;width:80%;color:#666;" v-model="info"></textarea>
            </label>
          </td>
        </tr>
        <tr>
          <td height="25" align="right" class="txt1">
            <font color="red">*</font>变更理由&nbsp;
          </td>
          <td height="25" colspan="3">
						<label>
              <textarea name="m_Desc" class="txtline" rows="6" style="height: 100px;width:80%;color:#666;" v-model="changeIdea"></textarea>
            </label>
          </td>
        </tr>
        <!-- <tr>
          <td colspan="4" class="txt1" align="center" height="54">
            <a href="javascript:void(0)" @click="showUpload"><span class="round2">上传附件 </span></a> &nbsp;&nbsp;
            <a href="javascript:void(0)" @click="doSave"><span class="round2"> 提交</span></a> &nbsp;&nbsp;
            <a href="javascript:void(0)" @click.prevent="doClose"><span class="round"> 关闭 </span></a>
          </td>
        </tr> -->
      </tbody>
    </table>
    <el-dialog title="文件上传" top="10px" :visible.sync="uploadDialogVisible" width="80%" height="600px" center>
      <klUpload :fatherList.sync="fileList" :fatherId.sync="uploadData.id" :type.sync="uploadData.type" ref="doUpload">
      </klUpload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible = false">返 回</el-button>
        <el-button type="primary" style="background:#297ACC;border-color:#297ACC" @click="confirmUpload">上 传</el-button>
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
  props: ['taskChangeNeedData'],
  data() {
    return {
      fileList: [],
      uploadData: {
        id: -1,
        type: 2
      },
      uploadDialogVisible: false,
      taskinfo: {},
      boolean1: true,
      boolean2: false,
      value123: '1',
      value611: '',
      info: '',
      changeIdea: '',
      urlData: {
        id: '',
        taskId: '',
        processId: '',
        processKey: '',
        formId: ''
      },
      loading: false,
    }

  },
  mounted() {
    this.init();
    this.getTaskInfo();
  },
  methods: {
    init() {
      // this.urlData.id = this.$common.getQueryString('id');
      this.urlData.id = this.taskChangeNeedData.id;
      this.urlData.taskId = this.taskChangeNeedData.taskId;
      this.urlData.processId = this.taskChangeNeedData.processId;
      this.urlData.processKey = this.taskChangeNeedData.processKey;
      this.urlData.formId = this.taskChangeNeedData.formId;
      this.urlData.approvalTaskId = this.taskChangeNeedData.taskId;
      // that.taskChangeNeedData.id = row.id;
      //         that.taskChangeNeedData.taskId = row.taskId;
      //         that.taskChangeNeedData.processId = row.processId;
      //         that.taskChangeNeedData.processKey = row.processKey;
      //         that.taskChangeNeedData.formId = row.formId;
      //         that.taskChangeNeedData.supervisionTaskId = row.id
    },
    getTaskInfo() {
      var that = this;
      var id = that.urlData.id
      this.$common.commitParam(this, "/supervise/taskinfo/get.api", { "id": id }, {
        success: function (res) {
          that.taskinfo = res.data;
					that.info = that.taskinfo.taskDesc;
        }
      }, "get");
    },
    showUpload() {
      let that = this;
      let id = that.urlData.id;
      that.uploadData.id = id;
      that.uploadData.type = 1;
      let params = {
        businessId: id,
        type: 1
      };
      this.$common.commitParam(this, "/supervise/attachment/list.api", params,
        {
          success: function (res) {
            that.fileList = res.data;
            that.uploadDialogVisible = true;
          }
        }, "get");
    },
    doSave() {
      var that = this;
     

      var params = {
        // "businessKey" : that.urlData.id,
        "comment": that.changeIdea,
        "changeType": that.value123
      }
      if (that.urlData.id != null) {
        params.taskId = that.urlData.id;
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
      if (that.urlData.approvalTaskId != null) {
        params.approvalTaskId = that.urlData.approvalTaskId;
      }
      if (that.value123 == 1) {
        params.taskInfo = that.info;
      } else if (that.value123 == 2) {
        params.endDate = that.value611;
      }
			 if (that.changeIdea == ''||that.info == '') {
			  that.$message({ message: '红色星号标记为必须填写！', type: 'warning' });
			  return;
			}
			
			that.loading = true;
      this.$common.commitParam(this, "/supervise/mytaskinfo/change.api", params,
        {
          success: function (res) {
            that.loading = false;
            if (res.code == 0) {
              that.$message({ message: '提交成功', type: 'success' });
              setTimeout(() => {
                that.doClose();
              }, 2000);
            } else {
              that.$message({ message: res.description, type: 'warning' });
            }
          }
        }, "post", false);
    },
    choose(val) {
      var that = this;
			//   if (val == 1) {
			//   document.getElementById("txt").readOnly = false;
			//   that.boolean1 = true;
			//   that.boolean2 = false;
			// } else if (val == 2) {
			//   document.getElementById("txt").readOnly = true;
			//   that.boolean1 = false;
			//   that.boolean2 = true;
			//   that.value611 = that.taskinfo.endDate;
			// }
      if (val == 1) {
        that.boolean1 = true;
				that.info = that.taskinfo.taskDesc;
      } else if (val == 2) {
        that.boolean1 = false;
        that.value611 = that.taskinfo.endDate;
      }
    },
    doClose() {
      // window.close();
      eventBus.$emit('taskChangeClose', 'true');
    },
    confirmUpload() {
      this.$refs.doUpload.line2upload();
    },
    getDate(date) {
      
    }
  }
}
</script>
<style lang="scss" >
.taskChange {
  height: 100%;
  font-size: 0.16rem;
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
  .el-dialog__body{
    height: 78% !important;
  }
  .el-button + .el-button {
    margin-left: 5px;
  }
  .tools2 {
    font-size: 0.14rem;
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
    font-size: 0.14rem;
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
    font-size: 0.14rem;
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
    font-size: 0.12rem;
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