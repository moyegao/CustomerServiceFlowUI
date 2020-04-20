<!--> 点击待汇报跳转的页面<!-->
<template>
  <div class="taskreport" v-loading.fullscreen.lock="taskreportLoading" element-loading-text="正在保存..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="titleContentBox" v-show="titleContentShow">
      <div class="closeBtn el-icon-close" @click="getTitleContent(beforeId)"></div><br><br>
      <div class="titleContent"></div>
    </div>
    <table width="100%" border="0" align="center" cellpadding="4" cellspacing="3" style="margin-top: 20px;">
      <tbody>
        <tr>
          <td width="0px" style="display:none" align="left" valign="top" id="tree">
          </td>
          <td width="80%" align="center" valign="top">
            <table width="100%" height="98" border="0" align="center" cellpadding="4" cellspacing="3" id="table_form_1">
              <tbody>
                <tr>
                  <td width="10%" height="23" align="right" class="txt1"><span style="color: #999999">任务编号&nbsp;</span><input type="hidden" name="m_SubId" value="6170"></td>
                  <td width="30%" height="23"><span class="line" style="width:90%; display:inline-block;">{{taskinfo.taskNum}}</span></td>
                  <td width="10%" height="23" align="right" class="txt1"><font color="red">*</font><span style="color: #999999">汇报年月&nbsp;</span></td>
                  <!-- <td width="30%"><span class="line" style="width:75%; display:inline-block;">{{currentmonth}}</span></td> -->
                  <el-date-picker
                    v-model="currentmonth"
                    :editable="false"
                    size="mini"
                    type="month"
                    unlink-panels
                    format="yyyyMM"
                    value-format="yyyyMM"
                    placeholder="选择月"
                    style="width:76.5%;">
                    </el-date-picker>
                </tr>
                <tr>
                  <td width="10%" height="23" align="right" class="txt1">
                    <font color="red">*</font><span style="color: #999999">完成进度&nbsp;</span>
                  </td>
                  <td height="23" width="30%">
                    <!-- type="number" -->
                    <el-input placeholder="请输入完成进度（百分数）" v-model="progressScale" size="mini" style="width:90%;" clearable>
                    </el-input>%
                  </td>
                  <td width="10%" align="right" class="txt1">
                    <font color="red">*</font><span style="color: #999999">任务进度&nbsp;</span>
                  </td>
                  <td>
                    <template>
                      <el-select v-model="progressState" style="width: 76.5%" placeholder="请选择任务进度" size="mini">
                        <el-option v-for="item in progressS" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </td>
                </tr>
                <tr></tr>
                <tr>
                  <td width="10%" align="right">
                    <font color="red">*</font><span style="color: #999999">汇报内容&nbsp;</span>
                  </td>
                  <td colspan="3" align="left">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 5}" placeholder="请输入汇报内容" style="width:90%;" v-model="reportInfo" size="small">
                    </el-input>
                    <div style="color: red">提示：以***开头,***结尾 的内容,将以红色字体显示。</div>
                  </td>
                </tr>
                <br>
                <tr>
                  <td colspan="4" align="center" valign="middle">
                    <!-- <a href="#"><span class="round2" @click="doReport">保存 </span></a>
                    <a href="#" @click="showUpload"><span class="round2">上传附件</span></a>
                    <a href="#" @click.prevent="doClose"><span class="round">返回</span></a> -->
                    <el-button style="font-size: .14rem" type="primary" size="mini" @click="doReport">保存</el-button>
                    <el-button style="font-size: .14rem" type="primary" size="mini" @click="showUpload">上传附件</el-button>
                    <el-button style="font-size: .14rem" size="mini" @click.prevent="doClose">返回</el-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <br>
        <tr>
          <td colspan="2" align="center">
            <div id="table11" style="font-size:12px;width:93%;" @mouseenter="tooltipHide">
              <template>
                <el-table :data="tableData3" border height='1.5rem' style="width: 88%;">
                  <el-table-column type="index" :index="meterIndexMethod11" label="NO." width="70">
                  </el-table-column>
                  <el-table-column prop="monthId" label="汇报年月" width="100">
                  </el-table-column>
                  <el-table-column prop="progress" label="进度比例" width="100">
                  </el-table-column>
                  <el-table-column prop="reportInfo" label="汇报内容">
                  </el-table-column>
                  <el-table-column label="内容详情" width="100">
                    <template slot-scope="scope">
                      <el-button type="text" size="mini" @click="getTitleContent(scope.row)" :textChange="scope.row.id">显示</el-button>
                      <!-- <span size="mini" type="success" @click="getTitleContent(scope.row)" :textChange="scope.row.id">显示</span> -->
                    </template>
                  </el-table-column>
                  <el-table-column prop="fileTitle" label="附件" width="180" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span :key="tem.id" v-for="tem in scope.row.attachments" size="mini" type="success" @click="handleDownload(tem)" style="cursor: pointer;color:#6B9EFF">{{tem.name}}<br /></span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block" style="margin-top:10px;">
                  <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[5, 15, 20, 100]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="sum">
                  </el-pagination>
                </div>
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <el-dialog title="文件上传" top="10px" :visible.sync="uploadDialogVisible" width="80%" center>
      <klUpload :fatherList.sync="fileList" :fatherId.sync="uploadData.id" :type.sync="uploadData.type" ref="doUpload">
      </klUpload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible = false">返 回</el-button>
        <el-button type="primary" style="background:#297ACC;border-color:#297ACC" @click="confirmUpload">上 传</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import klUpload from './klUpload'
export default {
  components: {
    klUpload
  },
  props: ['taskReportNeedData'],
  data() {
    return {
      fileList: [],
      uploadData: {
        id: -1,
        type: 4
      },
      uploadDialogVisible: false,
      taskinfo: {},
      currentmonth: '',
      tableData3: [],
      page: 1,
      pageCount: 5,
      sum: 0,
      progressScale: '',
      reportInfo: '',
      progressState: '',
      progressS: [],
      reportId: '',
      urlData: {
        id: ''
      },
      n: true,
      // uploadShow:false,
      taskreportLoading: false,
      titleContentShow: false,
      titleContentText: '',
      //上一个汇报内容的id
      beforeId: '',
    }
  },
  mounted() {
    this.init();
    this.getlistTaskReport();
    this.gettaskinfo();
    this.getDate();
    this.progressStateData();
  },
  watch: {
    progressScale() {
      // alert(this.progressScale.length)
      // this.progressScale.replace(/([^0-9])+/g, '')
      this.progressScale = this.progressScale.replace(/[^\d.]/g, '')
      // for (let i = 0; i <= 100; i++) {
      //   if (this.progressScale == i) {
      //     break
      //   }
      //   if (i == 100) {
      //     this.$message({ message: '不能输入除0-9以外的字符，请重新输入！', type: 'warning' });
      //     this.progressScale = '';
      //   }
        
        
      // }
      let firstNum = this.progressScale[0];
      let num = this.progressScale - 100;
      if (num >= 0.1) {
        this.$message({ message: '完成进度百分比不能超过100，请重新输入！', type: 'warning' });
        this.progressScale = '';
      }
      // if (this.progressScale.length >= 6 && firstNum > 1) {
      //   this.$message({ message: '完成进度百分比不能超过100，请重新输入！', type: 'warning' });
      //   this.progressScale = '';
      // }
      if (this.progressScale.length >= 6) {
        this.$message({ message: '小数点后保留两位数，请重新输入！', type: 'warning' });
        this.progressScale = '';
      }
    }
  },
  methods: {
    init() {
      // this.urlData.id = this.$common.getQueryString('id');
      this.urlData.id = this.taskReportNeedData.id;
      // this.urlData.supervisionTaskId = this.$common.getQueryString('supervisionTaskId');
      this.urlData.supervisionTaskId = this.taskReportNeedData.supervisionTaskId;
      this.urlData.formId = this.taskReportNeedData.formId;
      this.urlData.taskId = this.taskReportNeedData.taskId;
      this.urlData.processId = this.taskReportNeedData.processId;
      this.urlData.processKey = this.taskReportNeedData.processKey;
    },
    handleSizeChange(val) {
      this.pageCount = val;
      this.getlistTaskReport();
    },
    // 分页功能-获取当前页
    handleCurrentChange(val) {
      this.page = val;
      this.getlistTaskReport();
    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod(index) {
      return (this.page - 1) * this.pageCount + (index + 1);
    },
    // 获取任务信息
    gettaskinfo() {
      var that = this;
      var id = that.urlData.id;
      var params = {};
      if (this.urlData.id != null) {
        params.id = this.urlData.id;
      }
      if (this.urlData.supervisionTaskId != null) {
        params.id = this.urlData.supervisionTaskId;
      }
      this.$common.commitParam(this, "/supervise/taskinfo/get.api", params, {
        success: function (res) {
          that.taskinfo = res.data;
        }
      }, "get");
    },
    // 获取当前时间
    getDate() {
      var that = this;
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentmonth = year + "" + month + "";
      that.currentmonth = currentmonth;
    },
    progressStateData() {
      var that = this;
      this.$common.commitParam(this, "supervise/dic/options.api", { type: 'report_progress_state' },
        {
          success: function (res) {
            that.progressS = res.data;
          }
        }, 'get');
    },
    // 获取汇报列表
    getlistTaskReport() {
      var that = this;
      var files = ''
      var arr = [];
      // var id = that.urlData.supervisionTaskId;
      that.$common.commitParam(that, "/supervise/mytaskinfo/listTaskReport.api",
        { "taskId": that.urlData.id, "page": that.page, "pageCount": that.pageCount },
        {
          success: function (res) {
            if (res.code == 0) {
              res.data.map(function (i, j) {
                i.attachments.map(function (x, y) {
                  var arrItem = { value: x.name, label: x.id }
                  arr.push(arrItem);
                })
                that.loadDowm = arr;
              })
              // console.log(that.loadDowm);
              that.tableData3 = res.data;
              that.sum = res.totalCount;
            } else {
              that.$message({ message: '查询异常！', type: 'error' });
            }
          }
        }, "get", false);
    },
    // 点击保存
    doReport() {
      var that = this;
      if (that.progressScale == '' || that.reportInfo == '' || that.progressState == '') {
        that.$message({ message: '红色星号标记为必须填写！', type: 'warning' });
        return;
      }

      var params = {
        "taskId": that.urlData.id,
        "taskNum": that.taskinfo.taskNum,
        "progressRadio": that.progressScale,
        "reportInfo": that.reportInfo,
        'progressState': that.progressState,
        'reportMonth': that.currentmonth,
        // "supervisionTaskType": that.taskinfo.supervisionTaskType
      }
      // if (that.urlData.id != null) {
      //   params.taskId = that.urlData.id;
      // }
      if (that.urlData.processId != null) {
        params.processId = that.urlData.processId;
      }
      if (that.urlData.processKey != null) {
        params.processKey = that.urlData.processKey;
      }
      if (that.urlData.formId != null) {
        params.id = that.urlData.formId;
      }
      if (that.urlData.taskId != null) {
        params.approvalTaskId = that.urlData.taskId
      }
      that.taskreportLoading = true;
      this.$common.commitParam(this, "/supervise/mytaskinfo/report.api", params,
        {
          success: function (res) {
            if (res.code != 0) {
              that.$message({ message: res.description, type: 'error' });
              that.taskreportLoading = false;
              return;
            }
            that.reportId = res.data;
            that.$message({ message: '保存成功！可进行上传附件操作', type: 'success' });
            that.taskreportLoading = false;
            that.getlistTaskReport();
            // localStorage.setItem('ongongRefresh', 'true');
            eventBus.$emit('ongongRefresh', 'true');
          }
        }, "post", false);
    },
    handleDownload(item) {
      window.open(item.url);
    },
    meterIndexMethod11(index) {
      return (this.page - 1) * this.pageCount + (index + 1);
    },
    // 上传附件按钮
    showUpload() {
      let that = this;
      let id = that.urlData.id;
      // that.uploadShow = true;
      if (that.reportId == '') {
        that.$message({ message: '请先保存资料', type: 'warning' });
      } else {
        that.uploadData.id = that.reportId;
        that.uploadData.type = 4;
        let params = {
          businessId: that.reportId,
          type: 4
        };
        this.$common.commitParam(this, "/supervise/attachment/list.api", params,
          {
            success: function (res) {
              that.fileList = res.data;
              that.uploadDialogVisible = true;
            }
          }, "get");
      }
      this.getlistTaskReport();
    },
    doClose() {
      eventBus.$emit('taskReportClose', 'true');
    },
    confirmUpload() {
      this.$refs.doUpload.line2upload();
      this.getlistTaskReport();
    },
    // 获取汇报内容
    getTitleContent(row) {
      // console.log(row);
      if (this.beforeId != row.id) {
        if (this.beforeId != '') {
          $("[textChange=" + this.beforeId + "]").find('span').html('显示');
          $("[textChange=" + this.beforeId + "]").find('span').css('color', '#409EFF');
        }
        setTimeout(() => {
          this.beforeId = row.id;
        }, 0);
      }

      if ($("[textChange=" + row.id + "]").find('span').html() == '显示') {
        this.titleContentShow = true;
        $("[textChange=" + row.id + "]").find('span').html('隐藏');
        $("[textChange=" + row.id + "]").find('span').css('color', '#FAA646');
      } else {
        this.titleContentShow = false;
        $("[textChange=" + row.id + "]").find('span').html('显示');
        $("[textChange=" + row.id + "]").find('span').css('color', '#409EFF');
      }

      for (let i = 0; i < $("[textChange]").length; i++) {
        if ($("[textChange").eq(i).find('span').html() == '显示') {
          $("[textChange").eq(i).find('span').css('color', '#409EFF');
        } else {
          $("[textChange").eq(i).find('span').css('color', '#FAA646');
        }

      }


      setTimeout(() => {
        var div = row.reportInfoMark;
        $('.titleContent').html(div);
      }, 0);
    },
    // 隐藏tooltip
    tooltipHide() {
      setTimeout(() => {
        $('body .el-tooltip__popper').css('display', 'none !important');
      }, 0);
    },
  }
}
</script>
<style lang="scss">
.taskreport {
  overflow: hidden;
  font-size: 15px;
  .line {
    // border-bottom-width: 1px;
    // border-bottom-style: solid;
    // border-bottom-color: #e0e0e0;
    color: #666666;
    font-family: "微软雅黑";
  }
  .round2 {
    height: 22px;
    border: 1px solid #297acc;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    display: inline-block;
    background-color: #297acc;
    color: #ffffff;
    font-family: "微软雅黑";
    font-size: 14px;
    line-height: 14px !important;
    cursor: pointer;
    padding-top: 3px;
    padding-right: 18px;
    padding-bottom: 3px;
    padding-left: 18px;
  }
  .round2:hover {
    // background-color: #297ACC;
  }
  .round {
    height: 22px;
    border: 1px solid #909aad;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    display: inline-block;
    background-color: #ffffff;
    color: #666666;
    font-family: "微软雅黑";
    font-size: 14px;
    line-height: 14px;
    cursor: pointer;
    padding-top: 3px;
    padding-right: 18px;
    padding-bottom: 3px;
    padding-left: 18px;
  }
  .round:hover {
    // background-color: #297ACC;
    // color: #ffffff;
  }
  .tablelist2 {
    border: 1px solid #e7e7e7;
    width: 100%;
    clear: both;
  }
  .tablelist2 th {
    /* background: url(../images/th.gif) repeat-x; */
    height: 40px;
    line-height: 40px;
    border-bottom: solid 1px #afced2;
    text-indent: 11px;
    text-align: center;
    font-family: "微软雅黑";
    font-size: 12px;
    color: #284e80;
    font-weight: normal;
  }
  .tablelist2 td {
    line-height: 22px;
    text-indent: 11px;
    border-right: dotted 1px #e7e7e7;
  }
  .ta {
    border-collapse: collapse;
    border-spacing: 0;
  }
  #table {
    height: calc(100% - 330px);
  }
  .el-table {
    height: 80%;
  }
  .el-dialog__body {
    height: 83% !important;
  }
  .el-table .el-table__body .el-button--text {
    height: 30px;
    line-height: 30px;
    padding: 0px !important;
  }
  .titleContentBox {
    min-height: 0.5rem;
    width: 97%;
    background-color: rgb(48, 49, 51);
    position: absolute;
    top: 0.6rem;
    z-index: 3000;
    border-radius: 5px;
    .closeBtn {
      color: #ffffff;
      float: right;
      margin-top: 0.1rem;
      margin-right: 0.1rem;
      cursor: pointer;
    }
    .titleContent {
      width: 95%;
      margin-left: 0.3rem;
      color: white;
      margin-bottom: 0.3rem;
    }
  }
  .el-table__body {
    tr {
      td:nth-child(4) {
        div {
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
// .el-tooltip__popper {
//   display: none !important;
// }
// .el-tooltip__popper:hover {
//   display: none !important;
// }
</style>