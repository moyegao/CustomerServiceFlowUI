<template>
    <div class="repremset">
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
                    label="提醒类型"
                    prop="remindCycle"
                    width="100px"
                    :formatter="formatterRC">
                    </el-table-column>
                    <el-table-column
                    prop="remindTerm"
                    label="汇报期限"
                    width=""
                    :formatter="formatterRT">
                    </el-table-column>
                    <el-table-column
                    prop="remindDaysAhead"
                    width="80px"
                    label="提前天数"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="remindWayName"
                    label="提醒方式"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="remindInfo"
                    label="提醒内容"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="remindRoleName"
                    label="提醒对象"
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
                            <el-button type="text" size="mini"  @click="amend(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class="footer"></div>
         <el-dialog :title="msg" :visible.sync="dialogFormVisible" @close="reset('ruleForm')">
                <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
                    <el-form-item label="汇报期限" :label-width="formLabelWidth" prop="remindTerm">
                        <el-input v-model="ruleForm.remindDays" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="提前天数" :label-width="formLabelWidth" prop="remindDaysAhead">
                        <el-input v-model="ruleForm.remindDaysAhead" auto-complete="off"></el-input>
                    </el-form-item>
                    <div class="checkbox">
                        <el-form-item label="提醒方式" prop="remindWayName" class="">
                        <el-checkbox-group v-model="ruleForm.remindWayName">
                            <el-checkbox label="待办" name="remindWayName"></el-checkbox>
                            <el-checkbox label="邮件" name="remindWayName"></el-checkbox>
                            <el-checkbox label="短信" name="remindWayName"></el-checkbox>
                        </el-checkbox-group>
                        </el-form-item>
                    </div>
                    <el-form-item label="提醒内容" :label-width="formLabelWidth" prop="remindInfo">
                        <el-input type="textarea" v-model="ruleForm.remindInfo" ></el-input>
                    </el-form-item>
                    <el-form-item label="提醒对象" prop="remindRoleName" :label-width="formLabelWidth">
                            <el-select v-model="ruleForm.remindRoleName" multiple placeholder="请选择活动区域">   、
                                 <el-option
                                    v-for="item in remindRoleNames"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                 </el-option>
                            </el-select>
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
        return {
                tableData: [],
                //表单
                currentRow:'',
                //当前行数据
                state:'',
                dialogAdd: false,
                dialogConfirm: false,
                dialogFormVisible:false,
                ruleForm: {
                    remindCycle:'',
                    remindDays:'',
                    remindDaysAhead: 0,
                    remindInfo: '',
                    remindTerm: '',
                    remindWayName:[],
                    remindRoleName:[],
                    state: '',
                    id:0,
                    type:[],
                },
                 rules: {  //表单验证
                    remindDays: [
                    { required: true, trigger: 'blur', message:'提醒方式不能为空'},
                    ],
                    remindDaysAhead: [
                    { required: true, trigger: 'blur', message: '不可为空'},
                    ],
                    remindInfo: [
                    { required: true, trigger: 'blur', message:'提醒内容不能为空'},
                    ],
                    remindTerm: [
                    { required: true, trigger: 'blur', message:'汇报截止期限不能为空'},
                    ],
                    remindWayName: [
                    { required: true, trigger: 'blur', message:'提醒方式不能为空'},
                    ],
                    remindRoleName: [
                    { required: true, trigger: 'blur', message:'超期扣分不能为空'},
                    ],
                    state: [
                    {  required: true, trigger: 'change', message: '请选择状态'  }
                    ]
                 },
                formLabelWidth: '140px',
                msg:'',
                //添加，修改 标题切换
                loading:true,
                //数据加载条
                remindRoleNames:'',
                }
    },
    mounted(){
        this.tableValue();
    },
    methods: {
        //加载表格数据
        tableValue(){
            var that=this;
            var params={}
            this.$common.commitParam(this,'/supervise/remind/list.api',params,{
                success : function(res) { 
                    if(res.code==0){                          
                        that.tableData=res.data
                        that.total=res.data.length;
                        that.loading=false
                    }else{
                        that.$message({
                            message: res.description,
                            type: 'warning'
                        });
                    }
                }
                },"get");
            },
            //修改 按钮
        amend(rews){
                this.msg='修改';
                this.dialogFormVisible = true;
                var that=this;
                var params={}
                this.$common.commitParam(this,'/supervise/sys/listRole.api',params,{
                        success : function(res) {  
                            var arr = [];
                            res.data.map((n,i)=>{
                                var arrItem = {}
                                arrItem = {
                                    value:n.roleName,
                                    label:n.roleName
                                }
                                arr.push(arrItem);
                            })
                            that.remindRoleNames=arr;  

                        }
                    },"get");
                this.ruleForm.id=rews.id;
                this.ruleForm.remindCycle=this.formatterRC(rews.remindCycle);
                this.ruleForm.remindDays=this.formatterRT(rews.remindDays);
                this.ruleForm.remindDaysAhead=rews.remindDaysAhead;
                this.ruleForm.remindInfo=rews.remindInfo;
                this.ruleForm.remindTerm=rews.remindTerm;
                this.ruleForm.remindWayName=rews.remindWayName.split(",");
                this.ruleForm.remindRoleName=rews.remindRoleName.split(",");
                this.ruleForm.state=this.formatter(rews.state);
            
        },
            //列表 状态1,0的转换
            formatte(row, column) {
                return row.state == '停用' ? 0 : 1 ;
            },
            formatter(row, column) {
                return row.state == 0 ? '停用' :  '启用' ;
            },
            formatterRC(row, column) {
                return row.remindCycle == 1 ? '周催办提醒' :  '月汇报提醒' ;
            },
            formatteRC(row, column) {
                return row.remindCycle == '周催办提醒 ' ? 1 :  2 ;
            },
            formatterRT(row, column) {
                return row.remindCycle == 1 ? '每周2' :  '每月23号' ;
            },
            formatteRT(row, column) {
                return row.remindCycle == '每周2 ' ? 1 :  23 ;
            },
            //表单的确认按钮
            formconfirm(formName){
                var that=this;
                this.$refs[formName].validate((valid) => {  //表单验证
                    if (valid) {
                        var params={
                            id:this.ruleForm.id,
                            remindCycle : this.formatteRC(this.ruleForm.remindCycle),
                            //汇报期限
                            remindDays : this.formatteRC(this.ruleForm.remindDays),
                            remindDaysAhead : this.ruleForm.remindDaysAhead,
                            //提醒提前天数
                            remindInfo : this.ruleForm.remindInfo,
                            //提醒内容
                            remindTerm : this.ruleForm.remindTerm,
                            //汇报期限
                            remindWayName : this.ruleForm.remindWayName.join(),
                            //提醒方式
                            remindRoleName : this.ruleForm.remindRoleName.join(),
                            
                            //提醒对象
                            state : this.formatte(this.ruleForm.state)
                        } 
                        this.$common.commitParam(this,'/supervise/remind/update.api',params,{
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
        //NO.序号
       indexMethod(index) {         
            return index+1 ;
            },
        }
}
</script>

<style lang="scss">
.repremset{
  .el-form{
      width:70%;;
      margin: 0 auto;
  }
  .checkbox{
      margin-left: 60px;
  }
}
</style>