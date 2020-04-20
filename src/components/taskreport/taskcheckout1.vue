<template>
  <div class="taskcheckout1">
    <div class="searchBox" style="margin-left:1%;">
      

      <!-- <div class="my-input1" style="width:40%;">
        <span>年月：</span>
        <div class="block" style="display:inline-block;width:83%;">
          <el-date-picker :editable="false" v-model="beginMonth" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择月" style="width:1.50rem;">
          </el-date-picker> 至
          <el-date-picker :editable="false" v-model="endMonth" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择月" style="width:1.50rem;">
          </el-date-picker>
        </div>
      </div> -->
      <div class="my-input1" style="width:20%;">
        <span class="">任务状态：</span>
        <el-select v-model="taskState" size="mini" style="width:60%;">
          <el-option label="所有" value=""></el-option>
          <el-option v-for="item in taskStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="my-input1" style="width:20%">
        <span>年月：</span>
        <div class="block" style="display:inline-block;width:72.5%;">
          <el-date-picker :editable="false" v-model="monthId" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择年月" style="width:100%;">
          </el-date-picker>
        </div>
      </div>
      <div class="my-input1" style="width:20%;">
        <span>督办名称：</span>
        <el-input placeholder="请输入查询内容" v-model="taskName" @blur="againReassignment" size="mini" style="width:60%;" clearable @keyup.enter.native="search"></el-input>
      </div>

      <el-button type="primary" size="mini" @click="search" class="searchBtn"><span class="el-icon-search topbtn"></span></el-button>
      <el-button type="primary" size="mini" @click="hidden" icon="el-icon-arrow-down upchange" style="background:white;color:#3193F6;font-size:.12rem">高级查询</el-button>
      <el-button type="primary" size="mini" @click="checkout" class="checkout"><span class="el-icon-upload2"></span>导出</el-button>
      <div :class="{planA: isActive, planB:isActive1}">
        <div class="my-input1" style="width:20%;">
          <span class="">督办来源：</span>
          <el-select v-model="taskSource" size="mini" style="width:60%;">
            <el-option label="所有" value=""></el-option>
            <el-option v-for="item in taskSourceList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="my-input1" style="width:20%">
          <span class="">责任部门：</span>
          <el-select v-model="responsibleDeptId" clearable size="mini" style="width:60%;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="my-input1" style="width:20%;">
          <span class="">分管领导：</span>
          <el-select v-model="leaderUserId" size="mini" style="width:60%;">
            <el-option label="所有" value=""></el-option>
            <el-option v-for="item in leadersList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="my-input1" style="width:17%;">
          <span>流程状态：</span>
          <el-select v-model="processState" clearable size="mini" style="width:calc(100% - 85px);">
            <el-option label="所有" value=""></el-option>
            <el-option label="变更中" value="2"></el-option>
            <el-option label="办结中" value="3"></el-option>
          </el-select>
        </div>
        <div class="my-input1" style="width:17%;">
        <span class="">任务类型：</span>
        <el-select v-model="supervisionTaskType" size="mini" style="width:calc(100% - 85px);">
          <el-option label="所有" value=""></el-option>
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
        <!-- <div class="my-input1" style="width:30%;">
          <span class="">任务时间：</span>
          <div class="block dateBox" style="display:inline-block;width:75%;">
            <el-date-picker :editable="false" size="mini" v-model="valueTast" type="daterange" align="right" format="yyyy-MM-dd" value-format="yyyy-MM-dd" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%;">
            </el-date-picker>
          </div>
        </div> -->

      </div>
    </div>
    <div class="tableBox" style="margin-top:.15rem;">
      <el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="tableData" height="99%" style="width: 100%">
        <el-table-column type="index" :index="meterIndexMethod" label="NO." width="55">
        </el-table-column>
        <el-table-column prop="taskNum" label="督办编号" width="130">
        </el-table-column>
        <el-table-column prop="taskName" label="督办名称" width="280" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="responsibleUserNames" label="责任人" width="130" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="taskSource" label="事项来源" width="130" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="leaderUserNames" label="分管领导" width="130">
        </el-table-column>
        <el-table-column prop="reportInfo" label="本月汇报详情" width="130" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="endDate" label="计划结束时间" width="130" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="planDesc" label="工作计划" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top:.10rem;">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[20,50, 100, 200]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="sum">
        </el-pagination>
      </div>
    </div>
    <div class="dialog">

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      valueTast: [],
      loading: true,
      beginMonth: '',
      tableData: [],
      sum: 0,
      supervisionTaskType: '',
      pageCount: 20,
      page: 1,
      options2: [],
      options: [],
      endMonth: '',
      responsibleDeptId: '',

      isActive: true,
      isActive1: false,

      taskStateList: [],
      taskState: '',

      taskName: '',

      taskSourceList: [],
      taskSource: '',

      leadersList: [],
      leaderUserId: '',

      monthId: '',

      processState: '',
    }
  },
  mounted() {

    // 获取当前年月
    var myDate = new Date();
    var yearNum = myDate.getFullYear();
    var monthNum = myDate.getMonth() + 1;
    if (monthNum < 10) {
      monthNum = '0' + monthNum;
    }
    this.monthId = yearNum + '' + monthNum;

    this.loadData();
    this.taskTypeData();
    this.taskStateData();
    this.taskSourceData();
    this.getleader();


  },
  methods: {
    againReassignment(item) {
      this.taskName = item.target.value
    },
    loadData() {
      var that = this;
      that.getlistDept();
      that.loading = true;

      // that.beginMonth = that.valueTast[0]
      // that.endMonth = that.valueTast[1]
      var params = { page: that.page, pageCount: that.pageCount };
      // if (that.beginMonth !== '') {
      //   params.beginDate = that.beginMonth;
      // };
      // if (that.endMonth !== '') {
      //   params.endDate = that.endMonth;
      // }
      if (that.responsibleDeptId !== '' && that.responsibleDeptId !== '-1000') {
        params.responsibleDeptId = that.responsibleDeptId;
      };
      // 任务状态
      if (that.taskState !== '') {
        params.taskState = that.taskState;
      }
      // 督办名称
      if (that.taskName !== '') {
        params.taskName = that.taskName;
      }
      // 督办来源
      if (that.taskSource !== '') {
        params.taskSource = that.taskSource;
      }
      // 分管领导
      if (that.leaderUserId !== '') {
        params.leaderUserId = that.leaderUserId;
      }
      // 年月
      if (that.monthId !== '') {
        params.monthId = that.monthId;
      }
      // 流程状态
      if (that.processState !== '') {
        params.processState = that.processState;
      }
      if (that.supervisionTaskType !== '') {
        params.supervisionTaskType = that.supervisionTaskType;
      };
      this.$common.commitParam(this, "/supervise/reportform/monthReport.api", params, {
        success: function (res) {
          that.tableData = res.data;
          if (res.code == 0) {
            that.loading = false
          }
          that.sum = res.totalCount;
          // for (var i = 0; i < res.data.length; i++) {
          //   that.tableData[i].responsible = res.data[i].responsibleDeptNames + '/' + res.data[i].responsibleUserNames;
          // }
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
    // 任务状态数据
    taskStateData() {
      var that = this;
      this.$common.commitParam(this, "supervise/dic/options.api", { type: 'task_state' },
        {
          success: function (res) {
            that.taskStateList = res.data;
          }
        }, 'get');
    },
    // 督办来源数据
    taskSourceData() {
      var that = this;
      this.$common.commitParam(this, "supervise/dic/options.api", { type: 'task_sorce' },
        {
          success: function (res) {
            that.taskSourceList = res.data;
          }
        }, 'get');
    },
    // 分管领导数据
    getleader() {
      var that = this;
      this.$common.commitParam(this, "/supervise/sys/listSysUserByRole.api?roleKey=leadleader", {}, {
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            var values = {};
            values.value = res.data[i].id.toString();
            values.label = res.data[i].name;
            that.leadersList.push(values);
          }
        }
      }, "get");
    },
    search() {
      var that = this;
      that.getlistDept();
      that.loading = true;
      that.page = 1;

      // that.beginMonth = that.valueTast[0]
      // that.endMonth = that.valueTast[1]
      var params = { page: that.page, pageCount: that.pageCount };
      // if (that.beginMonth !== '') {
      //   params.beginDate = that.beginMonth;
      // };
      // if (that.endMonth !== '') {
      //   params.endDate = that.endMonth;
      // }
      if (that.responsibleDeptId !== '' && that.responsibleDeptId !== '-1000') {
        params.responsibleDeptId = that.responsibleDeptId;
      };
      // 任务状态
      if (that.taskState !== '') {
        params.taskState = that.taskState;
      }
      // 督办名称
      if (that.taskName !== '') {
        params.taskName = that.taskName;
      }
      // 督办来源
      if (that.taskSource !== '') {
        params.taskSource = that.taskSource;
      }
      // 分管领导
      if (that.leaderUserId !== '') {
        params.leaderUserId = that.leaderUserId;
      }
      // 年月
      if (that.monthId !== '') {
        params.monthId = that.monthId;
      }
      // 流程状态
      if (that.processState !== '') {
        params.processState = that.processState;
      }
      if (that.supervisionTaskType !== '') {
        params.supervisionTaskType = that.supervisionTaskType;
      };
      this.$common.commitParam(this, "/supervise/reportform/monthReport.api", params, {
        success: function (res) {
          that.tableData = res.data;
          if (res.code == 0) {
            that.loading = false
          }
          that.sum = res.totalCount;
          // for (var i = 0; i < res.data.length; i++) {
          //   that.tableData[i].responsible = res.data[i].responsibleDeptNames + '/' + res.data[i].responsibleUserNames;
          // }
        }
      }, "get");
    },
    //显示div
    hidden() {
      if (this.isActive == true) {
        $('.upchange').addClass('el-icon-arrow-up').removeClass('el-icon-arrow-down')
        this.isActive = false;
        this.isActive1 = true;
        $('.el-table--fit').css('height', '89%');
      } else {
        $('.upchange').addClass('el-icon-arrow-down').removeClass('el-icon-arrow-up')
        this.isActive = true;
        this.isActive1 = false;
        $('.el-table--fit').css('height', '98%');
      }
    },
    checkout() {
      var that = this;
      var url = "/supervise/reportform/monthReportExport.api";
      var params = "page=" + that.page + "&pageCount" + that.pageCount;

      // that.beginMonth = that.valueTast[0]
      // that.endMonth = that.valueTast[1]
      // if (that.beginMonth !== '' && that.beginMonth !== undefined) {
      //   params = params + "&beginDate=" + that.beginMonth;
      // };
      // if (that.endMonth !== '' && that.endMonth !== undefined) {
      //   params = params + "&endDate=" + that.endMonth;
      // };
      if (that.monthId != '') {
        params = params + '&monthId=' + that.monthId;
      }
      if (that.responsibleDeptId !== '' && that.responsibleDeptId !== '-1000') {
        params = params + "&responsibleDeptId=" + that.responsibleDeptId;
      };
      // 任务状态
      if (that.taskState !== '') {
        params = params + "&taskState=" + that.taskState;
      }
      // 督办名称
      if (that.taskName !== '') {
        params = params + "&taskName=" + that.taskName;
      }
      // 督办来源
      if (that.taskSource !== '') {
        params = params + "&taskSource=" + that.taskSource;
      }
      // 分管领导
      if (that.leaderUserId !== '') {
        params = params + "&leaderUserId=" + that.leaderUserId;
      }//
      params = params + "&supervisionTaskType=" + that.supervisionTaskType;
      url = url + "?" + params;
      // console.log(params);

      window.open(encodeURI(process.env.baseUrl + url));
    },
    getlistDept() {
      var that = this;
      this.$common.commitParam(this, "/supervise/sys/listDept.api", {}, {
        success: function (res) {
          res.data.unshift({ id: '', name: '所有' })
          var box = [];
          for (var i = 0; i < res.data.length; i++) {
            var values = {};
            values.value = res.data[i].id;
            values.label = res.data[i].name
            box.push(values);
          }
          that.options = box;
        }
      }, "get");
    },
    taskTypeData() {
      var that = this;
      this.$common.commitParam(this, "supervise/dic/options.api", { type: 'supervision_task_type' },
        {
          success: function (res) {
            that.options2 = res.data;
          }
        }, 'get');
    },
  }
}
</script>

<style lang="scss">
.taskcheckout1 {
  height: 100%;
  .tableBox {
    height: calc(100% - 0.9rem);
    padding: 0 0.1rem;
  }
  .my-input1 {
    margin-right: 0.1rem;
    display: inline-block;
    .el-input__inner {
      height: 0.3rem;
    }
  }
  .el-dialog {
    margin: 0 auto;
  }
  .text1 {
    display: inline-block;
    width: 0.6rem;
  }
  .el-table__body {
    tr {
      td:nth-child(3) {
        div {
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      td:nth-child(9) {
        div {
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .searchBox span {
    font-size: 0.16rem;
    // width: 100%;
  }
  .searchBox .el-range-separator {
    width: 8%;
  }
  .planA {
    display: none;
  }
  .planB {
    display: block;
    margin-top: 0.15rem;
  }
  .el-date-editor {
    // width: 47% !important;
  }
  .searchBtn {
    background: #faa646 !important;
    border-color: #faa646 !important;
    height: 0.3rem;
  }
  .checkout {
    float: right;
    margin-right: 1%;
    background: #47b5e8;
    height: 0.3rem;
  }
  .el-table .cell {
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
  .el-table td {
    padding: 0px 0 !important;
  }
  .dateBox {
    .el-input__inner {
      line-height: 22px;
    }
    .el-date-editor .el-range-input,
    .el-date-editor .el-range-separator {
      display: inline;
    }
  }
}
</style>