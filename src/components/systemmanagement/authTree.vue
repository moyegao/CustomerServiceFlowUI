<template>
  <div class="auth-tree">
    <div class="top">
      <h2>组织结构树</h2>
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
      <!-- <el-tree class="filter-tree department" :data="authTreeTopData" :props="defaultProps" @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree2">
      </el-tree> -->
      <el-tree v-loading="treeLoading" class="filter-tree department" :data="authTreeTopData" @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree2">
      </el-tree>
    </div>

    <div class="bottom">
      <h2>{{department}}</h2>
      <el-tree check-on-click-node :default-checked-keys="choosedRole" :data="authTreeBottomData" show-checkbox default-expand-all node-key="key" ref="tree" highlight-current>
      </el-tree>
    </div>
    <div class="buttons">
      <el-button size="small" type="primary" @click="setCheckedNodes('true')">全选</el-button>
      <el-button size="small" type="primary" @click="setCheckedNodes('false')">重置</el-button>
      <el-button size="small" type="primary" @click="getCheckedNodes">添加</el-button>
      <el-button size="small" type="info" plain @click="resetChecked">退出</el-button>
    </div>

  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: "auth-tree",
  props: ['allrow'],
  data() {
    return {
      filterText: '',
      data: [],
      // defaultProps: {
      //   children: 'children',
      //   label: 'shortname'
      // },
      data2: [],
      defaultProps2: {
        children: 'children',
        label: 'name'
      },
      department: '组织人员',
      authTreeTopData: [],
      authTreeBottomData: [],
      listDeptUserData: [],
      choosedRole: [],
      treeLoading: false,
    }
  },
  mounted() {
  
    this.randerTree()
  },
  methods: {
    // 处理树标题的展示
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // tree函数点击事件
    handleNodeClick(data) {
      
      this.authTreeBottomData = [];
      this.choosedRole = [];
      for (let i = 0; i < this.listDeptUserData.length; i++) {
        if (this.listDeptUserData[i].deptName == data.label) {
          this.authTreeBottomData = this.listDeptUserData[i].users;
        }

      }
      this.authTreeBottomData = JSON.parse(JSON.stringify(this.authTreeBottomData).replace(/name/g, "label"));
      for (let i = 0; i < this.authTreeBottomData.length; i++) {
        if (this.authTreeBottomData[i].checked == '1') {
          this.choosedRole.push(this.authTreeBottomData[i].key)
        }

      }
      // this.choosedRole = JSON.parse(JSON.stringify(this.choosedRole).replace(/name/g, "label"));
      // this.department = data.name;
      // let _this = this;
      // this.getStaff(data.code).then(res => {
      //   _this.data2 = JSON.parse(res.data.staffOfDepartment)
      // })
    },
    // 数组去重
    distinct(arr) {
      var i, obj = {}, result = [], len = arr.length;
      for (i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) { //如果能查找到，证明数组元素重复了
          obj[arr[i]] = 1;
          result.push(arr[i]);
        }
      }
      return result;
    },
    //处理总数据
    dealData(data) {
      let parentData = [];
      let parentId = [];
      for (let i of data) {
        parentId.push(i.parentId)
      }
      parentId = this.distinct(parentId);

      for (let j of parentId) {
        for (let k in data) {
          if (data[k].id === j) {
            if (typeof data[k].children === 'undefined') {
              data[k].children = []
            }
            parentData.push(data.splice(k, 1)[0])
          }
        }
      }
      for (let n in parentData) {
        for (var m = 0; m < data.length; m++) {
          if (parentData[n].id === data[m].parentId) {
            parentData[n].children.push(data.splice(m, 1)[0]);
            m--
          }
        }
      }
      return parentData
    },
    // 生成组织结构数
    randerTree() {
      var that = this;
      that.treeLoading = true;
      // axios({
      //   method: 'post',
      //   url: '/dep/json.htm',
      //   params: {
      //     id: -1
      //   },
      //   headers: {
      //     "returntype": "ajax/json"
      //   },
      // }).then((res) => {
      //   let data = res.data
      //   do {
      //     data = this.dealData(data)
      //   } while (data.length > 1)
      //   data[0].children.push(data[0].children.splice(0, 1)[0])
      //   this.data = data[0].children
      // })
      this.$common.commitParam(this, "/supervise/sys/listDeptUser.api", { roleKey: that.allrow.roleKey }, {
        success: function (res) {
          that.listDeptUserData = res.data;
          // that.contentData = res.data;
          that.authTreeTopData = [];
          for (let i = 0; i < res.data.length; i++) {
            that.authTreeTopData.push({ label: res.data[i].deptName });

          }
        
          that.treeLoading = false;
        }
      }, "get");
    },
    // 获取职员列表
    getStaff(code) {
      return new Promise(resolve => {
        axios({
          method: 'post',
          url: '/dep/staff.htm',
          params: {
            code: code
          },
          headers: {
            "returntype": "ajax/json"
          },
        }).then(res => {
          resolve(res.data);
        });
      })
    },

    changeChoosedRole(checked) {
     

    },

    getCheckedNodes() {
  
     
      this.$emit('treeClick', this.$refs.tree.getCheckedNodes(), this.choosedRole, this.authTreeBottomData)

      // this.$refs.tree.setCheckedKeys([])
      //        this.resetChecked()
    },
    getCheckedKeys() {
      //        console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes(boolean) {
      if (boolean == 'true') {
        this.$refs.tree.setCheckedNodes(this.authTreeBottomData);
      } else {
        this.choosedRole = [];
        this.$refs.tree.setCheckedNodes([]);
      }
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked() {
      // this.$refs.tree.setCheckedKeys([]);
      // if (this.$parent.activeBlur) {
      //   this.$parent.activeBlur()
      // }
      // if (this.$parent.showTreeClick) {
      //   this.$parent.showTreeClick()
      // }
      this.$parent.authTreeShow = false;
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-tree {
  background: #fff;
  h2 {
    padding: 0;
    margin: 0;
    background: #3193f5;
    color: #fff;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
  }

  height: 100%;
  .top {
    height: calc(50% - 25px);
    .el-tree {
      height: calc(100% - 80px);
      overflow-y: scroll;
    }
  }
  .bottom {
    height: calc(50% - 25px);
    .el-tree {
      height: calc(100% - 40px);
      overflow-y: scroll;
    }
  }
  .buttons {
    padding: 5px;
    text-align: center;
  }
  
}
</style>
