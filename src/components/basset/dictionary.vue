<template>
  <div class="dictionary">
    <div class="head">
      <el-row>
        <el-select class="searchType" v-model="searchType" placeholder="请选择搜索类型">
          <el-option label="类型" value=type></el-option>
          <el-option label="key" value=key></el-option>
          <el-option label="value" value=value></el-option>
        </el-select>
        <el-input placeholder="请输入搜索内容" v-model="input" @blur="againReassignment" size="mini" clearable style="width:3.00rem;" @keyup.enter.native="search">
        </el-input>
        <el-button class="el-icon-search" type="primary" size="mini" @click="search"></el-button>
        <el-button class="el-icon-plus" type="primary" size="mini" @click="formtype(1, '')">新建</el-button>
      </el-row>
    </div>
    <div class="main" style="padding: .1rem .10rem 0;">
      <template>
        <el-table stripe ref="multipleTable" :data="tableData" v-loading="loading" tooltip-effect="dark" height="100%" style="width: 100%;">
          <el-table-column label="NO." type="index" :index="meterIndexMethod" width="55"></el-table-column>
          <el-table-column label="类型" prop="type"></el-table-column>
          <el-table-column prop="key" label="key"></el-table-column>
          <el-table-column prop="value" label="value" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="comments" label="描述" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="stateId" label="是否启用" show-overflow-tooltip :formatter="formatter"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="formtype(2, scope.row)">修改</el-button>
              <!-- <el-button type="text" size="mini" @click="remove(scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="block" style="margin-top:.10rem;padding: 0 .10rem;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[20]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="sum">
      </el-pagination>
    </div>
    <el-dialog :close-on-click-modal="false" width="50%" :title="msg" :visible.sync="dialogFormVisible" @close="reset('ruleForm')">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="type" :label-width="formLabelWidth" prop="type">
          <el-input v-model="ruleForm.type" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="key" :label-width="formLabelWidth" prop="key">
          <el-input v-model="ruleForm.key" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="value" :label-width="formLabelWidth" prop="value">
          <el-input v-model="ruleForm.value" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="comments">
          <el-input v-model="ruleForm.comments" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth" prop="stateId">
          <el-select v-model="ruleForm.stateId" placeholder="请选择是否启用">
            <el-option label="启用" value=0></el-option>
            <el-option label="停用" value=1></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="formconfirm('ruleForm')" size="mini">确 定</el-button>
        <el-button @click="reset('ruleForm')" size="mini">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var type = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('字典类型不能为空'))
      }
      callback();
    };
    var key = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('字典名称不能为空'))
      }
      callback();
    };
    var value = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('超期天数不能为空'))
      }
      callback();
    };
    var description = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('超期扣分不能为空'))
      }
      callback();
    };
    return {
      //表单
      tableData: [],
      //当前行数据
      currentRow: '',
      //表单状态
      dialogFormVisible: false,
      pageCount: 20,
      input: '',
      page: 0,
      //增加，修改 弹出框
      ruleForm: {
        id: 0,
        type: '',
        key: '',
        value: '',
        comments: '',
        stateId: ''
      },
      //表单验证
      rules: {
        type: [
          { required: true, trigger: 'blur', validator: type },
        ],
        key: [
          { required: true, trigger: 'blur', validator: key },
        ],
        value: [
          { required: true, trigger: 'blur', validator: value },
        ],
        stateId: [
          { required: true, trigger: 'change', message: '请选择状态' }
        ]
      },
      //表单label样式
      formLabelWidth: '1.40rem',
      //添加，修改 标题切换
      msg: '',
      //数据加载条
      loading: true,
      // 分页
      sum: 0,
      // 搜索类型
      searchType: 'type',
    }
  },
  mounted() {
    this.tableValue();
  },
  methods: {
    // 解决ie9的输入框bug
    againReassignment(item) {
      this.input = item.target.value
    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod(index) {
      if (this.page > 0) {
        return (this.page - 1) * this.pageCount + (index + 1);
      } else {
        return (this.page) * this.pageCount + (index + 1);
      }

    },
    // 将当前复选框被选中的表格数据赋值到multipleSelection数组中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页功能-获取每页条数
    handleSizeChange(val) {
      this.pageCount = val;
      this.tableValue();
    },
    // 分页功能-获取当前页
    handleCurrentChange(val) {

      this.page = val;
      this.tableValue();
    },
    search() {
      this.page = 1;
      this.tableValue();
    },
    tableValue() {
      var that = this;
      that.loading = true;
      let params = {};
      if (that.input !== '') {
        if (that.searchType == 'type') {
          params.type = that.input;
        } else if (that.searchType == 'key') {
          params.key = that.input;
        } else if (that.searchType == 'value') {
          params.value = that.input;
        }
      }
      if (that.page !== 0) {
        params.page = that.page;
      }
      this.$common.commitParam(this, '/supervise/dic/list.api', params, {
        success: function (res) {
          if (res.code == 0) {
            that.loading = false;
            that.tableData = res.data;
            that.total = res.data.length;
            that.sum = res.totalCount;
          }
        }
      }, "get");
    },
    //修改 按钮
    amend(rews) {
      // 
      this.msg = '修改';
      this.dialogFormVisible = true;
      this.ruleForm.id = rews.id;
      this.ruleForm.type = rews.type;
      this.ruleForm.key = rews.key;
      this.ruleForm.value = rews.value;
      this.ruleForm.comments = rews.comments;
      this.ruleForm.stateId = this.formatter(rews);

    },
    //删除 按钮
    // remove(rews) {
    //   var that = this;
    //   this.$confirm('此操作将永久删除, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     var params = {
    //       id: rews.id
    //     }
    //     this.$common.commitParam(this, '/supervise/dic/delete.api', params, {
    //       success: function (res) {
    //         if (res.code == 0) {
    //           that.$message({
    //             message: res.description,
    //             type: 'success'
    //           });
    //           that.tableValue();
    //         } else {
    //           that.$message({
    //             message: res.description,
    //             type: 'warning'
    //           });
    //         }
    //       }
    //     }, "post", false);
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     });
    //   });
    // },
    //增加
    add() {

      var that = this;
      that.msg = '新建';
      that.dialogFormVisible = true;
      that.$nextTick(() => {
        that.$refs['ruleForm'].resetFields();
        this.ruleForm.id = '';
        this.ruleForm.type = '';
        this.ruleForm.key = '';
        this.ruleForm.value = '';
        this.ruleForm.comments = '';
        this.ruleForm.stateId = '';
      })
    },
    formatte(row, column) {
      // 
      return row.stateId == '启用' ? 0 : 1;
    },
    formatter(row, column) {
      return row.stateId == 0 ? '启用' : '停用';
    },
    //表单的确认按钮
    formconfirm(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {  //表单验证
        if (valid) {
          if (this.msg == '新建') {
            var params = {
              type: this.ruleForm.type,
              key: this.ruleForm.key,
              value: this.ruleForm.value,
              comments: this.ruleForm.comments,
              // stateId: this.formatte(this.ruleForm)
              stateId: this.ruleForm.stateId,
            }
            this.$common.commitParam(this, '/supervise/dic/add.api', params, {
              success: function (res) {
                if (res.code == 0) {
                  that.$message({ message: res.description, type: 'success' });
                  that.tableValue();
                } else {
                  that.$message({ message: res.description, type: 'error' });
                }
              }
            }, "post");
          } else {
            var params = {
              id: this.ruleForm.id,
              type: this.ruleForm.type,
              key: this.ruleForm.key,
              value: this.ruleForm.value,
              comments: this.ruleForm.comments,
            }
            if (this.ruleForm.stateId == '0' || this.ruleForm.stateId == '1') {
              params.stateId = this.ruleForm.stateId;
            } else {
              params.stateId = this.formatte(this.ruleForm);
            }
            this.$common.commitParam(this, '/supervise/dic/update.api', params, {
              success: function (res) {
                if (res.code == 0) {
                  that.$message({ message: res.description, type: 'success' });
                  that.tableValue();
                } else {
                  that.$message({ message: res.description, type: 'warning' });
                }
              }
            }, "post");
          }
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    },
    //清空表单
    reset(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    //判断是点击的为修改还是增加按钮
    formtype(num, rews) {
      if (num == 1) {
        this.add();
      } else {
        this.amend(rews);
      }
    },
    indexMethod(index) {
      return index + 1;
    },

  }
}
</script>

<style lang="scss">
.dictionary {
  height: 100%;
  .head {
    margin: 0.01rem 0.05rem;
    .el-select,
    .el-input__inner,
    .el-button {
      height: 0.3rem;
    }
    .el-input__inner {
      line-height: 0.26rem;
    }
  }
  .main {
    height: 84%;
  }
  .el-form {
    width: 60%;
    margin: 0 auto;
  }
  .el-dialog {
    margin-top: 11vh !important;
    .el-input {
      width: 3.6rem;
      height: 0.3rem;
      margin-right: 0.1rem;
      .el-input__inner {
        height: 0.3rem;
      }
    }
    .el-form-item__label {
      width: 1rem !important;
      text-align: left;
    }
    .el-form-item__content {
      margin-left: 1rem !important;
    }
  }
  .el-dialog__header {
    padding: 0.16rem 0.3rem 0.16rem !important;
    font-weight: bolder;
    border-bottom: 1px solid #ebeef5;
    font-size: 0.16rem;
  }
  .el-dialog__body {
    // padding: .10rem .20rem;
    color: #606266;
    font-size: 0.14rem;
  }
  .el-dialog__footer {
    border-top: 1px solid #ebeef5;
    height: 0.8rem;
    padding: 0.2rem 0.2rem 0.1rem;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .dialog-footer .el-button--mini {
    width: 0.9rem;
    height: 0.38rem;
  }
  .el-row {
    // margin-top: 10px;
    margin-left: 0.1rem;
    // text-align: right;
  }
  .el-icon-search {
    background: #faa646 !important;
    border-color: #faa646 !important;
    margin-left: 1%;
    font-size: 0.16rem;
  }
  .el-icon-plus {
    font-size: 0.16rem;
    background: #47b5e8;
    border-color: #47b5e8;
    // margin-left: 56% !important;
    float: right;
    margin-right: 0.1rem;
  }
  .searchType {
    width: 1rem;
  }
  .searchType input {
    height: 0.28rem;
  }
  .el-select__caret {
    line-height: 0.28rem;
  }
  .dialog-footer .el-button--primary {
    background: #297acc;
    border-color: #297acc;
  }
  .cell span {
    font-size: 0.16rem;
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

@media screen and (max-width: 1366px) {
  .dictionary .main {
    height: 79% !important;
    border-bottom: none;
  }
}


</style>