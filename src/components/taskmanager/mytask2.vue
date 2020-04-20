<template>
  <div class="mytask2">
    <div class="searchBox clear">
      <div class="my-input1" style="width:30%;margin:0 15px;">
        <span>结束时间：</span>
        <div class="block dateBox" style="display:inline-block;width:75%">
          <el-date-picker :editable='false' size="mini" v-model="value" type="daterange" align="right" format="yyyy-MM-dd" value-format="yyyy-MM-dd" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%;">
          </el-date-picker>
        </div>
      </div>
      
      <!-- <div class="my-input1" style="width:15%;">
        <span>任务状态：</span>
        <el-select v-model="value3" clearable size="mini" style="width:calc(100% - 70px)">
          <el-option label="所有" value=""></el-option>
          <el-option v-for="item in taskStateOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div> -->
      <div class="my-input1" style="width:20%;">
        <span>任务类型：</span>
        <el-select v-model="supervisionTaskType" clearable size="mini" style="width:55%">
          <el-option label="所有" value=""></el-option>
          <el-option v-for="item in taskTypeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="my-input1" style="width:28%;margin:0 5px">
        <span>督办名称/编号：</span>
        <el-input placeholder="督办名称/编号" v-model="title" @blur="againReassignment" size="mini" clearable style="width:60%" @keyup.enter.native="search"></el-input>
      </div>
      <el-button class="topbtn" style="margin-left: 1%;" type="primary" size="mini" @click="search" icon="el-icon-search"></el-button>
    </div>
    <div class="tableBox" id="tableBox" style="margin-top:15px;">
      <el-table stripe @cell-click="handleClick" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="tableData" height="100%" style="width: 100%">
        <el-table-column type="index" :index="meterIndexMethod" label="NO." width="55">
        </el-table-column>
        <el-table-column prop="taskNum" label="督办编号" width="150">
          <!-- <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">
              <font color="#3193F6">{{scope.row.taskNum}}</font>
            </el-button>
          </template> -->
        </el-table-column>
        <el-table-column prop="taskName" label="督办名称" width="280" show-overflow-tooltip>
          <!-- <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.taskName}}</el-button>
          </template> -->
        </el-table-column>
        <el-table-column prop="sponsorUserName" label="主办人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="responsibleDeptNames" label="责任单位" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="endDate" width="100" label="结束时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="progressRadio" label="完成进度">
        </el-table-column>
        <el-table-column prop="leaderUserNames" label="分管领导">
        </el-table-column>
        <el-table-column prop="reportMonth" label="最后汇报">
        </el-table-column>
        <el-table-column prop="taskState" label="任务状态">
        </el-table-column>
        <!-- <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-dropdown placement="bottom">
              <span class="el-dropdown-link" style="color:blue">
                ......
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="taskReport(scope.$index, scope.row)">任务汇报
                </el-dropdown-item>
                <el-dropdown-item @click.native="taskChange(scope.$index, scope.row)">任务变更
                </el-dropdown-item>
                <el-dropdown-item @click.native="taskJieXiang(scope.$index, scope.row)">办结申请
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="block" style="margin-top:5px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[20,50, 100, 200]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="sum">
        </el-pagination>
      </div>
    </div>
    <span class="dialogBox">
      <el-dialog :close-on-click-modal="false" :visible.sync="alltaskinfoShow" title="任务详情">
        <alltaskinfo v-if="alltaskinfoShow" :alltaskinfoId='alltaskinfoId'></alltaskinfo>
      </el-dialog>
    </span>
  </div>

</template>
<script>
import alltaskinfo from '../alltaskinfo'
export default {
  components: {
    alltaskinfo,
  },
  data() {
    return {
      uploadData: {
        id: -1,
        subId: '',
        type: 1
      },
      boolean1: true,
      boolean2: false,
      uploadDialogVisible: false,
      fileList: [],
      showChangeDiolog: false,
      showJiexiangDiolog: false,
      loading: true,
      value: [],
      taskStateOptions: [],
      taskTypeOptions: [],
      value123: '1',
      // value3: '1',
      page: 1,
      pageCount: 20,
      sum: 0,
      tableData: [],
      sponsorUserName: '',
      sponsorUserId: '',
      title: '',
      multipleSelection: [],
      taskinfo: {},
      currentmonth: '',
      currentdate: '',
      tableData3: [],
      page11: 1,
      pageCount11: 5,
      sum11: 0,
      progressScale: '',
      reportInfo: '',
      progressState: '',
      data: [],
      report: {},
      taskId: '',
      value611: '',
      info: '',
      loadDowm: '',
      supervisionTaskType: '',
      windowScreenHeight: window.screen.height - 90,
      windowScreenWidth: window.screen.width,
      alltaskinfoShow: false,
      alltaskinfoId: '',
    }
  },
  mounted() {
    this.loadData();
    this.getDate();
    this.taskStateData();
    this.taskTypeData();
  },
  methods: {
    // 解决ie9的输入框bug
    againReassignment(item){
      this.title = item.target.value
      
      
    },
    taskReport(index, row) {
      var that = this;
      var id = row.id;
      this.open(id, '#/taskreport?supervisionTaskId=' + id, '任务汇报', 'report');
    },
    taskChange(index, row) {
      var that = this;
      var id = row.id;
      this.open(id, '#/taskChange?id=' + id, '任务变更', 'bg');
    },
    handleClick(row, column) {
      if (column.label == '督办名称') {
        this.alltaskinfoShow = true;
        this.alltaskinfoId = row.id;
        // this.openWindow('#/alltaskinfo?id=' + row.id, '任务详情', this.windowScreenWidth, this.windowScreenHeight);
      }
    },
    taskJieXiang(index, row) {
      var that = this;
      var id = row.id
      this.open(id, '#/taskJieXiang?id=' + id, '办结申请', 'jx');
    },
    openWindow(url, name, iWidth, iHeight) {
      window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ', width=' + iWidth + ',innerWidth=' + iWidth + ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizeable=no,location=no,status=no');
    },
    open(id, url, title, oprationType) {
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
    meterIndexMethod(index) {
      return (this.page - 1) * this.pageCount + (index + 1);
    },
    // 表格数据加载
    loadData() {
      var that = this;
      that.loading = true;
      var params = { page: that.page, pageCount: that.pageCount };
      if (that.value !== null && that.value.length !== 0) {
        params.beginDate = that.value[0];
        params.endDate = that.value[1];
      };
      for (var i = 0; i < that.tableData.length; i++) {
        if (that.sponsorUserName == that.tableData[i].sponsorUserName) {
          that.sponsorUserId = that.tableData[i].sponsorUserId
        }
      }
      if (that.sponsorUserId !== "") {
        params.sponsorUserId = that.sponsorUserId
      }
      // if (that.value3 !== "") {
      //   // params.taskState = that.value3;
      // }
      if (that.supervisionTaskType !== '') {
        params.supervisionTaskType = that.supervisionTaskType;
      }
      if (that.title !== "") {
        params.taskName = that.title;
      }
      // this.$common.commitParam(this, "/supervise/mytaskinfo/list.api", params, {
      //   success: function (res) {
      //     that.tableData = res.data;
      //     that.sum = res.totalCount;
      //     if (res.code == 0) {
      //       that.loading = false
      //     } else {
      //       that.$message({ message: res.description, type: 'warning' });
      //     }
      //   }
      // }, "get");

      this.$common.commitParam(this, "/supervise/mytaskinfo/completed.api", params, {
        success: function (res) {
          that.tableData = res.data;
          that.sum = res.totalCount;
          if (res.code == 0) {
            that.loading = false
          } else {
            that.$message({ message: res.description, type: 'warning' });
          }
        }
      }, "get");
    },
    taskStateData() {
      var that = this;
      this.$common.commitParam(this, "supervise/dic/options.api", { type: 'task_state' },
        {
          success: function (res) {
            that.taskStateOptions = res.data;
          }
        }, 'get');
    },
    taskTypeData() {
      var that = this;
      this.$common.commitParam(this, "supervise/dic/options.api", { type: 'supervision_task_type' },
        {
          success: function (res) {
            that.taskTypeOptions = res.data;
          }
        }, 'get');
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
    search() {
      var that = this;
      that.loading = true;
      that.page = 1;
      var params = { page: that.page, pageCount: that.pageCount };
      if (that.value !== null && that.value.length !== 0) {
        params.beginDate = that.value[0];
        params.endDate = that.value[1];
      };
      for (var i = 0; i < that.tableData.length; i++) {
        if (that.sponsorUserName == that.tableData[i].sponsorUserName) {
          that.sponsorUserId = that.tableData[i].sponsorUserId
        }
      }
      if (that.sponsorUserId !== "") {
        params.sponsorUserId = that.sponsorUserId
      }
      if (that.supervisionTaskType !== '') {
        params.supervisionTaskType = that.supervisionTaskType;
      }
      if (that.title !== "") {
        params.taskName = that.title;
      }

      this.$common.commitParam(this, "/supervise/mytaskinfo/completed.api", params, {
        success: function (res) {
          that.tableData = res.data;
          that.sum = res.totalCount;
          if (res.code == 0) {
            that.loading = false
          } else {
            that.$message({ message: res.description, type: 'warning' });
          }
        }
      }, "get");
    },
    getDate() {
      var that = this;
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentmonth = year + month;
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      that.currentmonth = currentmonth;
      that.currentdate = currentdate;
    }
  }
}
</script>
<style lang="scss" >
.mytask2 {
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
      height: 98%;
    }
  }
  .el-table {
    font-size: 15px;
  }
  .my-input1 {
    margin-right: 5px;
    float: left;
    .el-input__inner {
      // width: 1.8rem;
      height: 0.3rem;
    }
  }
  // .el-dialog {
  //   width: 79%;
  //   margin: 0 auto;
  //   height: 98%;
  // }
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
  // .el-dialog__body {
  //   padding: 20px 20px !important;
  // }

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
    padding: 10px 20px 5px !important;
  }
  .dialogBox .el-dialog__body {
    padding: 0px 20px 0px 20px !important;
    height: 5.6rem;
  }
  .dialogBox .el-dialog__footer {
    height: 5rem;
  }
  .dialogBox .el-dialog__footer .el-button--mini {
    background: #fff;
    border: rgb(209, 207, 207) 1px solid;
    color: black;
  }

  .el-select .el-input__inner {
    width: 100%;
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
  .el-button--mini {
    font-size: 16px;
  }
  td {
    padding: 5px 0px;
  }
  // .el-table__body {
  //   tr {
  //     td:nth-child(3) {
  //       div {
  //         text-align: left;
  //         overflow: hidden;
  //         text-overflow: ellipsis;
  //         white-space: nowrap;
  //         color: #3193f6;
  //         cursor: pointer;
  //       }
  //     }
  //   }
  // }
  .el-date-editor .el-range-separator {
    width: 8%;
  }
  .tableBox > .el-table .cell {
    height: 0.34rem !important;
    line-height: 0.34rem !important;
  }
  .tableBox .is-scrolling-none {
    overflow: auto;
    height: 100%;
  }
  .el-table th {
    padding: 0 !important;
    background: #fafafa;
    div {
      color: #333;
    }
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
          font-weight: bolder;
        }
      }
    }
  }
  .dateBox .el-input__inner {
    line-height: 22px;
  }
}
</style>