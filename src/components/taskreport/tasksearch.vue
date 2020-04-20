<template>
  <div class="tasksearch">
    <div class="searchBox" style="margin-left: 1%;">

      <div class="my-input1" style="width:20%;">
        <span class="">任务类型：</span>
        <el-select v-model="supervisionTaskType" size="mini" style="width:60%;">
          <el-option label="所有" value=""></el-option>
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>

      <div class="my-input1" style="width:20%;">
        <span class="">分管领导：</span>
        <el-select v-model="leaderUserId" size="mini" style="width:60%;">
          <el-option label="所有" value=""></el-option>
          <el-option v-for="item in leadersList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="my-input1" style="width:20%">
        <span>年份：</span>
        <div class="block years" style="display:inline-block;width:72.5%;">
          <el-date-picker v-model="year" type="year" unlink-panels format="yyyy" value-format="yyyy" placeholder="选择年份">
          </el-date-picker>
        </div>
      </div>

      <div class="my-input1" style="width:20%;">
        <span>督办名称：</span>
        <!-- <el-select v-model="queryCondition" size="mini" style="width:100px;">
                  <el-option key="" label=""></el-option>
                  <el-option key="leader" label="分管领导" value="leader"></el-option>
                  <el-option key="supervisionTaskNum" label="督办编号" value="supervisionTaskNum"></el-option>
                  <el-option key="title" label="督办名称" value="title"></el-option>
              </el-select> -->
        <el-input placeholder="请输入查询内容" v-model="taskName" @blur="againReassignment" size="mini" style="width:60%;" clearable @keyup.enter.native="search"></el-input>
      </div>
      <!-- <div class="my-input1" style="width:8%;">
        <a href="javascript:void(0)" @click="hidden" style="color:blue;font-size:1.2rem;">高级查询<i class="el-icon-arrow-down"></i></a>
      </div> -->
      <el-button type="primary" size="mini" @click="search" class="searchBtn"><span class="el-icon-search topbtn"></span></el-button>
      <!-- <el-button type="primary" size="mini" @click="search" icon="el-icon-arrow-down upchange" class="searchBtn" style="background:white;color:#3193F6"><span style="font-size:1rem">高级查询</span></el-button> -->
      <el-button type="primary" size="mini" @click="hidden" icon="el-icon-arrow-down upchange" style="background:white;color:#3193F6;font-size:.12rem">高级查询</el-button>
      <div :class="{planA: isActive, planB:isActive1}">
        <div class="my-input1" style="width:20%;">
          <span class="">责任部门：</span>
          <el-select v-model="responsibleDeptId" clearable size="mini" style="width:60%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>

        <div class="my-input1" style="width:20%;">
          <span class="">任务状态：</span>
          <el-select v-model="taskState" size="mini" style="width:60%;">
            <el-option label="所有" value=""></el-option>
            <el-option v-for="item in taskStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>

        <div class="my-input1" style="width:20%;">
          <span>流程状态：</span>
          <el-select v-model="processState" clearable size="mini" style="width:60%">
            <el-option label="所有" value=""></el-option>
            <el-option label="变更中" value="2"></el-option>
            <el-option label="办结中" value="3"></el-option>
          </el-select>
        </div>

        <!-- <div class="my-input1" style="width:40%">
          <span>年月：</span>
          <div class="block" style="display:inline-block;width:83%;">
            <el-date-picker :editable="false" v-model="beginMonth" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择月" style="width:30%;">
            </el-date-picker> 至
            <el-date-picker :editable="false" v-model="endMonth" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择月" style="width:30%;">
            </el-date-picker>
          </div>
        </div> -->

        <div class="my-input1" style="width:20%;">
          <span class="">督办来源：</span>
          <el-select v-model="taskSource" size="mini" style="width:60%;">
            <el-option label="所有" value=""></el-option>
            <el-option v-for="item in taskSourceList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <!-- <div class="my-input1" style="width:30%;">
          <span class="">任务时间：</span>
          <div class="block" style="display:inline-block;width:75%;">
            <el-date-picker :editable="false" size="mini" v-model="value" type="daterange" align="right" format="yyyy-MM-dd" value-format="yyyy-MM-dd" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%;">
            </el-date-picker>
          </div>
        </div> -->
      </div>
    </div>
    <div class="tableBox" style="margin-top:.15rem;">
      <el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="tableData" height="99%" style="width:100%">
        <el-table-column type="index" :index="meterIndexMethod" label="NO." width="55">
        </el-table-column>
        <el-table-column prop="title" label="督办名称" width="280" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="responsible" width="200" label="责任部门/责任人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="taskState" width="100" label="状态">
        </el-table-column>
        <!-- <el-table-column label="进展汇报"> -->
        <el-table-column width="150" prop="january" label="1月" show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="150" prop="february" label="2月" show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="150" prop="march" label="3月" show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="150" prop="april" label="4月" show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="150" prop="may" label="5月" show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="150" prop="june" label="6月" show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="150" prop="july" label="7月" show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="150" prop="august" label="8月" show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="150" prop="september" label="9月" show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="150" prop="october" label="10月" show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="150" prop="november" label="11月" show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="150" prop="december" label="12月" show-overflow-tooltip>
        </el-table-column>
        <!-- </el-table-column> -->
      </el-table>
      <div class="block" style="margin-top:.1rem;">
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
      value: [],
      isActive: true,
      isActive1: false,
      loading: true,
      beginMonth: '',
      endMonth: '',
      year: '',
      responsibleDeptId: '',
      tableData: [],
      sum: 0,
      pageCount: 20,
      page: 1,
      supervisionTaskType: '',
      options: [],
      taskName: "",
      options2: [],
      month: [{ prop: 'january', label: '1月' }, { prop: 'februli', label: '2月' }, { prop: 'march', label: '3月' }, { prop: 'april', label: '4月' },
      { prop: 'may', label: '5月' }, { prop: 'june', label: '6月' }, { prop: 'july', label: '7月' }, { prop: 'august', label: '8月' },
      { prop: 'september', label: '9月' }, { prop: 'october', label: '10月' }, { prop: 'november', label: '11月' }, { prop: 'december', label: '12月' }],
      month1: [],

      taskStateList: [],
      taskState: '',

      taskSourceList: [],
      taskSource: '',

      leadersList: [],
      leaderUserId: '',

      processState: '',
    }
  },
  mounted() {
    var that = this;
    var date = new Date();
    var yearNum = date.getFullYear();
    var month = date.getMonth() + 1;
    that.endMonth = yearNum + (month < 10 ? ('0' + month) : month + '');
    that.beginMonth = (yearNum - 1) + ((month + 1) < 10 ? ('0' + (month + 1)) : (month + 1) + '');
    that.year = date.getFullYear() + '';
    this.getlistDept();
    this.loadData();
    this.taskTypeData();
    this.taskStateData();
    this.taskSourceData();
    this.getleader();
  },
  methods: {
    // 解决ie9的输入框bug
    againReassignment(item) {
      this.taskName = item.target.value
    },
    loadData() {
      var that = this;
      // if (that.beginMonth > that.endMonth) {
      //   that.$message({ message: '开始时间应小于结束时间', type: 'warning' });
      //   return;
      // }
      // if (that.monthAmount(that.beginMonth, that.endMonth) > 11) {
      //   that.$message({ message: '月份间隔最大为11个月！', type: 'warning' });
      //   return;
      // }
      // if (that.endMonth.slice(0, 4) - that.beginMonth.slice(0, 4) == 1) {
      //   that.month1 = [];
      //   that.month1 = that.month.slice(parseInt(that.beginMonth.slice(4) - 1)).concat(that.month.slice(0, parseInt(that.endMonth.slice(4))));

      // }
      // if (that.endMonth.slice(0, 4) - that.beginMonth.slice(0, 4) == 0) {
      //   that.month1 = [];
      //   that.month1 = that.month.slice(parseInt(that.beginMonth.slice(4) - 1), parseInt(that.endMonth.slice(4)))

      // }
      // var params = { page: that.page, pageCount: that.pageCount, beginMonth: that.beginMonth, endMonth: that.endMonth };
      var params = { page: that.page, pageCount: that.pageCount };
      if (that.responsibleDeptId !== '' && that.responsibleDeptId !== '-1000') {
        params.responsibleDeptId = that.responsibleDeptId;
      };
      if (that.supervisionTaskType !== '') {
        params.supervisionTaskType = that.supervisionTaskType;
      }
      // 督办名称
      if (that.taskName !== '') {
        params.taskName = that.taskName;
      }
      // 任务状态
      if (that.taskState !== '') {
        params.taskState = that.taskState;
      }
      // 督办来源
      if (that.taskSource !== '') {
        params.taskSource = that.taskSource;
      }
      // 分管领导
      if (that.leaderUserId !== '') {
        params.leaderUserId = that.leaderUserId;
      }
      // 年份
      if (that.year !== '') {
        params.year = that.year;
      }
      // 流程状态
      if (that.processState !== '') {
        params.processState = that.processState;
      }
      
      that.loading = true;

      that.$common.commitParam(this, "/supervise/reportform/statisticalReport.api", params, {
        success: function (res) {
          if (res.code == 0) {
            that.loading = false;
            that.tableData = res.data
            that.sum = res.totalCount;
            for (var i = 0; i < res.data.length; i++) {
              that.tableData[i].responsible = res.data[i].responsibleDeptName + '/' + res.data[i].responsibleUserName;
            }
            if (that.month1.length !== 0) {
              for (var i = 0; i < that.month1.length; i++) {
                for (var j = 0; j < res.data.length; j++) {
                  that.tableData[j][that.month1[i].prop] = res.data[j].reportInfos[i]
                }
              }
            }
            // console.log(that.month1);
          } else {
            that.loading = false;
            that.$notify({ title: '提示', message: res.description, type: 'error' });
          }
        }
      }, "get");
    },
    // 任务类型数据
    taskTypeData() {
      var that = this;
      this.$common.commitParam(this, "supervise/dic/options.api", { type: 'supervision_task_type' },
        {
          success: function (res) {
            that.options2 = res.data;
          }
        }, 'get');
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
    monthAmount(date1, date2) {

      var year1 = date1.substr(0, 4);
      var year2 = date2.substr(0, 4);
      var month1 = date1.substr(4, 2);
      var month2 = date2.substr(4, 2);

      var len = (year2 - year1) * 12 + (month2 - month1);

      var day = date2.substr(8, 2) - date1.substr(8, 2);

      if (day > 0) {
        len += 1;
      } else if (day < 0) {
        len -= 1;
      }
      return len;
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
    search() {
      var that = this;
      that.page = 1;
      // if (that.beginMonth > that.endMonth) {
      //   that.$message({ message: '开始时间应小于结束时间', type: 'warning' });
      //   return;
      // }
      // if (that.monthAmount(that.beginMonth, that.endMonth) > 11) {
      //   that.$message({ message: '月份间隔最大为11个月！', type: 'warning' });
      //   return;
      // }
      // if (that.endMonth.slice(0, 4) - that.beginMonth.slice(0, 4) == 1) {
      //   that.month1 = that.month.slice(parseInt(that.beginMonth.slice(4) - 1)).concat(that.month.slice(0, parseInt(that.endMonth.slice(4))));
      // }
      // if (that.endMonth.slice(0, 4) - that.beginMonth.slice(0, 4) == 0) {
      //   that.month1 = that.month.slice(parseInt(that.beginMonth.slice(4) - 1), parseInt(that.endMonth.slice(4)))
      // }
      // var params = { page: that.page, pageCount: that.pageCount, beginMonth: that.beginMonth, endMonth: that.endMonth };
      var params = { page: that.page, pageCount: that.pageCount };
      if (that.responsibleDeptId !== '' && that.responsibleDeptId !== '-1000') {
        params.responsibleDeptId = that.responsibleDeptId;
      };
      if (that.supervisionTaskType !== '') {
        params.supervisionTaskType = that.supervisionTaskType;
      }
      // 督办名称
      if (that.taskName !== '') {
        params.taskName = that.taskName;
      }
      // 任务状态
      if (that.taskState !== '') {
        params.taskState = that.taskState;
      }
      // 督办来源
      if (that.taskSource !== '') {
        params.taskSource = that.taskSource;
      }
      // 分管领导
      if (that.leaderUserId !== '') {
        params.leaderUserId = that.leaderUserId;
      }
      // 年份
      if (that.year !== '') {
        params.year = that.year;
      }
      // 流程状态
      if (that.processState !== '') {
        params.processState = that.processState;
      }
      that.loading = true;

      that.$common.commitParam(this, "/supervise/reportform/statisticalReport.api", params, {
        success: function (res) {
          if (res.code == 0) {
            that.loading = false;
            that.tableData = res.data
            that.sum = res.totalCount;
            for (var i = 0; i < res.data.length; i++) {
              that.tableData[i].responsible = res.data[i].responsibleDeptName + '/' + res.data[i].responsibleUserName;
            }
            if (that.month1.length !== 0) {
              for (var i = 0; i < that.month1.length; i++) {
                for (var j = 0; j < res.data.length; j++) {
                  that.tableData[j][that.month1[i].prop] = res.data[j].reportInfos[i]
                }
              }
            }

          } else {
            that.loading = false;
            that.$notify({ title: '提示', message: res.description, type: 'error' });
          }
        }
      }, "get");
    },
    // 获取搜索区责任部门数据
    getlistDept() {
      var that = this;
      this.$common.commitParam(this, "/supervise/sys/listDept.api", {}, {
        success: function (res) {
          res.data.unshift({ id: '-1000', name: '所有' })
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
    }
  }
}
</script>
<style lang="scss">
.tasksearch {
  height: 100%;
  .tableBox {
    height: calc(100% - 0.9rem);
    // height: 4.8rem;
    padding: 0 0.1rem;
  }
  .my-input1 {
    margin-right: 0.1rem;
    display: inline-block;
    .el-input__inner {
      height: 0.3rem;
    }
  }
  .el-date-editor--year {
    width: 100%;
    .el-input__icon {
      line-height: 31px !important;
    }
  }
  .el-dialog {
    margin: 0 auto;
  }
  // .text1 {
  //   display: inline-block;
  //   width: 60px;
  // }
  .el-date-editor {
    // width: 90% !important;
  }
  .planA {
    display: none;
  }
  .planB {
    display: block;
    margin-top: 0.15rem;
  }
  .searchBtn {
    background: #faa646 !important;
    border-color: #faa646 !important;
    height: 0.3rem;
    margin-bottom: 0.02rem;
  }
  .el-button {
    height: 0.3rem;
  }
  .el-table thead.is-group th {
    background: #fff;
  }
  // .el-table--fit{
  //   height: 98%;
  // }
  .searchBox span {
    font-size: 0.16rem;
    // width: 100%;
  }
  .el-date-editor .el-range-separator {
    width: 8%;
  }
  .el-table__body {
    tr {
      td:nth-child(2) {
        div {
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
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
}
</style>