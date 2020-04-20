<template>
    <div class="myapply">
        <div class="searchBox">
          <el-radio v-model="radio" label="1" style="margin-left:20px;">执行中</el-radio>
          <el-radio v-model="radio" label="2" style="margin-right:20px;">已结束</el-radio>
          <div class="my-input1" style="width:20%;">
            <span style="width:90px;">督办名称：</span><el-input
              placeholder="请输入内容"
              v-model="input"
              size="mini"
              clearable style="width:calc(100% - 60px);">
            </el-input>
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
            style="width: 100%">
            <el-table-column
            type="index"
            :index="meterIndexMethod"
            label="NO."
            width="50">
            </el-table-column>
            <el-table-column
              prop="processName"
              label="流程名称"
              >
            </el-table-column>
            <el-table-column
              prop="title"
              label="督办名称"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <router-link to="" @click.native="dialog(scope.row)" style="display:inline=block;">[<span style="color:red;">{{scope.row.taskName}}</span>]<span>{{scope.row.title}}</span></router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="任务开始时间"show-overflow-tooltip>
            </el-table-column>
			      <el-table-column
              prop="endTime"
              label="任务结束时间"show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="startUser"
              label="任务发起人"show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="assignee"
              label="状态"show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button  @click="handleClick(scope.row)" type="primary" size="small">查看流程图</el-button>
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
          <div>
            <el-dialog :visible.sync="addContent">
              <div class="svgmap"></div>
            </el-dialog>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
    loading:true,
    input:'',
    tableData:[],
    sum:0,
    pageCount:20,
    page:1,
    addContent: false,
    radio:'1',
    url:'todoApproval'
    }
  },
  watch:{
    radio:function(){
      this.updated()
    }
  },
  mounted(){
    this.loadData();
  },
  methods:{
    // radius发生变化触发事件
    updated(){
      var that=this;
      that.loadData()
    },
    loadData(){
      var that=this;
      that.loading=true;
      var params={page:that.page,pageCount:that.pageCount,status:that.radio};
      if(that.input!==''){
        params.title=that.input
      }
      this.$common.commitParam(this,"/supervise/workflow/myappl.api",params,{
      success : function(res) {
          that.tableData=res.data;
          that.sum=res.totalCount
          if(res.code==0){
            that.loading=false
          }      
      }
			},"get"); 
    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod(index) {
        return  (this.page-1)*this.pageCount + (index+1) ;
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
    // 查询
    search(){
      this.loadData();
    },
    // 点击事件出发弹窗
    dialog(row){
      
      var that=this;
      window.open('#/alltaskinfo?id='+row.id)
    },
    // 点击查看流程图
    handleClick(row){
      var that=this;
      var id=row.id;
      var formId=row.formId;
      this.$common.commitParam(this,"/supervise/workflow/workflowsvg.api",{"id":id,"formId":formId},{
				success : function(res) {
          // that.addContent=true;
          // ;
          that.$nextTick(() => {
            $('.svgmap').html(res.data.data);
          }); 
				}
			},"get");
    }
  }
}
</script>

<style lang="scss">
.myapply{
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
    height:90%;
    width:80%;
    margin-top:7vh!important;
  }
  .el-dialog__body{
    height:calc(100% - 30px);
    padding: 10px 20px;
  }
  .svgmap{
    height:100%;
    overflow: hidden;
  }
  .text1{
    display:inline-block;
    width:60px;
  }
  a:hover{
    color:#00a4ac;
  }
  .el-radio__label{
    font-size:12px;
  }
  .el-table th, .el-table tr{
    height: .5rem;
  }
}
</style>