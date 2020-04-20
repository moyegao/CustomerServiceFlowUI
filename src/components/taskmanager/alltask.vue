<template>
  <div class="alltask">
    <div class="alltaskDetail">
      <div class="table_header" v-if="headerShow">
        <el-button type="primary" size="mini" @click="homepageTableDivClose">返回</el-button>
        &nbsp;&nbsp;{{tabHeaderName}}
        <el-button type="text" size="mini" icon="el-icon-close" style="float: right;border: none;" @click="homepageTableDivClose"></el-button>
      </div>
      <div v-bind:class="{searchBoxShow:show}" class="searchBox clear">
        <div class="my-input1" style="width:19%;margin-left:1%">
          <span class="">责任部门：</span>
          <el-select v-model="value2" clearable size="mini" style="width:60%">
            <el-option label="所有" value=""></el-option>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="my-input1" style="width:20%;">
          <span class="">任务类型：</span>
          <el-select v-model="supervisionTaskType" size="mini" style="width:60%;" clearable>
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="my-input1" style="width:19%" v-if="taskTypeShow">
          <span>任务状态：</span>
          <el-select v-model="value3" clearable size="mini" style="width:60%">
            <el-option label="所有" value=""></el-option>
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="my-input1" style="width:19%" v-if="processStateShow">
          <span>流程状态：</span>
          <el-select v-model="processState" clearable size="mini" style="width:60%">
            <el-option label="所有" value=""></el-option>
            <el-option label="变更中" value="2"></el-option>
            <el-option label="办结中" value="3"></el-option>
          </el-select>
        </div>
        <div class="my-input1" style="width:20%;">
          <span>督办名称：</span>
          <el-input placeholder="请输入内容" v-model="input" @blur="againReassignment" size="mini" clearable style="width:55%;" @keyup.enter.native="search"></el-input>
        </div>

        <el-button class="topbtn" type="primary" size="mini" @click="search" icon="el-icon-search"></el-button>
        <el-button type="primary" size="mini" @click="hidden" icon="el-icon-arrow-down upchange" style="margin-left:.1rem;background:white;color:#3193F6;font-size:.12rem">高级查询</el-button>
        <div :class="{planA: isActive, planB:isActive1}">
          <div class="my-input1" style="width:19%;margin-left:1%">
            <span class="">督办来源：</span>
            <el-select v-model="taskSource" size="mini" style="width:60%;">
              <el-option label="所有" value=""></el-option>
              <el-option v-for="item in taskSourceList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="my-input1" style="width:19%;">
            <span class="">分管领导：</span>
            <el-select v-model="leaderUserId" size="mini" style="width:60%;">
              <el-option label="所有" value=""></el-option>
              <el-option v-for="item in leadersList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="my-input1" style="width:31%">
            <span>开始时间：</span>
            <div style="display:inline-block;width:64%;">
              <el-date-picker :editable="false" v-model="beginMonth" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择月" style="width:40%">
              </el-date-picker> 至
              <el-date-picker :editable="false" v-model="endMonth" size="mini" type="month" unlink-panels format="yyyyMM" value-format="yyyyMM" placeholder="选择月" style="width:40%">
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="tableBox" id="tableBox" style="margin-top:10px;">
        <el-table stripe @cell-click="handleClick" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" :data="tableData3" style="width: 100%; heihgt:92%;">
          <!-- <el-table-column
                type="selection"
                width="55">
              </el-table-column> -->
          <el-table-column type="index" :index="meterIndexMethod" label="NO." width="55">
          </el-table-column>
          <el-table-column prop="taskNum" label="督办编号" width="180" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="taskName" label="督办名称" width="280" show-overflow-tooltip>
            <!-- <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.taskName}}</el-button>
            </template> -->
          </el-table-column>
          <el-table-column prop="taskState" label="督办状态">
          </el-table-column>
          <el-table-column prop="responsibleDeptNames" label="责任单位" show-overflow-tooltip>
          </el-table-column>

          <!-- <el-table-column prop="sourceName" label="督办来源" show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column prop="leaderUserNames" label="分管领导">
          </el-table-column>
          <el-table-column prop="responsibleUserNames" label="责任人">
          </el-table-column>
          <el-table-column prop="sponsorUserName" label="主办人">
          </el-table-column>
          <el-table-column prop="endDate" label="结束时间" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[20, 50, 100, 200,400]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="sum">
          </el-pagination>
        </div>
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
      isTrue: false,
      // isActive: true,
      // isActive1: false,
      windowScreenHeight: window.screen.height - 90,
      windowScreenWidth: window.screen.width,
      loading: true,
      input: '',
      value: [],
      options: [],
      value2: '',
      options1: [],
      options2: [],
      value3: '',
      processState: '',
      // value4: '',
      tableData3: [],
      page: 1,
      pageCount: 20,
      sum: 0,
      addContent: false,
      multipleSelection: [],
      taskTypeShow: true,
      tabHeaderShow: true,
      processStateShow: false,
      tabHeaderName: '',

      alltaskinfoShow: false,
      alltaskinfoId: '',

      beginMonth: '',
      endMonth: '',
      headerShow: false,

      isActive: true,
      isActive1: false,

      taskSourceList: [],
      taskSource: '',

      leadersList: [],
      leaderUserId:'',
    }
  },
  // props: ['parentMessage', 'supervisionTaskType',"show"],
  props: {
    parentMessage: {
      type: Number
    },
    supervisionTaskType: {
      type: String
    },
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    },
    deptId: {
      type: Number
    },
    urlType: {
      type: String
    },
  },
  mounted() {
    this.loadData();
    this.getlistDept();
    // console.log(this.options);
    this.taskStateData();
    this.taskTypeData();
    this.taskSourceData();
    this.getleader();

    // 进行中列表流程类型下拉框显示
    if (this.parentMessage == 1) {
      this.processStateShow = true;
    }

    // 任务状态下拉框与表头标题的隐藏与显示
    if (window.location.href.indexOf('alltaskquery') > -1) {
      localStorage.setItem('taskTypeShow', true);
    }
    if (localStorage.getItem('taskTypeShow') == 'false') {
      this.taskTypeShow = false;
      // 任务总数列表保留任务类型下拉框
      if (localStorage.getItem('tabHeaderName').indexOf('任务总数列表') > -1) {
        this.taskTypeShow = true;
      }
      this.tabHeaderShow = true;
      this.tabHeaderName = localStorage.getItem('tabHeaderName');
    } else {
      this.taskTypeShow = true;
      this.tabHeaderShow = false;
    }
    // // 修改表格高度
    // eventBus.$on('changeHeight', (params) => {
    //   if (params == 'true') {
    //     $('.tabHeaderNoShow > .el-dialog__wrapper > .el-dialog > .el-dialog__body').css('height', '91');
    //   }else{
    //     $('.tabHeaderNoShow > .el-dialog__wrapper > .el-dialog > .el-dialog__body').css('height', 'calc(100% - 102px)');
    //   }
    // });
    // 督办任务打开该页面，隐藏面包屑
    this.headerShow = !this.show;
    if (window.location.href.indexOf('alltaskquery') > -1) {
      eventBus.$emit('breadcrumbBoxShow', false)
      this.headerShow = false;
    }

  },
  watch: {
    cityName: {
      handler(newName, oldName) { },
      deep: true
    }
  },
  methods: {
    // 解决ie9的输入框bug
    againReassignment(item) {
      this.input = item.target.value
    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod(index) {
      return (this.page - 1) * this.pageCount + (index + 1);
    },
    // 将当前复选框被选中的表格数据赋值到multipleSelection数组中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 加载表格数据
    loadData() {

      var that = this;
      var url;
      that.loading = true;
      if (this.$route.path === "/index") {
        url = '/supervise/portal/homePageList.api'
      } else {
        url = '/supervise/taskinfo/list.api'
      }

      var params = { page: that.page, pageCount: that.pageCount };

      if (this.beginMonth != '') {
        params.beginMonth = this.beginMonth;

      };
      if (this.endMonth != '') {
        params.endMonth = this.endMonth;
      };
      if (that.value !== null && that.value.length !== 0) {
        params.beginDate = that.value[0];
        params.endDate = that.value[1];
      };
      if (that.value2 !== '' && that.value2 !== '-1000') {
        params.responsibleDeptId = that.value2
      };
      if (that.value3 !== '' && that.value3 !== '-1000') {
        params.taskState = that.value3
      }
      // if (that.value4 !== '' && that.value4 !== '-1000') {
      //   params.processBgStateId = that.value4
      // };
      if (that.input !== '') {
        params.taskName = that.input
      }
      if (this.supervisionTaskType !== '') {
        params.supervisionTaskType = this.supervisionTaskType;
      }
      // 督办来源
      if (that.taskSource !== '') {
        params.taskSource = that.taskSource;
      }
      // 分管领导
      if (that.leaderUserId !== '') {
        params.leaderUserId = that.leaderUserId;
      }
      // 流程类型(仅进行中存在)
      if (that.processState !== '') {
        params.processState = that.processState;
      }
      if (this.parentMessage === 1) {
        url = '/supervise/portal/getHomePageOngoing.api';
      } else if (this.parentMessage === 3) {
        url = '/supervise/portal/getHomePageNewlyadd.api';
        let date = new Date();
        params.year = date.getFullYear();
      } else if (this.parentMessage == 2) {
        params = { page: that.page, pageCount: that.pageCount, supervisionTaskType: that.supervisionTaskType, type: that.type, id: that.deptId };
        if (this.urlType == "Dept") {
          url = '/supervise/portal/getDeptListDetails.api'
        } else if (this.urlType == "Leader") {
          url = '/supervise/portal/getLeaderListDetails.api'
        }


      }
      // console.log(params);
      this.$common.commitParam(this, url, params, {
        success: function (res) {

          if (res.code === 0) {
            that.loading = false;
            that.tableData3 = res.data;
          }
          if (res.totalCount == "") {
            that.sum = 0;
          } else {
            that.sum = res.totalCount;
          }


        }
      }, "get");
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
    openWindow(url, name, iWidth, iHeight) {
      window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ', width=' + iWidth + ',innerWidth=' + iWidth + ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizeable=no,location=no,status=no');
    },
    handleClick(row, column) {
      // console.log(row, column); column.label === '督办编号' ||
      if (column.label === '督办名称') {
        this.alltaskinfoShow = true;
        this.alltaskinfoId = row.id;
        // this.openWindow('#/alltaskinfo?id=' + row.id, '任务详情', this.windowScreenWidth, this.windowScreenHeight);
      }

    },
    // hidden() {
    //   if (this.isActive == true) {
    //     this.isActive = false;
    //     this.isActive1 = true;
    //   } else {
    //     this.isActive = true;
    //     this.isActive1 = false;
    //   }
    // },
    //显示div
    hidden() {
      if (this.isActive == true) {
        $('.upchange').addClass('el-icon-arrow-up').removeClass('el-icon-arrow-down')
        this.isActive = false;
        this.isActive1 = true;
        $('.el-table--fit').css('height', '90.5%');
      } else {
        $('.upchange').addClass('el-icon-arrow-down').removeClass('el-icon-arrow-up')
        this.isActive = true;
        this.isActive1 = false;
        $('.el-table--fit').css('height', '100%');
      }
    },
    // 关闭mian的homepageTableDiv
    homepageTableDivClose() {
      eventBus.$emit('homepageTableDivClose', false)
    },
    // 获取搜索区责任部门数据
    getlistDept() {
      var that = this;
      this.$common.commitParam(this, "/supervise/sys/listDept.api", {}, {
        success: function (res) {
          // res.data.unshift({ id: '-1000', name: '所有' })
          for (var i = 0; i < res.data.length; i++) {
            var values = {};
            values.value = res.data[i].id;
            values.label = res.data[i].name;
            that.options.push(values);
          }
        }
      }, "get");
    },
    // 任务状态
    taskStateData() {
      var that = this;
      this.$common.commitParam(this, "supervise/dic/options.api", { type: 'task_state' },
        {
          success: function (res) {
            that.options1 = [];
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].label == '执行中' || res.data[i].label == '已办结') {
                that.options1.push(res.data[i]);
              }

            }
          }
        }, 'get');
    },
    // 任务类型
    taskTypeData() {
      var that = this;
      this.$common.commitParam(this, "supervise/dic/options.api", { type: 'supervision_task_type' },
        {
          success: function (res) {
            that.options2 = res.data;
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
    // 搜索
    search() {
      // this.loadData();
      var that = this;
      that.page = 1;
      that.loading = true;
      var url;
      if (this.$route.path === "/index") {
        url = '/supervise/portal/homePageList.api'
      } else {
        url = '/supervise/taskinfo/list.api'
      }

      var params = { page: that.page, pageCount: that.pageCount };
      if (that.value !== null && that.value.length !== 0) {
        params.beginDate = that.value[0];
        params.endDate = that.value[1];
      };
      if (that.value2 !== '' && that.value2 !== '-1000') {
        params.responsibleDeptId = that.value2
      };
      if (that.value3 !== '' && that.value3 !== '-1000') {
        params.taskState = that.value3
      }
      if (that.input !== '') {
        params.taskName = that.input
      }
      if (this.supervisionTaskType !== '') {
        params.supervisionTaskType = this.supervisionTaskType;
      }
      if (this.beginMonth != '') {
        params.beginMonth = this.beginMonth;

      };
      if (this.endMonth != '') {
        params.endMonth = this.endMonth;
      };

      // 督办来源
      if (that.taskSource !== '') {
        params.taskSource = that.taskSource;
      }
      // 分管领导
      if (that.leaderUserId !== '') {
        params.leaderUserId = that.leaderUserId;
      }
      // 流程类型(仅进行中存在)
      if (that.processState !== '') {
        params.processState = that.processState;
      }

      if (this.parentMessage === 1) {
        url = '/supervise/portal/getHomePageOngoing.api';
      } else if (this.parentMessage === 3) {
        url = '/supervise/portal/getHomePageNewlyadd.api';
        let date = new Date();
        params.year = date.getFullYear();
      }
      this.$common.commitParam(this, url, params, {
        success: function (res) {
          that.tableData3 = res.data;
          that.sum = res.totalCount;
          if (res.code === 0) {
            that.loading = false
          }
        }
      }, "get");
      // this.search()
    },
    //关注
    // attention(){
    //   var that = this;
    //   if(that.multipleSelection.length == 0){
    //     this.$message({
    //       message: '请选择！',
    //       type: 'warning'
    //     });
    //     return;
    //   }
    //   var id = '';
    //   for(var i = 0;i < that.multipleSelection.length; i++){
    //     if(id == ''){
    //       id = that.multipleSelection[i].id;
    //     }else{
    //       id = id + ',' + that.multipleSelection[i].id;
    //     }
    //     for(var j=0;j<that.tableData3.length;j++){
    //       if(that.multipleSelection[i].id == that.tableData3[j].id){
    //         $('#tableBox .el-table__body-wrapper tbody>tr:nth-child(' + (j + 1) + ')').css('color','rgb(128, 128, 255)');
    //       }
    //     }
    //   }
    //   this.$common.commitParam(this,"/supervise/myattention/add.api",{"id":id},
    //   {
    // 		success : function(res) {
    //       that.$message({message: '关注成功！', type: 'success'});
    // 		}
    // 	  },"post", false);
    // },
    tableRowClassName({ row, rowIndex }) {
      if (row.attentionId === 1) {
        return 'focus-row';
      }
      return '';
    }
  }
}
</script>

<style lang="scss">
.el-table .focus-row {
  color: rgb(128, 128, 255);
}
.alltask {
  height: 100%;
  .el-input--suffix .el-input__inner {
    padding-right: 18px;
  }
  .searchBoxShow {
    display: none;
  }
  .alltaskDetail {
    height: 100%;
    .block {
      height: 0.38rem;
      margin-right: 10px;
      margin-top: .1rem;
      .el-pagination {
        text-align: right;
        padding: 5px;
      }
    }
    .tableBox {
      height: calc(100% - 90px);
      padding: 0 10px;
      .el-table {
        height: 100%;
      }
      .el-table__body-wrapper {
        overflow-y: auto;
        height: calc(100% - 0.38rem);
      }
    }
    .el-dialog__header {
      padding: 0 !important;
    }
    .el-dialog__body {
      padding: 0px;
      height: 100%;
    }
  }
  .my-input1 {
    margin-right: 5px;
    float: left;
    .el-input__inner {
      // width: 1.8rem;
      height: 0.3rem;
    }
  }
  .my-input {
    width: 45%;
    display: inline-block;
    margin-bottom: 10px;
    margin-right: 5px;
  }
  // .el-dialog {
  //   margin: 0 auto;
  // }
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
  // .el-dialog {
  //   // width: 79%;
  //   // margin: 0 auto;
  //   // height: 98%;
  //   width: 70% !important;
  //   margin: 0 auto;
  //   height: 6.6rem;
  //   margin-top: 0.1rem !important;
  //   // padding: 0px 20px !important;
  // }
  .el-dialog__wrapper .el-dialog__header {
    border-bottom: 1px solid #ebeef5;
  }
  .el-dialog__body {
    // padding: 0px 20px 0px 20px !important;
    // height:5rem;
  }
  .el-dialog__footer {
    height: 0.5rem;
  }
  .el-dialog__footer .el-button--mini {
    background: #fff;
    border: rgb(209, 207, 207) 1px solid;
    color: black;
  }
  .my-input .el-input {
    width: calc(100% - 80px);
  }
  .my-input .el-select .el-input {
    width: 100%;
  }
  .text1 {
    display: inline-block;
    width: 60px;
  }
  .text {
    text-align: right;
    display: inline-block;
    width: 80px;
  }
  .planA {
    display: none;
  }
  .planB {
    display: block;
    margin-top: 15px;
  }
  .is-leaf {
    font-size: 0.18rem;
  }
  .el-table {
    font-size: 0.16rem;
  }
  font {
    font-size: 0.16rem;
  }
  span {
    font-size: 0.16rem;
  }
  .el-button--primary {
    // margin-right: 20%;
  }
  .el-button--mini {
    font-size: 0.14rem;
    height: 0.3rem;
  }
  td {
    // padding: 5px 0px;
  }
  .table_header {
    font-size: 0.16rem;
    font-weight: bolder;
    // height: 0.4rem;
    border-bottom: 1px solid #ebeef5;
    // margin-bottom: 1%;
    // line-height: 0.4rem;
    padding: 10px 20px 10px;
    .el-button {
      color: black;
      background: white;
      border-color: #d3d4d6;
    }
    .el-button:hover {
      color: black;
      background: white;
      border-color: #d3d4d6;
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
  .el-dialog__body {
    padding: 0px 20px !important;
    // height: 100%;
    height: 5.5rem !important;
  }
  .el-table th,
  .el-table td {
    padding: 0px 0 !important;
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
}
@media screen and (max-width: 1366px) {
  .alltask .el-dialog__body {
    padding: 0px 20px !important;
    height: 4.8rem !important;
  }
  .alltask .dialogBox > .el-dialog__wrapper > .el-dialog {
    width: 80% !important;
    margin: 0 auto;
    height: 5.5rem;
    margin-top: 0.38rem !important;
  }
}
</style>
