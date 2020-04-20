<template>
    <div class="departassess">
        <div class="searchBox">
        <div class="my-input1" style="width:20%;">
        <span class="text1">责任部门：</span>
        <el-select v-model="responsibleDept" clearable  size="mini" style="width:calc(100% - 70px)">
            <el-option
                v-for="item in remindRoleNames"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select></div>
          <div class="my-input1" style="width:35%;">
            <span>年月：</span><div class="block" style="display:inline-block;width:calc(100% - 36px);">
            <el-date-picker
            v-model="beginYearM"
            size="mini"
            type="month"
            unlink-panels
            format="yyyyMM"
            value-format="yyyyMM"
            placeholder="选择月"
            style="width:100%;">
            </el-date-picker>至
            <el-date-picker
            v-model="endYearM"
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
          <el-button type="primary" size="mini" @click="checkout">导出</el-button>
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
              prop="responsibleDeptName"
              label="责任部门"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="monthId"
              label="考核年月"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="score"
              label="加减分">
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
    loading:true,
    //加载条
    beginYearM:'',
    endYearM:'',
    //查询框开始年月，结束年月
    tableData:[],
    pageCount:100,
    page:1,
    remindRoleNames: '',
    //存储责任部门的值
    responsibleDept: ''
    //下拉框值
    }
  },
  mounted(){
        var that=this;
        that.loadData();
  },
  methods:{
    // 获取搜索区责任部门数据
    getlistDept(){
      var that=this;
      this.$common.commitParam(this,"/supervise/sys/listDept.api",{},{
		success : function(res) {
            //;
            var arr = [];
            res.data.map((n,i)=>{
                var arrItem = {}
                arrItem = {
                    value:n.id,
                    label:n.name
                }
                arr.push(arrItem);
            })
            that.remindRoleNames=arr;  
		}
		},"get");
    },
    //加载列表数据
    loadData(){
        this.getlistDept();
        var that=this;
        that.loading=true;
        var params={};
        if(that.beginYearM!==''){
            params.beginMonthId=that.beginYearM;
        }
        if(that.endYearM!==''){
            params.endMonthId=that.endYearM;
        }
        if(that.responsibleDept!==''&&that.responsibleDept!=='-1000'){
            params.responsibleDeptId=that.responsibleDept
        };
        this.$common.commitParam(this,"/supervise/assessment/listDeptAssessment.api",params,{
            success : function(res) {
                if(res.code==0){ 
                    that.tableData=res.data
                    that.sum=res.totalCount;
                    that.loading=false
                }
            }
        },"get");
    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod(index) {
        return  index+1 ;
    },
    search(){
        var that=this;
        that.loadData();
    },
    checkout(){
        var that=this;
        var params='';
        var url="supervise/assessment/export.api";
        if(that.beginYearM!==''){
            params=params+"&beginMonthId="+that.beginYearM;
        }
        if(that.endYearM!==''){
            params=params+"&endMonthId="+that.endYearM;
        }
        if(that.responsibleDept!==''&&that.responsibleDept!=='-1000'){
            params=params+"&responsibleDeptId="+that.responsibleDept;
        };
        url = url + "?" +params;
        window.open(process.env.baseUrl+url);
      
    },

  }
}
</script>

<style lang="scss">
.departassess{
    .searchBox{
        text-align:  right;
    }
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