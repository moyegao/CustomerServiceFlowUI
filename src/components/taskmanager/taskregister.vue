<template>
  <div class="taskregister">
    <div class="searchBox" style="margin-left: 1%;">

      <div class="my-input1" style="width:20%;">
        <span class="">任务类型：</span>
        <el-select v-model="taskType" size="mini" style="width:60%;" clearable>
          <el-option label="所有" value=""></el-option>
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" class="optionwidth"></el-option>
        </el-select>
      </div>
      <div class="my-input1" style="width:20%;">
        <span class="">任务状态：</span>
        <el-select v-model="value3" clearable size="mini" style="width:60%;">
          <el-option label="所有" value=""></el-option>
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="my-input1" style="width:28%;">
        <span style="width:90px;">督办编号/名称：</span>
        <el-input placeholder="请输入内容" v-model="input" @blur="againReassignment" size="mini" clearable style="width:60%;" @keyup.enter.native="search">
        </el-input>
      </div>
      <!-- <div class="my-input1" style="width:8%;">
        <a href="javascript:void(0)" @click="hidden" style="color:blue;font-size:1.2rem;">高级查询<i class="el-icon-arrow-down"></i></a>
      </div> -->
      <el-button type="primary" size="mini" @click="search" icon="el-icon-search" class="searchBtn"></el-button>
      <el-button type="primary" size="mini" @click="hidden" icon="el-icon-arrow-down upchange" style="background:white;color:#3193F6;">高级查询</el-button>
      <el-button type="primary" size="mini" @click="add" icon="el-icon-plus" style="float: right;margin-right:.1rem">新建</el-button>
      <div :class="{planA: isActive, planB:isActive1}">
        <div class="my-input1" style="width:30%;">
          <span class="">任务时间：</span>
          <div class="block" style="display:inline-block;width:75%;">
            <el-date-picker :editable="false" size="mini" v-model="value" type="daterange" align="right" format="yyyy-MM-dd" value-format="yyyy-MM-dd" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:3rem;">
            </el-date-picker>
          </div>
        </div>
        <div class="my-input1" style="width:20%;margin-left: .5rem">
          <span class="">责任部门：</span>
          <el-select v-model="value2" clearable size="mini" style="width:60%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="tableBox" style="margin-top:15px;">
      <el-table stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="tableData3" style="width: 100%;overflow:none;" height='100%'>
        <el-table-column type="index" fixed="left" :index="meterIndexMethod" label="NO." width="55px">
        </el-table-column>
        <el-table-column prop="taskNum" label="督办编号" width="150">
        </el-table-column>
        <el-table-column prop="taskName" label="督办名称" width="280" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="sourceName" label="督办来源" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="responsibleDeptNames" label="责任单位" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="responsibleUserNames" label="责任人" show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column prop="assistDeptNames" label="协办单位" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column prop="endDate" label="结束时间" width="130">
        </el-table-column>
        <el-table-column prop="leaderUserNames" label="分管领导" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="taskState" label="任务状态">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="update(scope.row)" type="text" size="small">修改</el-button>
            <span style="color:#e6e6e6;">|</span>
            <el-button @click="delet(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top:10px;text-align:center">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[20,50, 100, 200]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="sum">
        </el-pagination>
      </div>
    </div>
    <div class="dialog123">
      <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="addContent">
        <el-form :model="ruleForm" ref="form" :rules="rules" label-width="100px">
          <div class="my-input">
            <el-form-item label="督办名称：" prop="taskName">
              <el-input v-model="ruleForm.taskName" size="mini" clearable style="width:100%"></el-input>
            </el-form-item>
          </div><br>
          <div class="my-input">
            <!--6{{options6}}-->
            <el-form-item label="重要程度：" prop="important">
              <el-select v-model="ruleForm.important" clearable size="mini" style="width:100%">
                <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="my-input">
            <!--2{{options2}}-->
            <el-form-item label="任务类型：" prop="taskType">
              <el-select v-model="ruleForm.taskType" clearable size="mini" style="width:100%">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="my-input">
            <!--3{{options3}}-->
            <el-form-item label="督办来源：" prop="sourceNum">
              <el-select v-model="ruleForm.sourceNum" clearable size="mini" style="width:100%">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="my-input" v-if="ruleForm.taskType !== 'SBK' && ruleForm.taskType !== '水板块'">
            <!--7{{options7}}-->
            <el-form-item label="分管领导：" prop="leaderUserIds">
              <el-select v-model="ruleForm.leaderUserIds" multiple clearable size="mini" style="width:100%">
                <el-option v-for="item in options7" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="my-input" v-else>
            <el-form-item label="分公司：" prop="regIds">
              <el-select v-model="ruleForm.regIds" multiple clearable size="mini" style="width:100%">
                <el-option v-for="item in options8" :label="item.label" :value="item.value" :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="my-input">
            <!--4{{options4}}-->
            <el-form-item label="责任部门：" prop="responsibleDeptIds">
              <el-select v-model="ruleForm.responsibleDeptIds" multiple clearable size="mini" style="width:100%" @change="chose">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- <div class="my-input" v-else>
            <el-form-item label="业务部门：" prop="businessDeptId">
              <el-select v-model="ruleForm.businessDeptId" clearable size="mini" style="width:100%" @change="chose">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div> -->
          <div class="my-input">
            <!--5{{options5}}-->
            <el-form-item label="责  任  人：" prop="responsibleUserIds">
              <!-- <el-select v-model="ruleForm.responsibleUserIds" multiple clearable size="mini" style="width:100%">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select> -->
              <el-select @change="dealOutHelper1" v-model="ruleForm.responsibleUserIds" clearable multiple size="mini" style="width:100%">
                <el-option-group :key='group.id' v-for="group in options5" :label="group.label">
                  <el-option v-for="item in group.options" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </div>
          <div class="my-input" v-if="ruleForm.taskType === 'SBK' || ruleForm.taskType === '水板块'">
            <!--4{{options4}}-->
            <el-form-item label="分管领导：" prop="leaderUserIds">
              <el-select v-model="ruleForm.leaderUserIds" multiple clearable size="mini" style="width:100%">
                <el-option v-for="item in options7" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- <div class="my-input" v-else>
            <el-form-item label="业务人员：" prop="businessPersonnelId">
              <el-select v-model="ruleForm.businessPersonnelId" clearable size="mini" style="width:100%">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div> -->
          <div class="my-input" v-if="ruleForm.taskType !== 'SBK' && ruleForm.taskType !== '水板块'">
            <!--4{{options4}}-->
            <el-form-item label="协办部门：" prop="assistDeptIds">
              <el-select v-model="ruleForm.assistDeptIds" multiple clearable size="mini" style="width:100%" @change="selectOutHelper">
                <el-option v-for="item in options4" :label="item.label" :value="item.value" :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="my-input" v-if="ruleForm.taskType !== 'SBK' && ruleForm.taskType !== '水板块'">
            <el-form-item label="协  办  人：" prop="assistUserIds">
              <el-select @change="dealOutHelper" v-model="ruleForm.assistUserIds" clearable multiple size="mini" style="width:100%">
                <el-option-group :key='group.id' v-for="group in outHelpers" :label="group.label">
                  <el-option v-for="item in group.options" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="来源说明：" prop="sourceDesc">
              <el-input v-model="ruleForm.sourceDesc" size="mini" clearable style="width:100%"></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="原  编  号：" prop="oldTaskNum">
              <el-input v-model="ruleForm.oldTaskNum" size="mini" clearable style="width:100%"></el-input>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="开始时间：" prop="beginDate">
              <el-date-picker size="mini" v-model="ruleForm.beginDate" type="date" align="right" unlink-panels style="width:100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="my-input">
            <el-form-item label="结束时间：" prop="endDate">
              <el-date-picker size="mini" v-model="ruleForm.endDate" type="date" align="right" unlink-panels style="width:100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="textarea" style="margin-bottom:5px;">
            <el-form-item label="工作计划：" prop="planDesc">
              <el-input type="textarea" v-model="ruleForm.planDesc" style="width:100%"></el-input>
            </el-form-item>
          </div>
          <div class="textarea">
            <el-form-item label="督办事宜：" prop="taskDesc">
              <el-input type="textarea" v-model="ruleForm.taskDesc" style="width:100%"></el-input>
            </el-form-item>
          </div>

          <div v-if="ruleForm.taskType == 'JT'">
            <div class="my-input">
              <el-form-item label="集团督办编号:" prop="groupTaskNum" class="JTbianhao">
                <el-input v-model="ruleForm.groupTaskNum" size="mini" clearable style="width:100%"></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="填报单位:" prop="fillCompany">
                <el-input v-model="ruleForm.fillCompany" size="mini" clearable style="width:100%"></el-input>
              </el-form-item>
            </div>
            <div class="my-input">
              <el-form-item label="制  表  人：" prop="tabulation">
                <el-input v-model="ruleForm.tabulation" size="mini" clearable style="width:100%"></el-input>
              </el-form-item>
            </div><br>
            <div class="my-input gocenter">
              <el-form-item label="督办人员立项复合意见：" prop="proCompositeOpinion1">
                <el-input type="textarea" v-model="ruleForm.proCompositeOpinion1" style="width:100%"></el-input>
              </el-form-item>
            </div>
            <div class="my-input" style="padding-left: 0%;">
              <el-form-item label="填写时间：" prop="fillDate1">
                <el-date-picker size="mini" v-model="ruleForm.fillDate1" type="date" align="right" unlink-panels style="width:100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="my-input gocenter">
              <el-form-item label="负责人立项复合意见：" prop="proCompositeOpinion2">
                <el-input type="textarea" v-model="ruleForm.proCompositeOpinion2" style="width:100%"></el-input>
              </el-form-item>
            </div>
            <div class="my-input" style="padding-left: 0%;">
              <el-form-item label="填写时间：" prop="fillDate2">
                <el-date-picker size="mini" v-model="ruleForm.fillDate2" type="date" align="right" unlink-panels style="width:100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <!-- 1px solid #ebeef5  -->
          <div class="sub" style="text-align:center;height:80px;">
            <el-button type="primary" @click="save('form')" style="margin-right:10px;" size="mini" v-loading.fullscreen.lock="saveLoading" element-loading-text="正在保存，请稍候" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">保存</el-button>
            <el-button type="primary" title="上传附件前请先保存" style="margin-right:10px;" size="mini" @click="showUpload">上传附件</el-button>
            <el-button type="primary" title="任务分派前请先保存" style="margin-right:10px;" size="mini" @click="assignment" v-loading.fullscreen.lock="formLoading" element-loading-text="任务分派中......" element-loading-background="rgba(0, 0, 0, 0.8)">任务分派</el-button>
            <el-button @click="back" style="margin:10px;" size="mini">返回</el-button>
            <!-- <div style="text-align:center;"><span style="color:#FF0000;">上传附件，请先保存</span></div> -->
          </div>
        </span>
      </el-dialog>
      <el-dialog :close-on-click-modal="false" title="文件上传" :visible.sync="uploadDialogVisible" width="60%" class="bg-mask">
        <klUpload :fatherList.sync="fileList" :fatherId.sync="uploadData.id" :subId.sync="uploadData.subId" :type.sync="uploadData.type" ref="doUpload">
        </klUpload>
        <span slot="footer" class="dialog-footer">
          <el-button class="small-btn" type="primary" @click="confirmUpload">上 传</el-button>
          <el-button class="small-btn" @click="uploadDialogVisible = false">返 回</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import klUpload from '../klUpload';
export default {
  components: {
    klUpload
  },
  data() {
    return {
      isActive: true,
      isActive1: false,
      uploadData: {
        id: -1,
        subId: '',
        type: 1
      },
      activeName: '',
      uploadDialogVisible: false,//上传对话框
      fileList: [],//获取上传图片地址
      ruleForm: {
        taskName: '',
        important: '',
        taskType: '',
        sourceNum: '',
        sourceDesc: '',
        leaderUserIds: [],
        responsibleDeptIds: [],
        responsibleUserIds: [],
        assistDeptIds: [],
        assistUserIds: [],
        oldTaskNum: '',
        beginDate: '',
        endDate: '',
        planDesc: '',
        taskDesc: '',

        groupTaskNum: '',
        fillCompany: '',
        tabulation: '',
        proCompositeOpinion1: '',
        fillDate1: '',
        proCompositeOpinion2: '',
        fillDate2: '',

        regIds: '',
        // isSave: true,
        // businessPersonnelId: '',
        // businessDeptId: '',
      },
      rules: {
        regIds: [
          { required: true, message: '请输入分公司', trigger: 'blur' }
        ],
        // businessPersonnelId: [
        //   { required: true, message: '请输入业务人员', trigger: 'blur' }
        // ],
        // businessDeptId: [
        //   { required: true, message: '请输入业务部门', trigger: 'blur' }
        // ],
        taskName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        sourceNum: [
          { required: true, message: '请选择督办来源', trigger: 'change' }
        ],
        important: [
          { required: true, message: '请选择重要程度', trigger: 'change' }
        ],
        taskType: [
          { required: true, message: '请选择任务类型', trigger: 'change' }
        ],
        responsibleDeptIds: [
          { required: true, message: '请选择责任部门', trigger: 'change' }
        ],
        responsibleUserIds: [
          { required: true, message: '请选择责任人', trigger: 'change' }
        ],
        leaderUserIds: [
          { required: true, message: '请选择分管领导', trigger: 'change' }
        ],
        beginDate: [
          { required: true, message: '请选择计划开始时间', trigger: 'change' }
        ],
        endDate: [
          { required: true, message: '请选择计划完成时间', trigger: 'change' }
        ],
        planDesc: [
          { required: true, message: '请输入工作计划', trigger: 'blur' }
        ],
        taskDesc: [
          { required: true, message: '请输入督办事宜', trigger: 'blur' }
        ],
        groupTaskNum: [
          { required: true, message: '请输入集团督办编号', trigger: 'blur' }
        ],
        fillCompany: [
          { required: true, message: '请输入填报单位', trigger: 'blur' }
        ],
        tabulation: [
          { required: true, message: '请输入制表人', trigger: 'blur' }
        ]
      },
      a: 0,
      loading: true,
      value: [],
      options: [],
      value2: '',
      options1: [],
      value3: '',
      options2: [],
      taskType: '',
      options3: [],
      options4: [],
      responsibleDeptIds: '',
      options5: [],
      responsibleUserIds: '',
      options6: [],
      important: '',
      options7: [],
      options8: [],
      input: '',
      tableData3: [],
      page: 1,
      pageCount: 20,
      sum: 0,
      addContent: false,
      addContent1: false,
      status: '',
      key: '',
      sourceName: '',
      responsibleDeptNames: [],
      responsibleUserNames: [],
      name8: '',
      leaderUserNames: [],
      assistUserNames: [],
      assistDeptNames: [],
      id: '',
      outHelpers: [],

      JTShow: false,
      formLoading: false,
      dialogTitle: '',
      uploadClick: true,
      saveLoading: false,
    }
  },
  mounted() {
    this.loadData();
    this.getlistDept();
    this.getsource();
    this.getleader();
    this.getcompany();
    this.taskStateData();
    this.taskTypeData();
    this.importanceData();
    this.taskSourceData();

  },
  methods: {
    confirmUpload() {
      this.$refs.doUpload.line2upload();
    },
    showUpload() {
      if (this.uploadClick) {
        this.$message({ message: '请先保存！', type: 'error' });
        return
      }
      let that = this;
      that.uploadData.type = 1;
      let params = {
        businessId: this.uploadData.id,
        type: 1
      };
      this.$common.commitParam(this, "/supervise/attachment/list.api", params, {
        success: function (res) {
          that.fileList = res.data;
          // console.log();
          that.uploadDialogVisible = true;
        }
      }, "get");
    },
    // 文件上传方法
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
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 责任部门选择框内值发生变化事件
    chose(val) {

      var that = this;
      this.responsibleDeptNames = [];
      for (var j in val) {
        for (var i = 0; i < that.options4.length; i++) {
          if (that.options4[i].value == val[j]) {
            that.responsibleDeptNames.push(that.options4[i].label)
          }
        }
      }
      this.responsibleUserNames = [];
      // 责任部门改变，责任人员置空
      if (this.dialogTitle == '新建') {
        this.ruleForm.responsibleUserIds = [];
      }
      if (val == '-1000' || val == '') {
        // debugger
        that.options5 = [];
        that.responsibleUserIds = ''
      } else {
        this.$common.commitParam(this, "/supervise/sys/listSysUserByDeptIds.api", { deptId: val.join(',') }, {
          success: function (res) {
            // that.a++;
            // if (that.options5.length == 0) {
            //   for (var i = 0; i < res.data.length; i++) {
            //     var values = {};
            //     values.value = res.data[i].id.toString();
            //     values.label = res.data[i].name;
            //     that.options5.push(values);
            //     that.responsibleUserIds = res.data[0].id
            //   }
            // } else if (that.options5.length > 0) {
            //   var box = [];
            //   for (var i = 0; i < res.data.length; i++) {
            //     var values = {};
            //     values.value = res.data[i].id;
            //     values.label = res.data[i].name;
            //     box.push(values);
            //   }
            //   that.options5 = box;
            //   that.ruleForm.responsibleUserIds = res.data[0].id
            //   that.responsibleUserIds = res.data[0].id
            // }
            ;
            that.options5 = [];
            for (let i in res.data) {
              let group = {};
              group.label = res.data[i].name;
              group.options = res.data[i].items;
              that.options5.push(group)
            }
            // console.log(that.options5);

          }
        }, "get");
      }
    },
    // 处理协办人员数据
    dealOutHelper(val) {

      let outHelpers = JSON.parse(JSON.stringify(this.outHelpers));
      this.assistUserNames = [];
      for (let i in val) {
        for (let x in outHelpers) {
          for (let y in outHelpers[x].options) {
            if (outHelpers[x].options[y].id == val[i]) {
              this.assistUserNames.push(outHelpers[x].options[y].name)
            }
          }
        }
      }
    },
    // 处理责任人员数据
    dealOutHelper1(val) {


      let options5 = JSON.parse(JSON.stringify(this.options5));
      // console.log(options5);
      this.responsibleUserNames = [];
      for (let i in val) {
        for (let x in options5) {
          for (let y in options5[x].options) {
            if (options5[x].options[y].id == val[i]) {
              this.responsibleUserNames.push(options5[x].options[y].name)
            }
          }
        }
      }

    },
    taskStateData() {
      var that = this;
      this.$common.commitParam(this, "supervise/dic/options.api", { type: 'task_state' },
        {
          success: function (res) {
            that.options1 = res.data;
          }
        }, 'get');
    },
    taskTypeData() {
      var that = this;
      this.$common.commitParam(this, "supervise/dic/options.api", { type: 'supervision_task_type' },
        {
          success: function (res) {
            that.options2 = res.data;
          }
        }, 'get');
    },
    taskSourceData() {
      var that = this;
      this.$common.commitParam(this, "supervise/dic/options.api", { type: 'task_sorce' },
        {
          success: function (res) {
            that.options3 = res.data;
          }
        }, 'get');
    },
    importanceData() {
      var that = this;
      this.$common.commitParam(this, "supervise/dic/options.api", { type: 'important' },
        {
          success: function (res) {
            that.options6 = res.data;
          }
        }, 'get');
    },
    // 处理选择部门数据，并获取人员数据
    selectOutHelper(val) {
      let that = this;
      this.assistDeptNames = [];
      for (var j in val) {
        for (var i = 0; i < that.options4.length; i++) {
          if (that.options4[i].value == val[j]) {
            that.assistDeptNames.push(that.options4[i].label)
          }
        }
      }
      this.assistUserNames = [];
      this.outHelpers = [];
      if (val == '-1000' || val == '') {
        this.outHelpers = [];
        this.assistUserNames = [];
      } else {
        this.$common.commitParam(this, "supervise/sys/listSysUserByDeptIds.api", { deptId: val.join(',') },
          {
            success: function (res) {
              ;
              for (let i in res.data) {
                let group = {};
                group.label = res.data[i].name;
                group.options = res.data[i].items;
                that.outHelpers.push(group)
              }
              // console.log(that.outHelpers);
            }
          }, 'get')
      }
    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod(index) {
      return (this.page - 1) * this.pageCount + (index + 1);
    },
    handleClick(row) {

    },
    // 加载表格数据
    loadData() {
      var that = this;
      if (that.addContent == false) {
        that.loading = true;
      } else {
        that.loading = false;
      }
      var params = { page: that.page, pageCount: that.pageCount };
      if (that.value !== null && that.value.length !== 0) {
        params.beginDate = that.value[0];
        params.endDate = that.value[1];
      };
      if (that.value2 !== '' && that.value2 !== '-1000') {
        params.responsibleDeptId = that.value2;
      };
      if (that.value3 !== '' && that.value3 !== '-1000') {
        params.taskState = that.value3;
      };
      if (that.taskType !== '') {
        params.supervisionTaskType = that.taskType;
      };
      if (that.input !== '') {
        params.taskName = that.input;
      }
      this.$common.commitParam(this, "/supervise/taskinfo/alllist.api", params, {
        success: function (res) {
          that.tableData3 = res.data;
          that.sum = res.totalCount;
          if (res.code == 0) {
            that.loading = false
          }
        }
      }, "get");
    },
    // 分页功能-获取每页条数
    handleSizeChange(val) {
      this.pageCount = val;
      this.loadData();
    },
    // 解决ie9的输入框bug
    againReassignment(item) {
      this.input = item.target.value
    },
    // 分页功能-获取当前页
    handleCurrentChange(val) {
      this.page = val;
      this.loadData();
    },
    // 获取搜索区责任部门数据
    getlistDept() {
      var that = this;
      this.$common.commitParam(this, "/supervise/sys/listDept.api", {}, {
        success: function (res) {
          res.data.unshift({ id: '-1000', name: '所有' });
          for (var i = 0; i < res.data.length; i++) {
            var values = {};
            values.value = res.data[i].id.toString();
            values.label = res.data[i].name;
            that.options.push(values);
            if (values.value !== '-1000') {
              that.options4.push(values);
            }
          }
        }
      }, "get");
    },
    // 获取督办来源数据
    getsource() {
      var that = this;
      this.$common.commitParam(this, "/supervise/dic/options.api?type=task_sorce", {}, {
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            var values = {};
            values.value = res.data[i].id;
            values.label = res.data[i].label;
            that.options3.push(values);
          }
        }
      }, "get");
    },
    // 获取分管领导数据
    getleader() {
      var that = this;
      this.$common.commitParam(this, "/supervise/sys/listSysUserByRole.api?roleKey=leadleader", {}, {
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            var values = {};
            values.value = res.data[i].id.toString();
            values.label = res.data[i].name;
            that.options7.push(values);
          }
        }
      }, "get");
    },
    // 获取分公司数据
    getcompany() {
      var that = this;
      this.$common.commitParam(this, '/supervise/sys/listCompany.api', {}, {
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            var values = {};
            values.value = res.data[i].id.toString();
            values.label = res.data[i].name;
            that.options8.push(values);
          }
        }
      }, "get");
    },
    // 搜索
    search() {
      // this.loadData();
      var that = this;
      that.page = 1;
      that.loading = true;
      var params = { page: that.page, pageCount: that.pageCount };
      if (that.value !== null && that.value.length !== 0) {
        params.beginDate = that.value[0];
        params.endDate = that.value[1];
      };
      if (that.value2 !== '' && that.value2 !== '-1000') {
        params.responsibleDeptId = that.value2;
      };
      if (that.value3 !== '' && that.value3 !== '-1000') {
        params.taskState = that.value3;
      };
      if (that.taskType !== '') {
        params.supervisionTaskType = that.taskType;
      };
      if (that.input !== '') {
        params.taskName = that.input;
      }
      this.$common.commitParam(this, "/supervise/taskinfo/alllist.api", params, {
        success: function (res) {
          that.tableData3 = res.data;
          that.sum = res.totalCount;
          if (res.code == 0) {
            that.loading = false
          }
        }
      }, "get");
    },
    // 添加
    add() {
      this.uploadClick = true;
      this.dialogTitle = '新建';
      var that = this;
      this.uploadData.id = -1;
      that.addContent = true;
      this.status = 'add';
      this.ruleForm = {

        taskName: '',
        important: '',
        taskType: '',
        sourceNum: '',
        sourceDesc: '',
        leaderUserIds: [],
        responsibleDeptIds: [],
        responsibleUserIds: [],
        assistDeptIds: [],
        assistUserIds: [],
        oldTaskNum: '',
        beginDate: '',
        endDate: '',
        planDesc: '',
        taskDesc: '',

        fillCompany: '',
        groupTaskNum: '',
        tabulation: '',
        proCompositeOpinion1: '',
        proCompositeOpinion2: '',
        fillDate1: '',
        fillDate2: '',

        regIds: '',
        // businessPersonnelId: '',
        // businessDeptId: '',
      }
      // 清空表单验证
      if (this.$refs.form != undefined) {
        this.$refs.form.resetFields();
      }
    },

    // 任务分派
    assignment() {
      if (this.uploadClick) {
        this.$message({ message: '请先保存！', type: 'error' });
        return
      }
      var that = this;
      that.loading = true;
      that.formLoading = true;

      this.$common.commitParam(this, "/supervise/taskinfo/assignment.api", { 'id': that.id },
        {
          success: function (res) {
            that.formLoading = false;
            if (res.code == 0) {
              that.$message({ type: 'success', message: '执行成功!' });
              that.loadData();
              setTimeout(function () {
                that.back();
              }, 2000);
            } else {
              that.$message({ type: 'error', message: '执行失败!' });
              that.loadData();
            }
          }
        }, "post", false);
    },
    // 修改
    update(row) {

      this.uploadClick = false;
      this.uploadData.id = row.id;
      this.id = row.id;
      if (row.taskState !== '草稿') {
        this.$message({ message: '只能修改草稿数据!', type: 'warning' });
        return;
      }
      this.dialogTitle = '修改';

      var that = this;
      that.addContent = true;
      that.status = 'update';
      that.ruleForm = {
        id: row.id,
        taskName: row.taskName,
        important: row.important + '',
        taskType: row.taskType,
        sourceNum: row.sourceNum + '',
        sourceDesc: row.sourceDesc,
        // leaderUserIds: row.leaderUserIds + '',
        leaderUserIds: row.leaderUserIds === '' ? [] : row.leaderUserIds.split(','),
        // responsibleDeptIds: row.responsibleDeptIds + '',
        responsibleDeptIds: row.responsibleDeptIds === '' ? [] : row.responsibleDeptIds.split(','),
        // responsibleUserIds: row.responsibleUserIds + '',
        responsibleUserIds: row.responsibleUserIds === '' ? [] : row.responsibleUserIds.split(','),
        assistDeptIds: row.assistDeptIds === '' ? [] : row.assistDeptIds.split(','),
        assistUserIds: row.assistUserIds === '' ? [] : row.assistUserIds.split(','),
        assistUserNames: row.assistUserNames,
        // row.assistUserNames.join(','),
        oldTaskNum: row.oldTaskNum,
        beginDate: row.beginDate,
        endDate: row.endDate,
        planDesc: row.planDesc,
        taskDesc: row.taskDesc,

        fillCompany: row.fillCompany,
        groupTaskNum: row.groupTaskNum,
        tabulation: row.tabulation,
        proCompositeOpinion1: row.proCompositeOpinion1,
        proCompositeOpinion2: row.proCompositeOpinion2,
        fillDate1: row.fillDate1,
        fillDate2: row.fillDate2,
        // taskType: 'JT',


      };


      if (row.taskType == '集团') {
        that.ruleForm = {
          id: row.id,
          taskName: row.taskName,
          important: row.important + '',
          taskType: row.taskType,
          sourceNum: row.sourceNum + '',
          sourceDesc: row.sourceDesc,
          // leaderUserIds: row.leaderUserIds + '',
          leaderUserIds: row.leaderUserIds === '' ? [] : row.leaderUserIds.split(','),
          // responsibleDeptIds: row.responsibleDeptIds + '',
          responsibleDeptIds: row.responsibleDeptIds === '' ? [] : row.responsibleDeptIds.split(','),
          // responsibleUserIds: row.responsibleUserIds + '',
          responsibleUserIds: row.responsibleUserIds === '' ? [] : row.responsibleUserIds.split(','),
          assistDeptIds: row.assistDeptIds === '' ? [] : row.assistDeptIds.split(','),
          assistUserIds: row.assistUserIds === '' ? [] : row.assistUserIds.split(','),
          assistUserNames: row.assistUserNames,
          oldTaskNum: row.oldTaskNum,
          beginDate: row.beginDate,
          endDate: row.endDate,
          planDesc: row.planDesc,
          taskDesc: row.taskDesc,

          fillCompany: row.fillCompany,
          groupTaskNum: row.groupTaskNum,
          tabulation: row.tabulation,
          proCompositeOpinion1: row.proCompositeOpinion1,
          proCompositeOpinion2: row.proCompositeOpinion2,
          fillDate1: row.fillDate1,
          fillDate2: row.fillDate2,
          taskType: 'JT',


        };
        that.chose(that.ruleForm.responsibleDeptIds);
      } else if (row.taskType == '水板块') {
        that.ruleForm = {
          id: row.id,
          taskName: row.taskName,
          important: row.important + '',
          taskType: row.taskType,
          sourceNum: row.sourceNum + '',
          sourceDesc: row.sourceDesc,
          // leaderUserIds: row.leaderUserIds + '',
          leaderUserIds: row.leaderUserIds === '' ? [] : row.leaderUserIds.split(','),
          // responsibleDeptIds: row.responsibleDeptIds + '',
          responsibleDeptIds: row.responsibleDeptIds === '' ? [] : row.responsibleDeptIds.split(','),
          // responsibleUserIds: row.responsibleUserIds + '',
          responsibleUserIds: row.responsibleUserIds === '' ? [] : row.responsibleUserIds.split(','),
          assistDeptIds: row.assistDeptIds === '' ? [] : row.assistDeptIds.split(','),
          assistUserIds: row.assistUserIds === '' ? [] : row.assistUserIds.split(','),
          assistUserNames: row.assistUserNames,
          oldTaskNum: row.oldTaskNum,
          beginDate: row.beginDate,
          endDate: row.endDate,
          planDesc: row.planDesc,
          taskDesc: row.taskDesc,

          regIds: row.regIds.split(','),
          // businessPersonnelId: row.businessPersonnelId,
          // businessPersonnelName: row.businessPersonnelName,
          // businessDeptId: row.businessDeptId,
          // businessDeptName: row.businessDeptName
        };
        that.chose(that.ruleForm.responsibleDeptIds);
      } else {
        that.ruleForm = {
          id: row.id,
          taskName: row.taskName,
          important: row.important + '',
          taskType: row.taskType,
          sourceNum: row.sourceNum + '',
          sourceDesc: row.sourceDesc,
          // leaderUserIds: row.leaderUserIds + '',
          leaderUserIds: row.leaderUserIds === '' ? [] : row.leaderUserIds.split(','),
          // responsibleDeptIds: row.responsibleDeptIds + '',
          responsibleDeptIds: row.responsibleDeptIds === '' ? [] : row.responsibleDeptIds.split(','),
          // responsibleUserIds: row.responsibleUserIds + '',
          responsibleUserIds: row.responsibleUserIds === '' ? [] : row.responsibleUserIds.split(','),
          assistDeptIds: row.assistDeptIds === '' ? [] : row.assistDeptIds.split(','),
          assistUserIds: row.assistUserIds === '' ? [] : row.assistUserIds.split(','),
          assistUserNames: row.assistUserNames,
          oldTaskNum: row.oldTaskNum,
          beginDate: row.beginDate,
          endDate: row.endDate,
          planDesc: row.planDesc,
          taskDesc: row.taskDesc,
        };
        that.chose(that.ruleForm.responsibleDeptIds);
      }
      // this.chose(this.ruleForm.responsibleDeptIds);
      this.selectOutHelper(this.ruleForm.assistDeptIds);
      // console.log(that.ruleForm);
    },
    // 删除
    delet(row) {
      if (row.taskState !== '草稿') {
        this.$message({ message: '只能删除草稿数据!', type: 'warning' });
        return;
      }
      this.$confirm('确认删除该数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var that = this;
        this.$common.commitParam(this, "/supervise/taskinfo/delete.api", { id: row.id }, {
          success: function (res) {
            if (res.code == 0) {
              that.$message({ type: 'success', message: '删除成功!' });
              that.loadData();
            }
          }
        }, "post", false);
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 返回
    back() {
      var that = this;
      that.addContent = false;
    },
    //显示div
    hidden() {
      if (window.screen.width == 1366) {
        if (this.isActive == true) {
        $('.upchange').addClass('el-icon-arrow-up').removeClass('el-icon-arrow-down')
        $('.el-table--fit').css('height', '3.5rem');
        this.isActive = false;
        this.isActive1 = true;
      } else {
        $('.upchange').addClass('el-icon-arrow-down').removeClass('el-icon-arrow-up')
        this.isActive = true;
        this.isActive1 = false;
        $('.el-table--fit').css('height', '3.95rem');
      }
      }else{
        if (this.isActive == true) {
        $('.upchange').addClass('el-icon-arrow-up').removeClass('el-icon-arrow-down')
        $('.el-table--fit').css('height', '4.35rem');
        this.isActive = false;
        this.isActive1 = true;
      } else {
        $('.upchange').addClass('el-icon-arrow-down').removeClass('el-icon-arrow-up')
        this.isActive = true;
        this.isActive1 = false;
        $('.el-table--fit').css('height', '4.8rem');
      }
      }
      
    },

    //保存
    save(formName) {
      // console.log(formName);
      // console.log(this.options7);
      // console.log(this.assistUserNames);
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {

          for (var i = 0; i < that.options3.length; i++) {
            if (that.options3[i].value == that.ruleForm.sourceNum) {
              that.sourceName = that.options3[i].label;
            }
          }
          // for (var i = 0; i < that.options4.length; i++) {
          //   if (that.options4[i].value == that.ruleForm.responsibleDeptIds) {
          //     that.responsibleDeptNames = that.options4[i].label;
          //   }
          // }
          // for (var i = 0; i < that.options5.length; i++) {
          //   if (that.options5[i].value == that.ruleForm.responsibleUserIds) {
          //     that.responsibleUserNames = that.options5[i].label;
          //   }
          // }
          // for (var i = 0; i < that.options4.length; i++) {
          //   if (that.options4[i].value == that.ruleForm.businessDeptId) {
          //     that.businessDeptName = that.options4[i].label;
          //   }
          // }
          // for (var i = 0; i < that.options5.length; i++) {
          //   if (that.options5[i].value == that.ruleForm.businessPersonnelId) {
          //     that.businessPersonnelName = that.options5[i].label;
          //   }
          // }
          for (var i = 0; i < that.options6.length; i++) {
            if (that.options6[i].value == that.important) {
              that.name8 = that.options6[i].label;
            }
          }
          that.leaderUserNames = [];
          for (var i = 0; i < that.options7.length; i++) {
            // if (that.options7[i].value == that.ruleForm.leaderUserIds) {
            //   that.leaderUserNames = that.options7[i].label;
            // }
            for (let j = 0; j < that.ruleForm.leaderUserIds.length; j++) {
              if (that.ruleForm.leaderUserIds[j] == that.options7[i].value) {
                that.leaderUserNames.push(that.options7[i].label)
              }

            }
          }
          // console.log(that.leaderUserNames);
          var params = {
            taskName: that.ruleForm.taskName,//
            sourceNum: that.ruleForm.sourceNum,//



            important: that.ruleForm.important,//

            beginDate: that.ruleForm.beginDate,//
            endDate: that.ruleForm.endDate,//
            planDesc: that.ruleForm.planDesc,//
            taskType: that.ruleForm.taskType,//
            sourceDesc: that.ruleForm.sourceDesc,//
            oldTaskNum: that.ruleForm.oldTaskNum,//
            taskDesc: that.ruleForm.taskDesc,//
            // sourceName:that.sourceName,





          };

          // 任务类型为JT时
          if (that.ruleForm.taskType == 'JT' || that.ruleForm.taskType == '集团') {
            params.fillCompany = that.ruleForm.fillCompany;
            params.groupTaskNum = that.ruleForm.groupTaskNum;
            params.tabulation = that.ruleForm.tabulation;
            params.proCompositeOpinion1 = that.ruleForm.proCompositeOpinion1;
            params.proCompositeOpinion2 = that.ruleForm.proCompositeOpinion2;
            params.fillDate1 = that.ruleForm.fillDate1;
            params.fillDate2 = that.ruleForm.fillDate2;
          }
          if (that.ruleForm.taskType == 'SBK' || that.ruleForm.taskType == '水板块') {
            params.regIds = that.ruleForm.regIds.join(',');
            params.leaderUserIds = that.ruleForm.leaderUserIds.join(',');
            params.leaderUserNames = that.leaderUserNames.join(',');
            // params.responsibleDeptIds = that.ruleForm.responsibleDeptIds;
            // params.responsibleUserIds = that.ruleForm.responsibleUserIds;
            // params.responsibleUserNames = that.responsibleUserNames;
            // params.responsibleDeptNames = that.responsibleDeptNames;

            params.responsibleDeptIds = that.ruleForm.responsibleDeptIds.join(',');
            params.responsibleUserIds = that.ruleForm.responsibleUserIds.join(',');
            params.responsibleUserNames = that.responsibleUserNames.join(',');
            params.responsibleDeptNames = that.responsibleDeptNames.join(',');
            // params.businessPersonnelId = that.ruleForm.businessPersonnelId;
            // params.businessDeptId = that.ruleForm.businessDeptId;
            // params.businessDeptName = that.businessDeptName;
            // params.businessPersonnelName = that.businessPersonnelName;
          } else {
            // params.leaderUserIds = that.ruleForm.leaderUserIds;
            // params.leaderUserNames = that.leaderUserNames;
            params.leaderUserIds = that.ruleForm.leaderUserIds.join(',');
            params.leaderUserNames = that.leaderUserNames.join(',');
            // params.responsibleDeptIds = that.ruleForm.responsibleDeptIds;
            // params.responsibleUserIds = that.ruleForm.responsibleUserIds;
            // params.responsibleUserNames = that.responsibleUserNames;
            // params.responsibleDeptNames = that.responsibleDeptNames;
            params.responsibleDeptIds = that.ruleForm.responsibleDeptIds.join(',');
            params.responsibleUserIds = that.ruleForm.responsibleUserIds.join(',');
            params.responsibleUserNames = that.responsibleUserNames.join(',');
            params.responsibleDeptNames = that.responsibleDeptNames.join(',');
            params.assistDeptIds = that.ruleForm.assistDeptIds.join(',');
            params.assistUserIds = that.ruleForm.assistUserIds.join(',');
            params.assistDeptNames = that.assistDeptNames.join(',');
            params.assistUserNames = that.assistUserNames.join(',');
          }
          that.saveLoading = true;
          if (that.status == "add") {
            this.dealOutHelper1(this.ruleForm.responsibleUserIds);
            params.responsibleUserNames = that.responsibleUserNames.join(',');
            this.$common.commitParam(this, "/supervise/taskinfo/add.api", params, {
              success: function (res) {
                that.saveLoading = false;
                if (res.code == -1) {
                  that.$message({ message: '保存失败！', type: 'error' });

                } else {
                  that.$message({ message: '保存成功！可进行上传附件或任务分派', type: 'success' });
                  that.uploadData.id = res.description;
                  that.id = res.description;
                  that.uploadClick = false;
                  that.loadData();
                }
              }            }, 'post');
          } else if (that.status == "update") {
            params.id = that.ruleForm.id;
            // console.log(params.id, that.ruleForm.id);
            // params.assistUserNames = that.ruleForm.assistUserNames;
            this.dealOutHelper(this.ruleForm.assistUserIds);
            params.assistUserNames = that.assistUserNames.join(',');
            this.dealOutHelper1(this.ruleForm.responsibleUserIds);
            // console.log(this.ruleForm.responsibleUserIds);
            params.responsibleUserNames = that.responsibleUserNames.join(',');
            for (let i = 0; i < that.options6.length; i++) {
              if (params.important == that.options6[i].label) {
                params.important = that.options6[i].value;
              }
            }
            // console.log(that.option2);
            for (let j = 0; j < that.options2.length; j++) {
              if (params.taskType == that.options2[j].label) {
                params.taskType = that.options2[j].value;
              }

            }

            this.$common.commitParam(this, "/supervise/taskinfo/update.api", params, {
              success: function (res) {
                that.saveLoading = false;
                if (res.code == -1) {
                  that.$message({ message: '保存失败！', type: 'error' });
                } else {
                  that.$message({ message: '保存成功！', type: 'success' });
                  that.loadData();
                }
              }
            });
          }
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    fileList: {
      handler(val, oldVal) {

      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
/* 任务列表 */
.taskregister {
  height: 100%;
  .dialog123 {
    .bg-mask {
      background: rgba(0, 0, 0, 0.2);
      .dialog-footer {
        text-align: center;
        .small-btn {
          padding: 8px 16px;
        }
      }
    }
  }
  .el-table .cell {
    height: 0.34rem !important;
    line-height: 0.34rem !important;
  }
  .el-table th {
    padding: 0 !important;
    background: #fafafa;
    div {
      color: #333;
    }
  }
}
.taskregister td {
  padding: 0px 0px !important;
}
.taskregister .searchBox span {
  font-size: 0.16rem;
  // width: 100%;
}
.taskregister .searchBox .el-button {
  height: 0.3rem;
  background: #47b5e8;
}
.taskregister .tableBox {
  height: 82%;
  padding: 0 10px;
}
.taskregister .el-table {
  font-size: 15px;
}
.taskregister .my-input1 {
  margin-right: 0.1rem;
  display: inline-block;
  .el-input input {
    height: 0.3rem;
    // width: 1.8rem;
  }
}
.taskregister .my-input {
  width: 49%;
  display: inline-block;
  .el-form-item {
    margin-bottom: 14px;
  }
  // padding-left: 7%;
  .el-input__inner {
    height: 0.3rem;
  }
}
.taskregister .my-input .el-input {
  width: calc(100% - 80px);
}
.taskregister .my-input .el-select .el-input {
  width: 100%;
}
.taskregister .text1 {
  display: inline-block;
  width: 0.6rem;
}
.taskregister .text {
  text-align: right;
  display: inline-block;
  width: 0.8rem;
}
.taskregister .el-dialog__body {
  padding: 0px 20px;
  background-color: #fff;
}
.taskregister .dialog123 {
  box-sizing: content-box;
}
.taskregister .dialog123 .el-dialog {
  margin-top: 0.3rem !important;
  margin: 0 auto 0px;
  height: 6.65rem;
}
.taskregister .dialog123 .el-dialog .el-dialog__header {
  border-bottom: 1px solid #ebeef5 !important;
}
.taskregister .dialog123 .el-dialog .el-dialog__header .el-dialog__title {
  font-size: 0.16rem;
}
.taskregister .dialog123 .el-dialog .el-dialog__body {
  height: 5.2rem !important;
  // overflow-y: scroll !important;
  margin-top: 0.1rem;
  // width: 95%;
  overflow-y: auto;
}
.taskregister .dialog123 .el-dialog .el-dialog__footer {
  border-top: 1px solid #ebeef5;
  // height: 0.6rem;
  text-align: center;
  height: 0.8rem;
  // margin-top: 0.15rem;
  .el-button {
    width: 0.9rem;
    height: 0.38rem;
  }
  .el-button--primary {
    background-color: #297acc;
  }
}
.taskregister .dialog123 .el-input--suffix .el-input__inner {
  padding-right: 26px;
  width: 100%;
}
.taskregister .planA {
  display: none;
}
.taskregister .planB {
  display: block;
  margin-top: 15px;
}
.taskregister .is-leaf {
  font-size: 18px;
}
/* 修改、删除 */
.taskregister .el-button--text {
  font-size: 0.14rem;
}
/* 查询、 增加 */
// background: #47b5e8;
.taskregister .el-button--mini {
  font-size: 16px;
}
.taskregister .searchBtn {
  background: #faa646 !important;
  border-color: #faa646 !important;
  // margin-right:3%;
}
.taskregister .el-form-item__content {
  margin-left: 110px !important;
}
.taskregister .el-form-item__label {
  width: 110px !important;
}
.taskregister .gocenter {
  width: 49%;
}
.taskregister .gocenter .el-form-item__label {
  text-align: center !important;
}
.taskregister .gocenter .el-textarea__inner {
  min-height: 72px !important;
}
.taskregister .textarea {
  width: 98.6%;
  // margin-left: 7%;
  .el-form-item {
    margin-bottom: 14px;
  }
}
.taskregister .el-table__body tr td:nth-child(3) div {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.taskregister .el-table__row td:not(.is-hidden):last-child {
  right: -1px;
}
.taskregister .searchBox .el-range-separator {
  width: 8%;
}
.taskregister .block .el-input__inner {
  line-height: 22px;
}
input::-ms-clear,
input::-ms-reveal {
  display: none;
}
</style>