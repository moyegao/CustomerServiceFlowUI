<template>
  <div id="modelmanagement" class="clear">

    <div style='width:175px;height: 100%;border: 1px solid #ddd;' class="fl">
      <!-- <span style="cursor: pointer;font-size: 16px;color: #606266;margin: 25px;text-decoration: underline;" class="model" @click="handelClick">
        模块
      </span> -->

      <el-tree :data="ztreeDataSource" :props="defaultProps" @node-click="handelClick" accordion>
      </el-tree>
    </div>

    <div class="box" style=" padding: 10px;margin-left: 181px;width: calc(100% - 181px);height:100%;">
      <div style="margin-right: 21px;margin-bottom: 10px;text-align: right;">
        <el-button @click="addOne" type="primary" size="mini" icon="el-icon-plus" class="addBtn">新建</el-button>
      </div>
      <el-table stripe class="aaaa" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="tableData" height="calc(100% - 38px)" style="width: 98%" :row-style="tableRowStyle">
        <el-table-column type="index" :index="meterIndexMethod" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="menuName" label="名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="menuName1" label="分类">
        </el-table-column>
        <!-- <el-table-column prop="url" label="菜单路径">
        </el-table-column>
        <el-table-column prop="icon" label="菜单图标" width="110px">
        </el-table-column> -->
        <el-table-column prop="level" label="级别">
        </el-table-column>
        <!-- <el-table-column prop="comments" label="说明" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column prop="sort" label="排序号">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope" v-if="scope.row.roleName!=='系统管理员'">
            <el-button @click="delete2(scope.row)" type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :close-on-click-modal="false" title="增加" :visible.sync="dialogFormVisible" @close="reset('ruleForm')">
        <el-form size="mini" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="id" prop="id">
            <el-input v-model="ruleForm.id"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="menuName">
            <el-input v-model="ruleForm.menuName"></el-input>
          </el-form-item>
          <el-form-item label="菜单路径" prop="url">
            <el-input v-model="ruleForm.url"></el-input>
          </el-form-item>
          <el-form-item label="菜单图标" prop="icon">
            <el-input v-model="ruleForm.icon"></el-input>
          </el-form-item>
          <el-form-item label="级别" prop="level">
            <el-select v-model="ruleForm.level" placeholder="请选择级别" @change="choose">
              <!-- <el-option label=1 value=1></el-option> -->
              <el-option label=2 value=2></el-option>
              <el-option label=3 value=3></el-option>
            </el-select>
          </el-form-item>

          <div class="my-input">
            <el-form-item label="分类" prop="menuName1">
              <el-select v-loading="selectLoading" v-model="ruleForm.menuName1" clearable size="mini" style="width:calc(100% - 70px)">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="说明" prop="comments">
            <el-input v-model="ruleForm.comments"></el-input>
          </el-form-item>
          <el-form-item label="排序号" prop="sort">
            <el-input v-model="ruleForm.sort"></el-input>
          </el-form-item>

          <!-- <el-form-item style="text-align: center;">
            <el-button type="primary" @click="submit('ruleForm')" size="mini">提交</el-button>
            <el-button @click="reset('ruleForm')" size="mini">取消</el-button>
          </el-form-item> -->

        </el-form>
        <span slot="footer" class="dialog-footer">
          <div class="sub" style="text-align:center;">
            <el-button type="primary" @click="submit('ruleForm')" size="mini" style="background:#297acc;">提交</el-button>
            <el-button @click="reset('ruleForm')" size="mini">返回</el-button>
          </div>
        </span>
      </el-dialog>

    </div>

  </div>
</template>
 
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      ztreeDataSource: [],
      tableData: [],
      loading: false,
      id: '',
      menuName: '',
      url: '',
      icon: '',
      msg: false,
      options1: [],
      value1: '',
      comments: '',
      selectLoading: false,
      //表单验证
      ruleForm: {
        id: '',
        menuName: '',
        url: '',
        icon: '',
        level: 2,
        menuName1: '',
        comments: '',
        sort: 0,
      },
      rules: {
        id: [
          { required: true, message: '请输入id', trigger: 'blur' },
        ],
        menuName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        level: [
          { required: true, message: '请选择级别', trigger: 'blur' },
        ],
        sort: [
          { required: true, message: '请输入排序号', trigger: 'blur' },
        ],
        menuName1: [
          { required: true, message: '请选择分类', trigger: 'blur' },
        ],
      },
      //1
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      keylevel: 1,
      keyAdd: 0,
    }
  },
  mounted() {
    this.loadZtree()
    this.loadData()
    this.loadMenuType('1')
  },
  methods: {

    // 加载ztree数据 左侧菜单数据
    loadZtree() {
      var that = this;
      this.$common.commitParam(this, "/supervise/sys/listSysMenu.api?type=tree", {}, {
        success: function (res) {
          if (res.code == 0) {
            var box = [];
            for (var i = 0; i < res.data.length; i++) {
              var p = {
                id: res.data[i].key,
                label: res.data[i].name,
                icon: res.data[i].icon,
                children: [],
                level: 1
              }
              for (var j = 0; j < res.data[i].children.length; j++) {
                var h = {
                  id: res.data[i].children[j].key,
                  label: res.data[i].children[j].name,
                  icon: res.data[i].children[j].icon,
                  level: 2
                }
                p.children.push(h)
              }
              box.push(p)
            }
            that.ztreeDataSource = box;
          } else {
            that.$message({
              message: res.description,
              type: 'warning'
            });
          }
        }
      }, "get");
    },

    loadMenuType(level) {
      var that = this;
      that.selectLoading = true;
      this.options1 = [];
      this.$common.commitParam(this, "/supervise/sys/listSysMenu.api", { level: level },
        {
          success: function (res) {
            for (var i = 0; i < res.data.length; i++) {
              that.selectLoading = false;
              var values = {};
              values.value = res.data[i].id;
              values.label = res.data[i].menuName;
              that.options1.push(values);
            }
          }
        }, "get");
    },

    // 列表数据加载
    loadData(key) {
      var that = this;
      that.loading = true;
      if (key == undefined) {
        this.$common.commitParam(this, "/supervise/sys/listSysMenu.api", {}, {
          success: function (res) {
            if (res.code == 0) {
              var box = []
              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].parent == undefined) {
                  box.push(res.data[i])
                }
              }
              that.tableData = box;
              for (var j = 0; j < that.tableData.length; j++) {
                that.tableData[j].menuName1 = that.tableData[j].menuName
              }
              that.loading = false;
            } else {
              that.$message({
                message: res.description,
                type: 'warning'
              });
            }
          }
        }, "get");
      } else {
        var params = {};
        params.key = key
        this.$common.commitParam(this, "/supervise/sys/listSysMenu.api", params, {
          success: function (res) {
            if (res.code == 0) {
              that.tableData = res.data
              for (var i = 0; i < res.data.length; i++) {
                that.tableData[i].menuName1 = res.data[0].menuName
              }
              that.loading = false
            }
          }
        }, "get");
      }
    },
    // 弹出窗内级别按钮切换出发事件
    choose(val) {
      if (val == 1) {
        this.msg = false;
      } else if (val == 2) {
        this.msg = true;
        this.loadMenuType('1')
      } else if (val == 3) {
        this.msg = true;
        this.loadMenuType('2')
      }
    },
    // 弹出窗保存
    submit(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {  //表单验证
        if (valid) {
          if (that.ruleForm.level == 1) {
            var params = {
              id: this.ruleForm.id,
              menuName: this.ruleForm.menuName,
              url: this.ruleForm.url,
              icon: this.ruleForm.icon,
              level: this.ruleForm.level,
              comments: this.ruleForm.comments,
              sort: this.ruleForm.sort,
            }
            this.$common.commitParam(this, "/supervise/sys/addSysMenu.api", params, {
              success: function (res) {
                if (res.code == 0) {
                  that.$message({
                    message: res.description,
                    type: 'success'
                  });
                  that.loadData();
                  that.loadZtree();
                  that.dialogFormVisible = false;
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
              menuName: this.ruleForm.menuName,
              url: this.ruleForm.url,
              icon: this.ruleForm.icon,
              level: this.ruleForm.level,
              comments: this.ruleForm.comments,
              sort: this.ruleForm.sort
            }
            if (this.ruleForm.level == 2 || this.ruleForm.level == 3) {
              params.parentKey = this.ruleForm.menuName1;
            }
            this.$common.commitParam(this, "/supervise/sys/addSysMenu.api", params, {
              success: function (res) {
                if (res.code == 0) {
                  that.$message({
                    message: res.description,
                    type: 'success'
                  });
                  that.loadData();
                  that.loadZtree();
                  that.dialogFormVisible = false;
                } else {
                  that.$message({
                    message: res.description,
                    type: 'warning'
                  });
                }
              }
            }, "post");
          }

        } else {
          return false;
        }
      });
    },

    // 点击 左侧菜单 获取节点id and level 并加载table数据
    handelClick(data) {
     
      this.keyAdd = data.id;
      this.keylevel = data.level;
      this.loadData(data.id);
    },


    // 添加事件
    addOne() {
      this.dialogFormVisible = true;
    },

    // 删除事件
    delete2(row) {
      this.$confirm('确认删除该数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var that = this;
        this.$common.commitParam(this, "/supervise/sys/deleteSysMenu.api", { key: row.id }, {
          success: function (res) {
            if (res.code == 0) {
              that.$message({
                type: 'success',
                message: res.description,
              });
              that.loadZtree()
              that.loadData()
            } else {
              that.$message({
                type: 'warning',
                message: res.description,
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

    // 序号功能
    meterIndexMethod(index) {
      return (index + 1);
    },

    //清空表单
    reset(formName) {
      this.$refs[formName].resetFields();
      this.msg = false;
      this.dialogFormVisible = false;
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
}
</script> 
 
<style lang="scss">
#modelmanagement {
  height: 100%;
  .el-tree-node__content > .el-tree-node__expand-icon {
    padding: 0px 0;
  }
  .el-tree-node__content {
    line-height: 40px;
  }
  .el-button span {
    font-size: 0.16rem;
  }
  .model:hover {
    text-decoration: underline;
  }
  .el-tooltip {
    font-size: 0.16rem;
  }
  .is-leaf .cell {
    font-size: 0.16rem;
  }
  .el-form-item__label {
    font-size: 0.16rem;
  }
  .is-leaf {
    font-size: 0.12rem;
  }
  .addBtn {
    font-size: 16px;
    color: white !important;
    background: #47b5e8 !important;
    border-color: #47b5e8 !important;
  }
  .aaaa .el-button--mini {
    font-size: 0.14rem;
  }
  .el-dialog__header {
    border-bottom: 1px solid #ebeef5;
  }
  .el-button--text {
    padding: 0px 15px;
  }
  .el-dialog {
    width: 40% !important;
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