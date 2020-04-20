<template>
    <div class="taskcheckout">
        <div class="searchBox">
            <div class="my-input1" style="width:20%;">
                <span class="text1">责任部门：</span><el-select v-model="value2" clearable  size="mini" style="width:calc(100% - 60px)">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
                </el-select>
            </div>
            <div class="my-input1" style="width:20%;">
                <span>年月：</span><div class="block" style="display:inline-block;width:calc(100% - 36px);">
                    <el-date-picker
                    v-model="value"
                    size="mini"
                    type="month"
                    unlink-panels
                    format="yyyyMM"
                    value-format="yyyyMM"
                    placeholder="选择月"
                    style="width:100%;">
                    </el-date-picker>
                </div>
            </div>
            <el-button type="primary" size="mini" @click="search">查询</el-button>
            <el-button type="primary" size="mini" @click="search">导出</el-button>
        </div>
        <div class="tableBox" style="margin-top:15px;">
          <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            @selection-change="handleSelectionChange"
            :data="tableData"
            height="100%"
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
              width="150">
            </el-table-column>
            <el-table-column
              prop="title"
              label="督办名称"
              width="180" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="responsible"
              label="责任部门/责任人" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sourceName"
              label="事项来源" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="leaderUserName"
              label="分管领导">
            </el-table-column>
            <el-table-column
              prop="endDate"
              width="150"
              label="计划结束时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="planDesc"
              label="工作计划" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="processStateName"
              label="备注">
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
    value:'',
    input:'',
    tableData:[],
    sum:0,
    pageCount:20,
    page:1,
    options: [],
    value2: '',
    multipleSelection: [],
    }
  },
  mounted(){
    this.loadData()
  },
  methods:{
    loadData(){
        var that=this;
        that.getlistDept();
        that.loading=true;
        //添加参数（由于后台不允许传参为空值，只能在数据不为空情况下才能传此参数）
        var params={page:that.page,pageCount:that.pageCount};
        if(that.value!==''){
            params.monthId=that.value;
        };
        if(that.value2!==''&&that.value2!=='-1000'){
            params.responsibleDeptId=that.value2
        };
        this.$common.commitParam(this,"/supervise/taskinfo/list.api",params,{
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
        
    },
    // 获取搜索区责任部门数据
    getlistDept(){
      var that=this;
      this.$common.commitParam(this,"/supervise/sys/listDept.api",{},{
		success : function(res) {
            res.data.unshift({id:'-1000',name:'所有'})
            var box=[];
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
.taskcheckout{
  height:100%;
  .tableBox{
    height: calc(100% - 90px);
  }
  .my-input1{
    margin-right:10px;
    display:inline-block;
  }
  .el-dialog{
    margin:0 auto;
  }
  .text1{
    display:inline-block;
    width:60px;
  }
}
</style>