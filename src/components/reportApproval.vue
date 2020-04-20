
<template>
  <div class="reportApproval">
    <div class="box11">
      <div class="container">
        <div class="approval-content">
          <p>流程表单</p>
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
              <span class="message-data">{{getdata.endDate}}</span>
            </div>

            <div class="message_long" style="margin-left: 8%">
              <span class="message-name">来源说明：</span>
              <span class="message-data">{{getdata.sourceDesc}}</span>
            </div>

            <div class="message_long" style="margin-left: 8%">
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
    <div class="box11">
      <div class="container">
        <div class="approval-content">
          <p>汇报信息</p>
          <table align="center" class="main-table">
            <tbody>
              <tr>
                <td colspan="2">
                  <table width="99%">
                    <tbody style="font-size:14px;">

                      <tr>
                        <td width="173" align="right" class="txt1">汇报进度&nbsp;</td>
                        <td width="315"><span class="line1">{{ReportingInfoData.progressRadio}}</span></td>
                        <td width="173" height="26" align="right" class="txt1"> 汇报年月&nbsp;</td>
                        <td width="446"><span class="line1">{{ReportingInfoData.reportMonth}}</span></td>
                      </tr>

                      <tr>
                        <!-- {{getdata.reportInfo}} -->
                        <!-- 汇报内容的数据在gettaskinfo方法中 -->
                        <td width="173" height="26" align="right" class="txt1"> 汇报内容&nbsp;</td>
                        <td width="500" colspan="3"><span class="report"></span></td>
                      </tr>

                      <tr>
                        <td height="40" align="right" class="txt1">汇报附件&nbsp;</td>
                        <td colspan="3">
                          <span :key='item.id' v-for="item in reportAttachments" size="mini" type="success">
                            {{item.name}}
                            <el-button size="mini" type="text" @click="downLoadPdf(item,'预览')">预览</el-button>
                            <el-button size="mini" type="text" @click="downLoadPdf(item,'下载')">下载</el-button>
                            <br />
                          </span>
                        </td>
                      </tr>
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
      <el-table center :data="tableData" style="width: 98%;margin-left:.15rem;">
        <el-table-column prop="endTime" label="时间" width="180">
        </el-table-column>
        <el-table-column prop="taskName" label="节点名词" width="150">
        </el-table-column>
        <el-table-column prop="approver" label="操作者" width="120">
        </el-table-column>
        <el-table-column prop="action" label="操作" width="120">
        </el-table-column>
        <el-table-column prop="comments" label="处理意见" show-overflow-tooltip>
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
      <klUpload :fatherList.sync="fileList" :fatherId.sync="uploadData.id" :type.sync="uploadData.type" ref="doUpload">
      </klUpload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible = false">返回</el-button>
        <el-button type="primary" @click="confirmUpload">上 传</el-button>
      </span>
    </el-dialog>

    <!-- iiiiiiiiii -->
  </div>

</template>
<script>
import klUpload from './klUpload';
export default {
  components: {
    klUpload
  },
  props: ['reportApprovalNeedData'],
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
      title: '',
      attachments: [],
      reportAttachments: [],
      approvalInfo: '',
      uploadDialogVisible: false,
      fileList: [],
      tableData: [],
      ReportingInfoData: [],
    }
  },
  mounted() {
    this.init();
    this.load();
    this.getTableData();
    this.getReportingInfo();
    // eventBus.$on('fujianHidden', (params) => {
    //   // that.$nextTick(() => {
    //   $('#upload').remove();
    //   // })

    // });
  },
  watch: {

  },
  methods: {
    init() {
      // this.urlData.id = this.$common.getQueryString('id');
      this.urlData.id = this.reportApprovalNeedData.id;
      this.urlData.taskId = this.reportApprovalNeedData.taskId;
      this.urlData.processId = this.reportApprovalNeedData.processId;
      this.urlData.processKey = this.reportApprovalNeedData.processKey;
      this.urlData.taskName = this.reportApprovalNeedData.taskName;
      this.urlData.msg = this.$common.getQueryString('msg');
      sessionStorage.setItem("id", this.reportApprovalNeedData.id);
      sessionStorage.setItem("taskId", this.reportApprovalNeedData.taskId);
      sessionStorage.setItem("processKey", this.reportApprovalNeedData.processKey);
    },
    // down(id) {
    //   console.log(id);
    //   return
    //   window.open(process.env.baseUrl + "supervise/attachment/down.api?id=" + id);
    // },
    //下载预览附件
    downLoadPdf(item, type) {
      var url;
      if (type === '下载') {
        url = item.url
      } else {
        if (item.pdfUrl !== '') {
          url = item.pdfUrl;

        } else {
          let imgList = ['jpg', 'JPG', 'gif', 'GIF', 'png', 'PNG']
          for (let i = 0; i < imgList.length; i++) {
            if (item.name.indexOf(imgList[i]) > -1) {
              var isPreview = true;
            }

          }
          if (isPreview) {
            url = item.url;
          } else {
            this.$message({
              type: 'error',
              message: '该附件不支持预览'
            });
            return
          }

        }
      }

      window.open(url)
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
          // 汇报内容填充数据
          // $('.report').append(res.data.reportInfo);
        }
      }, "get");
    },
    getReportingInfo() {
      var that = this;
      var id = that.urlData.id;
      this.$common.commitParam(this, "/supervise/mytaskinfo/getNewestByTaskId.api", { "taskId": id }, {
        success: function (res) {
          that.ReportingInfoData = res.data
          $('.report').append(res.data.reportInfo);
          that.$common.commitParam(that, "/supervise/attachment/list.api", { "businessId": res.data.id, 'type': 4 }, {
            success: function (res) {
              that.reportAttachments = res.data;
            }
          }, "get");
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

          that.getUpload();
          //接口返回的标签与事件，该方法写在后端接口返回的数据中，不在前端代码中
          $(".approval-content > ._showbutton").click();

          var div1 = '<span class="submit-opinion1 submitOk" data-type="1" style="margin-left: .1rem">提交</span>';
          $('#remark .col-xs-10 p textarea').after(div1);
          $('#remark .col-xs-10 p .submit-opinion').remove();

          $(".submit-opinion1").on("click", function () {
            var type = $(this).data("type");
            var operation = $("input[name = 'operation']:checked")
              .val();
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
      console.log();
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
            }
          }, "get");
      })
    },

    confirmUpload() {
      this.$refs.doUpload.line2upload();
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
.reportApproval {
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
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    border: solid #cccccc;
    border-width: 1px 1px 1px 1px;
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
  // .main-table td {
  //   border: solid #cccccc;
  //   border-width: 0px 1px 1px 0px;
  // }
  .main-table > tbody > tr > td > table > tbody td {
    border: solid #cccccc;
    border-width: 0px 1px 1px 0px;
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
    width: 100%;
    // height: 100px;
    line-height: 26px;
    color: #666666;
    font-family: "微软雅黑";
    overflow: hidden;
  }
  .report {
    overflow-y: auto;
    border: none;
    display: block;
    width: 100%;
    min-height: 26px;
    max-height: 300px;
    line-height: 26px;
    color: #666666;
    font-family: "微软雅黑";
    // overflow: hidden;
  }
  .report {
    overflow-y: auto;
  }
  .line1 {
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
  .el-table__empty-block {
    height: 0.33rem;
    min-height: 0.33rem;
  }
  .messageBox {
    width: 100%;
    border: 1px solid #EFEFEF;
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
      width: 100%;
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
        margin-left: .28rem;
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
