<template>
  <div class="rolemanagement">
    <!-- <el-tabs type="border-card"> -->
    <!-- <el-tab-pane label="用户角色配置">
        <el-table 
          class="tableContent" 
          v-loading="loading" 
          element-loading-text="拼命加载中" 
          element-loading-spinner="el-icon-loading" 
          :data="tableData" height="100%"
          style="width: 100%"
          :row-style="tableRowStyle">
          <el-table-column type="index" :index="meterIndexMethod" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="roleName" label="角色名称" width="150">
          </el-table-column>
          <el-table-column label="对应的员工" prop="yuangongName">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="add(scope.row)" type="primary" size="mini">增加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="增加" :visible.sync="addContent" width="80%">
          <fieldset style="width:96%" :class="tmp.className" :key="tmp.className" v-for="tmp in contentData">
            <legend class="legendcss">{{tmp.deptName}}</legend>
            <div :key="tmp1.key" v-for="tmp1 in tmp.users">
              <input type="checkbox" name="m_LoginId" :checked="tmp1.checked==1?true:false" :value="tmp1.key">{{tmp1.name}}
              <input type="hidden" name="m_UserName" :value="tmp1.name">
            </div>
            <div>
              <input type="button" @click="selectAll(tmp.className)" value="全选">&nbsp;&nbsp;&nbsp;
              <input type="button" @click="resetAll(tmp.className)" value="重置">
            </div>

          </fieldset>
          <div style="text-align:center;margin-top:15px;margin-bottom:15px;">
            <el-button type="primary" @click="save" size="mini">保存</el-button>
            <el-button type="primary" @click="back" size="mini">返回</el-button>
          </div>
        </el-dialog>
      </el-tab-pane> -->
    <!-- <el-tab-pane label="角色管理"> -->
    <div style="margin-bottom: 10px;margin-top: 0px;text-align: right;">
      <el-button @click="add2" type="primary" size="mini" icon="el-icon-plus" class="addBtn">新建</el-button>
    </div>
    <el-dialog :close-on-click-modal="false" :title="btnTitle" :visible.sync="addContent2" width="50%">
      <div class="my-input" style="width:50%;margin:20px auto 0px;">
        <span style="display:inline-block;width:77px;">
          <font style="color:red">*</font>ID：
        </span>
        <el-input :readonly="readonly === 1" v-model="id" size="mini" clearable style="width:calc(100% - 86px)"></el-input>
      </div>
      <div class="my-input" style="width:50%;margin:20px auto 0px;">
        <span>
          <font style="color:red">*</font>角色名称：
        </span>
        <el-input v-model="roleName" size="mini" :readonly="readonly === 1" clearable style="width:calc(100% - 85px)"></el-input>
      </div>
      <!-- <div class="my-input" style="width:50%;margin:0 auto;margin-top:10px;">
            <span>角色首页：</span>
            <el-select v-model="value" clearable size="mini" style="width:calc(100% - 80px)">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div> -->
      <div class="my-input" style="width:50%;margin:20px auto 0px;">
        <span>
          <font style="color:red">*</font>首页类型：
        </span>
        <!-- <el-select v-model="roleType" multiple placeholder="请选择" size="mini" style="width:calc(100% - 80px)">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select> -->

        <el-select v-model="roleType" placeholder="请选择" size="mini">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

      </div>
      <!-- <div style="text-align:center;margin-top:15px;">
        <el-button @click="save2" type="primary" size="mini">保存</el-button>
        <el-button @click="addContent2 == false" size="mini">返回</el-button>
      </div> -->
      <span slot="footer" class="dialog-footer">
        <div class="sub" style="text-align:center;">
          <el-button type="primary" size="mini" @click="save2" style="background:#297ACC;border-color:#297ACC">确 定</el-button>
          <el-button @click="addContent2 = false" size="mini">返 回</el-button>
        </div>
      </span>
    </el-dialog>
    <el-table stripe class="tableContent" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="tableData1" height="91%" style="width: 100%">
      <el-table-column type="index" :index="meterIndexMethod" label="序号" width="80">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sysPortal" label="角色首页">
      </el-table-column>
      <el-table-column prop="caozuo" label="操作">
        <template slot-scope="scope" v-if="scope.row.roleName!=='系统管理员'">
          <el-button @click="update2(scope.row)" type="text" size="mini">修改</el-button>
          <span style="color:#e6e6e6;">|</span>
          <el-button @click="delete2(scope.row)" type="text" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- </el-tab-pane> -->

    <!-- </el-tabs> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      disabled: 0,
      tableData: [],
      tableData1: [],
      tableData2: [],
      operationType: '',
      page: 1,
      pageCount: 20,
      loading: true,
      options2: [
        {
          value: '1',
          label: '领导首页'
        }, {
          value: '2',
          label: '部门首页'
        }],
      addContent2: false,
      addContent: false,
      addContent3: false,
      options: [{
        value: '1',
        label: '领导首页'
      }, {
        value: '2',
        label: '部门领导首页'
      }],
      value: '',
      id: '',
      id3: '',
      roleName: '',
      comments: '',
      roleType: '1',
      contentData: [],
      data2: [
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      allrow: {},
      readonly: 0,
      // 增加或修改(标题)
      btnTitle: '',
    }
  },
  mounted() {
    // this.UersRoleConf();
    this.UserManamtDate();
  },
  methods: {
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod(index) {
      return (this.page - 1) * this.pageCount + (index + 1);
    },
    // 用户角色配置增加事件
    add(row) {
      var that = this;
      this.loadContentData(row);
      that.addContent = true;
      // 调整打开页面的高度
      $('.el-dialog').css('height', '75%');
    },
    // 加载 用户角色配置信息
    // UersRoleConf() {
    //   var that = this;
    //   this.$common.commitParam(this, "/supervise/sys/listRoleUser.api", {}, {
    //     success: function (res) {
    //       that.tableData = res.data;
    //       var s = '，'
    //       for (var i = 0; i < res.data.length; i++) {
    //         that.tableData[i].yuangongName = '';
    //         for (var j = 0; j < res.data[i].users.length; j++) {

    //           if (res.data[i].users[j] != null) {
    //             that.tableData[i].yuangongName += res.data[i].users[j].name + s;
    //           }
    //         }
    //         that.tableData[i].yuangongName = that.tableData[i].yuangongName.slice(0, -1)
    //       }
    //       if (res.code == 0) {
    //         that.loading = false
    //       }
    //     }
    //   }, "get");
    // },
    // 加载 角色管理数据
    UserManamtDate() {
      var that = this;
      that.loading = true;
      this.$common.commitParam(this, "/supervise/sys/listRole.api", {}, {
        success: function (res) {
          if (res.code == 0) {
            that.tableData1 = res.data;
            for (var i = 0; i < res.data.length; i++) {
              that.tableData1[i].sysPortal = that.tableData1[i].sysPortalType.name;
            }
            that.loading = false;
          } else {
            this.$message({ message: res.description, type: 'warning' });
          }
        }
      }, "get");
    },
    loadData4() {
      var that = this;
      this.$common.commitParam(this, "/supervise/sys/listRole.api", {}, {
        success: function (res) {
          var box = [];
          for (var i = 0; i < res.data.length; i++) {
            var d = { id: res.data[i].id, label: res.data[i].roleName, }
            box.push(d);
          }
          that.data2 = box
        }
      }, "get");
    },
    add2(row) {

      var that = this;
      that.id = '';
      that.roleName = '';
      that.roleType = '';
      that.readonly = 0;
      that.operationType = 'add';
      that.addContent2 = true;
      that.btnTitle = '增加';
      // $('.el-dialog').css('height', '30%');
    },
    // 角色管理-添加
    save2() {
      var that = this;
      if (that.id == '') {
        this.$message({ message: 'ID不能为空！', type: 'warning' });
        return;
      }
      if (that.roleName == '') {
        this.$message({ message: '角色名称不能为空！', type: 'warning' });
        return;
      }
      // if (that.value == '') {
      //   this.$message({ message: '角色首页不能为空！', type: 'warning' });
      //   return;
      // }
      if (that.roleType == '') {
        this.$message({ message: '首页类型不能为空！', type: 'warning' });
        return;
      }
      var types = new Array();
      // var roleTypes = that.roleType.toString().split(',');


      // for (var i = 0; i < roleTypes.length; i++) {

      for (var j = 0; j < that.options2.length; j++) {
        if (that.options2[j].label == that.roleType) {
          var data = { name: that.options2[j].label, type: that.roleType };
          types.push(data);
        }
      }
      // 
      // }

      // var portalName = '';
      // for (var i = 0; i < that.options.length; i++) {
      //   var dd = that.options[i];
      //   if (that.value == dd.value) {
      //     portalName = dd.label;
      //   }
      // }
      var params = { id: that.id, roleName: that.roleName, sysPortalType: { name: types[0].name, type: types[0].type } };
      if (that.comments !== '') {
        params.comments = that.comments;
      }

      var url = '';
      if (that.operationType === 'add') {
        url = '/supervise/sys/addRole.api';
      } else if (that.operationType === 'update') {
        url = '/supervise/sys/updateRole.api';
      }
      that.$common.commitParam(this, url, params, {
        success: function (res) {
          if (res.code == 0) {
            that.$message({ message: '执行成功!', type: 'success' });
            that.addContent2 = false;
            that.UserManamtDate()
            // that.UersRoleConf()
          } else {
            that.$message({ message: res.description, type: 'error' });
          }
        }
      }, "post");
    },



    delete2(row) {
      this.$confirm('确认删除该数据？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        var that = this;
        this.$common.commitParam(this, "/supervise/sys/deleteRole.api", { roleKey: row.id }, {
          success: function (res) {
            if (res.code == 0) {
              that.$message({ type: 'success', message: res.description, });
              that.UserManamtDate()
              // that.UersRoleConf()
            } else {
              that.$message({ message: res.description, type: 'warning' });
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
    update2(row) {
      // 
      var that = this;
      that.operationType = 'update';
      // that.readonly = 1;
      that.readonly = 0;
      that.id = row.id;
      that.roleName = row.roleName;
      that.roleType = row.sysPortal;
      that.addContent2 = true;
      that.btnTitle = '修改';
      // $('.el-dialog').css('height', '30%');
    },
    // 用户角色配置增加数据
    loadContentData(row) {
      var that = this;
      that.allrow = row;
      this.$common.commitParam(this, "/supervise/sys/listDeptUser.api", { roleKey: row.roleKey }, {
        success: function (res) {
          that.contentData = res.data;
        }
      }, "get");
    },
    selectAll(className) {
      $('.' + className + ' div input').prop("checked", true);
    },
    resetAll(className) {
      $('.' + className + ' div input').prop("checked", false);
    },
    save() {
      var that = this;
      var obj = $("input[name='m_LoginId']");
      var check_val = [];
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
          check_val.push(obj[i].value);
        }
      }
      var key = check_val.join();

      that.$common.commitParam(this, "/supervise/sys/addRoleUser.api", { key: key, roleKey: that.allrow.roleKey }, {
        success: function (res) {
          if (res.code == 0) {
            that.addContent3 = false;
            that.$message({ type: 'success', message: res.description });
            // that.UersRoleConf();
            that.addContent = false;
          } else {
            that.$message({ type: 'warning', message: res.description, });
          }
        }
      }, "post", false);
    },
    back() {
      this.addContent = false;
    },
    choose(row) {
      var that = this;
      that.addContent3 = true;
      that.id3 = row.id
      this.loadData4()
    },
    ch(row) {

    },
    // 修改table tr的样式
    // tableRowStyle({ row, rowIndex }) {
    //   return 'font-size:18px;'
    // },
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
.rolemanagement {
  height: 100%;
  padding: 0 10px;
  .el-tabs {
    height: 100%;
  }
  .is-leaf {
    font-size: 0.12rem;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: none;
    border-color: #e4e7ed;
    color: #606266;
    cursor: not-allowed;
  }
  .select {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding: 0 15px;
  }
  .aaaa {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: 0;
    text-align: center;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
  fieldset {
    display: block;
    -webkit-margin-start: 2px;
    -webkit-margin-end: 2px;
    -webkit-padding-before: 0.35em;
    -webkit-padding-start: 0.75em;
    -webkit-padding-end: 0.75em;
    -webkit-padding-after: 0.625em;
    min-width: -webkit-min-content;
    border-width: 2px;
    border-style: groove;
    border-image: initial;
    margin-top: 15px;
  }
  fieldset div {
    float: left;
    width: 105px;
  }
  .el-dialog {
    width: 80%;
    margin-top: 12vh !important;
    // height: 30%; // 该处原值75%
    // overflow-y: scroll;
  }
  .el-dialog__header {
    border-bottom: 1px solid #ebeef5 !important;
    padding: 10px 20px 15px !important;
  }
  .el-dialog__body {
    padding: 0.6rem 0.2rem;
    color: #606266;
    font-size: 14px;
  }
  .tableContent {
    // margin: -15px;
  }
  //   .el-tooltip {
  //   font-size: 16px;
  // }
  .is-leaf .cell {
    // font-size: .12rem;
  }
  .addBtn {
    font-size: 14px;
    color: white !important;
    background: #47b5e8 !important;
    border-color: #47b5e8 !important;
  }
  .tableContent .el-button--mini {
    font-size: 0.16rem;
  }
  .el-dialog .el-button--primary {
    font-size: 14px;
    background: #297acc;
  }
  .el-table td {
    padding: 3px 0;
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
    left: -1px;
  }
}
</style>