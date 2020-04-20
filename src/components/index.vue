<template>
  <div class="index clear">
    <div class="leftbox">
      <div class="head">
        <!-- <div class="dubanyear">{{nowYear}}督办任务</div> -->
        <ul class="headlist clear">
          <li>
            <router-link :to="indexUrl" @click.native="btntaskCount()">
              <img src="../../static/imgs/index/任务.png" style="margin-top:5%">
              <span class="num_box">
                <span class="da_txt1">{{taskCount}}</span>
                <span class="left_icon">
                  任务总数
                </span>
              </span>
            </router-link>
          </li>
          <li style="margin-left: 0.5%;">
            <router-link :to="indexUrl" @click.native="btnongoingCount()">
              <img src="../../static/imgs/index/进行.png" style="margin-top:5%">
              <span class="num_box">
                <span class="left_icon">
                  进行中
                </span>
                <span class="da_txt2">{{ongoingCount}}</span>
              </span>
            </router-link>
          </li>
          <li style="margin-left: 0.5%;">
            <router-link :to="indexUrl" @click.native="btncompleteCount()">
              <img src="../../static/imgs/index/办结.png" style="margin-top:6%">
              <span class="num_box">
                <span class="left_icon">
                  今年办结
                  <!-- 已办结 ({{closingRate}}%) -->
                </span>
                <span class="da_txt3">{{completeCount}}</span>
              </span>
            </router-link>
          </li>
          <!-- <li>
              <router-link to="" @click.native="btnmyAttentionCount">
              <span class="left_icon"><img src="../../static/imgs/index/l_4.png"><br>
								我的关注
                </span>
                <span class="da_txt4">{{myAttentionCount}}</span>
              </router-link>
         </li> -->
        </ul>
        <!-- <div class="tabHeaderNoShow">
          <el-dialog :close-on-click-modal="false" :visible.sync="addContent">
            <alltask :supervisionTaskType="urlData.type"></alltask>
          </el-dialog>
        </div> -->
        <!-- <div class="tabHeaderNoShow">
          <el-dialog :close-on-click-modal="false" :visible.sync="addContent3">
            <alltask :parentMessage="1" :supervisionTaskType="urlData.type"></alltask>
          </el-dialog>
        </div> -->

        <!-- <div class="tabHeaderNoShow">
          <el-dialog :close-on-click-modal="false" :visible.sync="addContent4">
            <alltask :parentMessage="3" :supervisionTaskType="urlData.type"></alltask>
          </el-dialog>
        </div> -->

        <!-- <el-dialog :close-on-click-modal="false" :visible.sync="addContent1">
          <myfocus :supervisionTaskType="urlData.type"></myfocus>
        </el-dialog> -->

      </div>
      <div class="body">

        <div class="listTable">
          <template v-if="portalId == '1'">
            <el-tabs v-model="activeName" type="border-card" class="table1 listTable_1">
              <el-tab-pane label="主办部门" name="first" style="height:100%;">
                <template>
                  <el-table @cell-click="orDepartment" stripe :data="deptNumberSummaryData" height="100%" style="width: 100%; overflow:hidden;overflow-y:hidden" :row-style="tableRowStyle">
                    <el-table-column type="index" label="NO." width="55"></el-table-column>
                    <el-table-column prop="deptName" label="部门" show-overflow-tooltip width="250"></el-table-column>
                    <el-table-column prop="taskCount" label="任务总数"></el-table-column>
                    <el-table-column prop="ongoingCount" label="进行中"> </el-table-column>
                    <el-table-column prop="scheduleCount" label="今年办结"></el-table-column>
                    <el-table-column prop="overdueCount" label="逾期办结">
                      <template slot-scope="scope">
                        <span style="color:red" v-if="scope.row.overdueCount > 0">{{scope.row.overdueCount}}</span>
                        <span v-else>{{scope.row.overdueCount}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-tab-pane>
              <el-tab-pane label="分管领导" name="second" style="height:100%;">
                <template>
                  <el-table class="listTable_1" @cell-click="chargeLeadership" stripe :data="leaderNumberSummaryData" height="91.6%" style="width: 100%;overflow:hidden;overflow-y:hidden" :row-style="tableRowStyle">
                    <el-table-column type="index" label="NO." width="55"></el-table-column>
                    <el-table-column prop="leader" label="分管领导" show-overflow-tooltip width="120"> </el-table-column>
                    <el-table-column prop="taskCount" label="任务总数"></el-table-column>
                    <el-table-column prop="ongoingCount" label="进行中"> </el-table-column>
                    <el-table-column prop="scheduleCount" label="今年办结"></el-table-column>
                    <el-table-column prop="overdueCount" label="逾期办结">
                      <template slot-scope="scope">
                        <span style="color:red" v-if="scope.row.overdueCount > 0">{{scope.row.overdueCount}}</span>
                        <span v-else>{{scope.row.overdueCount}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-tab-pane>
            </el-tabs>
          </template>
          <template v-if="portalId == '2'">
            <el-tabs v-model="activeName" type="border-card" class="table1 click1">
              <el-tab-pane label="部门汇总" name="first" style="height:100%;">
                <template>
                  <el-table stripe @cell-click="handleClick" class="change" :data="deptListSummaryData" height="100%" style="width: 100%;overflow:hidden;overflow-y:hidden">
                    <el-table-column type="index" label="NO." width="55"></el-table-column>
                    <el-table-column prop="taskName" label="任务名称" width="400" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="responsibleDeptNames" width="120" label="责任部门" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="endDate" label="计划结束" width="120"> </el-table-column>
                    <el-table-column prop="leaderUserNames" label="分管领导" width="120"> </el-table-column>
                    <el-table-column prop="progressRadio" width="120" label="当前进度"> </el-table-column>
                    <el-table-column prop="reportInfo" label="最新月报" show-overflow-tooltip>
                    </el-table-column>
                  </el-table>
                </template>
              </el-tab-pane>
              <el-tab-pane label="我的任务" name="second" style="height:100%;">
                <template>
                  <el-table stripe @cell-click="handleClick" height="91.6%" :data="myTaskData" style="width: 100%;overflow:hidden;overflow-y:hidden">
                    <el-table-column type="index" label="NO." width="55"></el-table-column>
                    <el-table-column prop="taskName" label="任务名称" show-overflow-tooltip width="400">
                    </el-table-column>
                    <el-table-column prop="responsibleUserNames" label="责任人" width="120" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="endDate" label="计划结束" width="120"> </el-table-column>
                    <el-table-column prop="leaderUserNames" label="分管领导" width="120"> </el-table-column>
                    <el-table-column prop="progressRadio" width="120" label="当前进度"> </el-table-column>
                    <el-table-column prop="reportInfo" label="最新月报" show-overflow-tooltip>
                    </el-table-column>
                  </el-table>
                </template>
              </el-tab-pane>
            </el-tabs>
          </template>
        </div>
      </div>
    </div>
    <div class="rightbox">

      <!-- stretch="true"标签宽度撑开 -->
      <el-tabs type="border-card" style="height:99%;" :stretch="true">
        <el-tab-pane style="padding-bottom: 20px;">
          <span slot="label">
            <span>{{reportTitle}}</span>
            <el-badge :value="approvalCount" v-if="approvalCount > 0" size="mini" class="item"></el-badge>
          </span>
          <a href="javascript:void(0);" :key="index" @click.prevent="tonewpage1(tmp)" class="approvalOpen reportTitle" v-for="(tmp,index) in approval">{{tmp.title == ""?"":index+1+"、"}}{{tmp.title}}</a>
        </el-tab-pane>
        <el-tab-pane style="padding-bottom: 20px;">
          <span slot="label">
            <span>待阅</span>
            <el-badge :value="readCount" v-if="readCount > 0" size="mini" class="item"></el-badge>
          </span>
          <a href="javascript:void(0);" :key="index" @click.prevent="goRead(tmp)" class="approvalOpen reportTitle" v-for="(tmp,index) in readTabData">{{tmp.title == ""?"":index+1+"、"}}{{tmp.title}}</a>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <span>{{communicateTitle}}</span>
            <el-badge :value="communicateCount" v-if="communicateCount > 0" size="mini" class="item"></el-badge>
          </span>
          <a href="javascript:void(0);" :key="index" @click.prevent="tonewpage(tmp,'communicate')" class="approvalOpen reportTitle" v-for="(tmp,index) in communicate">{{tmp.title==""?"":index+1+"、"}}{{tmp.title}}</a>
        </el-tab-pane>
      </el-tabs>

      <span class="dialogBox">
        <el-dialog :close-on-click-modal="false" :visible.sync="alltaskinfoShow" title="任务详情">
          <alltaskinfo v-if="alltaskinfoShow" :alltaskinfoId='alltaskinfoId'></alltaskinfo>
        </el-dialog>
      </span>
      <span class="dialogBox2">
        <el-dialog :close-on-click-modal="false" :visible.sync="approvalShow" title="审批">
          <approval :approvalNeedData="approvalNeedData" v-if="approvalShow"></approval>
          <span slot="footer" class="dialog-footer">
            <div class="sub" style="text-align:center;">
              <el-button type="primary" @click="approvalShow = false" style="margin:5px;font-size:0.16rem;width:0.8rem;height: 0.4rem;" size="mini">返回</el-button>
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
              <el-button type="primary" @click="taskConfirmShow = false" style="margin:5px;font-size:0.16rem;width:0.8rem;height: 0.4rem;" size="mini">返回</el-button>
            </div>
          </span>
        </el-dialog>
      </span>
      <span class="dialogBox4">
        <el-dialog :close-on-click-modal="false" @close='reportApprovalClose' :visible.sync="reportApprovalShow" title="汇报审批">
          <reportApproval ref="reportApproval" :reportApprovalNeedData="reportApprovalNeedData" v-if="reportApprovalShow"></reportApproval>

          <span slot="footer" class="dialog-footer">
            <div class="sub" style="text-align:center;">
              <el-button type="primary" @click="reportApprovalClose" style="margin:5px;font-size:0.16rem;width:0.8rem;height: 0.4rem;" size="mini">返回</el-button>
            </div>
          </span>
        </el-dialog>
      </span>
      <span class="taskReportBox">
        <el-dialog :close-on-click-modal="false" :visible.sync="taskReportShow" title="任务汇报">
          <taskreport v-if="taskReportShow" :taskReportNeedData='taskReportNeedData'></taskreport>
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

  </div>
</template>
<script>
import alltask from './taskmanager/alltask'
import myfocus from './taskmanager/myfocus'
import taskConfirm from './taskConfirm'
import alltaskinfo from './alltaskinfo'
import approval from './approval'
import reportApproval from './reportApproval'
import taskreport from './taskreport'
import taskChange from './taskChange'
import taskJieXiang from './taskJieXiang'
export default {
  components: {
    alltask,
    myfocus,
    taskConfirm,
    alltaskinfo,
    approval,
    reportApproval,
    taskreport,
    taskChange,
    taskJieXiang,
  },
  data() {
    return {
      urlType: "",
      urlData: {
        type: 'GS'
      },
      showType: false,
      portalId: '',
      addContent5: false,
      addContent3: false,
      addContent4: false,
      addContent1: false,
      parentMessage1: -1,
      parentMessage2: -1,
      addContent: false,
      activeName: 'first',
      formUrl: '',
      deptNumberSummaryData: [],
      leaderNumberSummaryData: [],
      myAttentionData: [],
      deptListSummaryData: [],
      myTaskData: [],
      taskCount: '',
      ongoingCount: '',
      completeCount: '',
      myAttentionCount: '',
      data: [],
      approvalTitle: '',
      reportTitle: '',
      communicateTitle: '',
      approval: [],
      report: [],
      communicate: [],
      // finishedCount: '',
      // overdueCount: '',
      // unfinishedCount: '',
      // unoverdueCount: '',
      windowScreenHeight: window.screen.height - 90,
      windowScreenWidth: window.screen.width,
      // 办结率
      closingRate: '',

      alltaskinfoShow: false,
      alltaskinfoId: '',

      approvalShow: false,
      approvalNeedData: {
        uploadHidden: ''
      },

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

      toBeReadShow: false,
      toBeReadNeedData: {},

      indexUrl: '',
      nowYear: '',
      addContentType: "",
      addContentDeptId: "",
      approvalCount: 0,
      readCount: 0,
      readTabData: [],
      communicateCount: 0,
    }
  },
  created() {


    let that = this;
    that.load();
    this.getCommunicate()
    eventBus.$on('setMsg', (params) => {
      that.getApproval();
      that.getTaskCount();
      eventBus.$emit('getOngoingNumRefresh', true);
    })
    eventBus.$on('customEvent', target => {
      that.load();
    });


  },
  mounted() {
    var that = this;
    // taskConfirm页面确定成功之后刷新待办列表和关闭任务界面
    eventBus.$on('confirmClose', (params) => {
      that.getApproval();
      that.getTaskCount();
      that.getCommunicate();
      eventBus.$emit('getOngoingNumRefresh', true);
      setTimeout(() => {
        that.taskConfirmShow = false;
      }, 2000);
    });
    // taskreport的返回按钮
    eventBus.$on('taskReportClose', (params) => {
      // that.getApproval();
      that.taskReportShow = false;
    });
    // approval的返回按钮
    eventBus.$on('approvalClose', (params) => {
      that.getApproval();
      that.getTaskCount();
      that.getCommunicate();
      eventBus.$emit('getOngoingNumRefresh', true);
      that.approvalShow = false;
      that.reportApprovalShow = false;

    });
    eventBus.$on('ongongRefresh', (params) => {
      that.getApproval();
      that.getTaskCount();
      that.getCommunicate();
      eventBus.$emit('getOngoingNumRefresh', true);

    });
    // taskChange的返回按钮
    eventBus.$on('taskChangeClose', (params) => {
      that.getApproval();
      that.getTaskCount();
      that.getCommunicate();
      eventBus.$emit('getOngoingNumRefresh', true);
      that.taskChangeShow = false;
    });
    // taskJieXiang的返回按钮
    eventBus.$on('taskJieXiangClose', (params) => {
      that.getApproval();
      that.getTaskCount();
      that.getCommunicate();
      eventBus.$emit('getOngoingNumRefresh', true);
      that.taskJieXiangShow = false;
    });
    // 刷新待阅列表
    eventBus.$on('toBeReadRefersh', (value) => {
      this.getApproval()
    })
    if (window.location.href.indexOf('index') > 0) {
      let num = window.location.href.indexOf('=')
      this.indexUrl = 'index?type=' + window.location.href.substr(num + 1);
    }
    let year = new Date();
    that.nowYear = year.getFullYear();
  },
  methods: {
    // 主办部门总条数点击跳转事件
    showAlltask(row) {
    },
    reportApprovalClose(){
      this.reportApprovalShow = false
    },
    orDepartment(row, column, cell, event) {
      // console.log(row);
      this.urlType = "Dept";
      if (column.label === '任务总数') {
        if (row.taskCount == 0) {
          return
        } else {
          this.addContent5 = true;
          this.showType = true;
          this.addContentType = 'taskCount';
          this.addContentDeptId = row.id;
          eventBus.$emit('mainAllTaskNeedData', this.addContent5, this.urlData.type, this.urlType, this.showType, this.addContentType, this.addContentDeptId, row.deptName, column.label)
        }



      } else if (column.label === "进行中") {
        if (row.ongoingCount == 0) {
          return
        } else {
          this.addContent5 = true;
          this.showType = true;
          this.addContentType = 'ongoingCount';
          this.addContentDeptId = row.id;
          eventBus.$emit('mainAllTaskNeedData', this.addContent5, this.urlData.type, this.urlType, this.showType, this.addContentType, this.addContentDeptId, row.deptName, column.label)
        }


      } else if (column.label === "今年办结") {
        if (row.scheduleCount == 0) {
          return
        } else {
          this.addContent5 = true;
          this.showType = true;
          this.addContentType = 'scheduleCount';
          this.addContentDeptId = row.id;
          eventBus.$emit('mainAllTaskNeedData', this.addContent5, this.urlData.type, this.urlType, this.showType, this.addContentType, this.addContentDeptId, row.deptName, column.label)
        }


      } else if (column.label === "逾期办结") {
        if (row.overdueCount == 0) {
          return
        } else {
          this.addContent5 = true;
          this.showType = true;
          this.addContentType = 'overdueCount';
          this.addContentDeptId = row.id;
          eventBus.$emit('mainAllTaskNeedData', this.addContent5, this.urlData.type, this.urlType, this.showType, this.addContentType, this.addContentDeptId, row.deptName, column.label)
        }


      }
      if (this.$refs.alltask) {
        this.$refs.alltask.loadData();
      }

    },
    chargeLeadership(row, column, cell, event) {
      this.urlType = "Leader";
      if (column.label === '任务总数') {

        if (row.taskCount == 0) {
          return
        } else {
          this.addContent5 = true;
          this.showType = true;
          this.addContentType = 'taskCount';
          this.addContentDeptId = row.id;
          eventBus.$emit('mainAllTaskNeedData', this.addContent5, this.urlData.type, this.urlType, this.showType, this.addContentType, this.addContentDeptId, row.leader, column.label)
        }
      } else if (column.label === "进行中") {
        if (row.ongoingCount == 0) {
          return
        } else {
          this.addContent5 = true;
          this.showType = true;
          this.addContentType = 'ongoingCount';
          this.addContentDeptId = row.id;
          eventBus.$emit('mainAllTaskNeedData', this.addContent5, this.urlData.type, this.urlType, this.showType, this.addContentType, this.addContentDeptId, row.leader, column.label)
        }

      } else if (column.label === "今年办结") {
        if (row.scheduleCount == 0) {
          return
        } else {
          this.addContent5 = true;
          this.showType = true;
          this.addContentType = 'scheduleCount';
          this.addContentDeptId = row.id;
          eventBus.$emit('mainAllTaskNeedData', this.addContent5, this.urlData.type, this.urlType, this.showType, this.addContentType, this.addContentDeptId, row.leader, column.label)
        }

      } else if (column.label === "逾期办结") {
        if (row.overdueCount == 0) {
          return
        } else {
          this.addContent5 = true;
          this.showType = true;
          this.addContentType = 'overdueCount';
          this.addContentDeptId = row.id;
          eventBus.$emit('mainAllTaskNeedData', this.addContent5, this.urlData.type, this.urlType, this.showType, this.addContentType, this.addContentDeptId, row.leader, column.label)
        }

      }
    },
    btntaskCount() {
      localStorage.setItem('taskTypeShow', false);
      localStorage.setItem('tabHeaderName', '任务总列表');
      this.addContent = true;
      // 改变表格高度
      // setTimeout(() => {
      //   $('.tabHeaderNoShow > .el-dialog__wrapper > .el-dialog > .el-dialog__body').css('height', '91%');
      // }, 0);
      eventBus.$emit('mainAllTaskNeedData1', this.addContent, this.urlData.type, 0)
    },
    btnongoingCount() {
      localStorage.setItem('taskTypeShow', false);
      localStorage.setItem('tabHeaderName', '进行中列表');
      this.addContent3 = true;
      // 改变表格高度
      // setTimeout(() => {
      //   $('.tabHeaderNoShow > .el-dialog__wrapper > .el-dialog > .el-dialog__body').css('height', '91%');
      // }, 0);
      eventBus.$emit('mainAllTaskNeedData1', this.addContent3, this.urlData.type, 1)
    },
    btncompleteCount() {
      localStorage.setItem('taskTypeShow', false);
      localStorage.setItem('tabHeaderName', '今年办结列表');
      this.addContent4 = true;
      // 改变表格高度
      // setTimeout(() => {
      //   $('.tabHeaderNoShow > .el-dialog__wrapper > .el-dialog > .el-dialog__body').css('height', '91%');
      // }, 0);
      eventBus.$emit('mainAllTaskNeedData1', this.addContent4, this.urlData.type, 3)
    },
    btnmyAttentionCount() {
      this.addContent1 = true;
    },
    // 页面加载
    load() {
      var that = this;
      // console.log(this.$common.getQueryString('type'), this.$common.getCookie("portalId"));
      this.urlData.type = this.$common.getQueryString('type');

      // 调用获取部门数据
      this.deptNumberSummary();
      // 调用获取分管领导数据
      this.leaderNumberSummary();
      // 调用获取我的关注数据
      // this.myAttention();
      // 部门列表汇总
      this.deptListSummary();
      // 我的任务
      this.myTaskSummary();
      // 调用获取待审批数据
      this.getApproval();
      //调用获取图标数据
      this.draw();
      // 获取任务总数，进行中总数，已办结总数，我的关注总数并渲染
      this.getTaskCount();
      // 获取用户信息（解决首页表格不显示问题）
      this.userinfo();
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
    getTaskCount() {
      // this.portalId = this.$common.getCookie("portalId");
      var that = this;
      // console.log(that.urlData.type);
      this.$common.commitParam(this, "/supervise/portal/count.api", { 'supervisionTaskType': that.urlData.type }, {
        success: function (res) {
          that.taskCount = res.data.taskCount;
          that.ongoingCount = res.data.ongoingCount;
          that.completeCount = res.data.completeCount;
          that.myAttentionCount = res.data.myAttentionCount;
        }
      }, "get");
    },
    deptNumberSummary() {
      var that = this;
      this.$common.commitParam(this, "/supervise/portal/departmentNumberSummary.api", { 'supervisionTaskType': that.urlData.type }, {
        success: function (res) {
          // var arr = res.data;
          // var brr1 = [];
          // var brr2 = [];
          // for (var i = 0; i < Math.ceil(arr.length / 2); i++) {
          //   brr1[i] = arr[i];
          //   brr2[i] = arr[i + Math.ceil(arr.length / 2)];
          // }
          // for (var j = 0; j < brr1.length; j++) {
          //   if (!brr2[j]) break;
          //   brr1[j].deptName1 = brr2[j].deptName;
          //   brr1[j].taskCount1 = brr2[j].taskCount;
          //   brr1[j].scheduleCount1 = brr2[j].scheduleCount;
          //   brr1[j].overdueCount1 = brr2[j].overdueCount;
          //   brr1[j].ongoingCount1 = brr2[j].ongoingCount;
          //   brr1[j].stopCount1 = brr2[j].stopCount;
          // }
          // that.deptNumberSummaryData = brr1;
          that.deptNumberSummaryData = res.data;
        }
      }, "get");
    },
    userinfo() {
      var that = this;
      this.$common.commitParam(this, "/supervise/sys/userinfo.api", {}, {
        success: function (res) {
          localStorage.setItem('deptId', res.data.deptId);
          that.portalId = res.data.portalId;
          if (that.portalId == '2') {
            if (res.data.state == '0') {
              that.activeName = 'second'
            } else {
              that.activeName = 'first'
            }
          }
        }
      }, "get");
    },
    leaderNumberSummary() {
      var that = this;
      this.$common.commitParam(this, "/supervise/portal/leaderNumberSummary.api", { 'supervisionTaskType': that.urlData.type }, {
        success: function (res) {
          // var arr = res.data;
          // var brr1 = [];
          // var brr2 = [];
          // for (var i = 0; i < Math.ceil(arr.length / 2); i++) {
          //   brr1[i] = arr[i];
          //   brr2[i] = arr[i + Math.ceil(arr.length / 2)];
          // }
          // for (var j = 0; j < brr1.length; j++) {
          //   if (!brr2[j]) break;
          //   brr1[j].leader1 = brr2[j].leader;
          //   brr1[j].taskCount1 = brr2[j].taskCount;
          //   brr1[j].scheduleCount1 = brr2[j].scheduleCount;
          //   brr1[j].overdueCount1 = brr2[j].overdueCount;
          //   brr1[j].ongoingCount1 = brr2[j].ongoingCount;
          //   brr1[j].stopCount1 = brr2[j].stopCount;
          // }
          // that.leaderNumberSummaryData = brr1
          that.leaderNumberSummaryData = res.data
        }
      }, "get");
    },
    // myAttention() {
    //   var that = this;
    //   this.$common.commitParam(this, "/supervise/myattention/list.api", { 'supervisionTaskType': that.urlData.type }, {
    //     success: function (res) {
    //       that.myAttentionData = res.data;
    //     }
    //   }, "get");
    // },
    deptListSummary() {
      var that = this;
      this.$common.commitParam(this, "/supervise/portal/departmentListSummary.api", { 'supervisionTaskType': that.urlData.type },
        {
          success: function (res) {
            that.deptListSummaryData = res.data;
          }
        }, "get");
    },
    myTaskSummary() {
      var that = this;
      this.$common.commitParam(this, "/supervise/portal/myTaskSummary.api", { 'supervisionTaskType': that.urlData.type },
        {
          success: function (res) {
            that.myTaskData = res.data;
          }
        }, "get");
    },
    getApproval() {
      var that = this;
      that.approval = [];
      this.$common.commitParam(this, "/supervise/portal/toDo.api", {}, {
        success: function (res) {
          that.data = res.data;
          that.approval = that.data.approval.approval;
          that.approvalCount = that.data.approval.count;
          that.readCount = that.data.communicate.count;
          that.readTabData = that.data.communicate.communicates;
          // that.report = that.data.report.report;
          // that.communicate = that.data.communicate.communicates;
          // that.approvalTitle = "待审批(" + that.data.approval.count + ")";
          // that.reportTitle = "待办(" + that.data.report.count + ")";
          // that.communicateTitle = "已办(" + that.data.communicate.count + ")";
          that.reportTitle = "待办";
          that.communicateTitle = "已办";
        }
      }, "get");
    },
    getCommunicate() {
      var that = this;
      var params = { page: 0, pageCount: 10 };
      this.$common.commitParam(this, "/supervise/workflow/myapproval.api", params, {
        success: function (res) {
          if (res.code == 0) {
            that.communicate = res.data;
            that.communicateCount = res.data.length;
          }
        }
      }, "get");
    },
    draw() {
      var that = this;
      this.$common.commitParam(this, "/supervise/portal/rate.api", { 'supervisionTaskType': that.urlData.type }, {
        success: function (res) {
          // that.finishedCount = res.data.finishedCount;
          // that.unfinishedCount = res.data.unfinishedCount;
          // that.overdueCount = res.data.overdueCount;
          // that.unoverdueCount = res.data.unoverdueCount;
          // 办结率
          that.closingRate = res.data;
          // that.drawLine();
        }
      }, "get");
    },
    //画图
    // drawLine() {
    //   var that = this;
    //   var myChart = that.$echarts.init(document.getElementById('myChart'));
    //   var myChart1 = this.$echarts.init(document.getElementById('myChart1'));
    //   var finishedCount = that.finishedCount;
    //   var unfinishedCount = that.unfinishedCount;
    //   myChart.setOption({
    //     title: {
    //       text: '',
    //       subtext: '当前督办事项办结率',
    //       x: 'center'
    //     },
    //     tooltip: {
    //       trigger: 'item',
    //       formatter: "{a} <br/>{b} : {d}%"
    //     },
    //     series: [
    //       {
    //         name: '',
    //         type: 'pie',
    //         radius: '73%',
    //         center: ['50%', '60%'],
    //         data: [
    //           { value: finishedCount, name: '未完成率', itemStyle: { color: 'rgb(144, 237, 125)' } },
    //           { value: unfinishedCount, name: '已完成率', itemStyle: { color: 'rgb(124, 181, 236)' } }
    //         ],
    //         itemStyle: {
    //           emphasis: {
    //             shadowBlur: 10,
    //             shadowOffsetX: 0,
    //             shadowColor: 'rgba(0, 0, 0, 0.5)'
    //           },
    //           normal: {
    //             label: {
    //               show: false
    //             },
    //             labelLine: {
    //               show: false
    //             }
    //           }
    //         }
    //       }
    //     ]
    //   });
    //   myChart1.setOption({
    //     title: {
    //       text: '',
    //       subtext: '当前督办事项办结及时率',
    //       x: 'center'
    //     },
    //     tooltip: {
    //       trigger: 'item',
    //       formatter: "{a} <br/>{b} : {d}%"
    //     },
    //     series: [
    //       {
    //         name: '',
    //         type: 'pie',
    //         radius: '73%',
    //         center: ['50%', '60%'],
    //         data: [
    //           { value: that.overdueCount, name: '不及时率', itemStyle: { color: 'rgb(144, 237, 125)' } },
    //           { value: that.unoverdueCount, name: '及时率', itemStyle: { color: 'rgb(124, 181, 236)' } }
    //         ],
    //         itemStyle: {
    //           emphasis: {
    //             shadowBlur: 10,
    //             shadowOffsetX: 0,
    //             shadowColor: 'rgba(0, 0, 0, 0.5)'
    //           },
    //           normal: {
    //             label: {
    //               show: false
    //             },
    //             labelLine: {
    //               show: false
    //             }
    //           }
    //         }
    //       }
    //     ]
    //   });
    // },
    handleClick(row, column) {
      if (column.label == '任务名称') {
        this.alltaskinfoShow = true;
        this.alltaskinfoId = row.id;
        // var url = '#/alltaskinfo?id=' + row.id;
        // this.openWindow(url, '任务详情', this.windowScreenWidth, this.windowScreenHeight);
      }
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
    tonewpage(row, msg) {
      console.log(row);
      var that = this;

      that.approvalNeedData.id = row.id;
      that.approvalNeedData.taskId = row.taskId;
      that.approvalNeedData.processId = row.processId;
      that.approvalNeedData.processKey = row.processKey;
      that.approvalNeedData.formId = row.formId;
      that.approvalNeedData.taskName = row.taskName;
      that.approvalShow = true;
      that.approvalNeedData.taskChangeMessage = false;
      that.approvalNeedData.uploadHidden = true;

      // if (row.type == 'report') {
      //   var that = this;
      //   var id = row.id;
      //   this.taskReportNeedData.id = id
      //   this.taskReportShow = true
      //   // that.open1(id, '#/taskreport?supervisionTaskId=' + id, '任务汇报', 'report');
      // } else {
      //   var that = this;
      //   this.$common.commitParam(this, "/supervise/workflow/form.api", { "taskId": row.taskId, "processKey": row.processKey }, {
      //     success: function (res) {
      //       var url;
      //       // alert(res.data)
      //       if (res.data == 'changeApproval') {
      //         that.approvalNeedData.id = row.id;
      //         that.approvalNeedData.taskId = row.taskId;
      //         that.approvalNeedData.processId = row.processId;
      //         that.approvalNeedData.processKey = row.processKey;
      //         that.approvalNeedData.formId = row.formId;
      //         that.approvalNeedData.taskName = row.taskName;
      //         that.approvalShow = true;
      //         // eventBus.$emit('taskChangeInformation', true);
      //         that.approvalNeedData.taskChangeMessage = true
      //         // url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
      //       } else if (res.data == 'approval') {
      //         that.approvalNeedData.id = row.id;
      //         that.approvalNeedData.taskId = row.taskId;
      //         that.approvalNeedData.processId = row.processId;
      //         that.approvalNeedData.processKey = row.processKey;
      //         that.approvalNeedData.formId = row.formId;
      //         that.approvalNeedData.taskName = row.taskName;
      //         that.approvalShow = true;
      //         // eventBus.$emit('taskChangeInformation', false);
      //         that.approvalNeedData.taskChangeMessage = false;
      //         // url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
      //       } else if (res.data == 'taskConfirm') {
      //         that.taskConfirmNeedData.id = row.id;
      //         that.taskConfirmNeedData.taskId = row.taskId;
      //         that.taskConfirmNeedData.processId = row.processId;
      //         that.taskConfirmNeedData.processKey = row.processKey;
      //         that.taskConfirmNeedData.formId = row.formId;
      //         that.taskConfirmShow = true;
      //         // url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
      //       } else if (res.data == 'reportApproval') {
      //         that.reportApprovalNeedData.id = row.id;
      //         that.reportApprovalNeedData.taskId = row.taskId;
      //         that.reportApprovalNeedData.processId = row.processId;
      //         that.reportApprovalNeedData.processKey = row.processKey;
      //         that.reportApprovalNeedData.formId = row.formId;
      //         that.reportApprovalNeedData.taskName = row.taskName;
      //         that.reportApprovalShow = true;
      //         // url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
      //       } else if (res.data == 'taskReport') {
      //         that.taskReportNeedData.id = row.id;
      //         that.taskReportNeedData.taskId = row.taskId;
      //         that.taskReportNeedData.processId = row.processId;
      //         that.taskReportNeedData.processKey = row.processKey;
      //         that.taskReportNeedData.formId = row.formId;
      //         that.taskReportNeedData.supervisionTaskId = row.id
      //         that.taskReportShow = true;
      //         // url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
      //       } else if (res.data == 'taskChange') {
      //         that.taskChangeNeedData.id = row.id;
      //         that.taskChangeNeedData.taskId = row.taskId;
      //         that.taskChangeNeedData.processId = row.processId;
      //         that.taskChangeNeedData.processKey = row.processKey;
      //         that.taskChangeNeedData.formId = row.formId;
      //         that.taskChangeNeedData.supervisionTaskId = row.id
      //         that.taskChangeShow = true;
      //         // url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
      //       } else if (res.data == 'taskJieXiang') {
      //         that.taskJieXiangNeedData.id = row.id;
      //         that.taskJieXiangNeedData.taskId = row.taskId;
      //         that.taskJieXiangNeedData.processId = row.processId;
      //         that.taskJieXiangNeedData.processKey = row.processKey;
      //         that.taskJieXiangNeedData.formId = row.formId;
      //         that.taskJieXiangNeedData.supervisionTaskId = row.id
      //         that.taskJieXiangShow = true;
      //         // url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
      //       } else {
      //         url = '#/' + res.data + '?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
      //         that.openWindow(url, '任务审批', that.windowScreenWidth, that.windowScreenHeight);
      //       }
      //       // that.openWindow(url, '任务审批', that.windowScreenWidth, that.windowScreenHeight);
      //       // that.$router.push(res.data + '?id=' + row.id + '&taskId=' + row.taskId + '&processId=' + row.processId + '&processKey=' + row.processKey);
      //     }
      //   }, "get");
      // }
    },
    // 点击待阅进入汇报审批
    goRead(row) {
      var that = this
      that.toBeReadNeedData.id = row.id;
      that.toBeReadShow = true;

      eventBus.$emit('toBeReadNeedData', that.toBeReadShow, that.toBeReadNeedData)
    },
    tonewpage1(row) {
      // console.log(row);

      if (row.type == 'report') {
        var that = this;
        var id = row.id;
        this.taskReportNeedData.id = id
        this.taskReportShow = true
        // that.open1(id, '#/taskreport?supervisionTaskId=' + id, '任务汇报', 'report');
      } else {
        var that = this;
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

              that.approvalNeedData.processName = row.processName;
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

              that.approvalNeedData.processName = row.processName;
              that.approvalShow = true;
              // eventBus.$emit('taskChangeInformation', false);
              that.approvalNeedData.taskChangeMessage = false;
              // url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
            } else if (res.data == 'taskConfirm') {
              that.taskConfirmNeedData.id = row.id;
              that.taskConfirmNeedData.taskId = row.taskId;
              that.taskConfirmNeedData.processId = row.processId;
              that.taskConfirmNeedData.processKey = row.processKey;
              that.taskConfirmNeedData.formId = row.formId;
              that.taskConfirmShow = true;
              // url = '#/approvalForIndex?id=' + row.id + '&' + 'processId=' + row.processId + '&' + 'taskId=' + row.taskId + '&' + 'processKey=' + row.processKey + '&' + 'formId=' + row.formId;
            } else if (res.data == 'reportApproval') {
              that.reportApprovalNeedData.id = row.id;
              that.reportApprovalNeedData.taskId = row.taskId;
              that.reportApprovalNeedData.processId = row.processId;
              that.reportApprovalNeedData.processKey = row.processKey;
              that.reportApprovalNeedData.formId = row.formId;
              that.reportApprovalNeedData.taskName = row.taskName;
              that.reportApprovalShow = true;
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
              that.$message({ message: '打开任务错误，请联系管理员', type: 'warning' });
            }
            // that.openWindow(url, '任务审批', that.windowScreenWidth, that.windowScreenHeight);
            // that.$router.push(res.data + '?id=' + row.id + '&taskId=' + row.taskId + '&processId=' + row.processId + '&processKey=' + row.processKey);
          }
        }, "get");
      }

    },
    open1(id, url, title, oprationType) {
      var that = this;
      this.$common.commitParam(this, "/supervise/mytaskinfo/judge.api", { 'id': id, 'oprationType': oprationType },
        {
          success: function (res) {
            if (res.code == 0) {
              that.openWindow(url, title, that.windowScreenWidth, that.windowScreenHeight);
            } else {
              that.$message({ message: res.description, type: 'warning' });
            }
          }
        }, "get");
    },
    openWindow(url, name, iWidth, iHeight) {
      window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ', width=' + iWidth + ',innerWidth=' + iWidth + ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizeable=no,location=no,status=no');
    },
    // 修改table tr的样式
    tableRowStyle({ row, rowIndex }) {
      return 'font-size:0.16rem;'
    },
    // 修改table header的样式
    // tableHeaderColor({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex === 0) {
    //     return 'color: #000;font-weight: 1000;font-size:20px;'
    //   }
    // }
  }
}
</script>

<style lang="scss">
#app .section {
  height: calc(100% - 0.7rem);
  font-size: 0.14rem;
  background: #f9f9fb;
  box-sizing: border-box;
}
#app .tabs {
  height: calc(100% - 9.1%);
}
#app .table1 {
  height: 100%;
}
#app .el-tabs .el-tabs__content {
  // height: calc(100% - 20px);
  height: calc(100% - 0px);
  #pane-first {
    height: 91.5% !important;
    overflow: hidden;
  }
}
#app .tabpanel {
  height: 100%;
}
#app #pane-1 {
  height: 100%;
}
#app .el-tab-pane {
  height: 100%;
}
.index {
  height: 100%;
  padding-left: 15px;
  .head {
    width: 100%;
    height: 18%;
    .tabHeaderNoShow {
      .el-dialog {
        .el-dialog__body {
          .alltaskDetail {
            #tableBox {
              height: calc(100% - 110px);
            }
          }
        }
      }
    }
  }
  .body {
    width: 99%;
    height: 81%;
    // overflow-y: scroll;
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
      // border:none;
    }
    .el-tabs--border-card > .el-tabs__content {
      padding: 0;
    }
  }

  .leftbox {
    height: 99%;
    width: 72%;
    float: left;
  }
  .rightbox {
    height: 99%;
    width: 27%;
    float: right;
    margin-right: 1%;
  }
  .rightbox .reportTitle {
    font-size: 16px;
  }
  .dubanyear {
    height: 20%;
    width: 100%;
    text-align: center;
  }
  .headlist {
    height: 100%;
  }
  .headlist li {
    float: left;
    width: 33%;
    height: 100%;
    line-height: 1rem;
  }
  .headlist li a {
    display: inline-block;
    // width: 100%;
    // height: 92px;
    font-family: "微软雅黑";
    color: #666666;
    border: 1px solid #e7e7e7;
    // height: 130px;
    width: 96%;
    // text-align: center;
    // padding-top: 15px;
    background-color: #fff;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    height: 85%;
  }
  .headlist li a:hover {
    font-family: "微软雅黑";
    color: #666666;
    border: 1px solid #c3daf5;
    // height: 130px;
    width: 96%;
    // text-align: center;
    // padding-top: 15px;
    background-color: #e9f3ff;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    cursor: pointer;
  }
  .headlist li img {
    margin-left: 30%;
    // vertical-align: middle;
    border: none;
  }
  .headlist li .num_box {
    margin-left: 8%;
  }
  .left_icon {
    // height: 70px;
    // width: 50%;
    // float: left;
    // text-align: center;
    font-size: 17px;
    position: absolute;
    top: 15px;
    // margin-top: 10px;
  }
  .da_txt1 {
    font-family: "微软雅黑";
    font-size: 35px;
    font-weight: normal;
    color: #3193f5;
    // float: left;
    // width: 45%;
    position: absolute;
    top: -17px;
    // text-align: center;
    // display: block;
  }
  .da_txt2 {
    font-family: "微软雅黑";
    font-size: 35px;
    font-weight: normal;
    color: #49cc7b;
    position: absolute;
    top: -17px;
  }
  .da_txt3 {
    font-family: "微软雅黑";
    font-size: 35px;
    font-weight: normal;
    color: #faa646;
    position: absolute;
    top: -17px;
  }
  // .da_txt4 {
  //   font-family: "微软雅黑";
  //   font-size: 44px;
  //   font-weight: normal;
  //   color: #159960;
  // }

  .approvalOpen {
    color: #666;
    padding: 0 10px;
    line-height: 30px;
    height: 30px;
    overflow: hidden;
    text-align: left;
    font-size: 12px;
    cursor: pointer;
    display: block;
  }
  .tabHeaderNoShow > .el-dialog__wrapper > .el-dialog > .el-dialog__header {
    padding: 0 !important;
    //   .el-dialog__body{
    //     padding: 0px;
    //     height: 100%;
    // }
  }
  .tabHeaderNoShow > .el-dialog__wrapper > .el-dialog > .el-dialog__header {
    padding: 0 !important;
  }
  .tabHeaderNoShow > .el-dialog__wrapper > .el-dialog > .el-dialog__body {
    padding: 0px;
    height: 98%;
  }
  .approvalOpen:hover {
    color: #287e80;
    text-decoration: underline;
  }
  .rightbox .el-tabs__content {
    height: 110px;
    max-height: 87%;
    overflow: auto;
    .el-tab-pane {
      height: 95% !important;
    }
  }
  .rightbox {
    .el-tabs__item {
      padding: 0 10px;
      line-height: 0.4rem;
    }
    .el-tabs--top.el-tabs--border-card .el-tabs__item:nth-child(2),
    .el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2) {
      padding-left: 10px;
    }
    .el-tabs--top.el-tabs--border-card .el-tabs__item:last-child,
    .el-tabs--top.el-tabs--card .el-tabs__item:last-child {
      padding-right: 10px;
    }
    #tab-0 {
      width: 50%;
    }
    #tab-1 {
      width: 50%;
    }
  }
  .echartsBox {
    margin-top: 5px;
    background: #fff;
    border: 1px solid #dcdfe6;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
      0 0 6px 0 rgba(0, 0, 0, 0.04);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  }
  .myattention .el-button {
    white-space: initial;
  }
  .el-table::before {
    z-index: inherit;
  }
  .el-table th,
  .el-table td {
    padding: 5px 0;
    text-align: center;
  }
  .el-table td span {
    letter-spacing: 2px;
    line-height: 15px;
  }
  .el-dialog {
    width: 90% !important;
    height: 86%;
    margin-top: 3% !important;
  }
  .el-dialog__body {
    font-size: 12px;
    height: calc(100% - 57px);
    padding: 0px 20px;
  }
  .dialogBox > .el-dialog__wrapper > .el-dialog {
    // width: 79%;
    // margin: 0 auto;
    // height: 98%;
    width: 80% !important;
    margin: 0 auto;
    height: 6.5rem;
    margin-top: 0.4rem !important;
  }
  .dialogBox .el-dialog {
    // width: 79%;
    // margin: 0 auto;
    // height: 98%;
    width: 70% !important;
    margin: 0 auto;
    height: 6.5rem;
    margin-top: 0.4rem !important;
  }
  .dialogBox .el-dialog__header {
    border-bottom: 1px solid #ebeef5;
  }
  .dialogBox .el-dialog__body {
    padding: 0px 20px 0px 20px !important;
    height: 5.7rem;
  }
  .dialogBox .el-dialog__footer {
    height: 0.8rem;
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
    // width: 79%;
    // margin: 0 auto;
    // height: 98%;
    width: 70% !important;
    margin: 0 auto;
    height: 6.1rem;
    margin-top: 0.38rem !important;
  }
  .dialogBox2 .el-dialog__header {
    border-bottom: 1px solid #ebeef5;
  }
  .dialogBox2 .el-dialog__body {
    padding: 0px 20px 0px 20px !important;
    // height: 93%;
    height: 4.8rem !important;
    overflow-y: scroll !important;
  }
  .dialogBox2 .el-dialog__footer {
    height: 0.8rem;
  }
  .dialogBox2 .el-dialog__footer .el-button--mini {
    background: #fff;
    border: rgb(209, 207, 207) 1px solid;
    color: black;
  }

  .dialogBox3 .el-dialog__wrapper {
    z-index: 1000 !important;
  }
  .dialogBox3 .el-dialog {
    // width: 79%;
    // margin: 0 auto;
    // height: 98%;
    width: 70% !important;
    margin: 0 auto;
    height: 6.1rem;
    margin-top: 0.38rem !important;
  }
  .dialogBox3 .el-dialog__header {
    border-bottom: 1px solid #ebeef5;
  }
  .dialogBox3 .el-dialog__body {
    padding: 0px 20px 0px 20px !important;
    // height: 93%;
    height: 4.8rem;
    overflow-y: scroll !important;
  }
  .dialogBox3 .el-dialog__footer {
    height: 0.8rem;
  }
  .dialogBox3 .el-dialog__footer .el-button--mini {
    background: #fff;
    border: rgb(209, 207, 207) 1px solid;
    color: black;
  }

  .dialogBox4 .el-dialog__wrapper {
    z-index: 1000 !important;
  }
  .dialogBox4 .el-dialog {
    // width: 79%;
    // margin: 0 auto;
    // height: 98%;
    width: 70% !important;
    margin: 0 auto;
    height: 6.1rem;
    margin-top: 0.38rem !important;
  }
  .dialogBox4 .el-dialog__header {
    border-bottom: 1px solid #ebeef5;
  }
  .dialogBox4 .el-dialog__body {
    padding: 0px 20px 0px 20px !important;
    // height: 93%;
    height: 4.8rem;
    overflow-y: scroll !important;
  }
  .dialogBox4 .el-dialog__footer {
    height: 0.8rem;
  }
  .dialogBox4 .el-dialog__footer .el-button--mini {
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

  // .ui-popup-focus {
  //   z-index: 3001 !important;
  // }

  .tableBox {
    // height: calc(100% - 100px) !important;
  }

  .click1 .el-table__body {
    tr {
      td:nth-child(2) {
        div {
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #056dae;
          font-weight: bolder;
          cursor: pointer;
        }
      }
    }
  }
  // .tabHeaderNoShow
  //   > .el-dialog__wrapper
  //   > .el-dialog
  //   > .el-table__body
  //   > .alltask
  //   > .alltaskDetail
  //   > #tableBox
  //   > .el-table
  //   > .el-table__body-wrapper
  //   > .el-table__body
  //   > tbody {
  //   tr {
  //     td:nth-child(2) {
  //       div {
  //         color: rgb(107, 158, 255);
  //         cursor: pointer;
  //       }
  //     }
  //     td:nth-child(3) {
  //       div {
  //         text-align: left;
  //         overflow: hidden;
  //         text-overflow: ellipsis;
  //         white-space: nowrap;
  //         color: rgb(107, 158, 255);
  //         cursor: pointer;
  //       }
  //     }
  //   }
  // }
  // .el-tabs--border-card>.el-tabs__header .el-tabs__item:first-child{
  //   margin-top: -1px;
  //   border: 1px solid red;
  // }
  text {
    font-size: 0.16rem;
  }
  // #homepageTableDiv {
  //   background-color: yellow;
  //   width: 10rem;
  //   position: absolute;
  //   top: -0.3rem;
  //   height: 5rem;
  //   z-index: 9999;
  // }
}
@media (min-width: 1024px) and (max-width: 1440px) {
  .index .echart {
    width: 100%;
    height: 200px;
  }
}
@media (min-width: 1440px) and (max-width: 1920px) {
  .index .echart {
    width: 100%;
    height: 200px;
  }
}
@media screen and (max-width: 1366px) {
  .listTable_1 .el-table__body-wrapper {
    height: 338px !important;
  }
  //   .listTable_1 {
  //     .el-tabs__content{
  //     .el-table__body-wrapper{
  //       height: 338px !important;
  //     }
  //   }
  // }
}

// 待办、已办等等按钮的样式
.el-tabs__item {
  font-size: 0.16rem;
  // height: 120%;
  // line-height: 0.35rem;
}
// 左侧树的样式
.el-tree-node__label {
  font-size: 0.16rem;
}
.el-tree-node__content {
  height: 40px;
}
.is-leaf {
  font-size: 0.16rem;
}
.el-table thead {
  // color: #333;
  font-weight: 500;
  // border-bottom: 2px solid #EBEEF5;
  background: #fafafa;
}
.el-table__header {
  border-bottom: 2px solid #ebeef5;
}
.listTable {
  height: 100%;
}
.el-tabs__item {
  font-weight: bolder;
  color: #909399;
}

.listTable_1 {
  height: 100%;
  .el-table__body {
    tr {
      td:nth-child(3) {
        div {
          color: #3195f4;
          cursor: pointer;
        }
      }
      td:nth-child(4) {
        div {
          color: #3195f4;
          cursor: pointer;
        }
      }
      td:nth-child(5) {
        div {
          color: #3195f4;
          cursor: pointer;
        }
      }
      td:nth-child(6) {
        div {
          color: #3195f4;
          cursor: pointer;
        }
      }
    }
  }
  .el-table__body-wrapper {
    // height: 388px !important;
  }
}
.el-table {
  border: 1px solid #dcdfe6;
}
.el-table::before {
  height: 0px;
}
.listTable .el-table {
  border-right: none;
  border-left: none;
}
</style>
