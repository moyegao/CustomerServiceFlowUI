<template>
    <div class="myfocus">
        <div class="tableBox" style="margin-top:15px;">
          <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            :data="tableData"
            height="100%"
            border
            style="width: 100%">
            <el-table-column
            type="index"
            :index="meterIndexMethod"
            label="NO."
            width="50">
            </el-table-column>
            <el-table-column prop="title" label="任务名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <href @click="handleClick(scope.row)" type="text" size="small"><font color="blue">{{scope.row.title}}</font></href>
              </template>
            </el-table-column>
            <el-table-column prop="planDesc" label="任务说明" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="responsible" label="责任部门/责任人" width="180" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="endDate" label="计划结束时间" width="180" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="leaderUserName" label="分管领导" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="progressScale" label="当前进度" width="80" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="reportInfo" label="最新进展" show-overflow-tooltip> </el-table-column>
            <el-table-column fixed="right" label="操作" width="130">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleDelete(scope.row)">取消关注</el-button>
              </template>
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
    </div>
</template>
<script>

export default {
  props:['supervisionTaskType'],
  data () {
    return {
      loading:true,
      tableData:[],
      sum:0,
      windowScreenHeight: window.screen.height - 90,
      windowScreenWidth:window.screen.width,
      pageCount:20,
      page:1
    }
  },
  mounted(){
    this.loadData()
  },
  methods:{
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod(index) {
        return  (this.page-1)*this.pageCount + (index+1) ;
    },
    loadData(){
      var that = this;
      that.loading = true;
      var params={page:that.page,pageCount:that.pageCount};
      if(that.supervisionTaskType !== ''){
        params.supervisionTaskType = that.supervisionTaskType;
      }
      this.$common.commitParam(this,"/supervise/myattention/list.api",params,{
				success : function(res) {
          that.tableData=res.data;
          for(var i=0;i<that.tableData.length;i++){
            that.tableData[i].responsible=res.data[i].responsibleUserName+'/'+res.data[i].responsibleDeptName;
          }
          that.sum=res.totalCount;
          if(res.code==0){
            that.loading=false
          }
				}
      },"get");
    },
    openWindow(url, name, iWidth, iHeight){ 
      window.open(url, name, 'height='+iHeight+',innerHeight='+iHeight+', width='+iWidth+',innerWidth='+iWidth+',top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizeable=no,location=no,status=no');  
    },
    handleClick(row){
      this.openWindow('#/alltaskinfo?id='+row.id, '任务详情', this.windowScreenWidth, this.windowScreenHeight);
    },
    // 分页功能-获取每页条数
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageCount=val;
        this.loadData();
    },
    // 分页功能-获取当前页
    handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page=val;
        this.loadData();
    },
    // 取消关注
    handleDelete(row){
      var that=this;
      that.loading=true;
      var id=row.id;
      this.$common.commitParam(this,"/supervise/myattention/delete.api",{"id":id},{
				success : function(res) {
          that.loadData();
				}
      },"post",false);
    }
  }
}
</script>

<style lang="scss">
.myfocus{
  height:100%;
  .tableBox{
    height: calc(100% - 72px);
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
