<template>
        <div class="mainSms">
                <div class="head">
                    <el-row>
                            <div class="date_box">
                                <span class="demonstration">发送日期:</span>
                                <el-date-picker
                                    v-model="valueDate"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="pickerOptions"
                                    size="mini">
                                </el-date-picker>
                            </div>
                            <div class="query_box"> 
                                <el-select v-model="queryCondition" clearable placeholder="请选择查询条件" size="mini">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                         track-by="$index">
                                        </el-option>
                                </el-select>
                            </div> 
                            <div class="box1">
                                <el-input
                                        placeholder="请输入查询内容"
                                        v-model="condition"
                                        clearable
                                        maxlength:1
                                        size="mini">
                                </el-input>  
                            </div> 
                        <el-button type="primary" @click="search" size="mini">查询</el-button>
                    </el-row>
                </div>
            <div class="main">
                <el-table
                :data="tableData"
                v-loading="loading"
                height="100%"
                border
                style="width: 100%"
                align="center">
                            <el-table-column
                            label="NO."
                            type="index"
                            :index="indexMethod"
                            width="60px">
                            </el-table-column>
                            <el-table-column
                            prop="supervisionTaskNum"
                            label="督办编号"
                            width="110"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                            prop="remindTarget"
                            label="提醒对象"
                            width="80"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                            prop="remindWay"
                            label="提醒方式"
                            width="80"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                            prop="remindInfo"
                            label="提醒事宜"
                            width="300"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                            prop="createName"
                            label="发送人"
                            width="80"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                            prop="createTime"
                            label="发送时间"
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="mobile"
                            label="手机号码"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                            prop="email"
                            label="邮件"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                            prop="recipient"
                            label="接收人"
                            width="80">
                            </el-table-column>

                </el-table>
            </div>
                <div class="footer">
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
                </div>
        </div>
</template>

<script>
export default {
    data() {
      return {
        //只可选今天之前的日期
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },  
        //开始时间，结束时间
        beginDate:'',
        endDate:'',
        //查询框-日期
        valueDate:[],
        //查询框-输入框
        condition:'',
        //查询框-查询条件 input框
        queryCondition:'',
        //查询框-查询条件 input框 接收人
        userName:'',
        //表格值
        tableData:[],
        //查询条件
        options: [{
          value: "userName",
          label: '接收人'
        }, {
          value: "supervisionTaskNum",
          label: '督办编号'
        }, {
          value: "remindInfo",
          label: '提醒事宜'
        }, {
          value: "remindTarget",
          label: '提醒对象'
        }],
        //表格字段
        superID:'',
        remindObject:'',
        remindWay:'',
        remindAffairs:'',
        sender:'',
        sendTime:'',
        phoneNumber:'',
        email:'',
        received:'',
        //分页
        //总条数
        total:0,
        //当前页面展示多少条
        pageSize:20,
        //当前页数
        currentPage:1,
        //加载条
        loading: true,
      };
    },
    //加载页面就渲染页码数据
    mounted(){
        this.tableValue();
    },
    methods: {
        //查询时，重置页码。
        search(){
            this.currentPage=1;
            this.check();
        },
        //加载表格数据
        tableValue(){
            var that=this;
            var params={page:that.currentPage,
                    pageCount:that.pageSize}
            this.$common.commitParam(this,'/supervise/remindLog/list.api',params,{
                        success : function(res) {
                                if(res.code==0){
                                    that.loading=false
                                    that.tableData=res.data
                                    that.total=res.totalCount;
                                }else{
                                    that.$message({
                                    message: res.description,
                                    type: 'warning'
                                    });
                                }
                            }
                },"get");
            },
        //点击查询时，获取日期框，查询条件框，输入框的值
        check(){
            var that=this;
            var params={page:that.currentPage,
                        pageCount:that.pageSize}
            if(that.valueDate!==null){
                params.beginDate=that.valueDate[0];
                params.endDate=that.valueDate[1];
            }
            if(that.condition!==''){
                    if(that.queryCondition!==''){
                        var val=that.queryCondition;
                            if(that.queryCondition=="userName"){
                                params.userName=that.condition;
                            }else if(that.queryCondition=="supervisionTaskNum"){
                                params.supervisionTaskNum=that.condition;
                            }else if(that.queryCondition=="remindInfo"){
                                params.remindInfo=that.condition;
                            }else if(that.queryCondition=="remindTarget"){
                                params.remindTarget=that.condition;
                            }
                    }else if(that.queryCondition==''){
                            this.$notify({
                                title: '提示',
                                message: '请选择查询条件！',
                                type: 'warning'
                            });
                        }
            }
            this.$common.commitParam(this,'/supervise/remindLog/list.api',params,{
                        success : function(res) {
                            if(res.code==0){
                                that.loading=false
                                that.tableData=res.data
                                that.total=res.totalCount;
                            }else{
                                that.$message({
                                message: res.description,
                                type: 'warning'
                                });
                            }
                        }
                },"get");
            },
        //分页方法 获取页码，每页条数
        handleSizeChange(val) {
            this.pageSize=val;
            this.check();
            },
        handleCurrentChange(val) {
            this.currentPage=val;
            this.check();
            },
        //序号连续       
        indexMethod(index) {         
            return  (this.currentPage-1)*this.pageSize + (index+1) ;
            },
    },
};
</script>

<style lang="scss">
    .mainSms{
        height:100%;
        *{
        margin: 0;
        }
        html,body{
                height: 100%;
                overflow: hidden;
            }
        .head{
            width:100%;
            }
        .main{
            margin-top: 15px;
            height:calc(100% - 91px);
        }
        .footer{
            width:100%;
            bottom: 0;
            margin: 14px 0px 0px 1px;
            }
        .body{
            height: 100%;
            overflow: hidden;
            }
        .demonstration{
            margin-right: 10px;
            }
        .date_box{
            margin: 0px 50px 0px 10px;
            width: 37%;
            font-size: 12px;
            float: left;
            }
        .query_box{
            width: 15%;
            float: left;
            margin: 0px 41px 0px -36px;
            }
        .box1{
            width: 15%;
            float: left;
            margin: 0px 10px 0px -27px;
            }
        th{
            text-align: center;
            }   

        .el-dropdown-link {
            cursor: pointer;
            color: #409EFF;
            }
        .el-icon-arrow-down {
            font-size: 12px;
            }
        .el-dropdown {
            vertical-align: top;
            }
        .el-dropdown + .el-dropdown {
            margin-left: 15px;
            }
        .el-icon-arrow-down {
            font-size: 12px;
            }
        .el-button{
            margin-left: 240px;
            margin-top: 2px;
            }
        
    }  
</style>
            //  that.$axios({
            //         method: 'get',
            //         url:'http://192.168.4.88:8080/supervise/remindLog/list.api',
            //         params:{
            //             param
            //             }
            //                 }).then(function(res){
            //                     var arr=res.data.data;
            //                    //console.log("succee");
            //                     that.total=arr.length;
            //                     that.tableData=arr;
            //                     // console.log(that.valueDate[0]);
            //                     // console.log(that.queryCondition);
            //                     // console.log(that.condition);
            //                         }).catch(err=>{
            //                             console.log(err)
            //                         })
