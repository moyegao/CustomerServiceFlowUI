<template>
  <div class="taskConfirm" v-loading.fullscreen.lock="loading" element-loading-text="正在提交" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="main1">
      <div class="la">
        <!-- <p>
          <font class='label'>督办名称&nbsp;</font>
          <font class='line' style=" width:calc(95.5% - 67px);display: inline-block;">{{msg.taskName}}</font>
        </p>

        <p>
          <font class='label'>督办来源&nbsp;</font>
          <font class='line' style=" width:calc(40% - 67px);display:inline-block;margin-right: 191px;">{{msg.sourceName}}</font>

          <font class='label'>来源说明&nbsp;</font>
          <font class='line' style=" width:calc(40% - 63px);display: inline-block;">{{msg.sourceDesc}}</font>
        </p>

        <p v-if="taskType !== '水板块'">
          <font class='label'>责&nbsp;任&nbsp;&nbsp;人&nbsp;</font>
          <font class='line' style=" width:calc(40% - 67px);display:inline-block;margin-right: 191px;">{{msg.responsibleUserNames}}</font>

          <font class='label'>责任部门&nbsp;</font>
          <font class='line' style=" width:calc(40% - 63px);display: inline-block;">{{msg.responsibleDeptNames}}</font>
        </p>

        <p v-if="taskType !== '水板块'">
          <font class='label'>协&nbsp;办&nbsp;&nbsp;人&nbsp;</font>
          <font class='line' style=" width:calc(40% - 67px);display:inline-block;margin-right: 191px;">{{msg.assistUserNames}}</font>

          <font class='label'>协办部门&nbsp;</font>
          <font class='line' style=" width:calc(40% - 63px);display: inline-block;">{{msg.assistDeptNames}}</font>
        </p>

        <p>
          <font class='label'>原&nbsp;编&nbsp;&nbsp;号&nbsp;</font>
          <font class='line' style=" width:calc(40% - 67px);display:inline-block;margin-right: 191px;">{{msg.oldTaskNum}}</font>

          <font class='label'>重要程度&nbsp;</font>
          <font class='line' style=" width:calc(40% - 63px);display: inline-block;">{{msg.important}}</font>
        </p>

        <p>
          <font class='label'>开始时间&nbsp;</font>
          <font class='line' style=" width:calc(40% - 67px);display:inline-block;margin-right: 191px;">{{msg.beginDate}}</font>

          <font class='label'>结束时间&nbsp;</font>
          <font class='line' style=" width:calc(40% - 63px);display: inline-block;">{{msg.endDate}}</font>
        </p>

        <p>
          <font class='label'>督办事宜&nbsp;</font>
          <font class='line' style=" width:calc(95.5% - 67px);display: inline-block;">{{msg.taskDesc}}</font>
        </p> -->

        <div class="messageBox">
          <!-- <div class="message_short" style="margin-left: 8%">
            <span class="message-name">任务名称&nbsp;</span>
            <span class="message-data">{{msg.taskName}}</span>
          </div> -->
          <div class="message_long" style="margin-left: 8%">
            <span class="message-name">督办名称：</span>
            <span class="message-data">{{msg.taskName}}</span>
          </div>

          <div class="message_short" style="margin-left: 8%">
            <span class="message-name">任务编号：</span>
            <span class="message-data">{{msg.taskNum}}</span>
          </div>
          <div class="message_short">
            <span class="message-name"> 原 编 号：</span>
            <span class="message-data">{{msg.oldTaskNum}}</span>
          </div>
          <div class="message_short">
            <span class="message-name">重要程度：</span>
            <span class="message-data">{{msg.important}}</span>
          </div>

          <div class="message_short" style="margin-left: 8%">
            <span class="message-name">督办来源：</span>
            <span class="message-data">{{msg.sourceName}}</span>
          </div>
          <div class="message_short">
            <span class="message-name">主 办 人：</span>
            <span class="message-data">{{msg.sponsorUserName}}</span>
          </div>
          <div class="message_short">
            <span class="message-name">工单类型：</span>
            <span class="message-data">{{msg.taskType}}</span>
          </div>

          <div class="message_short" style="margin-left: 8%">
            <span class="message-name">责任部门：</span>
            <span class="message-data">{{msg.responsibleDeptNames}}</span>
          </div>
          <div class="message_short">
            <span class="message-name"> 责 任 人：</span>
            <span class="message-data">{{msg.responsibleUserNames}}</span>
          </div>
          <div class="message_short">
            <span class="message-name">分管领导：</span>
            <span class="message-data">{{msg.leaderUserNames}}</span>
          </div>

          <div class="message_short" style="margin-left: 8%">
            <span class="message-name">协办部门：</span>
            <span class="message-data">{{msg.assistDeptNames}}</span>
          </div>
          <div class="message_short">
            <span class="message-name"> 协 办 人：</span>
            <span class="message-data">{{msg.assistUserNames}}</span>
          </div>

          <div class="message_short" style="margin-left: 8%">
            <span class="message-name">开始时间：</span>
            <span class="message-data">{{msg.beginDate}}</span>
          </div>
          <div class="message_short">
            <span class="message-name">结束时间：</span>
            <span class="message-data">{{msg.endDate}}</span>
          </div>

          <div class="message_long" style="margin-left: 8%">
            <span class="message-name">来源说明：</span>
            <span class="message-data">{{msg.sourceDesc}}</span>
          </div>

          <div class="message_long" style="margin-left: 8%">
            <span class="message-name">督办事宜：</span>
            <span class="message-data">{{msg.taskDesc}}</span>
          </div>

          <div class="message_long_upload" style="margin-left: 8%;margin-bottom: .15rem">
            <div class="message-name"><span style="float: left;">任务附件：</span></div>
            <div class="message-data">
              <div v-for="item in tableData3" :key='item.id'>
                <span>{{item.name}}</span>
                <el-button size="mini" type="text" class="download-btn" style="background: none;border: none;" @click="handleDownload(item)">下载</el-button>
                <el-button size="mini" type="text" class="delete-btn" style="background: none;border: none;" @click="handlePreview(item)">预览</el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="clear">
          <font class='label'>附件</font>
          <template>
            <div style="width: calc(100% - 60px);float: right;">
              <el-table border :data="tableData3" style="width:calc(100% - 45px);">
                <el-table-column label="NO." type="index" :index="indexMethod" width="100px">
                </el-table-column>
                <el-table-column prop="name" label="附件" width="calc(100% - 67px)" @click="handleDownload(tem)">
                  <template slot-scope="scope">
                    <span @click="handleDownload(scope.row)" style="color: #409EFF;cursor: pointer;">{{scope.row.name}}<br /></span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </div> -->

        <el-form :model="ruleForm" ref="form" :rules="rules" label-width="100px">
          <div class="my-input">
            <!--4{{options4}}-->
            <el-form-item label="责任部门：" prop="responsibleDeptIds" v-if="taskType == '水板块'">
              <el-select v-model="ruleForm.responsibleDeptIds" clearable size="mini" style="width:100%" @change="chose">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="my-input" style="margin-left:13.7%;width:41.5%">
            <!--5{{options5}}-->
            <el-form-item label="责  任  人：" prop="responsibleUserIds" v-if="taskType == '水板块'">
              <el-select v-model="ruleForm.responsibleUserIds" clearable size="mini" style="width:100%">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div><br>
          <div class="my-input" v-if="groupTaskTypeShow">
            <!--4{{options4}}-->
            <el-form-item label="主办部门：" prop="responsibleDeptIds">
              <el-select v-model="ruleForm.responsibleDeptIds" clearable size="mini" style="width:100%" @change="getSponsorUser">
                <el-option v-for="item in responsibleDeptIdsList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div><br>
          <div class="my-input" v-if="groupTaskTypeShow">
            <!--4{{options4}}-->
            <el-form-item label="主办人：" prop="sponsorUserId">
              <el-select v-model="ruleForm.sponsorUserId" clearable size="mini" style="width:100%">
                <el-option v-for="item in sponsorUserIdList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="my-input" v-else>
            <!--4{{options4}}-->
            <el-form-item label="主办人：" prop="sponsorUserId">
              <el-select v-model="ruleForm.sponsorUserId" clearable size="mini" style="width:100%">
                <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> -->
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="my-input" style="margin-left:13.7%;width:41.5%" v-if="taskType == '水板块'">
            <!--7{{options7}}-->
            <el-form-item label="分管领导：" prop="leaderUserIds">
              <el-select v-model="ruleForm.leaderUserIds" clearable size="mini" style="width:100%">
                <el-option v-for="item in options7" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div><br>

          <div class="my-input">
            <!--4{{options4}}-->
            <el-form-item label="协办部门：" prop="assistDeptIds" v-if="taskType == '水板块'">
              <el-select v-model="ruleForm.assistDeptIds" multiple clearable size="mini" style="width:100%" @change="selectOutHelper">
                <el-option v-for="item in options4" :label="item.label" :value="item.value" :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="my-input" style="margin-left:13.7%;width:41.5%" v-if="taskType == '水板块'">
            <el-form-item label="协  办  人：" prop="assistUserIds">
              <el-select @change="dealOutHelper" v-model="ruleForm.assistUserIds" clearable multiple size="mini" style="width:100%">
                <el-option-group :key='group.id' v-for="group in outHelpers" :label="group.label">
                  <el-option v-for="item in group.options" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </div>
        </el-form>

        <!-- <p class="clear" v-if="false">
          <font class='label' style="margin-right: 7px;margin-left: 0px;">
            <font color='red'>*</font>
            主办人
          </font>
          <template>
            <el-select v-model="sponsorUserId" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </template>
          <div style="margin-left: 85px;color: red" v-if="msgShow">请选择主办人！</div>
        </p> -->

        <p style="margin-top: 20px;">
          <span class='label' style="margin-right: 20px;">
            <font style="color:red">*</font>工作计划
          </span>
          <el-input style="width: calc(100% - 104px);margin-left: -18px;" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入工作计划" v-model="planDesc">
          </el-input>
        </p>
        <p>
          <font class='label' style="margin-right: 20px;">&nbsp;&nbsp;处理意见</font>
          <el-input style="width: calc(100% - 104px);margin-left: -18px;" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入处理意见" v-model="comment">
          </el-input>
        </p>
        <!-- <p style="text-align:  center;">
          <a href="javascript:void(0)"><span class="round2" @click="doConfirm('form')">确定 </span></a>
          <a href="javascript:void(0)" @click="showUpload"><span class="round2">上传附件</span></a>
          <a href="javascript:void(0)" @click.prevent="doClose"><span class="round">返回</span></a>
        </p> -->
      </div>
    </div>
    <el-dialog title="文件上传" top="10px" :visible.sync="uploadDialogVisible" width="80%" center>
      <klUpload :fatherList.sync="fileList" :fatherId.sync="uploadData.id" :type.sync="uploadData.type" ref="doUpload">
      </klUpload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible = false">返 回</el-button>
        <el-button type="primary" @click="confirmUpload">上 传</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import klUpload from './klUpload';
export default {
  components: {
    klUpload
  },
  props: ['taskConfirmNeedData'],
  data() {
    return {
      uploadData: {
        id: -1,
        type: 1
      },
      msg: [],
      tableData3: [],
      operationType: '32',
      options: [],
      sponsorV: '',
      loadDowm: '',
      //工作计划
      planDesc: '',
      //处理意见
      comment: '同意接收',
      uploadDialogVisible: false,
      fileList: [],
      val: {},
      msgShow: false,
      loading: false,
      ruleForm: {
        responsibleDeptIds: '',
        responsibleUserIds: '',
        assistDeptIds: [],
        assistDeptNames: [],
        assistUserIds: [],
        assistUserNames: [],
        sponsorUserId: '',
        leaderUserIds: '',
      },
      rules: {

        responsibleDeptIds: [
          { required: true, message: '请选择责任部门', trigger: 'change' }
        ],
        responsibleUserIds: [
          { required: true, message: '请选择责任人', trigger: 'change' }
        ],
        sponsorUserId: [
          { required: true, message: '请选择主办人', trigger: 'change' }
        ],
        leaderUserIds: [
          { required: true, message: '请选择分管领导', trigger: 'change' }
        ]
      },
      options4: [],
      options5: [],
      options7: [],
      assistDeptNames: [],
      outHelpers: [],
      assistUserNames: [],
      taskType: '',
      groupTaskTypeShow: false,

      confirmClose: false,

      responsibleDeptIdsList: [],
      sponsorUserIdList: [],
    };
  },
  mounted() {
    this.valFun();
    this.tableValue();
    eventBus.$on('fujianRefresh', (params) => {
      this.getlistAttachment(this.val.businessKey);
    });

  },
  methods: {
    valFun() {
      this.val = {
        // businessKey: this.$common.getQueryString('id'),
        // procInstId: this.$common.getQueryString('processId'),
        // taskId: this.$common.getQueryString('taskId'),
        // formId: this.$common.getQueryString('formId'),
        // processKey: this.$common.getQueryString('processKey')
        businessKey: this.taskConfirmNeedData.id,
        procInstId: this.taskConfirmNeedData.processId,
        taskId: this.taskConfirmNeedData.taskId,
        formId: this.taskConfirmNeedData.formId,
        processKey: this.taskConfirmNeedData.processKey
      }
    },
    tableValue() {
      var that = this;
      var id = '';
      var params = { id: this.val.businessKey }
      this.$common.commitParam(this, '/supervise/taskinfo/get.api', params, {
        success: function (res) {
          if (res.code == 0) {
            that.msg = res.data;
            that.taskType = res.data.taskType;
            that.planDesc = res.data.planDesc;
            // that.getlistSponsor(that.msg.responsibleDeptIds);
            that.getlistAttachment(that.val.businessKey);
            if (that.taskType !== "水板块") {
              that.getSBKData(res.data.responsibleDeptIds);
            }
            if ('groupTaskType' in res.data) {
              if (that.msg.groupTaskType == '0') {
                that.groupTaskTypeShow = true;
                that.getlistDeptForJT();
              }
            }

          } else {
            that.$message({ message: res.description, type: 'warning' });
          }
          that.getlistDept();
          that.getleader();
        }
      }, "get");
    },
    //附件列表   
    getlistAttachment(id) {
      var arr = [];
      var that = this;
      that.$common.commitParam(that, "/supervise/attachment/list.api", { "businessId": that.val.businessKey },
        {
          success: function (res) {
            if (res.code == 0) {
              res.data.map(function (i, j) {
                var arrItem = {
                  value: i.id,
                  label: i.url,
                  name: i.name
                }
                arr.push(arrItem);
              })
              that.loadDowm = arr;

              that.tableData3 = res.data
            }
          }
        }, "get", false);
    },
    // 获取主办部门数据
    getlistDeptForJT() {
      var that = this;
      this.$common.commitParam(this, "/supervise/sys/listDept.api", {}, {
        success: function (res) {
          that.responsibleDeptIdsList = [];
          for (var i = 0; i < res.data.length; i++) {
            var values = {};
            values.value = res.data[i].id.toString();
            values.label = res.data[i].name;
            that.responsibleDeptIdsList.push(values);
          }
        }
      }, "get");

    },
    //选择主办人
    // getlistSponsor(id) {
    //   var that = this;
    //   var arr = [];
    //   that.$common.commitParam(that, "/supervise/sys/listSysUserByDeptId.api", { "deptId": id },
    //     {
    //       success: function (res) {
    //         if (res.code == 0) {
    //           that.options = res.data
    //           console.log(that.options);
    //         }
    //       }
    //     }, "get", false);
    // },
    //附件下载
    handleDownload(item) {
      window.open(item.url);
    },
    handlePreview(item) {
      if (item.pdfUrl !== '') {
        window.open(item.pdfUrl)
      } else {
        let imgList = ['jpg', 'JPG', 'gif', 'GIF', 'png', 'PNG']
        for (let i = 0; i < imgList.length; i++) {
          if (item.url.indexOf(imgList[i]) > -1) {
            var isPreview = true;
          }

        }
        if (isPreview) {
          window.open(item.url);
        } else {
          this.$message({
            type: 'error',
            message: '该附件不支持预览'
          });
        }
      }
    },




    //保存方法   
    doConfirm() {
      // this.comment = '不同意接收';
      // return

      let formName = 'form';
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {

          if (that.planDesc == '') {
            this.$message({
              type: 'error',
              message: '您尚未填写工作计划'
            });
            return
          }

          that.loading = true;
          var params = {
            id: that.val.businessKey,//
            procInstId: that.val.procInstId,//

            approvalTaskId: that.val.taskId,//

            sponsorUserId: that.ruleForm.sponsorUserId,//

            comment: that.comment//
          }
          if (that.groupTaskTypeShow) {
            for (let i = 0; i < that.sponsorUserIdList.length; i++) {
              if (that.ruleForm.sponsorUserId == that.sponsorUserIdList[i].id) {
                params.sponsorUserName = that.sponsorUserIdList[i].name;
              }

            }
          } else {
            // 主办人名称
            for (let i = 0; i < that.options.length; i++) {
              if (that.ruleForm.sponsorUserId == that.options[i].value) {
                params.sponsorUserName = that.options[i].label;
              }
            }
          }
          for (let i = 0; i < that.options4.length; i++) {
            // 责任部门名称
            // if (that.ruleForm.responsibleDeptIds == that.options4[i].value) {
            //   params.responsibleDeptNames = that.options4[i].label;
            // }
            // 协办部门名称
            for (let j = 0; j < that.ruleForm.assistDeptIds.length; j++) {
              if (that.ruleForm.assistDeptIds[j] == that.options4[i].value) {
                that.ruleForm.assistDeptNames.push(that.options4[i].label);
              }
            }
          }
          for (let i = 0; i < that.options5.length; i++) {
            // 责任人名称
            if (that.ruleForm.responsibleUserIds == that.options5[i].value) {
              params.responsibleUserNames = that.options[i].label;
            }
          }
          // 协办人名称
          for (let i = 0; i < that.outHelpers.length; i++) {
            for (let j = 0; j < that.outHelpers[i].options.length; j++) {
              for (let k = 0; k < that.ruleForm.assistUserIds.length; k++) {
                if (that.ruleForm.assistUserIds[k] == that.outHelpers[i].options[j].id) {
                  that.ruleForm.assistUserNames.push(that.outHelpers[i].options[j].name)
                }
              }
            }
          }
          // 分管领导名称
          for (let i = 0; i < that.options7.length; i++) {
            if (that.ruleForm.leaderUserIds == that.options7[i].value) {
              params.leaderUserNames = that.options7[i].label;
            }
          }

          if (that.taskType == '水板块') {
            // 责任部门
            params.responsibleDeptIds = that.ruleForm.responsibleDeptIds;
            for (let i = 0; i < that.options4.length; i++) {
              // 责任部门名称
              if (that.ruleForm.responsibleDeptIds == that.options4[i].value) {
                params.responsibleDeptNames = that.options4[i].label;
              }
            }
            // 责任人
            params.responsibleUserIds = that.ruleForm.responsibleUserIds;
            // 协办部门
            params.assistDeptIds = that.ruleForm.assistDeptIds.join(',');
            params.assistDeptNames = that.ruleForm.assistDeptNames.join(',')
            // 协办人
            params.assistUserIds = that.ruleForm.assistUserIds.join(',');
            params.assistUserNames = that.ruleForm.assistUserNames.join(',');
            // 分管领导
            params.leaderUserIds = that.ruleForm.leaderUserIds;
          }

          this.$common.commitParam(this, "supervise/mytaskinfo/doConfirm.api", params,
            {

              success: function (res) {
                that.loading = false;
                if (res.code == 0) {
                  that.$message({
                    message: '执行成功', type: 'success'
                  });
                  // localStorage.setItem("refresh", "true");
                  // setTimeout(function () {
                  eventBus.$emit('confirmClose', 'true');
                  // }, 2000);
                } else {
                  that.$message({
                    message: res.description, type: 'warning'
                  });

                }
              }
            }, "post", false);
        } else {
          return false;
        }
      })


    },
    //上传附件方法
    showUpload() {
      let that = this;
      var id = this.val.businessKey;
      that.uploadData.id = id;
      that.uploadData.type = 1;
      this.$common.commitParam(this, "/supervise/attachment/list.api", { 'businessId': that.val.businessKey },
        {
          success: function (res) {
            that.fileList = res.data;
            that.uploadDialogVisible = true;
          }
        }, "get");
    },
    confirmUpload() {
      this.$refs.doUpload.line2upload();
      this.getlistAttachment();
    },
    doClose() {
      // window.close();
      // this.$emit('closeTaskConfirm', false);
    },
    //序号连续       
    indexMethod(index) {
      return (index + 1);
    },
    // 获取搜索区责任部门数据
    getlistDept() {
      var that = this;
      // console.log(that.msg.regId);
      this.$common.commitParam(this, "/supervise/sys/listDept.api", { regId: that.msg.regId }, {
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            var values = {};
            values.value = res.data[i].id.toString();
            values.label = res.data[i].name;
            // that.options.push(values);
            if (values.value !== '-1000') {
              that.options4.push(values);
            }
          }
        }
      }, "get");
    },
    // 责任部门选择框内值发生变化事件
    chose(val) {

      var that = this;
      if (val == '-1000' || val == '') {
        that.options5 = [];
        // that.responsibleUserIds = ''
      } else {
        this.$common.commitParam(this, "/supervise/sys/listSysUserByDeptId.api", { deptId: val }, {
          success: function (res) {
            that.a++;
            if (that.options5.length == 0) {
              for (var i = 0; i < res.data.length; i++) {
                var values = {};
                values.value = res.data[i].id.toString();
                values.label = res.data[i].name;
                that.options5.push(values);
                that.options.push(values);
                // that.responsibleUserIds = res.data[0].id
              }
            } else if (that.options5.length > 0) {
              var box = [];
              for (var i = 0; i < res.data.length; i++) {
                var values = {};
                values.value = res.data[i].id;
                values.label = res.data[i].name;
                box.push(values);
              }
              that.options5 = box;
              that.options = box;
              that.ruleForm.responsibleUserIds = res.data[0].id
              // that.responsibleUserIds = res.data[0].id
            }
          }
        }, "get");
      }
    },
    getSponsorUser(val) {
      var that = this;
      this.$common.commitParam(this, "/supervise/sys/listSysUserByDeptIds.api", { deptId: val }, {
        success: function (res) {
          that.sponsorUserIdList = [];
          for (let i = 0; i < res.data[0].items.length; i++) {
            that.sponsorUserIdList.push(res.data[0].items[i]);

          }

        }
      }, "get");
    },
    // 不是水板块时主办人数据获取
    getSBKData(responsibleDeptIds) {
      var that = this;
      // this.$common.commitParam(this, "/supervise/sys/listSysUserByDeptIds.api", { deptId: localStorage.getItem('deptId') }, {
      this.$common.commitParam(this, "/supervise/sys/listSysUserByDeptIds.api", { deptId: responsibleDeptIds }, {
        success: function (res) {
          that.a++;
          if (that.options.length == 0) {
            // for (var i = 0; i < res.data.length; i++) {
            
            // values.value = res.data[i].id.toString();
            // values.label = res.data[i].name;
            for (let i = 0; i < res.data[0].items.length; i++) {
              var values = {};
              values.value = res.data[0].items[i].id;
              values.label = res.data[0].items[i].name;
              that.options.push(values);
            }

            // }
          }
        }
      }, "get");
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
      this.outHelpers = [];
      this.assistUserNames = [];
      if (val == '-1000' || val == '') {
        this.outHelpers = [];
        this.assistUserNames = [];
      } else {
        this.$common.commitParam(this, "supervise/sys/listSysUserByDeptIds.api", { deptId: val.join(',') },
          {
            success: function (res) {
              for (let i in res.data) {
                let group = {};
                group.label = res.data[i].name;
                group.options = res.data[i].items;
                that.outHelpers.push(group)
              }
            }
          }, 'get')
      }
    },
    // 处理人员数据
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
    // 获取分管领导数据
    getleader() {

      var that = this;
      this.$common.commitParam(this, "/supervise/sys/listSysUserByRole.api", { regId: that.msg.regId, roleKey: 'leadleader' }, {
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
  },
};
</script>


<style lang="scss">
.taskConfirm {
  p {
    margin: 14px 2px;
  }
  .tools2 {
    font-size: 14px;
    color: #3bb3c3;
    height: 28px;
    width: 99%;
    margin-left: 1%;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #e4e4e4;
    padding-top: 8px;
  }
  .la {
    padding: 27px;
    height: 100%;
    width: 80%;
    margin: 0 auto;
  }
  .line {
    border: none;
    // border-bottom-width: 1px;
    // border-bottom-style: solid;
    // border-bottom-color: #e0e0e0;
    // color: #666666;
    color: #333;
    font-family: "微软雅黑";
    font-size: 14px;
    // font-weight: bold;
  }
  .el-form-item__label {
    text-align: left;
    padding: 0;
  }
  .el-input--mini .el-input__inner {
    height: 0.3rem;
    line-height: 0.3rem;
    margin-left: 0.1rem;
  }
  .el-dialog__footer {
    height: 0.8rem;
  }
  .label {
    font-size: 14px;
  }
  .round2 {
    height: 22px;
    border: 1px solid #3bb3c3;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    display: inline-block;
    background-color: #3bb3c3;
    color: #ffffff;
    font-family: "微软雅黑";
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
    padding-top: 3px;
    padding-right: 18px;
    padding-bottom: 3px;
    padding-left: 18px;
  }
  .round2:hover {
    background-color: #49c5d6;
  }
  .round {
    height: 22px;
    border: 1px solid #97d0d8;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    display: inline-block;
    background-color: #ffffff;
    color: #666666;
    font-family: "微软雅黑";
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
    padding-top: 3px;
    padding-right: 18px;
    padding-bottom: 3px;
    padding-left: 18px;
  }
  .round:hover {
    background-color: #3bb3c3;
    color: #ffffff;
  }
  .clear:after {
    display: block;
    content: "";
    clear: both;
  }
  .my-input {
    width: 40%;
    display: inline-block;
    // padding-left: 16%;
  }
  .my-input .el-input {
    width: 100%;
  }
  .my-input .el-select .el-input {
    width: 100%;
  }
  .el-select .el-tag {
    margin: 2px 0 2px 16px;
  }
  .messageBox {
    width: 92%;
    .message_short {
      width: 30%;
      display: inline-block;
      margin-top: 0.1rem;
      .message-name {
        color: #999999;
        float: left;
        font-size: 0.14rem;
      }
      .message-data {
        font-size: 0.14rem;
      }
    }
    .message_long {
      width: 100%;
      display: inline-block;
      margin-top: 0.15rem;
      .message-name {
        color: #999999;
        float: left;
        font-size: 0.14rem;
      }
      .message-data {
        font-size: 0.14rem;
        div {
          width: 90%;
        }
      }
    }
    .message_long_upload {
      width: 90%;
      display: inline-block;
      margin-top: 0.15rem;
      .message-name {
        // display: inline-block;
        color: #999999;
        font-size: 0.14rem;
        // display: table-cell;
        // vertical-align: middle;
      }
      .message-data {
        display: inline-block;
        font-size: 0.14rem;
        // margin-left: 0.5rem;
      }
    }
  }
}
</style>