<template>
  <div class="checruledef">
    <div class="head">
      <el-row>
        <el-button type="primary" class="el-icon-plus" size="mini" @click="formtype(1,'')">新建</el-button>
      </el-row>
    </div>
    <div class="main" style="padding: 0 .10rem;">
      <template>
        <el-table stripe ref="multipleTable" :data="tableData" v-loading="loading" tooltip-effect="dark" style="width: 100%;">
          <el-table-column label="NO." type="index" :index="indexMethod" width="55">
          </el-table-column>
          <el-table-column label="汇报考核规则编号" prop="ruleNum" width="">
          </el-table-column>
          <el-table-column prop="ruleName" label="汇报考核规则名称" width="">
          </el-table-column>
          <el-table-column prop="ruleDesc" label="汇报考核规则描述" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="overdueDays" label="超期天数" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="overdueDeduction" label="超期扣分" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="stateId" label="是否启用" show-overflow-tooltip :formatter="formatter">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="formtype(0,scope.row)">修改</el-button>
              <span style="color:#e6e6e6;">|</span>
              <el-button type="text" size="mini" @click="remove(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="footer"></div>
    <el-dialog :close-on-click-modal="false" width="50%" :title="msg" :visible.sync="dialogFormVisible" @close="reset('ruleForm')">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="汇报考核规则编号" :label-width="formLabelWidth" prop="ruleNum">
          <el-input v-model="ruleForm.ruleNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="汇报考核规则名称" :label-width="formLabelWidth" prop="ruleName">
          <el-input v-model="ruleForm.ruleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="汇报考核规则描述" :label-width="formLabelWidth" prop="ruleDesc">
          <el-input v-model="ruleForm.ruleDesc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="超期天数" :label-width="formLabelWidth" prop="overdueDays">
          <el-input v-model="ruleForm.overdueDays" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="超期扣分" :label-width="formLabelWidth" prop="overdueDeduction">
          <el-input v-model="ruleForm.overdueDeduction" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth" prop="stateId">
          <el-select @change="test" v-model="ruleForm.stateId" placeholder="请选择是否启用">
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
    var ruleNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('汇报考核规则编号不能为空'))
      }
      callback();
    };
    var ruleName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('汇报考核规则名称不能为空'))
      }
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,10}$/
      var regExp = new RegExp(reg)
      if (!regExp.test(value)) {
        if (value.length > 10) {
          return callback(new Error('汇报考核规则名称过长'));
        }
        return callback(new Error('请输入正确的汇报考核规则名称'));
      }
      callback();
    };
    var overdueDays = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('超期天数不能为空'))
      }
      var reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
      var regExp = new RegExp(reg)
      if (!regExp.test(value)) {
        return callback(new Error('请输入正确的超期天数'));
      }
      callback();
    };
    var overdueDeduction = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('超期扣分不能为空'))
      }
      var reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
      var regExp = new RegExp(reg)
      if (!regExp.test(value)) {
        return callback(new Error('请输入正确的超期扣分'));
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
      //增加，修改 弹出框
      ruleForm: {
        id: 0,
        ruleNum: '',
        ruleName: '',
        ruleDesc: '',
        overdueDays: '',
        overdueDeduction: '',
        stateId: ''
      },
      //表单验证
      rules: {
        ruleNum: [
          { required: true, trigger: 'blur', validator: ruleNum },
        ],
        ruleName: [
          { required: true, trigger: 'blur', validator: ruleName },
        ],
        overdueDays: [
          { required: true, trigger: 'blur', validator: overdueDays },
        ],
        overdueDeduction: [
          { required: true, trigger: 'blur', validator: overdueDeduction },
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
    }
  },
  mounted() {
    this.tableValue();
  },
  methods: {
    test(item) {
    
    },
    //加载表格数据
    tableValue() {
      var that = this;
      var params = {}
      this.$common.commitParam(this, '/supervise/baseassessment/list.api', params, {
        success: function (res) {
          if (res.code == 0) {
            that.loading = false;
            that.tableData = res.data;
            that.total = res.data.length;
          }
        }
      }, "get");
    },
    //修改 按钮
    amend(rews) {
      this.msg = '修改';
      this.dialogFormVisible = true;
      this.ruleForm.id = rews.id;
      this.ruleForm.ruleNum = rews.ruleNum;
      this.ruleForm.ruleName = rews.ruleName;
      this.ruleForm.ruleDesc = rews.ruleDesc;
      this.ruleForm.overdueDays = rews.overdueDays;
      this.ruleForm.overdueDeduction = rews.overdueDeduction;
      this.ruleForm.stateId = this.formatter(rews);
    },
    //删除 按钮
    remove(rews) {
      var that = this;
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {
          id: rews.id
        }
        this.$common.commitParam(this, '/supervise/baseassessment/delete.api', params, {
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //增加
    add() {
      var that = this;
      this.msg = '新建';
      this.dialogFormVisible = true;
      that.$nextTick(() => {
        that.$refs['ruleForm'].resetFields();
        this.ruleForm.id = '';
        this.ruleForm.ruleNum = '';
        this.ruleForm.ruleName = '';
        this.ruleForm.ruleDesc = '';
        this.ruleForm.overdueDays = '';
        this.ruleForm.overdueDeduction = '';
        this.ruleForm.stateId = '';
      })
    },
    //列表 状态1,0的转换
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
              ruleNum: this.ruleForm.ruleNum,
              ruleName: this.ruleForm.ruleName,
              ruleDesc: this.ruleForm.ruleDesc,
              overdueDays: this.ruleForm.overdueDays,
              overdueDeduction: this.ruleForm.overdueDeduction,
              stateId: this.ruleForm.stateId,
            }
            this.$common.commitParam(this, '/supervise/baseassessment/add.api', params, {
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
          } else {
            var params = {
              id: this.ruleForm.id,
              ruleNum: this.ruleForm.ruleNum,
              ruleName: this.ruleForm.ruleName,
              ruleDesc: this.ruleForm.ruleDesc,
              overdueDays: this.ruleForm.overdueDays,
              overdueDeduction: this.ruleForm.overdueDeduction,

            }
            if (this.ruleForm.stateId == '0' || this.ruleForm.stateId == '1') {
              params.stateId = this.ruleForm.stateId;
            } else {
              params.stateId = this.formatte(this.ruleForm);
            }
            this.$common.commitParam(this, '/supervise/baseassessment/update.api', params, {
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
    //NO.序号
    indexMethod(index) {
      return index + 1;
    },

  }
}
</script>

<style lang="scss">
.checruledef {
  .head {
    margin: 0.01rem 0.05rem;
    height: 0.5rem;
  }
  .el-form {
    width: 80%;
    margin: 0 auto;
  }
  .el-dialog {
    margin-top: 11vh !important;
    .el-input {
      width: 3.6rem;
      height: 0.3rem;
      .el-input__inner {
        height: 0.3rem;
      }
    }
  }
  .el-dialog__header {
    font-weight: bolder;
    padding: 0.16rem 0.3rem 0.16rem;
    border-bottom: 1px solid #ebeef5;
    font-size: 0.16rem;
  }
  .el-dialog__body {
    // padding: .10rem .20rem;
    color: #606266;
    font-size: 0.14rem;
  }
  .el-dialog__footer {
    height: 0.8rem;
    border-top: 1px solid #ebeef5;
    padding: 0.2rem 0.2rem 0.1rem;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-row {
    // margin-top: 10px;
    text-align: right;
    margin-bottom: 0px;
  }
  .el-icon-plus {
    font-size: 0.16rem;
    background: #47b5e8;
    border-color: #47b5e8;
    margin-right: 1%;
  }
  .dialog-footer .el-button--primary {
    background: #297acc;
    border-color: #297acc;
  }
  .dialog-footer .el-button--mini {
    width: 0.9rem;
    height: 0.38rem;
  }
  .cell span {
    font-size: 0.16rem;
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