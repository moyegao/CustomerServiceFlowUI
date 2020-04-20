<template>
  <div class="permisemanagement">
    <el-tabs v-model="activeName2">
      <div class="one1 fl">
        <div class="role">
          角色
        </div>
        <ul>
          <li :key="tmp.label" v-for="tmp in listRoleMenu">
            <a href="javascript:void(0)" @click.prevent="show(tmp)">{{tmp.label}}</a>
          </li>
        </ul>
      </div>
      <div class="two1 fl">
        <div>
          <el-button type="primary" @click="save" size="mini">保存</el-button>
        </div>
        <div>
          <el-button type="primary" @click="checkall" size="mini">全选</el-button>
        </div>
        <div>
          <el-button type="primary" @click="reset1" size="mini">重置</el-button>
        </div>
      </div>
      <div class="three1 fl">
        <div class="rolefun">
          菜单查看权
        </div>

        <el-tree v-loading="treeLoading" :data="data2" show-checkbox node-key="id" highlight-current ref="tree" :default-checked-keys="num" :props="defaultProps">
        </el-tree>
      </div>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName2: 'first',
      listRoleMenu: [],
      num: [],
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        treeData: [],
        key: ''
      },
      treeLoading: false,
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // 加载左侧数据
    loadData() {
      var that = this;
      var arr = [];
      this.$common.commitParam(this, "/supervise/sys/listRoleMenu.api", {}, {
        success: function (res) {
          if (res.code == 0) {
            res.data.map(function (i, j) {
              arr.push({ key: i.key, label: i.roleName, });
            })
            that.listRoleMenu = arr
          } else {
            that.$message({ message: res.description, type: 'warning' });
          }
        }
      }, "get");
    },
    // 点击左侧角色加载右侧树
    show(tmp) {
      var ev = ev || window.event;
      var that = this;
      that.key = tmp.key
      that.treeLoading = true;
      this.$common.commitParam(this, "/supervise/sys/listMenuByRoleKey.api", { roleKey: tmp.key },
        {
          success: function (res) {
            that.treeData = res.data;
            // var box=[];
            that.num = [];

            //获取左侧树数据
            that.data2 = res.data;
            that.data2 = JSON.parse(JSON.stringify(that.data2).replace(/name/g, "label"));
            that.data2 = JSON.parse(JSON.stringify(that.data2).replace(/key/g, "id"));

            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].checked == true) {
                that.num.push(res.data[i].key)
              }
              for (let j = 0; j < res.data[i].children.length; j++) {
                if (res.data[i].children[j].checked == true) {
                  that.num.push(res.data[i].children[j].key)
                }
                if (res.data[i].children[j].children != undefined) {
                  for (let k = 0; k < res.data[i].children[j].children.length; k++) {
                    if (res.data[i].children[j].children[k].checked == true) {
                      that.num.push(res.data[i].children[j].children[k].key)
                    }

                  }
                }

              }

            }
            that.treeLoading = false;


            // for(var i=0;i<res.data.length;i++){
            //     if(res.data[i].checked==true){
            //         that.num.push(res.data[i].key)
            //     }
            //     var first = {
            //             id:res.data[i].key,
            //             label:res.data[i].name,
            //             children:[]
            //         }
            //     for(var j=0;j<res.data[i].children.length;j++){
            //         if(res.data[i].children[j].checked==true){
            //             that.num.push(res.data[i].children[j].key)
            //         }
            //         var second = {
            //             id:res.data[i].children[j].key,
            //             label:res.data[i].children[j].name,
            //         }

            //         console.log(typeof res.data[i].children[j].children);
            //         // if (res.data[i].children[j].children != undefined) {
            //         //     for(var k=0;k<res.data[i].children[j].children.length;k++){
            //         //         if(res.data[i].children[j].children[k].checked==true){
            //         //             that.num.push(res.data[i].children[j].children[k].key)
            //         //         }
            //         //         var third = {
            //         //             id:res.data[i].children[j].children[k].key,
            //         //             label:res.data[i].children[j].children[k].name,
            //         //         }
            //         //         second.children.push(third);
            //         //     }
            //         // }
            //         first.children.push(second)
            //     }
            //     box.push(first)
            // }
            // that.data2=box;
            // console.log(that.data2);
          }
        }, "get");
      $(ev.target).css('color', 'red').parent().siblings().children().css('color', '#000')
    },
    // 重置
    reset1() {
      this.$refs.tree.setCheckedKeys([]);
    },
    // 全选
    checkall() {
      var that = this;
      var box = [];
      for (var i = 0; i < that.treeData.length; i++) {
        var p = {
          id: that.treeData[i].key,
          label: that.treeData[i].name
        }
        box.push(p)
      }
      this.$refs.tree.setCheckedNodes(box);
    },
    // 保存
    save() {
      var that = this;
      var arr = this.$refs.tree.getCheckedKeys();
      var arr2 = this.$refs.tree.getHalfCheckedKeys();
      arr = arr.concat(arr2);
      that.$common.commitParam(this, "/supervise/sys/insertRoleMenu.api", { roleKey: that.key, menu: arr.join() },
        {
          success: function (res) {
            if (res.code == 0) {
              that.$message({ message: res.description, type: 'success' });
              that.listRoleMenu = res.data
              that.loadData();
            } else {
              that.$message({ message: res.description, type: 'warning' });
            }
          }
        }, "post", false);
    }
  }
}
</script>
<style lang="scss">
.permisemanagement {
  height: 100%;
  .el-tabs {
    height: 100%;
  }
  .el-tabs__content {
    height: calc(100% - 40px);
  }
  .one1 {
    width: 30%;
    height: 95%;
    // overflow-y: scroll;
    border: 1px solid #ebeef5;
    .role {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-weight: bold;
      text-align: center;
      // background:#f5f7fa;
      background: #dedfe0;
      font-size: 20px;
    }
    ul {
      margin: 0px auto;
      width: 100%;
      height: 100%;
    }
    li {
      width: calc(100% - 70px);
      margin: 0 auto;
      font-size: 17px;
    }
    ul li {
      margin-top: 15px;
    }
    ul li a {
      color: #000;
      font-size: 17px;
    }
    ul li a:hover {
      color: #006699;
    }
  }
  .two1 {
    width: 20%;
    height: 95%;
    text-align: center;
    div {
      margin-top: 20px;
    }
  }
  .three1 {
    width: 30%;
    height: 95%;
    overflow: auto;
    border: 1px solid #ebeef5;
    .rolefun {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-weight: bold;
      text-align: center;
      background: #dedfe0;
      font-size: 20px;
    }
  }
  .one1,
  .two1,
  .three1 {
    margin-left: 5%;
  }
  .el-button {
    width: 80px;
    height: 40px;
    font-size: 20px;
      background: #47b5e8;
      border-color: #47b5e8;
  }
  .el-tree{
    height: 90%;
    overflow-y: auto
  }
  .el-checkbox__inner{
    margin-left:.1rem;
  }
  .el-tree-node__content>.el-tree-node__expand-icon{
    padding: 12px;
  }
}
</style>