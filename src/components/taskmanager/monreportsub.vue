<template>
    <div class="monreportsub">
        <div class="btn" style="text-align:right;margin-right:40px;">
          <el-button type="primary" size="mini" @click="save('save')">保存</el-button>
          <el-button type="primary" size="mini" @click="save('submit')">提交</el-button>
          <el-button type="primary" size="mini" @click="search">查询</el-button>
        </div>
        <div class="tableBox" style="margin-top:15px;">
          <el-table v-loading="loading"
            element-loading-text="拼命加载中"
            @selection-change="handleSelectionChange"
            element-loading-spinner="el-icon-loading"
            :data="tableData"
            height="100%"
            border
            style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              type="index"
              :index="meterIndexMethod"
              label="NO."
              width="50">
            </el-table-column>
            <el-table-column
              prop="supervisionTaskNum"
              label="督办编号"
              width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="monthId"
              label="年月"
              width="80"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="reportUser"
              width="80"
              label="汇报人" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="reportDate"
              width="120"
              label="汇报时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="stateName"
              label="任务状态" width="80" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="progressScale"  label="完成进度" width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <input :disabled="scope.row.stateId === 1" class="aaaa" type="number" v-model="scope.row.progressScale">
              </template>
            </el-table-column>
            <el-table-column prop="progressStateId" label="进度情况" show-overflow-tooltip width="150">
              <template slot-scope="scope">
                <el-select :disabled="scope.row.stateId === 1" v-model="scope.row.progressStateId">
                  <el-option v-for="item in progressStateOptions" :key="item.value" :label="item.label" :value="item.value"/>
			          </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="reportInfo" label="汇报内容" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  :rows="4"
                  :disabled="scope.row.stateId === 1"
                  placeholder="请输入内容"
                  v-model="scope.row.reportInfo">
                </el-input>
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
  data () {
    return {
      loading:true,
      tableData:[],
      sum:0,
      pageCount:20,
      page:1,
      progressStateOptions:[],
      multipleSelection: [],
    }
  },
  mounted(){
    this.progressStateData();
    this.loadData();
  },
  methods:{
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod(index) {
        return  (this.page - 1) * this.pageCount + (index + 1) ;
    },
    loadData(){
      var that = this;
      that.loading = true;
      var params={page:that.page,pageCount:that.pageCount};
      this.$common.commitParam(this,"/supervise/monthreport/list.api",params,{
				success : function(res) {
          that.tableData=res.data;
          that.sum = res.data.length;
          if(res.code==0){
            that.loading = false
          }
				}
      },"get");
    },
    // 分页功能-获取每页条数
    handleSizeChange(val) {
        this.pageCount=val;
        this.loadData();
    },
    // 分页功能-获取当前页
    handleCurrentChange(val) {
        this.page = val;
        this.loadData();
    },
    // 将当前复选框被选中的表格数据赋值到multipleSelection数组变量中
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
     // 搜索
    search(){
      this.loadData();
    },
    progressStateData(){
        var that = this;
        var options = [];
        this.$common.commitParam(this,"supervise/dic/options.api",{type : 'report_progress_state'},
        {
            success : function(res){
              if(res.code === 0){
                $(res.data).each(function(index, item){
                  var data = {'value':parseInt(item.value), 'label' : item.label};
                  options.push(data);
                });
                that.progressStateOptions = options;
              }
            }
        },'get');
      },
    // 保存
    save(type){
      var that = this;
      var data = new Array();
      if(this.multipleSelection.length == 0){
          that.$message({
            message: '请选择！',
            type: 'warning'
          });
          return;
      }
      for(var i = 0; i < this.multipleSelection.length; i++){
          var params = {};
          var obj = that.multipleSelection[i];
          params.progressScale = obj.progressScale;
          params.reportInfo = obj.reportInfo;
          params.progressStateId = obj.progressStateId;
          params.id = obj.id;
          if(type == 'submit'){
            params.stateId = 1;
          }
          data.push(params);
      }
      this.$common.commitParam(this,"/supervise/monthreport/save.api",data,
      {
				success : function(res) {
           that.$message({
            message: '保存成功！',
            type: 'success'
            });
				}
      },"post");
    }
  }
}
</script>

<style lang="scss">
.monreportsub{
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
  .aaaa{
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
    text-align:center;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .select{
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
}
</style>