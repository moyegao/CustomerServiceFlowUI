<!--> 点击待审批跳转的页面<!-->
<template>
  <div class="approval" v-loading.fullscreen.lock="submitLoading" element-loading-text="正在提交中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="box11">
      <div class="container">
        <div class="approval-content">
          <p>流程表单</p>
          <!-- <table align="center" class="main-table">
            <tbody>
              <tr>
                <td colspan="2">
                  <table width="99%">
                    <tbody style="font-size:14px;">
                      <tr>
                        <td width="173" height="26" align="right" class="txt1"> 督办名称&nbsp;</td>
                        <td width="500" colspan="3"><span class="line1">{{getdata.taskName}}</span></td>
                      </tr>
                      <tr>
                        <td width="173" align="right" class="txt1">督办来源&nbsp;</td>
                        <td width="315"><span class="line1">{{getdata.sourceName}}</span></td>
                        <td width="173" height="26" align="right" class="txt1"> 来源说明&nbsp;</td>
                        <td width="446"><span class="line1">{{getdata.sourceDesc}}</span></td>
                      </tr>
                      <tr>
                        <td height="26" align="right" class="txt1">责任部门&nbsp;</td>
                        <td><span class="line1">{{getdata.responsibleDeptNames}}</span></td>
                        <td height="26" align="right" class="txt1">责&nbsp;任&nbsp;&nbsp;人&nbsp;</td>
                        <td><span class="line1">{{getdata.responsibleUserNames}}</span></td>
                      </tr>
                      <tr>
                        <td align="right" class="txt1">来源说明&nbsp;</td>
                        <td style="height:26px"><span class="line1">{{getdata.sourceDesc}}</span></td>
                        <td align="right" class="txt1">分管领导&nbsp;</td>
                        <td><span class="line1">{{getdata.leaderUserNames}}</span></td>
                      </tr>
                      <tr>
                        <td height="26" align="right" class="txt1">协办部门&nbsp;</td>
                        <td><span class="line1">{{getdata.assistDeptNames}}</span></td>
                        <td align="right" class="txt1">协&nbsp;办&nbsp;&nbsp;人&nbsp;</td>
                        <td><span class="line1">{{getdata.assistUserNames}}</span></td>
                      </tr>
                      <tr>
                        <td height="26" align="right" class="txt1">原&nbsp;编&nbsp;&nbsp;号&nbsp;</td>
                        <td><span class="line1">{{getdata.oldTaskNum}}</span></td>
                        <td align="right" class="txt1">督办类型&nbsp;</td>
                        <td><span class="line1">{{getdata.taskType}}</span></td>
                      </tr>
                      <tr>
                        <td height="26" style="width:173px;" align="right" class="txt1">开始时间&nbsp;</td>
                        <td><span class="line1">{{getdata.beginDate}}</span></td>
                        <td align="right" class="txt1">结束时间&nbsp;</td>
                        <td><span class="line1">{{getdata.endDate}}</span></td>
                      </tr>
                      <tr>
                        <td height="26" align="right" class="txt1">重要程度&nbsp;</td>
                        <td><span class="line1">{{getdata.important}}</span></td>
                        <td align="right" class="txt1">主&nbsp;办&nbsp;&nbsp;人&nbsp;</td>
                        <td><span class="line1">{{getdata.sponsorUserName}}</span></td>
                      </tr>
                      <tr>
                        <td height="40" align="right" class="txt1">督办事宜&nbsp;</td>
                        <td colspan="3">
                          <span class="line1 ">{{getdata.taskDesc}}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table> -->
          <div class="messageBox">
            <!-- <div class="message_short" style="margin-left: 8%">
            <span class="message-name">任务名称&nbsp;</span>
            <span class="message-data">{{getdata.taskName}}</span>
          </div> -->
            <div class="message_long" style="margin-left: 8%">
              <span class="message-name">督办名称：</span>
              <span class="message-data">{{getdata.taskName}}</span>
            </div>

            <div class="message_short" style="margin-left: 8%">
              <span class="message-name">任务编号：</span>
              <span class="message-data">{{getdata.taskNum}}</span>
            </div>
            <div class="message_short">
              <span class="message-name"> 原 编 号：</span>
              <span class="message-data">{{getdata.oldTaskNum}}</span>
            </div>
            <div class="message_short">
              <span class="message-name">重要程度：</span>
              <span class="message-data">{{getdata.important}}</span>
            </div>

            <div class="message_short" style="margin-left: 8%">
              <span class="message-name">督办来源：</span>
              <span class="message-data">{{getdata.sourceName}}</span>
            </div>
            <div class="message_short">
              <span class="message-name">主 办 人：</span>
              <span class="message-data">{{getdata.sponsorUserName}}</span>
            </div>
            <div class="message_short">
              <span class="message-name">工单类型：</span>
              <span class="message-data">{{getdata.taskType}}</span>
            </div>

            <div class="message_short" style="margin-left: 8%">
              <span class="message-name">责任部门：</span>
              <span class="message-data">{{getdata.responsibleDeptNames}}</span>
            </div>
            <div class="message_short">
              <span class="message-name"> 责 任 人：</span>
              <span class="message-data">{{getdata.responsibleUserNames}}</span>
            </div>
            <div class="message_short">
              <span class="message-name">分管领导：</span>
              <span class="message-data">{{getdata.leaderUserNames}}</span>
            </div>

            <div class="message_short" style="margin-left: 8%">
              <span class="message-name">协办部门：</span>
              <span class="message-data">{{getdata.assistDeptNames}}</span>
            </div>
            <div class="message_short">
              <span class="message-name"> 协 办 人：</span>
              <span class="message-data">{{getdata.assistUserNames}}</span>
            </div>
            <div class="message_short">
              <span class="message-name">督办类型：</span>
              <span class="message-data">{{getdata.taskType}}</span>
            </div>

            <div class="message_short" style="margin-left: 8%">
              <span class="message-name">开始时间：</span>
              <span class="message-data">{{getdata.beginDate}}</span>
            </div>
            <div class="message_short">
              <span class="message-name">结束时间：</span>
              <!-- <el-date-picker v-if="endDateEditShow" size="mini" @change="endDateChange" v-model="endDate" type="date" align="right" unlink-panels style="width:43%" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker> -->
              <span class="message-data">{{getdata.endDate}}</span>
            </div>

            <div class="message_long" style="margin-left: 8%">
              <span class="message-name">来源说明：</span>
              <span class="message-data">{{getdata.sourceDesc}}</span>
            </div>

            <div class="message_long" style="margin-left: 8%;">
              <span class="message-name">督办事宜：</span>
              <span class="message-data">{{getdata.taskDesc}}</span>
            </div>

            <div class="message_long_upload" style="margin-left: 8%;margin-bottom: .15rem">
              <div class="message-name"><span style="float: left;">附件：</span></div>
              <div class="message-data">
                <div v-for="item in attachments" :key='item.id'>
                  <span>{{item.name}}</span>
                  <el-button size="mini" type="text" class="download-btn" style="background: none;border: none;" @click="handleDownload(item)">下载</el-button>
                  <el-button size="mini" type="text" class="delete-btn" style="background: none;border: none;" @click="handlePreview(item)">预览</el-button>
                </div>
              </div>
            </div>

            <!-- <el-table :data="attachments" height="200" style="margin-left:0.8rem;width: 83%">
              <el-table-column label="NO." type="index" width="55">
              </el-table-column>
              <el-table-column label="文件描述" prop="name">
              </el-table-column>
              <el-table-column label="操作" align="center" class-name="options">
                <template slot-scope="scope" style="text-align:center">
                  <el-button size="mini" type="text" class="download-btn" style="background: none;border: none;" @click="handleDownload(scope.row)">下载</el-button>
                  <el-button size="mini" type="text" class="delete-btn" style="background: none;border: none;" @click="handlePreview(scope.row)">预览</el-button>
                </template>
              </el-table-column>
            </el-table> -->
          </div>

        </div>
      </div>
    </div>

    <div class="box11" v-if="taskChangeInfoShow">
      <div class="container">
        <div class="approval-content">
          <p>变更信息</p>
          <table align="center" class="main-table">
            <tbody>
              <tr>
                <td colspan="2">
                  <table width="99%">
                    <tbody style="font-size:14px;">

                      <tr>
                        <td width="173" align="right" class="txt1">变更类型&nbsp;</td>
                        <td width="315"><span class="line1">{{taskChangeInfoData.changeType}}</span></td>
                      </tr>

                      <tr>
                        <td width="173" height="26" align="right" class="txt1" v-if="timeShow">结束时间&nbsp;</td>
                        <!-- <td width="446" v-if="timeShow"><span class="line1">{{taskChangeInfoData.endDate}}</span></td> -->
                        <td width="446" v-if="timeShow">
                          <el-date-picker size="mini" @change="endDateChange" v-model="endDate" type="date" align="right" unlink-panels style="width:15%" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                          </el-date-picker>
                        </td>
                        <td width="173" height="26" align="right" class="txt1" v-if="!timeShow">督办事宜&nbsp;</td>
                        <td width="446" v-if="!timeShow"><span class="line1">{{taskChangeInfoData.taskInfo}}</span></td>
                      </tr>

                      <tr>
                        <td width="173" height="26" align="right" class="txt1"> 变更原因&nbsp;</td>
                        <td width="500" colspan="3"><span class="report">{{taskChangeInfoData.comment}}</span></td>
                      </tr>

                      <!-- <tr>
                        <td height="40" align="right" class="txt1">汇报附件&nbsp;</td>
                        <td colspan="3">
                          <span :key='item.id' v-for="item in reportAttachments" size="mini" type="success">
                            {{item.name}}
                            <el-button size="mini" type="text" @click="downLoadPdf(item,'预览')">预览</el-button>
                            <el-button size="mini" type="text" @click="downLoadPdf(item,'下载')">下载</el-button>
                            <br />
                          </span>
                        </td>
                      </tr> -->
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="kr-table" style="margin-top:.2rem;margin-bottom:.2rem">
      <p class="hide icon-minus-circle" @click="takeChange">审批流程</p>
      <el-table class="table_approval" center :data="tableData" style="width: 98%;margin-left:.15rem;">
        <el-table-column prop="endTime" label="时间" width="160">
        </el-table-column>
        <el-table-column prop="taskName" label="节点名词" width="90">
        </el-table-column>
        <el-table-column prop="approver" label="操作者" width="90">
        </el-table-column>
        <el-table-column prop="action" label="操作" width="50">
        </el-table-column>
        <el-table-column prop="comments" label="处理意见" width="350">
        </el-table-column>
        <el-table-column prop="fileTitle" label="附件" :show-overflow-tooltip="false">
          <template slot-scope="scope">
            <!-- <table stripe border="0" align="right">
              <tbody>
                <tr :key="tem.id" v-for="tem in scope.row.attachments">
                  <td style="width: 300px;">{{tem.name}}</td>
                  <td><span style="color:#59A6FF;cursor: pointer;" @click="handlePreview(tem)">&nbsp;预览</span></td>
                  <td><span style="color:#59A6FF;cursor: pointer;" @click="handleDownload(tem)">&nbsp;下载</span></td>
                </tr>
              </tbody>
            </table> -->
            <el-table center v-if="scope.row.attachments.length > 0" :data="scope.row.attachments" :show-header="false" style="width: 100%;">
              <el-table-column prop="name" label="附件名" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="taskName" label="操作" width="110" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button @click="handlePreview(scope.row)" type="text" size="mini" style="fontSize:16px;">预览</el-button>
                  <el-button @click="handleDownload(scope.row)" type="text" size="mini" style="fontSize:16px;">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- <span class="handle" :key="tem.id" v-for="tem in scope.row.attachments" size="mini" type="success">
              {{tem.name}}
              <span style="color:#59A6FF;cursor: pointer;" @click="handlePreview(tem)">&nbsp;预览</span>
              <span style="color:#59A6FF;cursor: pointer;" @click="handleDownload(tem)">&nbsp;下载</span><br />
            </span> -->
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div id='approvalinfo'>
    </div>
    <!-- iiiiiii -->
    <el-dialog title="文件上传" top="10px" :visible.sync="uploadDialogVisible" width="80%" height="600px" center>
      <klUpload :fatherList.sync="fileList" :fatherId.sync="uploadData.id" :type.sync="uploadData.type" ref="doUpload"></klUpload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadBack">返 回</el-button>
        <el-button type="primary" style="color: #fff;background-color: #297ACC;border-color: #297ACC;" @click="confirmUpload">上 传</el-button>
      </span>
    </el-dialog>

    <!-- iiiiiiiiii -->
  </div>

</template>
<script>
import klUpload from './klUpload';
export default {
  components: {
    klUpload,
  },
  props: ['approvalNeedData'],
  data() {
    return {
      urlData: {
        id: '',
        taskId: '',
        processId: '',
        processKey: '',
        msg: ''
      },
      uploadData: {
        id: -1,
        subId: '',
        type: 5
      },
      getdata: {},
      tableData: [],
      title: '',
      attachments: [],
      approvalInfo: '',
      uploadDialogVisible: false,
      fileList: [],
      submitLoading: false,
      // tableShow: false,
      taskChangeInfoData: {},
      taskChangeInfoShow: true,
      timeShow: false,




      addList: [],
      selectRow: [],
      timer1: null,
      upLoadLoading: false,
      endDate: '',
      endDateEditShow: false,
    }
  },
  mounted() {
    this.init();
    this.load();
    this.getTableData();

    // eventBus.$on('taskChangeInformation', (params) => {
    //   debugger
    //   this.taskChangeInfoShow = params;
    //   if (params) {
    //     this.getTaskChangeInfoDate();
    //   }
    // });

    // eventBus.$on('todo', (params) => {
    //   this.$ref.doUpload.submitUpload();
    // });
  },
  watch: {

  },
  methods: {
    init() {
      // this.urlData.id = this.$common.getQueryString('id');
      // this.urlData.taskId = this.$common.getQueryString('taskId');
      // this.urlData.processId = this.$common.getQueryString('processId');
      // this.urlData.processKey = this.$common.getQueryString('processKey');
      // this.urlData.msg = this.$common.getQueryString('msg');
      this.urlData.id = this.approvalNeedData.id;
      this.urlData.taskId = this.approvalNeedData.taskId;
      this.urlData.processId = this.approvalNeedData.processId;
      this.urlData.processKey = this.approvalNeedData.processKey;
      this.urlData.taskName = this.approvalNeedData.taskName;
      this.urlData.uploadHidden = this.approvalNeedData.uploadHidden;
      console.log(this.approvalNeedData.processName);
      if (this.approvalNeedData.processName == '督办变更') {
        this.endDateEditShow = true;
      } else {
        this.endDateEditShow = false;
      }

      this.taskChangeInfoShow = this.approvalNeedData.taskChangeMessage;
      if (this.taskChangeInfoShow) {
        this.getTaskChangeInfoDate();
      }
      sessionStorage.setItem("id", this.approvalNeedData.id);
      sessionStorage.setItem("taskId", this.approvalNeedData.taskId);
      sessionStorage.setItem("processKey", this.approvalNeedData.processKey);
      this.urlData.msg = this.$common.getQueryString('msg');
    },
    endDateChange() {
      sessionStorage.setItem("endDate", this.endDate);
    },
    getTaskChangeInfoDate() {
      var that = this;
      var id = that.approvalNeedData.formId;
      this.$common.commitParam(this, "/supervise/taskchange/get.api", { "id": id }, {
        success: function (res) {
          that.taskChangeInfoData = res.data;
          that.endDate = res.data.endDate
          sessionStorage.setItem("endDate", that.endDate);
          if (res.data.changeType == '工作时限变更') {
            that.timeShow = true;
          }
        }
      }, "get");
    },
    down(item) {
      window.open(process.env.baseUrl + "supervise/attachment/down.api?id=" + id);
    },
    load() {
      this.gettaskinfo();
      this.getAttachments();
      this.getapprovalInfo();
    },
    getAttachments() {
      var that = this;
      var href = location.href;
      var id = that.urlData.id;
      this.$common.commitParam(this, "/supervise/attachment/list.api", { "businessId": id }, {
        success: function (res) {
          that.attachments = res.data;
          // if (res.data.length <= 0) {
          //   that.tableShow = false;
          // }
        }
      }, "get");
    },
    handleDownload(item) {
      window.open(item.url);
    },
    handlePreview(item) {
      if (item.pdfUrl !== '') {
        window.open(item.pdfUrl)
      } else {
        let imgList = ['jpg', 'JPG', 'gif', 'GIF', 'png', 'PNG']
        for (let i = 0; i < imgList.length; i++) {
          if (item.url.indexOf(imgList[i]) > -1) {
            var isPreview = true;
          }

        }
        if (isPreview) {
          window.open(item.url);
        } else {
          this.$message({
            type: 'error',
            message: '该附件不支持预览'
          });
        }
      }
    },
    gettaskinfo() {
      var that = this;
      var id = that.urlData.id;
      this.$common.commitParam(this, "/supervise/taskinfo/get.api", { "id": id }, {
        success: function (res) {
          that.getdata = res.data
          that.title = res.data.title
          
        }
      }, "get");
    },
    // 获取已经处理人，当前处理人，任务发起人，下一步处理人数据
    getapprovalInfo() {
      var that = this;
      var taskId = that.urlData.taskId;

      var processKey = that.urlData.processKey;
      this.$common.commitParam(this, "/supervise/workflow/approvalinfo.api", { "taskId": taskId, 'processKey': processKey }, {
        success: function (res) {
          //console.log(approve);
          var div = '<a href="javascript:void(0)" id="showUpload"><span class="round2">上传附件 </span></a>';
          // var div = '<klUploadApproval :fatherList.sync="fileList" :fatherId.sync="uploadData.id" :type.sync="uploadData.type" ref="doUpload"></klUploadApproval>';
          $('#approvalinfo').append(res.data);
          // $("[name='file']").hide();

          $("[name='file']").parent().html(div);
          if (window.location.href.indexOf('index') > 0 || window.location.href.indexOf('todo') > 0) {

          } else {
            $('#upload').remove();
          }
          if (sessionStorage.getItem('fujianHidden') == 'true') {
            $('#upload').remove();
            sessionStorage.setItem('fujianHidden', 'false');
          }
          if (that.urlData.uploadHidden == true) {
            $('#upload').remove();
          }
          that.getUpload();
          //接口返回的标签与事件，该方法写在后端接口返回的数据中，不在前端代码中
          $(".approval-content > ._showbutton").click();


          var div1 = '<span class="submit-opinion1 submitOk" data-type="1" style="margin-left: .1rem">提交</span>';
          $('#remark .col-xs-10 p textarea').after(div1);
          $('#remark .col-xs-10 p .submit-opinion').remove();

          // 提交按钮
          $(".submit-opinion1").on("click", function () {
            var type = $(this).data("type");
            var operation = $("input[name = 'operation']:checked").val();
            var data = {};
            try {
              data = submitCheck(data);
            } catch (err) {
              var dlg = dialog({
                title: "操作提示",
                content: err
              });
              dlg.showModal();
              return;
            }
            var nodeOperator = nodeOper(".node-operator");
            data.__nodeOperator = nodeOperator;
            var mnodeOperator = nodeOper(".m-node-operator");
            var size = $("#mmodnodes_size").val();/*必须修改节点的个数*/
            if (operation == 32
              && ("[]" != null && size != '' && size != null)
              && (mnodeOperator.length == 0 || mnodeOperator.length != size)) {
              var dlg = dialog({
                title: "操作提示",
                content: "请输入必须修改节点的办理人"
              });
              dlg.showModal();
              return;
            }
            data.__mnodeOperator = mnodeOperator;
            data.__type = type; /* 文件上传*/
            // if ("0" == "0") {
            // 	upload();
            // }
            // ;
            data.__attachmentId = $("#fileId").val();
            data.taskid = "713615";
            data.template = "gs_changes";
            approve(data);
            // setTimeout(() => {
            //   $('.ui-popup').remove();
            //   $('[tabindex="0"]').remove();
            // }, 0);
          });



          $('.approval-content .approval-list').children().first().remove();
          $('.approval-content .approval-list .row').css('border-top', '1px solid #d3d3d3')

        }
      }, "get");
    },
    takeChange() {
      $('.hide').toggleClass("icon-plus-circle").toggleClass("icon-minus-circle");
      $('.kr-table > .el-table').toggle()
    },
    getTableData() {
      var that = this;
      // let id = that.urlData.id;
      // let key = that.urlData.processKey;
      // let taskName = that.urlData.taskName;
      this.$common.commitParam(this, "/supervise/workflow/comment.api", { taskName: that.urlData.taskName, processInstanceId: that.urlData.processId }, {
        success: function (res) {
          that.tableData = res.data
        }
      }, "get");
    },
    //上传附件按钮
    getUpload() {
      var that = this;
      $('#showUpload').click(function () {
        // let that = this;

        let id = that.urlData.taskId;
        that.uploadData.id = id;
        that.uploadData.type = 5;
        let params = {
          businessId: id,
          type: 5
        };
        that.$common.commitParam(that, "/supervise/attachment/list.api", params,
          {
            success: function (res) {
              that.fileList = res.data;
              that.uploadDialogVisible = true;
              // that.$refs.doUpload.submitUpload();
            }
          }, "get");

      })
    },

    uploadBack() {
      this.uploadDialogVisible = false;
      this.getTableData();
    },
    confirmUpload() {
      this.$refs.doUpload.line2upload();
      // this.line2upload();
      setTimeout(() => {
        this.getTableData();
      }, 0);
    },

    //upload里面的上传按钮
    showUpload() {
      let that = this;
      let id = that.urlData.taskId;
      that.uploadData.id = id;
      that.uploadData.type = 5;
      let params = {
        businessId: id,
        type: 5
      };
      this.$common.commitParam(this, "/supervise/attachment/list.api", params,
        {
          success: function (res) {
            that.fileList = res.data;
            that.uploadDialogVisible = true;
          }
        }, "get");
    },
  }
}
</script>
<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
ul > li {
  list-style: none;
}
ul {
  margin: 0;
  padding: 0;
}
.approval {
  .box11 {
    .container {
      td {
        height: 0.38rem;
        line-height: 0.38rem;
      }
      .line1 {
        width: 57px;
        height: 12px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333;
      }
      .txt1 {
        width: 59px;
        height: 12px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #757575;
      }
    }
  }
  .kr-table {
    p {
      font-size: 0.16rem;
      color: #7c6592;
      font-weight: bolder;
      padding: 0.1rem 0.26rem;
    }
    .el-table__body .el-table__row .cell {
      font-size: 0.14rem;
      color: #333;
    }
  }
  #approvalinfo {
    .container {
      .approval-content {
        .approval-list {
          .approval-table {
            td {
              font-size: 14px;
              text-align: center;
            }
          }
        }
        .approval-svg {
          #design {
            text {
              font-size: 0.16rem;
            }
          }
        }
      }
    }
  }
  font-size: 12px;
  .el-dialog {
    margin-top: 7vh !important;
    height: 85%;
  }
  .el-dialog__body {
    padding: 15px 20px;
    height: calc(100% - 84px);
  }
  .el-tree {
    width: 30%;
    height: 100%;
    overflow: auto;
    float: left;
    margin-left: 50px;
  }
  .tree1 {
    .is-current > .el-tree-node__content {
      background-color: #0154a4;
      color: #fff;
    }
    .el-tree-node:focus > .el-tree-node__content {
      background-color: #0154a4;
      color: #fff;
    }
  }

  .xian {
    width: 1px;
    height: 100%;
    float: left;
    background-color: #000;
    margin-left: 50px;
  }
  .sure {
    float: left;
    margin-left: 50px;
  }
  .main-table {
    // width: 100%;
    // padding-left: 15px;
    // padding-right: 15px;
    // margin-left: auto;
    // margin-right: auto;
    // overflow: hidden;
    border: 1px solid #cccccc;
    width: 100%;
    // border-width: 1px 1px 1px 1px;
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
  .main-table > tbody > tr > td > table > tbody td {
    // border: solid #cccccc;
    // border-width: 0px 1px 1px 0px;
  }
  .title {
    font-family: "微软雅黑";
    font-size: 16px;
  }
  a,
  a:focus {
    text-decoration: none;
    color: #000;
    outline: none;
  }
  a:hover {
    color: #00a4ac;
    text-decoration: none;
  }
  .line {
    border: none;
    display: block;
    // width: 540px;
    height: 26px;
    // line-height: 26px;
    color: #666666;
    font-family: "微软雅黑";
  }
  .line1 {
    // border: none;
    // display: block;
    // // width: 280px;
    // height: 26px;
    // // line-height: 26px;
    // color: #666666;
    // font-family: "微软雅黑";
  }
  .dubanMsg {
    border: none;
    display: block;
    width: 100%;
    height: 26px;
    line-height: 26px;
    color: #666666;
    font-family: "微软雅黑";
  }

  .round2 {
    height: 30px;
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
    margin-left: 20px;
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
  .fujianbtn {
    // height: 36px;
    margin-left: 20px;
    height: 30px;
    width: 70px;
  }
  .uploading {
    margin-top: 50px;
  }
  .el-dialog__body {
    height: calc(100% - 135px);
  }
  .submitOk {
    margin-left: 0.1rem !important;
  }
  .submit-opinion1 {
    display: inline-block;
    width: 0.7rem;
    font-size: 0.16rem;
    line-height: 0.3rem;
    color: white;
    height: 0.3rem;
    text-align: center;
    border-radius: 20px;
  }
  .messageBox {
    width: 100%;
    border: 1px solid #efefef;
    .message_short {
      width: 30%;
      display: inline-block;
      margin-top: 0.1rem;
      .message-name {
        color: #999999;
        float: left;
        font-size: 0.14rem;
      }
      .message-data {
        font-size: 0.14rem;
      }
    }
    .message_long {
      width: 90%;
      display: inline-block;
      margin-top: 0.15rem;
      .message-name {
        color: #999999;
        float: left;
        font-size: 0.14rem;
      }
      .message-data {
        font-size: 0.14rem;
      }
    }
    .message_long_upload {
      width: 90%;
      display: inline-block;
      margin-top: 0.15rem;
      .message-name {
        // display: inline-block;
        color: #999999;
        font-size: 0.14rem;
        // display: table-cell;
        // vertical-align: middle;
      }
      .message-data {
        display: inline-block;
        font-size: 0.14rem;
        margin-left: 0.28rem;
      }
    }
  }
  .table_approval .el-table__body {
    tr {
      td:nth-child(5) {
        div {
          text-align: left;
          line-height: 0.22rem !important;
          font-size: 0.13rem !important;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
        }
      }
    }
  }
}
</style>
<style lang='css'>
@import "../assets/approval/css/editform.css";
@import "../assets/approval/css/fontello.css";
@import "../assets/approval/css/appvoralCSS.css";
@import "../../static/addone/artdialog/ui-dialog.css";
@import "../../static/addone/staffselector/selector.css";
@import "../../static/addone/tree/mytree.css";
@import "../../static/addone/staffselector/selector.css";
</style>
