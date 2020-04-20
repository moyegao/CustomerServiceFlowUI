<template>
    <div class="overseetype">
        <div class="head">
            <span style="font-size:13px;color:#2196f3;margin-bottom">当前位置：督办来源</span>
            <el-row>
                <el-button type="primary" size="mini" @click="formtype(1,'')">新增来源类型</el-button>
            </el-row>
        </div>
        <div class="main">
            <template>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    v-loading="loading"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                        label="NO."
                        type="index"
                        :index="indexMethod"
                        width="65px">
                    </el-table-column>
                    <el-table-column
                    label="督办来源类型编号"
                    prop="sourceNum"
                    width="">
                    </el-table-column>
                    <el-table-column
                    prop="sourceName"
                    label="督办来源"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="sourceDesc"
                    label="类型说明"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="state"
                    label="是否启用"
                    show-overflow-tooltip
                    :formatter="formatter">
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                        <template slot-scope="scope">                
                            <el-button type="text" size="mini"  @click="formtype(0,scope.row)">修改</el-button>
                            <el-button type="text" size="mini"  @click="remove(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>

        <el-dialog :title="msg" :visible.sync="dialogFormVisible" @close="reset('ruleForm')">
                <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
                    <el-form-item label="来源编号" :label-width="formLabelWidth" prop="sourceNum">
                        <el-input v-model="ruleForm.sourceNum" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="督办来源类型" :label-width="formLabelWidth" prop="sourceName">
                        <el-input v-model="ruleForm.sourceName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="督办来源说明" :label-width="formLabelWidth" prop="sourceDesc">
                        <el-input type="textarea" v-model="ruleForm.sourceDesc" ></el-input>
                    </el-form-item>
                    <el-form-item label="是否启用" :label-width="formLabelWidth" prop="state">
                    <el-select v-model="ruleForm.state" placeholder="请选择是否启用">
                        <el-option label="启用" value=1></el-option>
                        <el-option label="停用" value=0></el-option>
                    </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="reset('ruleForm')">返 回</el-button>
                    <el-button type="primary" @click="formconfirm('ruleForm')">确 定</el-button>
                </div>
        </el-dialog>

    </div>
</template>
<script>
export default {
    data () {
        var sourceNum = (rule, value, callback) => {
            if(!value){
                return callback(new Error('督办来源编号不能为空'))
            }
            callback();
        };
        var sourceName = (rule, value, callback) => {
            if(!value){
                return callback(new Error('督办来源不能为空'))
            }
            callback();
        };
        return {
            index:1,
                //表单
                tableData: [
                ],
                state:'',
                dialogFormVisible:false,
                ruleForm: {
                    id:0,
                    sourceNum:'',
                    sourceName:'',
                    sourceDesc:'',
                    state:'',
                },
                //表单验证
                rules: {  
                    sourceNum: [
                    { required: true, trigger: 'blur', validator: sourceNum },
                    ],
                    sourceName: [
                    { required: true, trigger: 'blur',validator: sourceName},
                    ],
                    state: [
                    {  required: true, trigger: 'change', message: '请选择状态'  }
                    ]
                },
                formLabelWidth: '110px',
                //添加，修改 标题切换
                msg:'',
                //数据加载条
                loading:true,
                }
    },
    //加载页面就渲染页码数据
    mounted(){
        this.tableValue();
    },
    methods: {
    //加载表格数据 
        tableValue(){
            var that=this;
            var params={}
            this.$common.commitParam(this,'/supervise/source/list.api',params,{
                success : function(res) {
                    if(res.code==0){
                        that.loading=false;
                        that.tableData=res.data
                        that.total=res.data.length;
                    }
                }
            },"get");
        },
        //修改 按钮
        amend(rews){
                this.msg='修改';
                // 
                this.dialogFormVisible = true;
                this.ruleForm.id=rews.id;
                this.ruleForm.sourceNum=rews.sourceNum;
                this.ruleForm.sourceName=rews.sourceName;
                this.ruleForm.state=this.formatter(rews.state);
                this.ruleForm.sourceDesc=rews.sourceDesc;
        },
        //删除 按钮
        remove(rews){
            var that=this;
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                            var params={
                                id : rews.id
                            } 
                        this.$common.commitParam(this,'/supervise/source/delete.api',params,{
                                success : function(res) {
                                    if(res.code==0){
                                        that.$message({
                                            message: res.description,
                                            type: 'success'
                                        });
                                        that.tableValue();
                                    }else{
                                        that.$message({
                                            message: res.description,
                                            type: 'warning'
                                        });
                                    }
                                }
                        },"post",false);
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });          
                        });
        },
        //添加 按钮
        add(){
            this.msg='新增来源类型';
            this.dialogFormVisible = true;

        },
        //列表 状态1,0的转换
        formatte(row, column) {
            return row.state == '停用' ? 0 : 1 ;
        },
        formatter(row, column) {
            return row.state == 0 ? '停用' :  '启用' ;
        },
        //表单的确认按钮
        formconfirm(formName){
            var that=this;
            this.$refs[formName].validate((valid) => {  //表单验证
                
                if (valid) {
                    if(this.msg=='新增来源类型'){
                    var params={
                    sourceNum : this.ruleForm.sourceNum,
                    sourceName : this.ruleForm.sourceName,
                    sourceDesc : this.ruleForm.sourceDesc,
                    state : this.formatte(this.ruleForm.state)
                        } 
                        this.$common.commitParam(this,'/supervise/source/add.api',params,{
                                success : function(res) {
                                    if(res.code==0){
                                        that.$message({
                                            message: res.description,
                                            type: 'success'
                                        });
                                         that.tableValue();
                                    }else{
                                        that.$message({
                                            message: res.description,
                                            type: 'warning'
                                        });
                                    }
                                }
                            },"post");
                        }else{
                            var params={
                                id : this.ruleForm.id,
                                sourceNum : this.ruleForm.sourceNum,
                                sourceName : this.ruleForm.sourceName,
                                sourceDesc : this.ruleForm.sourceDesc,
                                state : this.formatte(this.ruleForm.state)
                            } 
                            this.$common.commitParam(this,'/supervise/source/update.api',params,{
                                success : function(res) {
                                    if(res.code==0){
                                        that.$message({
                                            message: res.description,
                                            type: 'success'
                                        });
                                         that.tableValue();
                                    }else{
                                        that.$message({
                                            message: res.description,
                                            type: 'warning'
                                        });
                                    }
                                }
                            },"post");
                        }
                        this.dialogFormVisible = false;
                } else {
                    return false;

                }
            });
        },
        //判断是点击的为修改表单还是增加表单
        formtype(num,rews){
            this.ruleForm= {
                    id:0,
                    sourceNum:'',
                    sourceName:'',
                    sourceDesc:'',
                    state:'',
                }
            if(num==1){
                this.add();
            }else{
                this.amend(rews);
            }
        },
        //清空表单
        reset(formName){
            this.$refs[formName].resetFields();
            this.dialogFormVisible = false;
        },
        //NO.序号
       indexMethod(index) {         
            return index+1 ;
            },
    }
}
</script>

<style lang="scss">
.overseetype{
    .head{
        margin: 1px 5px;
    }
    .el-form{
        width:60%;
        margin: 0 auto;
    }
    .el-row{
        margin-top: 10px;
        text-align: right; 
    }
}
</style>