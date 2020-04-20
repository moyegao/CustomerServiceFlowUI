<template>
  <div class="companyList">
    <div class="main">
      <!-- {{msg}} -->
      <el-row style="text-align: right;margin: 1px 10px 10px 0px;">
        <el-button type="primary" size="mini" @click="add" class="addbtn" icon="el-icon-plus">新建</el-button>
      </el-row>
      <el-table stripe :data="tableData" v-loading="loading" height="91%" style="width: 100%" align="center" :row-style="tableRowStyle">
        <el-table-column label="NO." type="index" :index="indexMethod" width="55px">
        </el-table-column>
        <el-table-column prop="id" label="公司ID" width="" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="name" label="公司名称" width="" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="key" label="key" width="" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="abbreviation" label="公司简称" width="" show-overflow-tooltip>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="delet(scope.$index, scope.row)" type="text" size="mini" class="init">
              初始化
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20,100, 200, 300, 400]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :close-on-click-modal="false" :visible.sync="showReportDiolog" @close="reset('ruleForm')" title="增加">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <!-- <el-form-item label="公司ID" :label-width="formLabelWidth" prop="regId">
          <el-input v-model="ruleForm.regId" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="公司名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="key" :label-width="formLabelWidth" prop="key">
          <el-input v-model="ruleForm.key" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司简称" :label-width="formLabelWidth" prop="abbreviation">
          <el-input v-model="ruleForm.abbreviation" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" @click="formconfirm('ruleForm')" size="mini" style="background:#297acc;">确 定</el-button>
        <el-button @click="reset('ruleForm')" size="mini">返 回</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    // var ruleregId = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('id不能为空'))
    //   }
    //   var reg = /^[1-9]\d*$/
    //   var regExp = new RegExp(reg)
    //   if (!regExp.test(value)) {
    //     return callback(new Error('id仅由整数组成'));
    //   }
    //   callback();
    // };
    return {
      tableData: [],
      //表格字段
      regId: '',
      name: '',
      key: '',
      abbreviation: '',
      //分页
      //总条数
      total: 0,
      //当前页面展示多少条
      pageSize: 20,
      //当前页数
      currentPage: 1,
      //加载条
      loading: true,
      loading1: false,
      showReportDiolog: false,
      //修改表单显隐
      ruleForm: {
        abbreviation: '',
        name: '',
        key: '',
        regId: ''
      },
      //表单验证
      rules: {
        // regId: [
        //   { required: true, trigger: 'blur', validator: ruleregId },
        // ],
        name: [
          { required: true, trigger: 'blur', message: "公司名称不能为空" },
        ],
        key: [
          { required: true, trigger: 'blur', message: "key不能为空" },
        ]
      },
      msg: '',
      arr: [],
      //表单label样式
      formLabelWidth: '140px',
    };
  },
  //加载页面就渲染页码数据
  mounted() {
    this.tableValue();
  },
  methods: {
    //加载表格数据
    tableValue() {
      var that = this;
      var params = {        page: that.currentPage,
        pageCount: that.pageSize      }
      this.$common.commitParam(this, '/supervise/sys/listCompany.api', params, {
        success: function (res) {
          if (res.code == 0) {
            that.loading = false
            that.tableData = res.data
            that.total = res.totalCount;
            that.msg = res;
          } else {
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

    //表单的确认按钮
    formconfirm(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {  //表单验证
      
        if (valid) {
          var params = {
            abbreviation: this.ruleForm.abbreviation,
            name: this.ruleForm.name,
            key: this.ruleForm.key
          }
         
          that.$common.commitParam(this, '/supervise/sys/insertCompany.api', params, {
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
          }, "post");
          this.showReportDiolog = false;
        } else {
          that.$message({
            message: "请将表单填充完整",
            type: 'warning'
          });
        }
      });
    },
    //清空表单
    reset(formName) {
      this.$refs[formName].resetFields();
      this.showReportDiolog = false;
    },
    add() {
      this.showReportDiolog = true;
    },
    delet(index, row) {
      var that = this;
      this.$confirm('是否确定初始化？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = { id: row.id };
        that.loading = true;
        this.$common.commitParam(this, '/supervise/sys/authorityInit.api', params, {
          success: function (res) {
            //;
            if (res.code == 0) {
              that.loading = false;
              that.$message({
                message: res.description,
                type: 'success'
              });
            } else if (res.code == -1) {
              that.loading = false;
              that.$message({
                type: 'info',
                message: res.description
              });
            }
            // if (res.code == 0) {
            //   that.$message({
            //     message: res.description,
            //     type: 'success'
            //   });
            //   that.tableValue();
            // } else {
            //   that.$message({
            //     message: res.description,
            //     type: 'warning'
            //   });
            // }
          }
        }, "get", false);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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
  }
};
</script>

<style lang="scss">
.companyList {
  height: 100%;
  html,
  body {
    height: 100%;
    overflow: hidden;
  }
  .head {
    width: 100%;
  }
  .main {
    // margin-top: 15px;
    height: calc(100% - 35px);
    border-bottom: 1px solid #E4E7ED;
    padding: 0 10px;
  }
  .footer {
    width: 100%;
    bottom: 0;
    margin: 2px 4px 0px 1px;
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
  .is-leaf {
    font-size: .12rem;
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
    border-bottom: 1px solid #ebeef5 !important;
  }
  .el-dialog {
    width: 50% !important;
  }
  .companyCbox {
    margin-bottom: 10px;
  }
  .addbtn {
    width: 80px;
    height: 35px;
    font-size: 17px;
    background: #47b5e8;
    border-color: #47b5e8;
  }
  .el-tooltip {
    font-size: .16rem;
  }
  .is-leaf .cell {
    font-size: .16rem;
  }
  .init span {
    font-size: 16px;
  }
  .el-form-item__label {
    font-size: 16px;
  }
  .el-button span {
    font-size: 16px;
  }
  .el-table .cell,{
    height: .34rem !important;
    line-height: .34rem !important;
  }
  .el-table th{
    padding:0 !important;
    background: #fafafa;
    div{
      color:#333;
    }
  }
  .el-table td{
    padding:0px 0 !important;
  }
}
</style>