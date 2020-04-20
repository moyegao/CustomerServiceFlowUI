<template>
    <div class="taskinfo">
        <div class="searchBox" style="text-align: right;">
            <div class="my-input1" style="width:15%;">
            <span class="">任务类型：</span>
            <el-select v-model="supervisionTaskType" size="mini" style="width:calc(100% - 65px);">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            </el-select>
            </div>
            <div class="my-input1" style="width:20%;">
                <span class="text1">责任部门：</span>
                <el-select v-model="responsibleDeptId" clearable  size="mini" style="width:calc(100% - 80px)">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
                </el-select>
            </div>
            <div class="my-input1" style="width:15%;">
                <span >提醒人</span>
                <el-select v-model="remindTarget" clearable  size="mini" style="width:calc(100% - 60px)">
                  <el-option value="" label=""></el-option>
                  <el-option value="3" label="协办人"></el-option>
                  <el-option value="1" label="责任人"></el-option>
                  <el-option value="2" label="主办人"></el-option>
                  <el-option value="0" label="所有"></el-option>
                </el-select>
            </div>
            <div class="my-input1" style="width:30%;">
            <span style="width:90px;">督办编号/名称：</span>
            <el-input  placeholder="请输入内容" v-model="input" size="mini" clearable style="width:calc(100% - 100px);">
            </el-input>
          </div>
            <el-button type="primary" size="mini" @click="search">查询</el-button>
            <el-button type="primary" size="mini" @click="info">发送提醒</el-button>
        </div>
        <div class="tableBox" style="margin-top:15px;">
          <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            @selection-change="handleSelectionChange"
            :data="tableData"
            height="100%" stripe 
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
            type="index"
            :index="meterIndexMethod"
            label="NO."
            width="50">
            </el-table-column>
            <el-table-column
              prop="supervisionTaskNum"
              label="督办编号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="title"
              label="督办名称"
              width="280" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="responsible"
              label="责任部门/责任人" width="150" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sourceName"
              label="事项来源" width="150" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="leaderUserName"
              label="分管领导" width="80">
            </el-table-column>
            <el-table-column
              prop="endDate"
              width="120"
              label="计划结束时间"  show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="planDesc"
              label="工作计划"  show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="taskStateName"
              label="备注" width="80">
            </el-table-column>
          </el-table>
          <div class="block" style="margin-top:10px;">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20,50, 100, 200]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                :total="sum">
              </el-pagination>
          </div>
        </div>
        <div class="dialog">
          
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
    loading:true,
    input:'',
    responsibleDeptId:'',
    tableData:[],
    sum:0,
    pageCount:20,
    page:1,
    supervisionTaskType: '',
    options: [],
    options2: [{
        value: 'GS',
        label: '供水'
      }, {
        value: 'JT',
        label: '集团'
    }],
    remindTarget: '',
    multipleSelection: [],
    }
  },
  mounted(){
    this.loadData()
  },
  methods:{
    loadData(){
        var that = this;
        that.getlistDept();
        that.loading = true;
        var params = {page:that.page, pageCount:that.pageCount};
        if(that.responsibleDeptId !== '' && that.responsibleDeptId !== '-1000'){
            params.responsibleDeptId = that.responsibleDeptId;
        };
        if(that.supervisionTaskType !== ''){
            params.supervisionTaskType = that.supervisionTaskType;
        };
        if(that.input !== ''){
            params.title = that.input;
        };
        this.$common.commitParam(this,"/supervise/taskinfo/list.api",params,
        {
            success : function(res) {
                that.tableData=res.data;
                if(res.code==0){
                    that.loading=false
                }
                that.sum=res.totalCount;
                for(var i=0;i<res.data.length;i++){
                    that.tableData[i].responsible=res.data[i].responsibleDeptName+'/'+res.data[i].responsibleUserName;
                }
            }
        },"get");
    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod(index) {
        return  (this.page-1)*this.pageCount + (index+1) ;
    },
    // 将当前复选框被选中的表格数据赋值到multipleSelection数组中
    handleSelectionChange(val){
      this.multipleSelection = val;
     
    },
    // 分页功能-获取每页条数
    handleSizeChange(val) {
       
        this.pageCount=val;
        this.loadData();
    },
    // 分页功能-获取当前页
    handleCurrentChange(val) {
       
        this.page=val;
        this.loadData();
    },
    search(){
        this.loadData()
    },
    info(){
      var that = this;
      if(that.multipleSelection.length == 0){
        that.$message({message: '请勾选需要发送的任务！',type: 'warning'});
        return;
      }
      if(that.remindTarget == ''){
        that.$message({message: '请选择发送对象！',type: 'warning'});
        return;
      }
      var id = ''
      for(var i = 0; i < that.multipleSelection.length; i++){
        if(id == ''){
          id = that.multipleSelection[i].id;
        }else{
          id = id + ',' + that.multipleSelection[i].id ;
        }
      }
      var params = {id : id};
      if(that.remindTarget !== ''){
          params.type = that.remindTarget;
      };
      this.$common.commitParam(this,"/supervise/taskinfo/remind.api",params,
      {
			success : function(res) {
        if(res.code === 0){
          that.$message({message: '发送提醒成功！',type: 'success'});
        }else{
          that.$message({message: '发送失败！',type: 'error'});
        }
		}
		}, "post", false);
  },
    getlistDept(){
      var that = this;
      this.$common.commitParam(this,"/supervise/sys/listDept.api",{},
      {
		  success : function(res) {
            res.data.unshift({id:'-1000',name:'所有'})
            var box = [];
            for(var i=0;i<res.data.length;i++){
                var values={};
                values.value=res.data[i].id;
                values.label=res.data[i].name
                box.push(values);
            }
            that.options=box;
		}
		},"get");
    },
  }
}
</script>

<style lang="scss">
.taskinfo{
  height:100%;
  .tableBox{
    height: calc(100% - .9rem);
  }
  .my-input1{
    margin-right:10px;
    display:inline-block;
    span{
      font-size:.16rem;
    }
  }
  .el-dialog{
    margin:0 auto;
  }
  .text1{
    display:inline-block;
    width:60px;
  }
  .el-table .cell {
    height: .32rem !important;
    line-height: .32rem !important;
  }
}
</style>