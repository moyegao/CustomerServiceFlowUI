<template>
    <div class="taskregister">
        <div class="searchBox" style="text-align:right;">
          <div class="my-input1" style="width:15%;">
            <a href="javascript:void(0)" @click="hidden" style="color:blue">高级查询<i class="el-icon-arrow-down"></i></a>
          </div>
          <div class="my-input1" style="width:15%;">
            <span class="">任务类型：</span>
            <el-select v-model="supervisionTaskType" size="mini" style="width:calc(100% - 65px);">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </div>
          <div class="my-input1" style="width:15%;">
            <span class="text1">责任部门：</span><el-select v-model="value2" clearable  size="mini" style="width:calc(100% - 60px)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </div>
          <div class="my-input1" style="width:15%;">
            <span class="text1">任务状态：</span><el-select v-model="value3" clearable  size="mini" style="width:calc(100% - 60px)">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </div>
          <div class="my-input1" style="width:30%;">
            <span style="width:90px;">督办编号/名称：</span><el-input
              placeholder="请输入内容"
              v-model="input"
              size="mini"
              clearable style="width:calc(100% - 90px);">
            </el-input>
          </div>
          <el-button type="primary" size="mini" @click="search">查询</el-button>
           <div :class="{planA: isActive, planB:isActive1}">
            <div class="my-input1" style="width:25%;margin-left:10px;">
              <span class="">任务时间：</span>
              <div class="block" style="display:inline-block;width:calc(100% - 80px);">
              <el-date-picker
                size="mini"
                v-model="value"
                type="daterange"
                align="right"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width:100%;"
                >
                </el-date-picker>
              </div>
            </div>
          </div>
        </div>
        <div class="tableBox" style="margin-top:15px;">
          <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            :data="tableData3"
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
              prop="supervisionTaskNum"
              label="督办编号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="title"
              label="督办名称"
              width="180" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sourceName"
              label="督办来源" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="sourceDesc"
              label="来源说明" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="responsibleDeptName"
              label="责任单位" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="assistDeptNames"
              label="协办单位">
            </el-table-column>
            <el-table-column
              prop="endDate"
              width="150"
              label="计划结束时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="leaderUserName"
              label="分管领导">
            </el-table-column>
            <el-table-column
              prop="taskStateName"
              label="任务状态" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="update(scope.row)" type="text" size="small">修改</el-button>
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
        <div class="dialog123">
          <el-dialog :visible.sync="addContent">
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="content111 clear">
              <div class="my-input">
                <el-form-item label="督办名称：" prop="title">
                  <el-input v-model="ruleForm.title" size="mini" clearable style="width:100%"></el-input>
                </el-form-item>
              </div>
              <div class="my-input">
                <!--6{{options6}}-->
                <el-form-item label="重要程度：" prop="importanceId">
                  <el-select v-model="ruleForm.importanceId" clearable  size="mini" style="width:100%">
                    <el-option
                      v-for="item in options6"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="my-input">
                <!--2{{options2}}-->
                <el-form-item label="任务类型：" prop="supervisionTaskType">
                  <el-select v-model="ruleForm.supervisionTaskType" clearable  size="mini" style="width:100%">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="my-input">
                <!--3{{options3}}-->
                <el-form-item label="督办来源：" prop="sourceNum">
                  <el-select v-model="ruleForm.sourceNum" clearable  size="mini" style="width:100%">
                    <el-option
                      v-for="item in options3"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="my-input">
                <el-form-item label="来源说明：" prop="sourceDesc">
                  <el-input v-model="ruleForm.sourceDesc" size="mini" clearable style="width:100%"></el-input>
                </el-form-item>
              </div>
              <div class="my-input">
                <!--7{{options7}}-->
                <el-form-item label="分管领导：" prop="leaderUserId">
                  <el-select v-model="ruleForm.leaderUserId" clearable  size="mini" style="width:100%">
                    <el-option
                      v-for="item in options7"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="my-input">
                <!--4{{options4}}-->
                <el-form-item label="责任部门：" prop="responsibleDeptId">
                  <el-select v-model="ruleForm.responsibleDeptId" clearable  size="mini" style="width:100%" @change="chose">
                    <el-option
                      v-for="item in options4"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="my-input">
                <!--5{{options5}}-->
                <el-form-item label="责任人：" prop="responsibleUserId">
                  <el-select v-model="ruleForm.responsibleUserId" clearable  size="mini" style="width:100%">
                    <el-option
                      v-for="item in options5"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="my-input">
                <!--4{{options4}}-->
                <el-form-item label="协办部门：" prop="assistDeptIds">
                  <el-select v-model="ruleForm.assistDeptIds" multiple clearable  size="mini" style="width:100%"  @change="selectOutHelper">
                    <el-option
                      v-for="item in options4"
                      :label="item.label"
                      :value="item.value"
                      :key="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

              </div>
              <div class="my-input">
                <!--"outHelpers"{{outHelpers}}-->
                <el-form-item label="协办人：" prop="assistUserIds">
                  <el-select @change="dealOutHelper" v-model="ruleForm.assistUserIds" clearable multiple size="mini" style="width:100%">
                    <el-option-group :key='group.label' v-for="group in outHelpers" :label="group.label">
                      <el-option v-for="item in group.options" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-option-group>
                  </el-select>
                </el-form-item>
              </div>
              <div class="my-input">
                <el-form-item label="开始时间：" prop="beginDate">
                  <el-date-picker
                    size="mini"
                    v-model="ruleForm.beginDate"
                    type="date"
                    align="right"
                    unlink-panels
                    style="width:100%"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class="my-input">
                <el-form-item label="结束时间：" prop="endDate">
                  <el-date-picker
                    size="mini"
                    v-model="ruleForm.endDate"
                    type="date"
                    align="right"
                    unlink-panels
                    style="width:100%"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>

              </div>
              <div class="my-input">
                <el-form-item label="原编号：" prop="oldNum">
                  <el-input v-model="ruleForm.oldNum" size="mini" clearable style="width:100%"></el-input>
                </el-form-item>
              </div>
              <div class="textarea" style="margin-bottom:10px;">
                <el-form-item label="工作计划：" prop="planDesc">
                  <el-input type="textarea" v-model="ruleForm.planDesc"></el-input>
                </el-form-item>
              </div>
              <div class="textarea" >
                <el-form-item label="督办事宜：" prop="info">
                  <el-input type="textarea" v-model="ruleForm.info"></el-input>
                </el-form-item>
              </div>
              <div class="sub" style="text-align:center;">
                <el-button type="primary" @click="save('ruleForm')" style="margin:20px;" size="mini">保存</el-button>
                <el-button type="primary" style="margin:20px;" size="mini" @click="showUpload" :disabled="uploadData.id ===-1?true : false ">上传附件</el-button>
                <el-button type="primary" @click="back" style="margin:20px;" size="mini">返回</el-button>
                <div style="text-align:center;"><span style="color:#FF0000;">上传附件，请先保存</span></div>
              </div>
            </el-form>
          </el-dialog>
          <el-dialog
            title="文件上传"
            :visible.sync="uploadDialogVisible"
            width="80%"
            center>
            <klUpload
              :fatherList.sync ="fileList"
              :fatherId.sync = "uploadData.id"
              ref="doUpload">
              </klUpload>
            <span slot="footer" class="dialog-footer">
    <el-button @click="uploadDialogVisible = false">返 回</el-button>
    <el-button type="primary" @click="confirmUpload">上 传</el-button>
  </span>
          </el-dialog>
        </div>
    </div>
</template>
<script>
  import klUpload from '../klUpload';
export default {
  components:{
    klUpload
  },
  data () {
    return {
      uploadData:{
        id:-1,
      },
      uploadDialogVisible:false,//上传对话框
      fileList: [],//获取上传图片地址
      ruleForm:{
        title:'',
        importanceId:'',
        supervisionTaskType:'',
        sourceNum:'',
        sourceDesc:'',
        leaderUserId:'',
        responsibleDeptId:'',
        responsibleUserId:'',
        assistDeptIds:[],
        assistUserIds:[],
        oldNum:'',
        beginDate:'',
        endDate:'',
        planDesc:'',
        info:'',
      },
      rules:{
        title:[
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        sourceNum:[
          { required: true, message: '请选择督办来源', trigger: 'change' }
        ],
        responsibleDeptId:[
          { required: true, message: '请选择责任部门', trigger: 'change' }
        ],
        responsibleUserId:[
          { required: true, message: '请选择责任人', trigger: 'change' }
        ],
        leaderUserId:[
          { required: true, message: '请选择分管领导', trigger: 'change' }
        ],
        endDate:[
          { required: true, message: '请选择计划完成时间', trigger: 'change' }
        ],
        planDesc:[
          { required: true, message: '请输入工作计划', trigger: 'blur' }
        ]
      },
      a:0,
      loading: true,
      value: [],
      options: [],
      value2: '',
      options1: [],
      value3: '',
      options2: [],
      supervisionTaskType: '',
      options3: [],
      options4: [],
      responsibleDeptId: '',
      options5: [],
      responsibleUserId: '',
      options6: [],
      importanceId: '',
      options7: [],
      input:'',
      tableData3: [],
      page:1,
      pageCount:20,
      sum:0,
      addContent: false,
      addContent1: false,
      status:'',
      key:'',
      sourceName:'',
      responsibleDeptName:'',
      responsibleUserName:'',
      name8:'',
      leaderUserName:'',
      assistUserNames:[],
      assistDeptNames:[],
      id:'',
      isActive:true,
      isActive1:false,
      outHelpers:[]
    }
  },
  mounted(){
    this.loadData();
    this.getlistDept();
    this.getsource();
    this.getleader();
    this.taskStateData();
    this.taskTypeData();
    this.importanceData();
  },
  methods :{
    confirmUpload(){
      this.$refs.doUpload.line2upload();
    },
    showUpload(){
      let that = this;
      this.$common.commitParam(this,"/supervise/attachment/list.api",{businessId:this.uploadData.id},{
        success : function(res) {
          that.fileList =  res.data;
          that.uploadDialogVisible = true;
        }
      },"get");
    },
    hidden(){
      if(this.isActive==true){
        this.isActive=false;
        this.isActive1=true;
      }else{
        this.isActive=true;
        this.isActive1=false;
      }
    },
    submitUpload() {
    
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
     
    },
    handlePreview(file) {
    
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    exports(){
      window.open(process.env.baseUrl + "/opIsBill.htm?canteenId="+ localStorage.getItem("canteenId"));
    },
    // 责任部门选择框内值发生变化事件
    chose(val){
      var that=this;
      if(val=='-1000'||val ==''){
        that.options5=[];
        that.responsibleUserId=''
      }else{
        this.$common.commitParam(this,"/supervise/sys/listSysUserByDeptId.api",{deptId:val},{
        success : function(res) {
          that.a++;
        if(that.options5.length==0){
          for(var i=0;i<res.data.length;i++){
            var values={};
            values.value=res.data[i].id.toString();
            values.label=res.data[i].name;
            that.options5.push(values);
            that.responsibleUserId=res.data[0].id
          }
        }else if(that.options5.length>0){
          var box=[];
          for(var i=0;i<res.data.length;i++){
            var values={};
            values.value=res.data[i].id;
            values.label=res.data[i].name;
            box.push(values);
          }
          that.options5=box;
          that.responsibleUserId=res.data[0].id
        }
      }
      },"get");
        }
    },
    // 处理人员数据
    dealOutHelper(val){
      let outHelpers = JSON.parse(JSON.stringify(this.outHelpers));
      this.assistUserNames=[];
      for(let i in val){
        for(let x in outHelpers){
          for(let y in outHelpers[x].options){
            if(outHelpers[x].options[y].id == val[i]){
              this.assistUserNames.push(outHelpers[x].options[y].name)
            }
          }
        }
      }
    },
    // 处理选择部门数据，并获取人员数据
    selectOutHelper(val){
      let that = this;
      
      this.assistDeptNames = [];
      for(var j in val){
        for(var i = 0;i < that.options4.length;i++){
          if(that.options4[i].value==val[j]){
            that.assistDeptNames.push(that.options4[i].label)
          }
        }
      }
      this.outHelpers=[];
      this.assistUserNames=[];

      if(val=='-1000'||val ==''){
        this.outHelpers=[];
        this.assistUserNames=[];
      }else {
        this.$common.commitParam(this,"supervise/sys/listSysUserByDeptIds.api",{deptId:val.join(',')},
          {
            success : function(res){
             
              for(let i in res.data){
                let group = {};
                group.label = res.data[i].name;
                group.options = res.data[i].items;
                that.outHelpers.push(group)
              }
            }
          },'get')
      }
    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod(index) {
        return  (this.page-1)*this.pageCount + (index+1) ;
    },
    handleClick(row){

    },
    taskStateData(){
      var that = this;
      this.$common.commitParam(this,"supervise/dic/options.api",{type : 'task_state'},
      {
        success : function(res){
          that.options1 = res.data;
        }
      },'get');
    },
    taskTypeData(){
      var that = this;
      this.$common.commitParam(this,"supervise/dic/options.api",{type : 'supervision_task_type'},
      {
        success : function(res){
         that.options2 = res.data;
        }
      },'get');
    },
    importanceData(){
      var that = this;
      this.$common.commitParam(this,"supervise/dic/options.api",{type : 'importance_type'},
      {
        success : function(res){
          that.options6 = res.data;
        }
      },'get');
    },
    // 加载表格数据
    loadData(){
      var that=this;
      that.loading=true;
      var params={page:that.page,pageCount:that.pageCount};
      if(that.value !== null && that.value.length !== 0){
        params.beginDate=that.value[0];
        params.endDate=that.value[1];
      };
      if(that.value2 !== '' && that.value2 !== '-1000'){
        params.responsibleDeptId=that.value2
      };
      if(that.supervisionTaskType !== ''){
         params.supervisionTaskType = that.supervisionTaskType;
      }
      if(that.value3 !== '' && that.value3 !== '-1000'){
        params.processStateId=that.value3;
      };
      if(that.input !== ''){
        params.title=that.input
      }
      this.$common.commitParam(this,"/supervise/taskinfo/list.api",params,{
				success : function(res) {
				 ;
          that.tableData3=res.data;
          that.sum=res.totalCount;
          if(res.code==0){
            that.loading=false
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
        this.page=val;
        this.loadData();
    },
    // 获取搜索区责任部门数据
    getlistDept(){
      var that=this;
      this.$common.commitParam(this,"/supervise/sys/listDept.api",{},{
				success : function(res) {
          res.data.unshift({id:'-1000',name:'所有'});
          for(var i=0;i<res.data.length;i++){
            var values={};
            values.value=res.data[i].id.toString();
            values.label=res.data[i].name;
            that.options.push(values);
            if(values.value!=='-1000'){
              that.options4.push(values);
            }
          }
				}
			},"get");
    },
    // 获取督办来源数据
    getsource(){
      var that=this;
      this.$common.commitParam(this,"/supervise/source/list.api",{},{
				success : function(res) {
          for(var i=0;i<res.data.length;i++){
            var values={};
            values.value=res.data[i].id;
            values.label=res.data[i].sourceName;
            that.options3.push(values);
          }
				}
			},"get");
    },
    // 获取分管领导数据
    getleader(){
      var that=this;
      this.$common.commitParam(this,"/supervise/sys/listSysUserByRole.api?roleKey=leadleader",{},{
				success : function(res) {

          for(var i=0;i<res.data.length;i++){
            var values={};
            values.value=res.data[i].id.toString();
            values.label=res.data[i].name;
            that.options7.push(values);
          }
				}
			},"get");
    },
    // 搜索
    search(){
      this.loadData();
    },
    // 添加
    add(){
      var that=this;
      this.uploadData.id = -1;
      that.addContent=true;
      this.status='add';
      this.ruleForm={
          title:'',
          importanceId:'',
          supervisionTaskType:'',
          sourceNum:'',
          sourceDesc:'',
          leaderUserId:'',
          responsibleDeptId:'',
          responsibleUserId:'',
          assistDeptIds:[],
          assistUserIds:[],
          oldNum:'',
          beginDate:'',
          endDate:'',
          planDesc:'',
          info:'',
      }
    },
    // 修改
    update(row){
      this.uploadData.id = row.id;
      var that = this;
      that.addContent=true;
      this.status='update';
      this.ruleForm={
        id:row.id,
        title:row.title,
        importanceId:row.importanceId,
        supervisionTaskType:row.supervisionTaskType,
        sourceNum:parseInt(row.sourceNum),
        sourceDesc:row.sourceDesc,
        leaderUserId:row.leaderUserId,
        responsibleDeptId:row.responsibleDeptId,
        responsibleUserId:row.responsibleUserId,
        assistDeptIds:row.assistDeptIds === ''?[]:row.assistDeptIds.split(','),
        assistUserIds:row.assistUserIds === ''?[]:row.assistUserIds.split(','),
        oldNum:row.oldNum,
        beginDate:row.beginDate,
        endDate:row.endDate,
        planDesc:row.planDesc,
        info:row.info,
      };
      this.chose(this.ruleForm.responsibleDeptId);
      this.selectOutHelper(this.ruleForm.assistDeptIds);
    },
    // 删除
    delet(row){
      this.$confirm('确认删除该数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var that=this;
          that.id=row.id;
          var that=this;
          this.$common.commitParam(this,"/supervise/taskinfo/delete.api",{id:that.id},{
            success : function(res) {
              if(res.code==0){
                that.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            }
          },"post",false);
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
      });
    },
    // 返回
    back(){
      var that=this;
      that.addContent=false;
    },
    //保存
    save(formName){
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for(var i = 0;i < that.options3.length;i++){
            if(that.options3[i].value==that.ruleForm.sourceNum){
              that.sourceName=that.options3[i].label;
            }
          }
          for(var i = 0;i < that.options4.length;i++){
            if(that.options4[i].value==that.ruleForm.responsibleDeptId){
              that.responsibleDeptName=that.options4[i].label;
            }
          }
          for(var i = 0;i < that.options5.length;i++){
            if(that.options5[i].value==that.responsibleUserId){
              that.responsibleUserName=that.options5[i].label;
            }
          }
          for(var i = 0;i < that.options6.length;i++){
            if(that.options6[i].value==that.importanceId){
              that.name8=that.options6[i].label;
            }
          }
          for(var i = 0;i < that.options7.length;i++){
            if(that.options7[i].value==that.ruleForm.leaderUserId){
              that.leaderUserName=that.options7[i].label;
            }
          }
          var params={
            title:that.ruleForm.title,
            sourceNum:that.ruleForm.sourceNum,
            responsibleDeptId:that.ruleForm.responsibleDeptId,
            responsibleUserId:that.ruleForm.responsibleUserId,
            assistDeptIds:that.ruleForm.assistDeptIds.join(','),
            assistUserIds:that.ruleForm.assistUserIds.join(','),
            importanceId:that.ruleForm.importanceId,
            leaderUserId:that.ruleForm.leaderUserId,
            beginDate:that.ruleForm.beginDate,
            endDate:that.ruleForm.endDate,
            planDesc:that.ruleForm.planDesc,
            supervisionTaskType:that.ruleForm.supervisionTaskType,
            sourceDesc:that.ruleForm.sourceDesc,
            oldNum:that.ruleForm.oldNum,
            info:that.ruleForm.info,


            sourceName:that.sourceName,
            responsibleUserName:that.responsibleUserName,
            responsibleDeptName:that.responsibleDeptName,
            assistDeptNames:that.assistDeptNames.join(','),
            assistUserNames:that.assistUserNames.join(','),
            leaderUserName:that.leaderUserName

          };
          if(that.status=="add"){

            this.$common.commitParam(this,"/supervise/taskinfo/add.api",params,{
              success : function(res) {
                if(res.code == -1){
                  that.$message({
                    message: '保存失败！',
                    type: 'error'
                  });
                }else {
                  that.$message({
                    message: '保存成功！',
                    type: 'success'
                  });
                  that.uploadData.id = res.data;
                }

              }},'post');
          }else if(that.status=="update"){
            params.id=that.ruleForm.id;
            this.$common.commitParam(this,"/supervise/taskinfo/update.api",params,{
              success : function(res) {
                that.$message({
                  message: '保存成功！',
                  type: 'success'
                });
              }
            });
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    }
  },
  watch:{
    fileList:{
      handler(val, oldVal) {
   
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.taskregister{
  height:100%;
  .tableBox{
    height: calc(100% - 90px);
  }
  .my-input1{
    margin-right:10px;
    display:inline-block;
  }
  .my-input{
    width:45%;
    display:inline-block;
    /*margin-bottom:20px;*/
    /*margin-right: 20px;*/
  }
  .el-dialog{
    margin:0 auto;
  }
  .my-input .el-input{
    width: calc(100% - 80px );
  }
  .my-input .el-select .el-input{
    width:100%;
  }
  .text1{
    display:inline-block;
    width:60px;
  }
  .text{
    text-align:right;
    display:inline-block;
    width:80px;
  }
  .el-dialog__body {
    padding: 20px 20px;
  }
  .planA{
    display:none

  }
  .planB{
    display:block;
    margin-top: 15px;
  }
  .el-dialog{
    margin-top:5vh!important;
  }
  .dialog123 .el-input--suffix .el-input__inner {
    padding-right: 26px;
  }
}
</style>