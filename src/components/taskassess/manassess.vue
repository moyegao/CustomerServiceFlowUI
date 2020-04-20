<template>
    <div class="manassess">
        <div class="searchBox">
        <div class="my-input1" style="width:16%;">
        <span >督办名称：</span><el-input
            placeholder="请输入内容"
            v-model="superviseName"
            size="mini"
            clearable style="width:calc(100% - 60px);">
        </el-input>
        </div>
        <div class="my-input1" style="width:16%;">
            <span >负责人：</span><el-input
              placeholder="请输入内容"
              v-model="principal"
              size="mini"
              clearable style="width:calc(100% - 48px);">
            </el-input>
        </div>
        <div class="my-input1" style="width:35%;">
        <span>年月：</span><div class="block" style="display:inline-block;width:calc(100% - 36px);">
        <el-date-picker
        v-model="beginYearM"
        size="mini"
        type="month"
        unlink-panels
        format="yyyyMM"
        value-format="yyyyMM"
        placeholder="选择开始年月"
        style="width:100%;">
        </el-date-picker>-
        <el-date-picker
        v-model="endYearM"
        size="mini"
        type="month"
        unlink-panels
        format="yyyyMM"
        value-format="yyyyMM"
        placeholder="选择结束年月"
        style="width:100%;">
        </el-date-picker>
        </div>
        </div>
        <div class="my-input1" style="width:20%;">
            <span >任务状态：</span><el-select v-model="taskStaus" clearable  size="mini" style="width:calc(100% - 60px)">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
            </el-select>
        </div>
          
          <el-button type="primary" size="mini" @click="search">查询</el-button>
        </div>
        <div class="tableBox" style="margin-top:15px;">
          <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            :data="tableData"
            height="100%"
            border
            style="width:100%">
            <el-table-column
            type="index"
            :index="meterIndexMethod"
            label="NO."
            width="50">
            </el-table-column>
            <el-table-column
              prop="supervisionTaskNum" 
              label="督办编号"
              width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="title" 
              label="督办名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="responsibleUserName"
              label="负责人" width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sponsorUserName"
              label="主办人" width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="monthId" 
              label="汇报年月" width="100">
            </el-table-column>
            <el-table-column
              prop="reportDate" 
              label="汇报时间" width="100">
            </el-table-column>
            <el-table-column
              prop="overdueDays" 
              label="超期天数" width="80">
            </el-table-column>
            <el-table-column
              prop="score" 
              label="本月加减分" width="100">
            </el-table-column>
            <el-table-column
              prop="sumScore" 
              label="总加减分" width="80">
            </el-table-column>
            <el-table-column
              prop="state" 
              label="任务状态" width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="update(scope.row)" type="primary" size="mini">考核</el-button>
              </template>
            </el-table-column>
            </el-table>
        </div>
                <!-- <div class="footer">
                        <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[20,100, 200, 300, 400]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                </div> -->
    </div>
</template>
<script>
export default {
  data () {
    return {
    loading:true,
    beginYearM:'',
    endYearM:'',
    superviseName:'',
    principal:'',
    tableData:[],
    pageCount:100,
    page:1,
    options: [
    {
      value: '',
      label: ''
    },
    {
      value: '1',
      label: '已确定'
    },
    {
      value: '2',
      label: '办结中'
    },
    {
      value: '3',
      label: '已结办'
    },
    {
      value: '4',
      label: '已终止'
    }
    ],
    taskStaus: '',
    // //分页
    // //总条数
    // total:0,
    // //当前页面展示多少条
    // pageSize:20,
    // //当前页数
    // currentPage:1,
    }
  },
  mounted(){
    this.loadData();
  },
  methods:{
    loadData(){
        var that=this;
        that.loading=true;
        var params={};
              // 时间验证
        if(that.beginYearM>that.endYearM){
          that.$message({
              message: '开始时间应小于结束时间,请重新选择！',
              type: 'warning'
          });
        }else{
          if(that.beginYearM!==''){
              params.beginMonthId=that.beginYearM;
          }
          if(that.endYearM!==''){
              params.endMonthId=that.endYearM;
          }
          if(that.taskStaus!==''){
              params.processStateId=that.taskStaus
          };
          if(that.superviseName!==''){
              params.title=that.superviseName
          }
          if(that.principal!==''){
              params.responsibleUserName=that.principal
          }
          this.$common.commitParam(this,"/supervise/assessment/listArtificialAssessment.api",params,{
              success : function(res) {
                  if(res.code==0){
                    that.tableData=res.data;
                    that.total=res.totalCount;
                    that.loading=false
                  }else{
                    that.$message({
                    message: res.des,
                    type: 'warning'
                    });
                  }
              }
          },"get");
        }
    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod(index) {
        return  (index+1) ;
    },
    search(){
        var that=this;
        that.loadData();
    },
    // //分页方法 获取页码，每页条数
    //     handleSizeChange(val) {
    //         this.pageSize=val;
    //         console.log(`每页 ${val} 条`);
    //         this.loadData();
    //         },
    //     handleCurrentChange(val) {
    //         this.currentPage=val;
    //         console.log(`当前页: ${val}`);
    //         this.loadData();
    //         },
  }
}
</script>

<style lang="scss">
.manassess{
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
  .el-date-editor{
      width:47%!important;
  }
}
</style>