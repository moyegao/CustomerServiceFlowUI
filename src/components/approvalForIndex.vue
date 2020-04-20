<!--> 点击待审批跳转的页面<!-->
<template>
  <div class="approvalForIndex">
    <div class="box11">
      <div class="container">
        <div class="approval-content">
          <p>流程表单</p>
          <table align="center" class="main-table">
            <tbody>
              <tr>
                <td colspan="2">
                  <table width="99%">
                    <tbody style="font-size:14px;">
                      <tr>
                        <td width="173" height="26" align="right" class="txt1"> 督办名称&nbsp;</td>
                        <td width="500" colspan="3"><span class="line">{{getdata.taskName}}</span></td>
                      </tr>
                      <tr>
                        <td width="173" align="right" class="txt1">督办来源&nbsp;</td>
                        <td width="315"><span class="line1">{{getdata.sourceName}}</span></td>
                        <td width="173" height="26" align="right" class="txt1"> 来源说明&nbsp;</td>
                        <td width="446"><span class="line1">{{getdata.sourceDesc}}</span></td>
                      </tr>
                      <tr>
                        <td height="26" align="right" class="txt1">责任部门&nbsp;</td>
                        <td><span class="line1">{{getdata.responsibleDeptNames}}</span></td>
                        <td height="26" align="right" class="txt1">责&nbsp;任&nbsp;&nbsp;人&nbsp;</td>
                        <td><span class="line1">{{getdata.responsibleUserNames}}</span></td>
                      </tr>
                      <tr>
                        <td align="right" class="txt1">来源说明&nbsp;</td>
                        <td style="height:26px"><span class="line1">{{getdata.sourceDesc}}</span></td>
                        <td align="right" class="txt1">分管领导&nbsp;</td>
                        <td><span class="line1">{{getdata.leaderUserNames}}</span></td>
                      </tr>
                      <tr>
                        <td height="26" align="right" class="txt1">协办部门&nbsp;</td>
                        <td><span class="line1">{{getdata.assistDeptNames}}</span></td>
                        <td align="right" class="txt1">协&nbsp;办&nbsp;&nbsp;人&nbsp;</td>
                        <td><span class="line1">{{getdata.assistUserNames}}</span></td>
                      </tr>
                      <tr>
                        <td height="26" align="right" class="txt1">原&nbsp;编&nbsp;&nbsp;号&nbsp;</td>
                        <td><span class="line1">{{getdata.oldTaskNum}}</span></td>
                        <td align="right" class="txt1">督办类型&nbsp;</td>
                        <td><span class="line1">{{getdata.supervisionTaskType == 'GS' ? '供水' : '集团'}}</span></td>
                      </tr>
                      <tr>
                        <td height="26" style="width:173px;" align="right" class="txt1">开始时间&nbsp;</td>
                        <td><span class="line1">{{getdata.beginDate}}</span></td>
                        <td align="right" class="txt1">结束时间&nbsp;</td>
                        <td><span class="line1">{{getdata.endDate}}</span></td>
                      </tr>
                      <tr>
                        <td height="26" align="right" class="txt1">重要程度&nbsp;</td>
                        <td><span class="line1">{{getdata.important}}</span></td>
                        <td align="right" class="txt1">主&nbsp;办&nbsp;&nbsp;人&nbsp;</td>
                        <td><span class="line1">{{getdata.sponsorUserName}}</span></td>
                      </tr>
                      <tr>
                        <td height="40" align="right" class="txt1">督办事宜&nbsp;</td>
                        <td colspan="3">
                          <span class="line1 dubanMsg">{{getdata.taskDesc}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td height="40" align="right" class="txt1">附件&nbsp;</td>
                        <td colspan="3">
                          <span :key='item.id' v-for="item in attachments" size="mini" type="success" @click="down(item.id)">{{item.name}}</span><br />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id='approvalinfo'>
    </div>
    <!-- iiiiiii -->
    <el-dialog title="文件上传" top="10px" :visible.sync="uploadDialogVisible" width="80%" height="600px" center>
      <klUpload v-if="uploadDialogVisible" :fatherList.sync="fileList" :fatherId.sync="uploadData.id" :type.sync="uploadData.type" ref="doUpload">
      </klUpload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible = false">返 回</el-button>
        <el-button type="primary" @click="confirmUpload">上 传</el-button>
      </span>
    </el-dialog>

    <!-- iiiiiiiiii -->
  </div>

</template>
<script>
import klUpload from './klUpload';
export default {
  components: {
    klUpload
  },
  // props: ['approvalNeedData'],
  data() {
    return {
      urlData: {
        id: '',
        taskId: '',
        processId: '',
        processKey: '',
        msg: ''
      },
      uploadData: {
        id: -1,
        subId: '',
        type: 5
      },
      getdata: {},
      title: '',
      attachments: '',
      approvalInfo: '',
      uploadDialogVisible: false,
      fileList: [],
    }
  },
  mounted() {
    this.init();
    this.load();
    // alert(window.location.href)
    if (window.location.href.indexOf('approvalForIndex')) {
      $('#app').css('overflow-y', 'scroll')
    }
    
  },
  watch: {

  },
  methods: {
    init() {
      this.urlData.id = this.$common.getQueryString('id');
      this.urlData.taskId = this.$common.getQueryString('taskId');
      this.urlData.processId = this.$common.getQueryString('processId');
      this.urlData.processKey = this.$common.getQueryString('processKey');
      this.urlData.msg = this.$common.getQueryString('msg');
      // this.urlData.id = this.approvalNeedData.id;
      // this.urlData.taskId = this.approvalNeedData.taskId;
      // this.urlData.processId = this.approvalNeedData.processId;
      // this.urlData.processKey = this.approvalNeedData.processKey;
      this.urlData.msg = this.$common.getQueryString('msg');
    },
    down(id) {
      window.open(process.env.baseUrl + "supervise/attachment/down.api?id=" + id);
    },
    load() {
      this.gettaskinfo();
      this.getAttachments();
      this.getapprovalInfo();
    },
    getAttachments() {
      var that = this;
      var href = location.href;
      var id = that.urlData.id;
      this.$common.commitParam(this, "/supervise/attachment/list.api", { "businessId": id }, {
        success: function (res) {
          that.attachments = res.data;
        }
      }, "get");
    },
    gettaskinfo() {
      var that = this;
      var id = that.urlData.id;
      this.$common.commitParam(this, "/supervise/taskinfo/get.api", { "id": id }, {
        success: function (res) {
          that.getdata = res.data
          that.title = res.data.title
        }
      }, "get");
    },
    // 获取已经处理人，当前处理人，任务发起人，下一步处理人数据
    getapprovalInfo() {
      var that = this;
      var taskId = that.urlData.taskId;
      // console.log(that.urlData);
      var processKey = that.urlData.processKey;
      this.$common.commitParam(this, "/supervise/workflow/approvalinfo.api", { "taskId": taskId, 'processKey': processKey }, {
        success: function (res) {
          //console.log(approve);
          var div = '<a href="javascript:void(0)" id="showUpload"><span class="round2">上传附件 </span></a>';
          $('#approvalinfo').append(res.data);
          // $("[name='file']").hide();
          $("[name='file']").parent().html(div);
					if (window.location.href.indexOf('index') > 0 || window.location.href.indexOf('todo') > 0) {
					
					} else {
					  $('#upload').remove();
					}
					eventBus.$on('fujianHidden', (params) => {
					  $('#upload').remove();
						
					});
          that.getUpload();
          //接口返回的标签与事件，该方法写在后端接口返回的数据中，不在前端代码中
          $(".approval-content > ._showbutton").click();
        }
      }, "get");
		},
		//上传附件按钮
		getUpload(){
			var that = this;
			$('#showUpload').click(function () {
						// let that = this;
						// console.log(that.urlData);
            let id = that.urlData.taskId;
            that.uploadData.id = id;
            that.uploadData.type = 5;
            let params = {
              businessId: id,
              type: 5
            };
            that.$common.commitParam(that, "/supervise/attachment/list.api", params,
              {
                success: function (res) {
                  that.fileList = res.data;
                  that.uploadDialogVisible = true;
                }
              }, "get");
          })
		},

    confirmUpload() {
      this.$refs.doUpload.line2upload();
    },

    //upload里面的上传按钮
    showUpload() {
      let that = this;
      let id = that.urlData.taskId;
      that.uploadData.id = id;
      that.uploadData.type = 5;
      let params = {
        businessId: id,
        type: 5
      };
      this.$common.commitParam(this, "/supervise/attachment/list.api", params,
        {
          success: function (res) {
            that.fileList = res.data;
            that.uploadDialogVisible = true;
          }
        }, "get");
    },
  }
}
</script>
<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
ul > li {
  list-style: none;
}
ul {
  margin: 0;
  padding: 0;
}
.approvalForIndex {
  font-size: 12px;
  .el-dialog {
    margin-top: 7vh !important;
    height: 85%;
  }
  .el-dialog__body {
    padding: 15px 20px;
    height: calc(100% - 84px);
  }
  .el-tree {
    width: 30%;
    height: 100%;
    overflow: auto;
    float: left;
    margin-left: 50px;
  }
  .tree1 {
    .is-current > .el-tree-node__content {
      background-color: #0154a4;
      color: #fff;
    }
    .el-tree-node:focus > .el-tree-node__content {
      background-color: #0154a4;
      color: #fff;
    }
  }

  .xian {
    width: 1px;
    height: 100%;
    float: left;
    background-color: #000;
    margin-left: 50px;
  }
  .sure {
    float: left;
    margin-left: 50px;
  }
  .main-table {
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    border: solid #cccccc;
    border-width: 1px 1px 1px 1px;
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
  // .main-table td {
  //   border: solid #cccccc;
  //   border-width: 0px 1px 1px 0px;
  // }
  .main-table>tbody>tr>td>table>tbody td {
    border: solid #cccccc;
    border-width: 0px 1px 1px 0px;
  }
  .title {
    font-family: "微软雅黑";
    font-size: 16px;
  }
  a,
  a:focus {
    text-decoration: none;
    color: #000;
    outline: none;
  }
  a:hover {
    color: #00a4ac;
    text-decoration: none;
  }
  .line {
    border: none;
    display: block;
    // width: 540px;
    height: 26px;
    // line-height: 26px;
    color: #666666;
    font-family: "微软雅黑";
  }
  .line1 {
    border: none;
    display: block;
    // width: 280px;
    height: 26px;
    // line-height: 26px;
    color: #666666;
    font-family: "微软雅黑";
  }
  .dubanMsg{
    border: none;
    display: block;
    width: 100%;
    height: 26px;
    line-height: 26px;
    color: #666666;
    font-family: "微软雅黑";
  }
  
  .round2 {
    height: 30px;
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
		margin-left: 20px;
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
  .fujianbtn {
    // height: 36px;
    margin-left: 20px;
    height: 30px;
    width: 70px;
  }
	.uploading{
		margin-top: 50px;
	}
	.el-dialog__body{
		height: calc(100% - 135px);
	}
	
}
</style>
<style lang='css'>
@import "../assets/approval/css/editform.css";
@import "../assets/approval/css/fontello.css";
@import "../assets/approval/css/appvoralCSS.css";
@import "../../static/addone/artdialog/ui-dialog.css";
@import "../../static/addone/staffselector/selector.css";
@import "../../static/addone/tree/mytree.css";
@import "../../static/addone/staffselector/selector.css";
</style>
