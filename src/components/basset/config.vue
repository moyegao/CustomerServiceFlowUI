<template>
    <div class="checruledef">
         <div class="head">
            <el-row>
                <el-button type="primary" size="mini" @click="formtype(1, '')">新增</el-button>
            </el-row>
        </div>
        <div class="main">
            <template>
                <el-table ref="multipleTable" :data="tableData" v-loading="loading" tooltip-effect="dark" style="width: 100%">
                    <el-table-column label="NO." type="index" :index="indexMethod" width="65px"></el-table-column>
                    <el-table-column prop="key" label="key"></el-table-column>
                    <el-table-column prop="value" label="value" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="description" label="描述" show-overflow-tooltip> </el-table-column>
                    <el-table-column prop="state" label="是否启用" show-overflow-tooltip :formatter="formatter"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">                
                        <el-button type="text" size="mini"  @click="formtype(2, scope.row)">修改</el-button>
                        <el-button type="text" size="mini"  @click="remove(scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class="footer"></div>
        <el-dialog :title="msg" :visible.sync="dialogFormVisible" @close="reset('ruleForm')">
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
                <el-form-item label="key" :label-width="formLabelWidth" prop="key">
                    <el-input v-model="ruleForm.key" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="value" :label-width="formLabelWidth" prop="value">
                    <el-input v-model="ruleForm.value" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
                    <el-input v-model="ruleForm.description" auto-complete="off"></el-input>
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
        var type = (rule, value, callback) => {
            if(!value){
                return callback(new Error('字典类型不能为空'))
            }
            callback();
        };
        var key = (rule, value, callback) => {
            if(!value){
                return callback(new Error('字典名称不能为空'))
            }
            callback();
        };
        var value = (rule, value, callback) => {
            if(!value){
                return callback(new Error('超期天数不能为空'))
            }
            callback();
        };
        var description = (rule, value, callback) => {
            if(!value){
                return callback(new Error('超期扣分不能为空'))
            }
            callback();
        };
        return {
                //表单
                tableData: [],
                //当前行数据
                currentRow:'',
                //表单状态
                dialogFormVisible:false,
                //增加，修改 弹出框
                ruleForm: {
                    id : 0,
                    type:'',
                    key:'',
                    value: '',
                    description: '',
                    state: ''
                },
                //表单验证
                rules: {  
                    type: [
                    { required: true, trigger: 'blur', validator: type },
                    ],
                    key: [
                    { required: true, trigger: 'blur',validator: key},
                    ],
                    value: [
                    { required: true, trigger: 'blur',validator: value},
                    ],
                    state: [
                    {  required: true, trigger: 'change', message: '请选择状态'  }
                    ]
                },
                 //表单label样式
                formLabelWidth: '140px',
                //添加，修改 标题切换
                msg:'',
                //数据加载条
                loading:true,
                }
    },
    mounted(){
        this.tableValue();
    },
    methods: {
        tableValue(){
            var that=this;
            var params = {}
            this.$common.commitParam(this,'/supervise/config/list.api',params,{
                success : function(res) {
                    if(res.code == 0){
                        that.loading = false;                           
                        that.tableData = res.data;
                        that.total = res.data.length;
                    }
                }
            },"get");
        },
        //修改 按钮
        amend(rews){
            this.msg = '修改';
            this.dialogFormVisible = true;
            this.ruleForm.id = rews.id;
            this.ruleForm.key = rews.key;
            this.ruleForm.value = rews.value;
            this.ruleForm.description = rews.description;
            this.ruleForm.state = this.formatter(rews.state);
        },
        //删除 按钮
        remove(rews){
            var that=this;
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    var params = {id : rews.id}
                    this.$common.commitParam(this,'/supervise/config/delete.api',params,{
                        success : function(res) {
                            if(res.code==0){
                                that.$message({message: res.description, type: 'success'});
                                that.tableValue();
                            }else{
                                that.$message({message: res.description,type: 'warning'});
                            }
                        }
                    },"post",false);
                }).catch(() => {
                    this.$message({type: 'info',message: '已取消删除'});          
                });        
        },
        //增加
        add(){
            var that = this;
            that.msg = '增加';
            that.dialogFormVisible = true;
            that.$refs['ruleForm'].resetFields();
        },
        formatte(row, column) {
            return row.state == '启用' ? 0 : 1 ;
        },
        formatter(row, column) {
            return row.state == 0 ? '启用' :  '停用' ;
        },
        //表单的确认按钮
        formconfirm(formName){
            var that = this;
            this.$refs[formName].validate((valid) => {  //表单验证
                if (valid) {
                    if(this.msg == '增加'){
                        var params = {
                            key : this.ruleForm.key,
                            value : this.ruleForm.value,
                            description : this.ruleForm.description,
                            state : this.formatte(this.ruleForm.state)
                        } 
                        this.$common.commitParam(this,'/supervise/config/add.api',params,{
                            success : function(res) {
                                if(res.code==0){
                                    that.$message({message: res.description,type: 'success'});
                                    that.tableValue();
                                }else{
                                    that.$message({message: res.description, type: 'error'});
                                }
                            }
                        },"post");
                    } else {
                        var params = {
                            id :this.ruleForm.id,
                            key : this.ruleForm.key,
                            value : this.ruleForm.value,
                            description : this.ruleForm.description,
                            state : this.formatte(this.ruleForm.state)
                        } 
                        this.$common.commitParam(this,'/supervise/config/update.api',params,{
                            success : function(res) {
                                if(res.code == 0){
                                    that.$message({message: res.description, type: 'success'});
                                    that.tableValue();
                                }else{
                                    that.$message({message: res.description, type: 'warning'});
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
        //清空表单
        reset(formName){
            this.$refs[formName].resetFields();
            this.dialogFormVisible = false;
        },
        //判断是点击的为修改还是增加按钮
        formtype(num,rews){
            if(num == 1){
                this.add();
            }else{
                this.amend(rews);
            }
        },
       indexMethod(index) {         
            return index + 1 ;
        }
    }
}
</script>

<style lang="scss">
.checruledef{
  .head{
      margin: 1px 5px;
  }
  .el-form{
      width:60%;
      margin: 0 auto;
  }
  .el-dialog{
      margin-top: 11vh!important;
  }
  .el-dialog__header {
    padding: 20px 20px 10px;
    }
    .el-dialog__body {
    padding: 10px 20px;
    color: #606266;
    font-size: 14px;
    }
    .el-dialog__footer {
    padding: 10px 20px 10px;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    }
    .el-row{
        margin-top: 10px;
        text-align: right; 
    }
}
</style>