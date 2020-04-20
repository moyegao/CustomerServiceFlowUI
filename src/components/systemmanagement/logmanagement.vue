<template>
    <div class="logM">
        <div class="head">
            <el-row>
                <div class="beginDate">
                                <span class="demonstration">日期：</span>
                                <el-date-picker
                                        v-model="valueDate"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                        size="mini">
                                </el-date-picker>
                                <template>
                                <span class="demonstration">日志类型：</span>
                                    <el-select v-model="statesV" clearable placeholder="请选择"
                                        size="mini">
                                        <el-option
                                        v-for="item in states"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                 </div>                
                    <el-button type="primary" size="mini" @click="search">查询</el-button>
            </el-row>
        </div>
        <div class="main">
                <el-table
                    :data="tableData"
                    border
                    height="100%"
                    style="width: 100%"
                    align="center">
                        <el-table-column
                        label="NO."
                        type="index"
                        :index="indexMethod"
                        width="65px">
                        </el-table-column>
                        <el-table-column
                        prop="beginDate"
                        label="请求开始时间"
                        width="175px"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="endDate"
                        label="请求结束时间"
                        width="175px"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="exception"
                        label="异常信息"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="method"
                        label="请求方式"
                        width="">
                        </el-table-column>
                        <el-table-column
                        prop="requestData"
                        label="请求参数"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="remoteAddr"
                        label="请求IP"
                        width=""
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="requestUri"
                        label="请求地址"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="type"
                        label="日志类型"
                        width="80px"
                        :formatter="formatter">>
                        </el-table-column>
                        <el-table-column
                        prop="userAgent"
                        label="代理信息"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="responseData"
                        label="响应数据">
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
          //查询框 日志类型
        states:[{
          value: "1",
          label: '成功'
        }, {
          value: "2",
          label: '失败'
        }],
        statesV:'',
        //开始时间，结束时间
        beginDate:'',
        endDate:'',
        //查询框-日期        
        valueDate:[],
        //表格值
        tableData:[],
        //表格字段
        beginDate:'',
        endDate:'',
        exception:'',
        method:'',
        requestData:'',
        remoteAddr:'',
        requestUri:'',
        type:'',
        userAgent:'',
        responseData:'',
        //分页
        //总条数
        total:0,
        //当前页面展示多少条
        pageSize:20,
        //当前页数
        currentPage:1,
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
    //序号连续 
       indexMethod(index) {         
            return  (this.currentPage-1)*this.pageSize + (index+1) ;
            },
    //加载表格数据 
        tableValue(){
            var that=this;
            var params={page:that.currentPage,
                    pageCount:that.pageSize}           
                    this.$common.commitParam(this,'/supervise/log/list.api',params,{
                        success : function(res) {
                            that.tableData=res.data;
                            that.total=res.totalCount;
                                if(res.code==0){
                                    that.loading=false
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
                if(that.statesV!==null){
                    params.type=that.statesV;
                    
                }
                this.$common.commitParam(this,'/supervise/log/list.api',params,{
                            success : function(res) {
                                that.tableData=res.data
                                that.total=res.totalCount;
                                if(res.code==0){
                                    that.loading=false
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
    //列表 字段日志类型 状态1,0的转换
        formatter(row, column) {
            return row.type == "1" ? '成功' :  '失败' ;
        },
    },
  };
</script>

<style lang="scss">
    .logM{
        height:100%;
        .head{
            width: 1196px;
        }
        .beginDate{
            width:60%;
            font-size: 12px;
            float: left;
            margin-left: 20px;
        }
        .main{
            margin-top: 15px;
            height:calc(100% - 75px);
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
           margin-left: 270px;
        }
        .el-select-dropdown{
                top: 137px;
        }
    }
</style>
