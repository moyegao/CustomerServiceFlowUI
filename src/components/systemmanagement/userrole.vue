<template>
  <div class="rolemanagement">
    <!-- <el-tabs type="border-card"> -->
    <!-- <el-tab-pane label="用户角色配置"> -->
    <el-table 
              class="tableContent" 
              stripe 
              v-loading="loading" 
              element-loading-text="拼命加载中" 
              element-loading-spinner="el-icon-loading" 
              :data="tableData" height="100%" 
              style="width: 100%" 
              :row-style="tableRowStyle">
      <el-table-column type="index" :index="meterIndexMethod" label="序号" width="80">
        <!-- width="100" -->
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称">
        <!-- width="150" -->
      </el-table-column>
      <!-- <el-table-column label="对应的员工" prop="yuangongName">
      </el-table-column> -->
      <el-table-column fixed="right" label="操作">
        <!-- width="100" -->
        <template slot-scope="scope">
          <el-button @click="add(scope.row)" type="text" size="mini">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-dialog title="增加" :visible.sync="addContent" width="80%">
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
        <el-button  @click="back" size="mini">返回</el-button>
      </div>
    </el-dialog> -->

    <el-dialog :close-on-click-modal="false" :visible.sync="addContent" title="修改" @close="back">
      <el-form :model="ruleForm" ref="ruleForm">
        <el-form-item label="角色名称:" prop="roleName">
          <el-input v-model="ruleForm.roleName" style="width:88%"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色描述:" prop="roleName">
          <el-input v-model="ruleForm.roleName" style="width:88%"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="所属用户:" prop="users">
          <el-input v-model="ruleForm.roleName" style="width:88%"></el-input>
        </el-form-item> -->
        <el-form-item label="所属用户:" prop="ownNames" ref="member">
          <div v-loading="inputLoading" class="input" contenteditable="false" :class="{'active':activeShow}" @click="treeToggle">
            <div class="select-member" :key="index" v-for="(item , index) in RepastMember">
              <span>{{ item.label }}</span>
              <i class="el-icon-error" @click.stop="delMember(item,index)"></i>
            </div>
            <span style="position:absolute;right:5px;">
              <!--<i class="el-select__caret el-input__icon el-icon-arrow-down"></i>-->
            </span>
          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <div style="text-align:center">
          <el-button type="primary" @click="save" size="mini">确定</el-button>
          <el-button @click="back" size="mini">返回</el-button>
        </div>
      </span>
    </el-dialog>
    <div :class="{'select-tree':true,'hide-tree':!authTreeShow,'show-tree':authTreeShow}">
      <authTree @treeClick="getAddData" :allrow="allrow" v-if="authTreeShow"></authTree>
    </div>

    <!-- </el-tab-pane> -->

    <!-- <el-tab-pane label="角色管理"> -->
    <!-- <div style="margin-right: 39px;margin-bottom: 22px;margin-top: 10px;text-align: right;">
          <el-button @click="add2" type="primary" size="mini">增加</el-button>
        </div>
        <el-dialog :title="btnTitle" :visible.sync="addContent2" width="50%">
          <div class="my-input" style="width:50%;margin:0 auto;">
            <span style="display:inline-block;width:70px;">ID：</span>
            <el-input :readonly="readonly === 1" v-model="id" size="mini" clearable style="width:calc(100% - 80px)"></el-input>
          </div>
          <div class="my-input" style="width:50%;margin:0 auto;margin-top:10px;">
            <span>角色名称：</span>
            <el-input v-model="roleName" size="mini" :readonly="readonly === 1" clearable style="width:calc(100% - 80px)"></el-input>
          </div>
          <div class="my-input" style="width:50%;margin:0 auto;margin-top:10px;">
            <span>首页类型：</span>
            <el-select v-model="roleType" placeholder="请选择"  size="mini">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

          </div>
          <div style="text-align:center;margin-top:15px;">
            <el-button @click="save2" type="primary" size="mini">保存</el-button>
          </div>
        </el-dialog>
        <el-table 
          class="tableContent" 
          border v-loading="loading" 
          element-loading-text="拼命加载中" 
          element-loading-spinner="el-icon-loading" 
          :data="tableData1" height="100%" 
          style="width: 100%"
          :row-style="tableRowStyle">
          <el-table-column type="index" :index="meterIndexMethod" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="roleName" label="角色名称" width="600" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="sysPortal" width="600" label="角色首页">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope" v-if="scope.row.roleName!=='系统管理员'">
              <el-button @click="delete2(scope.row)" type="primary" size="mini">删除</el-button>
              <el-button @click="update2(scope.row)" type="primary" size="mini">修改</el-button>
            </template>
          </el-table-column>
        </el-table> -->
    <!-- </el-tab-pane> -->

    <!-- </el-tabs> -->
  </div>
</template>
<script>
import authTree from './authTree'
export default {
  components: { authTree },
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
      roleType: '',
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
      ruleForm: {

      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        users: [
          { required: true, message: '请选择用户', trigger: 'blur' }
        ]
      },
      RepastMember: [],
      activeShow: false,
      authTreeShow: false,
      // authTreeNeedRoleKey: '',
      inputLoading: false,
    }
  },
  mounted() {
    this.UersRoleConf();
    // this.UserManamtDate();
  },
  methods: {
    delMember(row, index) {
     
      this.RepastMember.splice(index, 1)
    },
    treeToggle() {
      this.activeShow = true;
      this.authTreeShow = true;
    },
    getAddData(data, choosedRole, authTreeBottomData) {

      if (choosedRole.length > 0) {
        for (let i = 0; i < this.RepastMember.length; i++) {
          for (let j = 0; j < choosedRole.length; j++) {
            if (choosedRole[j] == this.RepastMember[i].key) {
              this.RepastMember.splice(i, 1);
            }

          }

        }
      } else {
        for (let i = 0; i < this.RepastMember.length; i++) {
          for (let j = 0; j < authTreeBottomData.length; j++) {
            if (authTreeBottomData[j].key == this.RepastMember[i].key) {
              this.RepastMember.splice(i, 1);
            }

          }

        }
      }
      for (let i = 0; i < data.length; i++) {
        this.RepastMember.push(data[i]);

      }
    

    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod(index) {
      return (this.page - 1) * this.pageCount + (index + 1);
    },
    // 用户角色配置增加事件
    add(row) {
      
      var that = this;

      this.ruleForm = row;
      this.loadContentData(row);
      that.addContent = true;
      // 调整打开页面的高度
      // $('.el-dialog').css('height', '75%');
    },
    // 加载 用户角色配置信息
    UersRoleConf() {
      var that = this;
      that.loading = true;
      this.$common.commitParam(this, "/supervise/sys/listRoleUser.api", {}, {
        success: function (res) {
          that.tableData = res.data;
          var s = '，'
          for (var i = 0; i < res.data.length; i++) {
            that.tableData[i].yuangongName = '';
            for (var j = 0; j < res.data[i].users.length; j++) {

              if (res.data[i].users[j] != null) {
                that.tableData[i].yuangongName += res.data[i].users[j].name + s;
              }
            }
            that.tableData[i].yuangongName = that.tableData[i].yuangongName.slice(0, -1)
          }
          if (res.code == 0) {
            that.loading = false;
          }
        }
      }, "get");
    },
    // 加载 角色管理数据
    // UserManamtDate() {
    //   var that = this;
    //   that.loading = true;
    //   this.$common.commitParam(this, "/supervise/sys/listRole.api", {}, {
    //     success: function (res) {
    //       if (res.code == 0) {
    //         that.tableData1 = res.data;
    //         for (var i = 0; i < res.data.length; i++) {
    //           that.tableData1[i].sysPortal = that.tableData1[i].sysPortalType.name;
    //         }
    //         that.loading = false;
    //       } else {
    //         this.$message({ message: res.description, type: 'warning' });
    //       }
    //     }
    //   }, "get");
    // },

    // loadData4() {
    //   var that = this;
    //   this.$common.commitParam(this, "/supervise/sys/listRole.api", {}, {
    //     success: function (res) {
    //       var box = [];
    //       for (var i = 0; i < res.data.length; i++) {
    //         var d = { id: res.data[i].id, label: res.data[i].roleName, }
    //         box.push(d);
    //       }
    //       that.data2 = box
    //     }
    //   }, "get");
    // },
    add2(row) {

      var that = this;
      that.readonly = 0;
      that.operationType = 'add';
      that.addContent2 = true;
      that.btnTitle = '增加';
      // $('.el-dialog').css('height', '30%');
    },
    // 角色管理-添加
    save2() {
      var that = this;
      if (that.id == '' || that.roleName == '' || that.roleType == '') {
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
        if (that.options2[j].value == that.roleType) {
          var data = { name: that.options2[j].label, type: that.roleType };
          types.push(data);
        }
      }
      
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
      
      // return;

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
            // that.UserManamtDate()
            that.UersRoleConf()
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
              // that.UserManamtDate()
              that.UersRoleConf()
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
      var that = this;
      that.operationType = 'update';
      that.readonly = 1;
      that.id = row.id;
      that.roleName = row.roleName;
      that.addContent2 = true;
      that.btnTitle = '修改';
      // $('.el-dialog').css('height', '30%');
    },
    // 用户角色配置增加数据
    loadContentData(row) {
      var that = this;
      that.allrow = row;
      let array = row.yuangongName.split('，');
      that.RepastMember = [];
      that.inputLoading = true;
      // for (let i = 0; i < array.length; i++) {
      //   that.RepastMember.push({ label: array[i] })

      // }
      this.$common.commitParam(this, "/supervise/sys/listDeptUser.api", { roleKey: row.roleKey }, {
        success: function (res) {
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res.data[i].users.length; j++) {
              for (let k = 0; k < array.length; k++) {
                if (array[k] == res.data[i].users[j].name) {
                  that.RepastMember.push(res.data[i].users[j])
                }
              }


            }

          }
          that.RepastMember = JSON.parse(JSON.stringify(that.RepastMember).replace(/name/g, "label"));
       
          that.inputLoading = false;
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
      this.authTreeShow = false;
      this.activeShow = false
      // var obj = $("input[name='m_LoginId']");
      // var check_val = [];
      // for (var i = 0; i < obj.length; i++) {
      //   if (obj[i].checked) {
      //     check_val.push(obj[i].value);
      //   }
      // }
      // var key = check_val.join();
      let array = [];
      for (let i = 0; i < this.RepastMember.length; i++) {
        array.push(this.RepastMember[i].key)

      }
      var key = array.join();
      that.$common.commitParam(this, "/supervise/sys/addRoleUser.api", { key: key, roleKey: that.allrow.roleKey }, {
        success: function (res) {
          if (res.code == 0) {
            that.addContent3 = false;
            that.$message({ type: 'success', message: res.description });
            that.UersRoleConf();
            that.addContent = false;
          } else {
            that.$message({ type: 'warning', message: res.description, });
          }
        }
      }, "post", false);
    },
    back() {
      this.addContent = false;
      this.authTreeShow = false;
      this.activeShow = false;
    },
    choose(row) {
      var that = this;
      that.addContent3 = true;
      that.id3 = row.id
      // this.loadData4()
    },
    ch(row) {

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
.rolemanagement {
  height: 100%;
  padding: 0 10px;
  .el-tabs {
    height: 100%;
  }
  .is-leaf {
    font-size: 18px;
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
    width: 60% !important;
    margin-top: 0.6rem !important;
    // height: 53% !important;
  }
  .el-dialog__body {
    overflow-y: auto;
    // height: 2.8rem;
    padding: .50rem .20rem;
  }
  .tableContent {
    // margin: -15px;
  }
  //   .el-tooltip {
  //   font-size: 16px;
  // }
  .is-leaf .cell {
    font-size: 18px;
  }
  .el-dialog__header {
    border-bottom: 1px solid #ebeef5 !important;
    //   // height: 1.5rem !important;
    //   padding: 10px 20px 15px !important;
    //   // margin-top: 10px;
  }
  .el-dialog__footer {
    border-top: 1px solid #ebeef5 !important;
    //   // height: 1.5rem !important;
    //   padding: 10px 20px 15px !important;
    //   // margin-top: 10px;
  }
  .input {
    overflow: scroll;
    vertical-align: middle;
    display: inline-block;
    border: 1px solid #ccc;
    width: 88%;
    min-height: 40px;
    overflow: hidden;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    position: relative;
    .select-member {
      box-sizing: border-box;
      border-color: transparent;
      margin: 2px 0 2px 6px;
      background-color: #f0f2f5;
      display: inline-block;
      height: 24px;
      padding: 0 8px;
      line-height: 22px;
      color: #909399;
      border-radius: 4px;
      i {
        color: #c0c4cc;
        cursor: pointer;
      }
    }
    &.active {
      border: 1px solid #409eff;
    }
  }
  .select-tree {
    z-index: 3000;
    position: fixed;
    right: 0;
    top: 60px;
    height: calc(100% - 60px);
    /*background: #ccc !important;*/
    transition: width 500ms linear;
    box-shadow: 0 0 10px 0 #ccc;
  }
  .show-tree {
    width: 300px;
  }
  .hide-tree {
    width: 0px;
  }
  .el-button--mini {
    font-size: 0.16rem;
  }
  .el-button--primary{
    background-color: #297acc;
  }
  // .bottom .el-tree-node{
  //   padding-left: 7px;
  // }
  .el-table .cell,{
    height: .34rem !important;
    line-height: .34rem !important;
  }
  .el-table th{
    padding:0 !important;
    background: #fafafa;
    div{
      color:#333;
      font-size: .14rem;
    }
  }
  .el-table td{
    padding:0px 0 !important;
  }
}
</style>