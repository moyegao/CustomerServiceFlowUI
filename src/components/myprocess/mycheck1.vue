<template>
  <!-- 我发起的 -->
  <div class="pending1">
    <div class="searchBox">
      <!-- <el-radio v-model="radio" label="1" style="margin-left:20px;">待审批</el-radio>
      <el-radio v-model="radio" label="2" style="margin-right:20px;">已审批</el-radio> -->
      <!-- <div class="my-input1" style="width:23%;margin-left:10px;">
        <span>日期：</span>
        <div class="block" style="display:inline-block;width:calc(100% - 36px);">
          <el-date-picker size="mini" v-model="value" type="daterange" align="right" format="yyyy-MM-dd" value-format="yyyy-MM-dd" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%;">
          </el-date-picker>
        </div>
      </div> -->
      <div class="my-input1" style="width:20%;">
        <span style="width:0.9rem;">督办名称：</span>
        <el-input placeholder="请输入内容" v-model="input" @blur="againReassignment" size="mini" clearable style="width:60%;" @keyup.enter.native="search">
        </el-input>
      </div>
      <el-button type="primary" size="mini" class="topbtn" @click="search" icon="el-icon-search"></el-button>
    </div>
    <div class="tableBox" id="tableBox" style="margin-top:15px;">
      <el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="tableData" height="100%" style="width: 100%; height:92%;">
        <el-table-column type="index" :index="meterIndexMethod" label="NO." width="100">
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
        <!-- <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">查看流程图</el-button>
            <el-button @click="Approval(scope.row)" type="primary" size="small">审批</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="block" style="margin-top:10px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[20,50, 100, 200]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="sum">
        </el-pagination>
      </div>
      <div>
        <el-dialog :close-on-click-modal="false" :visible.sync="addContent">
          <div class="svgmap" align="center"></div>
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
  },
  methods: {
    // 解决ie9的输入框bug
    againReassignment(item){
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
        params.title = that.input
      }
      this.$common.commitParam(this, "/supervise/workflow/myapply.api", params, {
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
      var params = { page: that.page-1, pageCount: that.pageCount };
      if (that.input !== '') {
        params.title = that.input;
      }
      that.tableData = [];
      this.$common.commitParam(this, "/supervise/workflow/myapply.api", params, {
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

      this.alltaskinfoShow = true;
      this.alltaskinfoId = row.id;
      // window.open('#/alltaskinfo?id=' + row.id, '任务审批', 'height=' + that.windowScreenHeight + ',innerHeight=' + that.windowScreenHeight + ', width=' + that.windowScreenWidth + ',innerWidth=' + that.windowScreenWidth + ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizeable=no,location=no,status=no')
    },
    // 点击查看流程图
    handleClick(row) {
      var that = this;
      var id = row.id;
      var formId = row.formId;
      var processKey = row.processKey;
      this.$common.commitParam(this, "/supervise/workflow/workflowsvg.api", { "id": id, "formId": formId, "processKey": processKey }, {
        success: function (res) {
          that.addContent = true;
          // 
          that.$nextTick(() => {
            $('.svgmap').html(res.data.data);
          });

        }
      }, "get");
    },
    //审批按钮
    Approval(row) {
      var that = this
      this.$common.commitParam(this, "/supervise/workflow/form.api", { "taskId": row.taskId, "processKey": row.processKey }, {
        success: function (res) {
          //;
          that.$router.push(res.data + '?id=' + row.id + '&taskId=' + row.taskId + '&processId=' + row.processId);
        }
      }, "get");
    }
  }
}
</script>

<style lang="scss">
.pending1 {
  height: 100%;
  .tableBox {
    height: calc(100% - 0.9rem);
    padding: 0 10px;
    .el-table {
      height: 96%;
    }
  }
  span {
    font-size: 0.16rem;
  }
  .is-leaf {
    font-size: 18px;
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
    height: 90%;
    width: 80%;
  }
  .el-dialog__body {
    // height: calc(100% - 113px);
    height: 5.5rem;
    padding: 0px 20px;
  }
  .rewApproval {
    .el-dialog__body {
      height: calc(100% - 113px);
      padding: 10px 20px;
    }
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
    // height: calc(100% - 97px);
    td {
      padding: 2px 5px;
      height: 0.38rem;
    }
    // padding: 0px 20px 0px 20px !important;/
    // height: 5rem;
  }
  // .dialogBox .el-dialog__footer {
  //   height: 0.5rem;
  // }
  .dialogBox .el-dialog__footer .el-button--mini {
    background: #fff;
    border: rgb(209, 207, 207) 1px solid;
    color: black;
  }
  .svgmap {
    height: 100%;
    overflow: hidden;
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
    // margin-right: 0.9rem;
    background: #faa646;
    border-color: #faa646;
    height: 0.3rem;
  }
  .el-button--mini {
    font-size: 16px;
  }
  td {
    padding: 0px 0px;
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
    // height: .5rem;
  }
  .el-table td,
  .el-table th {
    padding: 0 0 !important;
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
}
</style>