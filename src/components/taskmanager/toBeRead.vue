<template>
  <div class="toBeRead">
    <div class="alltaskDetail">
      <div class="table_header">
        <el-button type="primary" size="mini" @click="toBeReadClose">返回</el-button>
        &nbsp;&nbsp;审计整改汇报汇总
        <el-button type="text" size="mini" icon="el-icon-close" style="float: right;border: none;" @click="toBeReadClose"></el-button>
      </div>
      <div class="searchBox clear">
        <div class="my-input1" style="width:19%;;margin-left:1%">
          <span>任务名称：</span>
          <el-input placeholder="请输入内容" v-model="input" size="mini" clearable style="width:65%;" @keyup.enter.native="search"></el-input>
        </div>
        <el-button class="topbtn" type="primary" size="mini" icon="el-icon-search" @click="search"></el-button>
      </div>

      <div class="tableBox" id="tableBox" style="margin-top:10px;">
        <el-table stripe @cell-click="handleClick" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" :data="tableData" style="width: 100%; heihgt:92%;">
          <el-table-column type="index" :index="meterIndexMethod" label="NO." width="55">
          </el-table-column>
          <el-table-column prop="taskName" width="180" label="任务名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="reportUser" width="100" label="汇报人" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="progress" width="100" label="汇报进度" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="monthId" width="100" label="汇报年月" show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column prop="reportInfo" max-width="300" label="汇报内容" show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column prop="reportInfo" label="汇报内容">
            <template slot-scope="scope">
              <span id="reportInfo" v-html="scope.row.reportInfoMark"></span>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[20, 50, 100, 200,400]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="sum">
          </el-pagination>
        </div>
      </div>

    </div>
    <!-- <span class="dialogBox">
      <el-dialog :close-on-click-modal="false" :visible.sync="alltaskinfoShow" title="任务详情">
        <alltaskinfo v-if="alltaskinfoShow" :alltaskinfoId='alltaskinfoId'></alltaskinfo>
      </el-dialog>
    </span> -->
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
      loading: false,
      input: '',
      tableData: [],
      page: 1,
      pageCount: 20,
      sum: 0,
      multipleSelection: [],

      alltaskinfoShow: false,
      alltaskinfoId: '',
    }
  },
  props: ['toBeReadNeedData'],
  mounted() {
    this.init()
  },
  watch: {
    cityName: {
      handler(newName, oldName) { },
      deep: true
    }
  },
  methods: {
    // 初始化
    init() {
      var that = this;
      var url;
      that.loading = true;

      var params = { page: that.page, pageCount: that.pageCount };
      url = '/supervise/report/listReport.api'
      this.$common.commitParam(this, url, params, {
        success: function (res) {

          if (res.code === 0) {
            that.loading = false;
            that.tableData = res.data;
          }
          if (res.totalCount == "") {
            that.sum = 0;
          } else {
            that.sum = Number(res.totalCount);
          }
          that.deleteTobeRead()
        }
      }, "post");
    },
    // 查询
    search() {
      var that = this;
      that.page = 1;
      var url;
      that.loading = true;

      var params = { page: that.page, pageCount: that.pageCount };
      if (that.input !== '') {
        params.taskName = that.input
      }
      url = '/supervise/report/listReport.api'
      this.$common.commitParam(this, url, params, {
        success: function (res) {
          that.tableData = res.data;
          that.sum = Number(res.totalCount);
          if (res.code === 0) {
            that.loading = false
          }
        }
      }, "post");
    },
    deleteTobeRead(){
      var that = this;
      this.$common.commitParam(this, "/supervise/workflow/deleteTobeRead.api", { "id": that.toBeReadNeedData.id }, {
        success: function (res) {}
      }, "get");
    },
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
      if (column.label === '督办名称') {
        this.alltaskinfoShow = true;
        this.alltaskinfoId = row.id;
      }

    },
    // 关闭mian的toBeReadClose
    toBeReadClose() {
      eventBus.$emit('toBeReadClose', false)
    },
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
.toBeRead {
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
      margin-top: 0.1rem;
      .el-pagination {
        text-align: right;
        padding: 5px;
      }
    }
    .tableBox {
      height: calc(100% - 90px);
      padding: 0 10px;
      .el-table {
        height: 80%;
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
  // #reportInfo {
  //   font-size: 0.13rem;
  //   span {
  //     font-size: 0.13rem;
  //   }
  // }
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
      td:nth-child(2) {
        div {
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          // color: #056dae;
          // cursor: pointer;
          // font-weight: bolder;
        }
      }
      td:nth-child(6) {
        div {
          text-align: left;
          line-height: 0.27rem !important;
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
    // height: 0.34rem !important;
    // line-height: 0.34rem !important;
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
  .toBeRead .el-dialog__body {
    padding: 0px 20px !important;
    height: 4.8rem !important;
  }
  .toBeRead .dialogBox > .el-dialog__wrapper > .el-dialog {
    width: 80% !important;
    margin: 0 auto;
    height: 5.5rem;
    margin-top: 0.38rem !important;
  }
}
</style>
