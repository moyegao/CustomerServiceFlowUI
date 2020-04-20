<template>
  <div class="pending">
    <div class="searchBox">
      <!-- 待我审的 -->
      <!-- <el-radio v-model="radio" label="1" style="margin-left:20px;">待审批</el-radio>
      <el-radio v-model="radio" label="2" style="margin-right:20px;">已审批</el-radio> -->
      <div class="my-input1" style="width:20%;">
        <span style="width:90px;">督办名称：</span>
        <el-input placeholder="请输入内容" v-model="input" @blur="againReassignment" size="mini" clearable style="width:60%;" @keyup.enter.native="search">
        </el-input>
      </div>
      <el-button type="primary" size="mini" @click="search" class="topbtn" icon="el-icon-search"></el-button>
    </div>
    <div class="tableBox" id="tableBox" style="margin-top:15px;">
      <el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="tableData" style="width: 100%; heihgt:92%;">
        <el-table-column type="index" :index="meterIndexMethod" label="NO." width="55">
        </el-table-column>
        <el-table-column prop="processName" label="流程名称">
        </el-table-column>
        <el-table-column prop="title" label="督办名称" show-overflow-tooltip width="280">
          <template slot-scope="scope">
            <router-link to="" @click.native="dialog(scope.row)" style="display:inline=block;"><span style="color: #056dae;font-size:0.16rem;font-weight:bolder">{{scope.row.title}}</span></router-link>
          </template>
        </el-table-column>
        <el-table-column prop="taskName" label="节点名称">
        </el-table-column>
        <el-table-column prop="startTime" label="任务处理时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="startUser" label="任务发起人" show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column prop="" label="处理人" show-overflow-tooltip>
          <span style="font-size: 1rem">{{username}}</span>
        </el-table-column> -->
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="mini">查看流程图</el-button>
            <el-button @click="Approval(scope.row)" type="text" size="mini">审批</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top:10px;">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[20,50, 100, 200]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="sum">
        </el-pagination>
      </div>
      <div>
        <el-dialog class="svgdia_box" :close-on-click-modal="false" :visible.sync="addContent" title="审批流程图">
          <div class="svgmap"></div>
          <span slot="footer" class="dialog-footer">
            <div class="sub" style="text-align:center;">
              <el-button type="primary" @click="addContent = false" style="margin:5px;font-size:0.16rem;width:0.8rem;height: 0.4rem;" size="mini">关闭</el-button>
            </div>
          </span>
        </el-dialog>
      </div>
    </div>
    <span class="dialogBox">
      <el-dialog :close-on-click-modal="false" :visible.sync="alltaskinfoShow" title="任务详情">
        <alltaskinfo v-if="alltaskinfoShow" :alltaskinfoId='alltaskinfoId'></alltaskinfo>
        <!-- <span slot="footer" class="dialog-footer">
          <div class="sub" style="text-align:center;">
            <el-button type="primary" @click="alltaskinfoShow = false" size="mini">返回</el-button>
          </div>
        </span> -->
      </el-dialog>
    </span>
    <span class="dialogBox2">
      <el-dialog :close-on-click-modal="false" :visible.sync="approvalShow" title="审批">
        <approval :approvalNeedData="approvalNeedData" v-if="approvalShow"></approval>
        <span slot="footer" class="dialog-footer">
          <div class="sub" style="text-align:center;">
            <el-button type="primary" @click="approvalShow = false" style="margin:5px;font-size:0.16rem;" size="mini">关闭</el-button>
          </div>
        </span>
      </el-dialog>
    </span>
    <span class="dialogBox2">
      <el-dialog :close-on-click-modal="false" :visible.sync="reportApprovalShow" title="汇报审批">
        <reportApproval :reportApprovalNeedData="reportApprovalNeedData" v-if="reportApprovalShow"></reportApproval>
        <span slot="footer" class="dialog-footer">
          <div class="sub" style="text-align:center;">
            <el-button type="primary" @click="reportApprovalShow = false" style="margin:5px;font-size:0.16rem;" size="mini">关闭</el-button>
          </div>
        </span>
      </el-dialog>
    </span>
    <span class="dialogBox3">
      <el-dialog :close-on-click-modal="false" :visible.sync="taskConfirmShow" title="任务确认">
        <taskConfirm ref="taskConfirm" :taskConfirmNeedData="taskConfirmNeedData" v-if="taskConfirmShow"></taskConfirm>
        <span slot="footer" class="dialog-footer">
          <div class="sub" style="text-align:center;">
            <el-button type="primary" @click="taskConfirmDoConfirm" style="margin:5px;font-size:0.16rem;width:0.8rem;height: 0.4rem;background:#297ACC;color:white" size="mini">确定</el-button>
            <el-button type="primary" @click="taskConfirmShowUpload" style="margin:5px;font-size:0.16rem;width:1.2rem;height: 0.4rem;background:#297ACC;color:white" size="mini">上传附件</el-button>
            <el-button type="primary" @click="taskConfirmShow = false" style="margin:5px;font-size:0.16rem;width:0.8rem;height: 0.4rem;" size="mini">关闭</el-button>
          </div>
        </span>
      </el-dialog>
    </span>
    <span class="taskReportBox">
      <el-dialog :close-on-click-modal="false" :visible.sync="taskReportShow" title="任务汇报">
        <taskreport v-if="taskReportShow" :taskReportNeedData='taskReportNeedData'></taskreport>
        <!-- <span slot="footer" class="dialog-footer">
        <div class="sub" style="text-align:center;">
          <el-button type="primary" @click="alltaskinfoShow = false" size="mini">返回</el-button>
        </div>
      </span> -->
      </el-dialog>
    </span>
    <span class="taskChangeBox">
      <el-dialog :close-on-click-modal="false" :visible.sync="taskChangeShow" title="任务变更">
        <taskChange ref="taskChange" v-if="taskChangeShow" :taskChangeNeedData='taskChangeNeedData'></taskChange>
        <span slot="footer" class="dialog-footer">
          <div class="sub" style="text-align:center;">
            <el-button type="primary" @click="taskChangeShowUpload" style="margin:5px;font-size:0.18rem;width:1.0rem;height: 0.4rem;background:#297ACC;color:white" size="mini">上传附件</el-button>
            <el-button type="primary" @click="taskChangeDoSave" style="margin:5px;font-size:0.18rem;width:0.8rem;height: 0.4rem;background:#297ACC;color:white" size="mini">提交</el-button>
            <el-button type="primary" @click="taskChangeShow = false" style="margin:5px;font-size:0.18rem;width:0.8rem;height: 0.4rem" size="mini">关闭</el-button>
          </div>
        </span>
      </el-dialog>
    </span>
    <span class="taskJieXiangBox">
      <el-dialog :close-on-click-modal="false" :visible.sync="taskJieXiangShow" title="办结申请">
        <taskJieXiang ref="taskJieXiang" v-if="taskJieXiangShow" :taskJieXiangNeedData='taskJieXiangNeedData'></taskJieXiang>
        <span slot="footer" class="dialog-footer">
          <div class="sub" style="text-align:center;">
            <el-button type="primary" @click="taskJieXiangShowUpload" style="margin:5px;font-size:0.18rem;width:1.0rem;height: 0.4rem;background:#297ACC;color:white" size="mini">上传附件</el-button>
            <el-button type="primary" @click="taskJieXiangDoSave" style="margin:5px;font-size:0.18rem;width:0.8rem;height: 0.4rem;background:#297ACC;color:white" size="mini">提交</el-button>
            <el-button type="primary" @click="taskJieXiangShow = false" style="margin:5px;font-size:0.18rem;width:0.8rem;height: 0.4rem" size="mini">关闭</el-button>
          </div>
        </span>
      </el-dialog>
    </span>
  </div>
</template>
<script>
import alltaskinfo from '../alltaskinfo'
import approval from '../approval'
import taskConfirm from '../taskConfirm'
import reportApproval from '../reportApproval';
import taskreport from '../taskreport'
import taskChange from '../taskChange'
import taskJieXiang from '../taskJieXiang'
export default {
  components: {
    alltaskinfo,
    approval,
    taskConfirm,
    reportApproval,
    taskreport,
    taskChange,
    taskJieXiang,
  },
  data() {
    return {
      loading: true,
      value: [],
      input: '',
      tableData: [],
      sum: 0,
      pageCount: 20,
      page: 1,
      addContent: false,
      radio: '1',
      url: 'todoApproval',
      username: '',
      alltaskinfoShow: false,
      alltaskinfoId: '',

      approvalShow: false,
      approvalNeedData: {},

      taskConfirmShow: false,
      taskConfirmNeedData: {},

      reportApprovalShow: false,
      reportApprovalNeedData: {},

      taskReportShow: false,
      taskReportNeedData: {},

      taskChangeShow: false,
      taskChangeNeedData: {},

      taskJieXiangShow: false,
      taskJieXiangNeedData: {},
    }
  },
  watch: {
    radio: function () {
      this.updated()
    }
  },
  mounted() {
    this.loadData();
    this.userinfo();
    eventBus.$on('approvalClose', (params) => {
      this.loadData();
      this.approvalShow = false;
      this.reportApprovalShow = false;
    });
    eventBus.$on('confirmClose', (params) => {
      this.loadData();
      this.taskConfirmShow = false;
    });
    // taskreport的返回按钮
    eventBus.$on('taskReportClose', (params) => {
      this.loadData();
      this.taskReportShow = false;
    });
    // taskChange的返回按钮
    eventBus.$on('taskChangeClose', (params) => {
      this.loadData();
      this.taskChangeShow = false;
    });
    // taskJieXiang的返回按钮
    eventBus.$on('taskJieXiangClose', (params) => {
      this.loadData();
      this.taskJieXiangShow = false;
    });
  },
  methods: {
    // 解决ie9的输入框bug
    againReassignment(item) {
      this.input = item.target.value
    },
    // 获取用户信息
    userinfo() {
      var that = this;
      this.$common.commitParam(this, "/supervise/sys/userinfo.api", {}, {
        success: function (res) {
          that.username = res.data.name;
        }
      }, "get");
    },
    // radius发生变化触发事件
    updated() {
      var that = this;
      that.loadData()
    },
    loadData() {
      var that = this;
      that.loading = true;
      var params = { page: that.page - 1, pageCount: that.pageCount };
      // 
      // if (that.value.length !== 0) {
      //   params.beginDate = that.value[0];
      //   params.endDate = that.value[1];
      // };
      if (that.input !== '') {
        params.title = that.input;
      }
      that.tableData = [];
      this.$common.commitParam(this, "/supervise/workflow/todoapproval.api", params, {
        success: function (res) {
          if (res.code == 0) {
            that.tableData = res.data;
            that.sum = that.tableData.length;
            that.loading = false
          } else {
            that.$message({
              message: res.description,
              type: 'warning'
            });
          }
        }
      }, "get");
    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod(index) {
      return (this.page - 1) * this.pageCount + (index + 1);
    },
    // 分页功能-获取每页条数
    handleSizeChange(val) {
      this.pageCount = val;
      this.loadData();
    },
    // 分页功能-获取当前页
    handleCurrentChange(val) {
      this.page = val;
      this.loadData();
    },
    // 查询
    search() {
      // this.loadData();
      var that = this;
      that.loading = true;
      that.page = 1;
      var params = { page: that.page - 1, pageCount: that.pageCount };
      if (that.input !== '') {
        params.title = that.input;
      }
      that.tableData = [];
      this.$common.commitParam(this, "/supervise/workflow/todoapproval.api", params, {
        success: function (res) {
          if (res.code == 0) {
            that.tableData = res.data;
            that.sum = that.tableData.length;
            that.loading = false
          } else {
            that.$message({
              message: res.description,
              type: 'warning'
            });
          }
        }
      }, "get");
    },
    // 点击事件出发弹窗
    dialog(row) {

      // var that = this;
      this.alltaskinfoShow = true;
      this.alltaskinfoId = row.id;
      // window.open('#/alltaskinfo?id=' + row.id, '任务审批', 'height=' + that.windowScreenHeight + ',innerHeight=' + that.windowScreenHeight + ', width=' + that.windowScreenWidth + ',innerWidth=' + that.windowScreenWidth + ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizeable=no,location=no,status=no')
    },
    // 点击查看流程图
    handleClick(row) {
      // var that = this;
      // var id = row.id;
      // var formId = row.formId;
      // var processKey = row.processKey;
      // this.$common.commitParam(this, "/supervise/workflow/workflowsvg.api", { "id": id, "formId": formId, "processKey": processKey }, {
      //   success: function (res) {
      //     that.addContent = true;
      //     // 
      //     that.$nextTick(() => {
      //       $('.svgmap').html(res.data.data);
      //     });

      //   }
      // }, "get");


      // getapprovalInfo() {
      var that = this;
      var taskId = row.taskId;

      var processKey = row.processKey;
      this.$common.commitParam(this, "/supervise/workflow/approvalinfo.api", { "taskId": taskId, 'processKey': processKey }, {
        success: function (res) {
          that.addContent = true;
          setTimeout(() => {
            $('.svgmap').html(res.data);
            $(".approval-content > ._showbutton").click();
            $('._showbutton').remove();
            for (let i = 0; i < 4; i++) {
              $('.approval-list').find('.row').eq(i).remove();
              
            }
            $('.approval-table').remove();
            $('.reject-box').remove();
            $('.communication-box').remove();
            $('.approval-list').find('div').eq(0).remove();
            $('.approval-list').find('[class=row]').remove();
            $('.approval-list').find('form').remove();
            $('.footerBtn').remove();
            $("#workflowsvg").click();
            $(".flow-Chart").remove();
          }, 0);



        }
      }, "get");
      // },
    },
    //审批按钮
    Approval(row) {
      var that = this
      this.$common.commitParam(this, "/supervise/workflow/form.api", { "taskId": row.taskId, "processKey": row.processKey }, {
        success: function (res) {
          var url;
          // alert(res.data)
          if (res.data == 'changeApproval') {
            that.approvalNeedData.id = row.id;
            that.approvalNeedData.taskId = row.taskId;
            that.approvalNeedData.processId = row.processId;
            that.approvalNeedData.processKey = row.processKey;
            that.approvalNeedData.formId = row.formId;
            that.approvalNeedData.taskName = row.taskName;
            that.approvalShow = true;
            // eventBus.$emit('taskChangeInformation', true);
            that.approvalNeedData.taskChangeMessage = true
            // url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
          } else if (res.data == 'approval') {
            that.approvalNeedData.id = row.id;
            that.approvalNeedData.taskId = row.taskId;
            that.approvalNeedData.processId = row.processId;
            that.approvalNeedData.processKey = row.processKey;
            that.approvalNeedData.formId = row.formId;
            that.approvalNeedData.taskName = row.taskName;
            that.approvalShow = true;
            // url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
          } else if (res.data == 'reportApproval') {
            that.reportApprovalNeedData.id = row.id;
            that.reportApprovalNeedData.taskId = row.taskId;
            that.reportApprovalNeedData.processId = row.processId;
            that.reportApprovalNeedData.processKey = row.processKey;
            that.reportApprovalNeedData.formId = row.formId;
            that.reportApprovalNeedData.taskName = row.taskName;
            that.reportApprovalNeedData.ProcessHandlingShow = true;
            that.reportApprovalShow = true;
            // url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
          } else if (res.data == 'taskConfirm') {
            that.taskConfirmNeedData.id = row.id;
            that.taskConfirmNeedData.taskId = row.taskId;
            that.taskConfirmNeedData.processId = row.processId;
            that.taskConfirmNeedData.processKey = row.processKey;
            that.taskConfirmNeedData.formId = row.formId;
            that.taskConfirmShow = true;
            // url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
          } else if (res.data == 'taskReport') {
            that.taskReportNeedData.id = row.id;
            that.taskReportNeedData.taskId = row.taskId;
            that.taskReportNeedData.processId = row.processId;
            that.taskReportNeedData.processKey = row.processKey;
            that.taskReportNeedData.formId = row.formId;
            that.taskReportNeedData.supervisionTaskId = row.id
            that.taskReportShow = true;
            // url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
          } else if (res.data == 'taskChange') {
            that.taskChangeNeedData.id = row.id;
            that.taskChangeNeedData.taskId = row.taskId;
            that.taskChangeNeedData.processId = row.processId;
            that.taskChangeNeedData.processKey = row.processKey;
            that.taskChangeNeedData.formId = row.formId;
            that.taskChangeNeedData.supervisionTaskId = row.id
            that.taskChangeShow = true;
            // url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
          } else if (res.data == 'taskJieXiang') {
            that.taskJieXiangNeedData.id = row.id;
            that.taskJieXiangNeedData.taskId = row.taskId;
            that.taskJieXiangNeedData.processId = row.processId;
            that.taskJieXiangNeedData.processKey = row.processKey;
            that.taskJieXiangNeedData.formId = row.formId;
            that.taskJieXiangNeedData.supervisionTaskId = row.id
            that.taskJieXiangShow = true;
            // url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
          } else {
            url = '#/' + res.data + '?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
            that.openWindow(url, '任务审批', that.windowScreenWidth, that.windowScreenHeight);
          }


          // if (res.data == 'approval') {
          //   url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
          // } else {
          //   url = '#/' + res.data + '?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
          // }
          // that.openWindow(url, '任务审批', that.windowScreenWidth, that.windowScreenHeight);
        }
      }, "get");
    },
    openWindow(url, name, iWidth, iHeight) {
      window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ', width=' + iWidth + ',innerWidth=' + iWidth + ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizeable=no,location=no,status=no');
    },
    // 调用taskConfirm页面的doConfirm(确定)方法
    taskConfirmDoConfirm() {
      var that = this;
      this.$refs.taskConfirm.doConfirm();
    },
    // 调用taskConfirm页面的showUpload(上传附件)方法
    taskConfirmShowUpload() {
      this.$refs.taskConfirm.showUpload();
    },
    // 任务变更上传附件方法
    taskChangeShowUpload() {
      this.$refs.taskChange.showUpload();
    },
    // 任务变更提交方法
    taskChangeDoSave() {
      this.$refs.taskChange.doSave();
    },
    // 办结申请上传附件方法
    taskJieXiangShowUpload() {
      this.$refs.taskJieXiang.showUpload();
    },
    // 办结申请提交方法
    taskJieXiangDoSave() {
      this.$refs.taskJieXiang.doSave();
    },
  }
}
</script>

<style lang="scss">
.pending {
  height: 100%;
  span {
    font-size: 0.16rem;
  }
  .is-leaf {
    font-size: 18px;
  }
  .tableBox {
    height: calc(100% - 90px);
    padding: 0 10px;
    .el-table {
      height: 100%;
    }
  }
  .my-input1 {
    margin-left: 1%;
    display: inline-block;
    // float: right;
    .el-input__inner {
      // width: 1.8rem;
      height: 0.3rem;
    }
  }
  .el-dialog {
    margin: 0 auto;
    height: 80%;
    width: 80%;
    .el-dialog__header {
      border-bottom: 1px solid #ebeef5;
    }
    .el-dialog__footer {
      .el-button {
        border: 1px solid #bababa;
        color: #5d5d5d;
        height: 0.38rem;
        width: 0.9rem;
      }
    }
  }
  .el-dialog__body {
    height: calc(100% - 130px);
    padding: 10px 20px;
  }
  .dialogBox > .el-dialog__wrapper > .el-dialog {
    // width: 79%;
    // margin: 0 auto;
    // height: 98%;
    width: 80% !important;
    margin: 0 auto;
    height: 6.5rem;
    margin-top: 0.38rem !important;
  }
  .dialogBox .el-dialog {
    // width: 79%;
    // margin: 0 auto;
    // height: 98%;
    width: 70% !important;
    margin: 0 auto;
    height: 6.5rem;
    margin-top: 0.38rem !important;
  }
  .dialogBox .el-dialog__header {
    border-bottom: 1px solid #ebeef5;
  }
  .dialogBox .el-dialog__body {
    padding: 0px 20px 0px 20px !important;
    // overflow-y: scroll;
    height: 5.4rem;
  }
  .dialogBox .el-dialog__footer {
    height: 0.5rem;
  }
  .dialogBox .el-dialog__footer .el-button--mini {
    background: #fff;
    border: rgb(209, 207, 207) 1px solid;
    color: black;
  }
  .dialogBox2 .el-dialog__wrapper {
    z-index: 1000 !important;
  }
  .dialogBox2 .el-dialog {
    width: 70% !important;
    margin: 0 auto;
    height: 6.5rem;
    margin-top: 0.38rem !important;
  }
  .dialogBox2 .el-dialog__header {
    border-bottom: 1px solid #ebeef5;
  }
  .dialogBox2 .el-dialog__body {
    padding: 0px 20px 0px 20px !important;
    height: 5.2rem !important;
    overflow-y: scroll !important;
  }
  .dialogBox2 .el-dialog__footer {
    height: 0.5rem;
  }
  .dialogBox2 .el-dialog__footer .el-button--mini {
    background: #fff;
    border: rgb(209, 207, 207) 1px solid;
    color: black;
  }
  .dialogBox3 .el-button--primary {
    color: #fff;
    background-color: #297acc;
    border-color: #297acc;
  }

  .dialogBox3 .el-dialog__wrapper {
    z-index: 1000 !important;
  }
  .dialogBox3 .el-dialog {
    width: 70% !important;
    margin: 0 auto;
    height: 6.5rem;
    margin-top: 0.38rem !important;
  }
  .dialogBox3 .el-dialog__header {
    border-bottom: 1px solid #ebeef5;
  }
  .dialogBox3 .el-dialog__body {
    padding: 0px 20px 0px 20px !important;
    height: 5.2rem;
    overflow-y: scroll !important;
  }
  .dialogBox3 .el-dialog__footer {
    height: 0.5rem;
  }
  .dialogBox3 .el-dialog__footer .el-button--mini {
    background: #fff;
    border: rgb(209, 207, 207) 1px solid;
    color: black;
  }
  .taskChangeBox .el-dialog__body {
    height: 77%;
  }
  .taskChangeBox .el-dialog__footer .el-button--mini {
    background: #fff;
    border: rgb(209, 207, 207) 1px solid;
    color: black;
  }
  .taskJieXiangBox .el-dialog__body {
    height: 77%;
  }
  .taskJieXiangBox .el-dialog__footer .el-button--mini {
    background: #fff;
    border: rgb(209, 207, 207) 1px solid;
    color: black;
  }
  .svgmap {
    height: 100%;
    overflow-y: scroll;
  }
  .svgdia_box {
    .el-dialog {
      margin-top: 5% !important;
    }
    .el-dialog__body {
      height: 75%;
    }
  }
  .text1 {
    display: inline-block;
    width: 60px;
  }
  a:hover {
    color: #00a4ac;
  }
  .el-radio__label {
    font-size: 12px;
  }
  .topbtn {
    // float: right;
    // margin-right: 90px;
    color: white !important;
    background: #faa646 !important;
    border-color: #faa646 !important;
    height: 0.3rem;
  }
  .el-button--mini {
    font-size: 16px;
  }
  .el-button--primary {
    color: #409eff;
    background-color: white;
    border-color: white;
  }
  td {
    padding: 0px 0px;
  }
  .tableBox > .el-table .cell {
    height: 0.34rem !important;
    line-height: 0.34rem !important;
  }
  .el-table th {
    padding: 0 !important;
    background: #fafafa;
    div {
      color: #333;
    }
  }
  .el-table td,
  .el-table th {
    padding: 0 0 !important;
  }
  // .el-table__body {
  //   tr {
  //     td:nth-child(3) {
  //       div {
  //         text-align: left;
  //         overflow: hidden;
  //         text-overflow: ellipsis;
  //         white-space: nowrap;
  //       }
  //     }
  //   }
  // }
  .el-table th,
  .el-table tr {
    // height: 0.5rem;
  }
  #tableBox > .el-table .el-table__body {
    tr {
      td:nth-child(3) {
        div {
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #056dae;
          cursor: pointer;
        }
      }
    }
  }
  .svgmap {
    .container {
      .approval-content {
        .approval-list {
          height: 100%;
          padding-bottom: 0px;
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
        .approval-pic {
          height: 100%;
        }
      }
    }
    .container {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
<style lang='css'>
@import "../../assets/approval/css/editform.css";
@import "../../assets/approval/css/fontello.css";
@import "../../assets/approval/css/appvoralCSS.css";
@import "../../../static/addone/artdialog/ui-dialog.css";
@import "../../../static/addone/staffselector/selector.css";
@import "../../../static/addone/tree/mytree.css";
@import "../../../static/addone/staffselector/selector.css";
</style>