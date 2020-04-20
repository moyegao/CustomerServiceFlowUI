<template>
  <div class="userList">
    <div class="head" style="margin-left: 1%;">
      <el-row>
        <span class="demonstration">用户名:</span>
        <el-input class="inputQ" style="width:200px;margin-bottom: 5px;margin-right: 1%;" placeholder="请输入查询内容" v-model="SchName" @blur="againReassignment" clearable size="mini" @keyup.enter.native="search">
        </el-input>
        <el-button style="margin-right: 50px;" type="primary" @click="search" size="mini" class="searchBtn" icon="el-icon-search"></el-button>
        <el-button v-loading.fullscreen.lock="orgLoading" element-loading-text="正在更新组织架构..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" type="primary" size="mini" @click="organizationalUpdate" style="background: #47B5E8;float: right;margin-right:.25rem">更新组织架构</el-button>
      </el-row>

    </div>

    <div class="main" style="padding: 0 10px;">
      <el-table stripe :data="tableData" v-loading="loading" height="100%" style="width: 100%" align="center" :row-style="tableRowStyle">
        <el-table-column label="NO." type="index" :index="indexMethod" width="55">
        </el-table-column>
        <el-table-column prop="name" label="用户名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="deptName" label="部门" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="regName" label="所属公司">
        </el-table-column>
        <el-table-column prop="authority" label="公司权限" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="caozuo" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="mini">
              修改权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20,100, 200, 300, 400]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :close-on-click-modal="false" title="公司权限选择" :visible.sync="showReportDiolog" @close="reset('ruleForm')">
      <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
        <el-checkbox-group v-model="checkedComp" @change="handleCheckedCompanyChange">
          <el-checkbox class="companyCbox" v-for="item in arr" v-model="item.judge" :label="item.name" :key="item.value" border></el-checkbox>
        </el-checkbox-group>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div class="sub" style="text-align:center;">
          <el-button type="primary" size="mini" @click="formconfirm()" style="background:#297ACC;border-color:#297ACC">确 定</el-button>
          <el-button @click="reset('ruleForm')" size="mini">返 回</el-button>
        </div>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //开始时间，结束时间
      beginDate: '',
      endDate: '',
      //查询框-日期
      valueDate: [],
      //查询框-输入框
      condition: '',
      //查询框-查询条件 input框
      queryCondition: '',
      //查询框-查询条件 input框 接收人
      name: '',
      //表格值
      tableData: [],
      orgLoading: false,
      //查询条件
      options: [{
        value: "userName",
        label: '接收人'
      }, {
        value: "supervisionTaskNum",
        label: '督办编号'
      }, {
        value: "remindInfo",
        label: '提醒事宜'
      }, {
        value: "remindTarget",
        label: '提醒对象'
      }],
      //表格字段
      superID: '',
      remindObject: '',
      remindWay: '',
      remindAffairs: '',
      sender: '',
      sendTime: '',
      phoneNumber: '',
      email: '',
      received: '',
      //分页
      //总条数
      total: 0,
      //当前页面展示多少条
      pageSize: 20,
      //当前页数
      currentPage: 1,
      //加载条
      loading: true,
      showReportDiolog: false,
      //修改表单显隐
      ruleForm: {

      },
      msg: '',
      cmybox: '',
      arr: [],
      checkedComp: [],
      isIndeterminate: true,
      keyV: '',
      SchName: '',
    };
  },
  //加载页面就渲染页码数据
  mounted() {
    this.tableValue();
  },
  methods: {
    // 解决ie9的输入框bug
    againReassignment(item) {
      this.SchName = item.target.value
    },
    //加载表格数据
    tableValue(name) {
      var that = this;
      that.loading = true;
      var params = { page: that.currentPage, pageCount: that.pageSize }
      if (name != '') {
        params.name = name;
      }
      this.$common.commitParam(this, '/supervise/sys/listSysUser.api', params, {
        success: function (res) {
          if (res.code == 0) {
            that.loading = false
            that.tableData = res.data
            that.total = parseInt(res.totalCount);
          } else {
            that.loading = false;
            that.$message({
              message: res.description,
              type: 'warning'
            });
          }
        }
      }, "get");
    },
    //分页方法 获取页码，每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.tableValue();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tableValue();
    },
    //序号连续       
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + (index + 1);
    },
    // 点击任务汇报按钮事件
    handleEdit(index, rews) {
      var that = this;
      let array = rews.authority.split(',');
      that.checkedComp = array;
      that.arr = []
      this.$common.commitParam(this, '/supervise/sys/listCompany.api', { page: 1, pageCount: 100 }, {
        success: function (res) {
          if (res.code == 0) {
            that.cmybox = rews.id;
            res.data.map(function (i, j) {
              var x = {
                value: i.key,
                name: i.name,
                judge: false
              }
              that.arr.push(x);
            })
          } else {
            that.$message({
              message: res.description,
              type: 'warning'
            });
          }
        }
      }, "get");
      that.showReportDiolog = true;

    },
    //表单的确认按钮
    formconfirm() {
      var that = this;
      var params = {
        userId: that.cmybox,
        key: that.keyV
      }
      this.$common.commitParam(this, '/supervise/sys/insertTenant.api', params, {
        success: function (res) {
          if (res.code == 0) {
            that.$message({
              message: res.description,
              type: 'success'
            });
            that.tableValue();
          } else {
            that.$message({
              message: res.description,
              type: 'warning'
            });
          }
        }
      }, "post", false);
      this.showReportDiolog = false;
    },
    //更新组织架构按钮
    organizationalUpdate() {
      var that = this;
      that.orgLoading = true;
      this.$common.commitParam(this, '/supervise/organizational/updateOrganizationa.api', {}, {
        success: function (res) {
          that.orgLoading = false;
          if (res.code == 0) {
            that.$message({
              message: res.description,
              type: 'success'
            });
          } else {
            that.$message({
              message: res.description,
              type: 'warning'
            });
          }
        }
      }, "get");
    },
    //清空表单
    reset(formName) {

      this.$refs[formName].resetFields();
      this.showReportDiolog = false;
    },
    //勾选之后 存值
    handleCheckedCompanyChange(val) {
      // 
      // this.cmybox='';
      var keys = [];
      this.arr.map((i, j) => {
        val.map((x, y) => {
          if (i.name == x) {
            keys.push(i.value);
          }
        })
      })
      // this.cmybox=val.join();
      this.keyV = keys.join();
    },
    //查询框 根据用户名查询并重置页码
    search() {
      this.currentPage = 1;
      this.tableValue(this.SchName);
    },
    // 修改table tr的样式
    tableRowStyle({ row, rowIndex }) {
      return 'font-size:18px;'
    },
    // 修改table header的样式
    // tableHeaderColor({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex === 0) {
    //     return 'color: #000;font-weight: 1000;font-size:20px;'
    //   }
    // }

  },
};
</script>

<style lang="scss">
.userList {
  height: 100%;
  html,
  body {
    height: 100%;
    overflow: hidden;
  }
  .head span {
    font-size: 0.16rem;
  }
  .head {
    width: 100%;
    .el-input--mini .el-input__inner {
      height: 0.3rem;
      line-height: 0.3rem;
    }
  }
  .main {
    height: 85%;
    border-bottom: none;
  }
  .footer {
    width: 100%;
    bottom: 0;
    margin: 0.1rem 0px 0px 1px;
  }
  .body {
    height: 100%;
    overflow: hidden;
  }
  .demonstration {
    margin-right: 10px;
  }
  .date_box {
    margin: 0px 50px 0px 10px;
    width: 37%;
    font-size: 12px;
    float: left;
  }
  .query_box {
    width: 15%;
    float: left;
    margin: 0px 41px 0px -36px;
  }
  .box1 {
    width: 15%;
    float: left;
    margin: 0px 10px 0px -27px;
  }
  th {
    text-align: center;
  }
  .is-leaf {
    font-size: 18px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-dialog__header {
    padding: 20px 20px 10px;
    border-bottom: 1px solid #ebeef5;
  }
  .el-dialog__footer {
    height: 0.8rem;
    padding: 20px 20px 10px;
    .el-button {
      height: 0.38rem;
      width: 0.9rem;
    }
  }
  .el-dialog {
    width: 70% !important;
    margin-top: 0.4rem !important;
  }
  .el-dialog__body {
    height: 4rem;
    overflow: auto;
  }
  // .el-form{
  //   height: 0.5rem;
  // }
  .companyCbox {
    margin-bottom: 10px;
  }
  .el-checkbox-group {
    text-align: center;
  }
  .el-form-item__content {
    text-align: center;
  }
  .test {
    margin-top: 30px;
    margin-bottom: 0px;
  }
  .footer .el-pagination {
    text-align: center;
  }
  .el-button--mini {
    font-size: 0.16rem;
  }
  .searchBtn {
    color: white !important;
    background: #faa646 !important;
    border-color: #faa646 !important;
    height: 0.3rem;
  }
  td {
    padding: 5px 0px;
  }
  .el-pagination {
    padding: 0 10px;
  }
  .el-table td,
  .el-table th {
    padding: 0px 0;
    text-align: center;
    // height: .5rem;
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
.el-table__row {
  td:not(.is-hidden):last-child {
    right: -1px;
  }
}
@media screen and (max-width: 1366px) {
  .userList .main {
    height: 81% !important;
    border-bottom: none;
  }
}
</style>