<template>
  <div class="taskinfo">
    <div class="titleContentBox" v-show="titleContentShow">
      <div class="closeBtn el-icon-close" @click="getTitleContent(beforeId)"></div><br><br>
      <div class="titleContent"></div>
    </div>
    <div class="ascriptionBox" v-if="selectShow=='水板块'">
      <!-- <span>切换：</span> -->
      <el-select v-model="ruleForm.responsibleDeptIds" size="mini" style="width:10%" @change="goSwitch">
        <el-option v-for="item in ascriptionData" :label="item.name" :value="item.id" :key="item.id">
        </el-option>
      </el-select>
    </div>
    <el-tabs v-model="activeName" @tab-click="colorChange" type="border-card">
      <el-tab-pane label="任务详情" name="first" v-model="taskinfo">
        <!-- <table width="96%" stripe border="0" align="right" cellpadding="4" cellspacing="3">
          <tbody>
            <tr>
              <td width="173" height="26" align="right" class="txt1"> 任务名称&nbsp;</td>
              <td width="315">
                <span style="display:inline-block;  overflow:hidden;" class="line">{{taskinfo.taskName}}</span>
              </td>
              <td height="26" width="173" align="right" class="txt1">任务状态&nbsp;</td>
              <td width="446">
                <span style="display:inline-block;  " class="line" :style="{'color':taskinfo.taskState == '执行中'?'#49cc7b':(taskinfo.taskState == '已办结'?'#faa646':(taskinfo.taskState == '已终止'?'':'')),}">{{taskinfo.taskState}}</span>
              </td>
            </tr>

            <tr>
              <td width="173" height="26" align="right" class="txt1"> 任务编号&nbsp;</td>
              <td width="315">
                <span style="display:inline-block;  overflow:hidden;" class="line">{{taskinfo.taskNum}}</span>
              </td>
              <td height="26" width="173" align="right" class="txt1">督办来源&nbsp;</td>
              <td width="446">
                <span style="display:inline-block;  " class="line">{{taskinfo.sourceName}}</span>
              </td>
            </tr>
            <tr>
              <td width="15%" height="24" align="right" class="txt1"> 原 编 号&nbsp;</td>
              <td width="35%"><span style="display:inline-block;  " class="line">{{taskinfo.oldTaskNum}}</span></td>
              <td width="15%" height="24" align="right" class="txt1">工单类型&nbsp;</td>
              <td width="35%"><span style="display:inline-block;  " class="line">{{taskinfo.taskType}}</span></td>
            </tr>
            <tr>
              <td height="26" align="right" class="txt1">责任部门&nbsp;</td>
              <td>
                <span style="display:inline-block;  " class="line">{{taskinfo.responsibleDeptNames}}</span></td>
              <td height="26" align="right" class="txt1">责 任 人&nbsp;</td>
              <td>
                <span style="display:inline-block;  " class="line">{{taskinfo.responsibleUserNames}}</span></td>
            </tr>
            <tr>
              <td height="26" align="right" class="txt1">协办部门&nbsp;</td>
              <td><span style="display:inline-block;  " class="line">{{taskinfo.assistDeptNames}}</span></td>

              <td align="right" class="txt1">协 办 人&nbsp;</td>
              <td><span style="display:inline-block;  " class="line">{{taskinfo.assistUserNames}}</span></td>
            </tr>
            <tr>
              <td align="right" class="txt1">来源说明&nbsp;</td>
              <td style="height:26px">
                <span style="display:inline-block;  " class="line">{{taskinfo.sourceDesc}}</span>
              </td>
              <td align="right" class="txt1">分管领导</td>
              <td><span style="display:inline-block;  " class="line">{{taskinfo.leaderUserNames}}</span></td>
            </tr>
            <tr>
              <td height="26" align="right" class="txt1">开始时间&nbsp;</td>
              <td><span style="display:inline-block;  " class="line">{{taskinfo.beginDate}}</span></td>
              <td align="right" class="txt1">结束时间&nbsp;</td>
              <td><span style="display:inline-block;  " class="line">{{taskinfo.endDate}}</span></td>
            </tr>
            <tr>
              <td height="26" align="right" class="txt1">重要程度&nbsp;</td>
              <td><span style="display:inline-block;  " class="line">{{taskinfo.important}}</span></td>
              <td align="right" class="txt1">主 办 人</td>
              <td><span style="display:inline-block;  " class="line">{{taskinfo.sponsorUserName}}</span></td>
            </tr>

            <tr>
              <td height="26" align="right" class="txt1">工作计划&nbsp;</td>
              <td colspan="3"><span style="display:inline-block;  " class="line long1"><span>{{taskinfo.planDesc}}</span></span></td>
            </tr>
            <tr>
              <td height="26" align="right" class="txt1">督办事宜&nbsp;</td>
              <td colspan="3"><span style="display:inline-block;  " class="line long1">{{taskinfo.taskDesc}}</span>
              </td>
            </tr>
          </tbody>
        </table> -->
        <div class="messageBox">
          <!-- <div class="message_short" style="margin-left: 8%">
            <span class="message-name">任务名称&nbsp;</span>
            <span class="message-data">{{taskinfo.taskName}}</span>
          </div> -->
          <div class="message_long" style="margin-left: 8%">
            <span class="message-name">任务名称：</span>
            <span class="message-data">{{taskinfo.taskName}}</span>
          </div>

          <div class="message_short" style="margin-left: 8%">
            <span class="message-name">任务状态：</span>
            <span class="message-data" :style="{'color':taskinfo.taskState == '执行中'?'#49cc7b':(taskinfo.taskState == '已办结'?'#faa646':(taskinfo.taskState == '已终止'?'':'')),}">{{taskinfo.taskState}}</span>
          </div>
          <div class="message_short">
            <span class="message-name">流程状态：</span>
            <!-- <span class="message-data" :style="{'color':taskinfo.processState == '执行中'?'#49cc7b':(taskinfo.processState == '已办结'?'#faa646':(taskinfo.processState == '已终止'?'':'')),}">{{taskinfo.processState}}</span> -->
            <span class="message-data" v-if="taskinfo.processState == '无'">{{taskinfo.processState}}</span>
            <span class="message-data" style="color: red" v-else>{{taskinfo.processState}}</span>
          </div>
          <div class="message_short">
            <span class="message-name">任务编号：</span>
            <span class="message-data">{{taskinfo.taskNum}}</span>
          </div>
          <div class="message_short" style="margin-left: 8%">
            <span class="message-name">重要程度：</span>
            <span class="message-data">{{taskinfo.important}}</span>
          </div>

          <div class="message_short">
            <span class="message-name">督办来源：</span>
            <span class="message-data">{{taskinfo.sourceName}}</span>
          </div>
          <div class="message_short">
            <span class="message-name">主 办 人：</span>
            <span class="message-data">{{taskinfo.sponsorUserName}}</span>
          </div>

          <div class="message_short" style="margin-left: 8%">
            <span class="message-name">工单类型：</span>
            <span class="message-data">{{taskinfo.taskType}}</span>
          </div>

          <div class="message_short">
            <span class="message-name">责任部门：</span>
            <span class="message-data">{{taskinfo.responsibleDeptNames}}</span>
          </div>
          <div class="message_short">
            <span class="message-name"> 责 任 人：</span>
            <span class="message-data">{{taskinfo.responsibleUserNames}}</span>
          </div>
          <div class="message_short" style="margin-left: 8%">
            <span class="message-name">分管领导：</span>
            <span class="message-data">{{taskinfo.leaderUserNames}}</span>
          </div>

          <div class="message_short">
            <span class="message-name">协办部门：</span>
            <span class="message-data">{{taskinfo.assistDeptNames}}</span>
          </div>
          <div class="message_short">
            <span class="message-name"> 协 办 人：</span>
            <span class="message-data">{{taskinfo.assistUserNames}}</span>
          </div>

          <div class="message_short" style="margin-left: 8%">
            <span class="message-name"> 原 编 号：</span>
            <span class="message-data">{{taskinfo.oldTaskNum}}</span>
          </div>

          <div class="message_short" v-if="JTShow">
            <span class="message-name">填报单位：</span>
            <span class="message-data">{{taskinfo.fillCompany}}</span>
          </div>
          <div class="message_short" v-if="JTShow">
            <span class="message-name"> 制 表 人：</span>
            <span class="message-data">{{taskinfo.tabulation}}</span>
          </div>
          <div class="message_short" v-if="JTShow" style="margin-left: 8%">
            <span class="message-name">集团督办编号：</span>
            <span class="message-data">{{taskinfo.groupTaskNum}}</span>
          </div>

          <div class="message_short">
            <span class="message-name">开始时间：</span>
            <span class="message-data">{{taskinfo.beginDate}}</span>
          </div>
          <div class="message_short">
            <span class="message-name">结束时间：</span>
            <span class="message-data">{{taskinfo.endDate}}</span>
          </div>

          <div class="message_short" style="margin-left: 8%" v-if="JTShow">
            <span class="message-name">督办人员填写时间：</span>
            <span class="message-data">{{taskinfo.fillDate1}}</span>
          </div>
          <div class="message_short" v-if="JTShow">
            <span class="message-name">负责人填写时间：</span>
            <span class="message-data">{{taskinfo.fillDate2}}</span>
          </div>

          <div class="message_long" style="margin-left: 8%" v-if="JTShow">
            <span class="message-name">督办人员立项符合意见：</span>
            <span class="message-data">{{taskinfo.proCompositeOpinion1}}</span>
          </div>

          <div class="message_long" style="margin-left: 8%" v-if="JTShow">
            <span class="message-name">负责人立项复合意见：</span>
            <span class="message-data">{{taskinfo.proCompositeOpinion2}}</span>
          </div>

          <div class="message_long" style="margin-left: 8%">
            <span class="message-name">来源说明：</span>
            <span class="message-data">{{taskinfo.sourceDesc}}</span>
          </div>

          <div class="message_long" style="margin-left: 8%">
            <span class="message-name">工作计划：</span>
            <span class="message-data">{{taskinfo.planDesc}}</span>
          </div>
          <div class="message_long" style="margin-left: 8%">
            <span class="message-name">督办事宜：</span>
            <span class="message-data">{{taskinfo.taskDesc}}</span>
          </div>

          <div class="message_long_upload" style="margin-left: 8%;margin-bottom: .15rem">
            <div class="message-name"><span style="float: left;">附件：</span></div>
            <div class="message-data">
              <div v-for="item in fujianData" :key='item.id'>
                <span>{{item.name}}</span>
                <el-button size="mini" type="text" class="download-btn" style="background: none;border: none;" @click="downLoadPdf(item,'下载')">下载</el-button>
                <el-button size="mini" type="text" class="delete-btn" style="background: none;border: none;" @click="downLoadPdf(item,'预览')">预览</el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- <el-table :data="fujianData" style="width: 100%;">
          <el-table-column label="附件" prop="name"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="downLoadPdf(scope.row,'预览')">预览</el-button>
              <el-button size="mini" type="text" @click="downLoadPdf(scope.row,'下载')">下载</el-button>
            </template>
          </el-table-column>
        </el-table> -->
      </el-tab-pane>
      <el-tab-pane label="任务下达" name="second" v-model="tableData1">
        <div class="shenpi">
          <div class="table-Box">
            <el-table v-loading="loading" stripe element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="tableData1" height="91%" style="width: 100%;">
              <!-- <el-table-column type="index" :index="meterIndexMethod1" label="NO." width="55"></el-table-column> -->
              <el-table-column prop="endTime" label="审批时间" width="180"> </el-table-column>
              <el-table-column prop="taskName" label="审批节点" width="140"> </el-table-column>
              <el-table-column prop="approver" label="审批人" width="90"> </el-table-column>
              <el-table-column prop="action" label="审批操作" width="100"> </el-table-column>
              <el-table-column prop="comments" label="审批意见"> </el-table-column>
              <!-- <el-table-column prop="fileTitle" label="附件" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="handle" :key="tem.id" v-for="tem in scope.row.attachments" size="mini" type="success" @click="handleDownload(tem)">
                    <font color="#409EFF">{{tem.name}}</font>
                  </span><br />
                </template>
              </el-table-column> -->
              <el-table-column prop="fileTitle" label="附件" width="300" :show-overflow-tooltip="false">
                <template slot-scope="scope">
                  <el-table center v-if="scope.row.attachments.length > 0" :data="scope.row.attachments" :show-header="false" style="width: 100%;">
                    <el-table-column prop="name" label="附件名" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="taskName" label="操作" width="110">
                      <template slot-scope="scope">
                        <el-button @click="handlePreview(scope.row)" type="text" size="mini" style="fontSize:16px;">预览</el-button>
                        <el-button @click="handleDownload(scope.row)" type="text" size="mini" style="fontSize:16px;">下载</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="130">
                <template slot-scope="scope">
                  <el-button @click="getChild(scope.row, tableData1, 1)" :processid="scope.row.taskId" v-if="scope.row.type == 1" type="text" size="mini" style="font-size:16px;">展开</el-button>
                  <el-button @click="handleClick(scope.row)" v-if="scope.row.type == 1" type="text" size="mini" style="font-size:16px;">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block" style="margin-top:0.1rem;">
              <el-pagination @current-change="handleCurrentChange1" :current-page="page1" :page-sizes="[20]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="sum1">
              </el-pagination>
            </div>
          </div>
          <div class="dialog">

          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="任务变更" name="third" v-model='tableData2'>
        <el-button v-if="BtnShow" type="primary" size="mini" @click="goTaskChange" class="searchBox">任务变更</el-button>
        <div class="shenpi">
          <div class="table-Box">
            <el-table class="table_two" loading="loading" stripe element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="tableData2" height="81%" style="width: 100%;">
              <!-- <el-table-column type="index" :index="meterIndexMethod2" label="NO." width="55"></el-table-column> -->
              <el-table-column prop="endTime" label="审批时间" width="180"> </el-table-column>
              <el-table-column prop="taskName" label="审批节点" width="100"> </el-table-column>
              <el-table-column prop="approver" label="审批人" width="80"> </el-table-column>
              <el-table-column prop="action" label="审批操作" width="90"> </el-table-column>
              <el-table-column prop="comments" label="审批意见" width="320"> </el-table-column>
              <!-- <el-table-column prop="fileTitle" label="附件" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="handle" :key="tem.id" v-for="tem in scope.row.attachments" size="mini" type="success" @click="handleDownload(tem)">
                    <font color="#409EFF">{{tem.name}}</font><br />
                  </span>
                </template>
              </el-table-column> -->
              <el-table-column prop="fileTitle" label="附件" width="300" :show-overflow-tooltip="false">
                <template slot-scope="scope">
                  <el-table center v-if="scope.row.attachments.length > 0" :data="scope.row.attachments" :show-header="false" style="width: 100%;">
                    <el-table-column prop="name" label="附件名" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="taskName" label="操作" width="110">
                      <template slot-scope="scope">
                        <el-button @click="handlePreview(scope.row)" type="text" size="mini" style="fontSize:16px;">预览</el-button>
                        <el-button @click="handleDownload(scope.row)" type="text" size="mini" style="fontSize:16px;">下载</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="110">
                <template slot-scope="scope">
                  <el-button @click="getChild(scope.row, tableData2, 2)" :processid="scope.row.taskId" v-if="scope.row.type == 1" type="text" size="mini" style="font-size:16px;">展开</el-button>
                  <el-button @click="handleClick(scope.row)" v-if="scope.row.type == 1" type="text" size="mini" style="font-size:16px;">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block" style="margin-top:0.1rem;">
              <el-pagination @current-change="handleCurrentChange2" :current-page="page2" :page-sizes="[20]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="sum2">
              </el-pagination>
            </div>
          </div>
          <div class="dialog">

          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="任务办结" name="four" v-model='tableData3'>
        <el-button v-if="BtnShow" type="primary" size="mini" @click="goTaskJieXiang" class="searchBox">任务办结</el-button>
        <div class="shenpi">
          <div class="table-Box">
            <el-table class="table_two" v-loading="loading" stripe element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="tableData3" height="81%" style="width: 100%;">
              <!-- <el-table-column type="index" :index="meterIndexMethod3" label="NO." width="55"></el-table-column> -->
              <el-table-column prop="endTime" label="审批时间" width="180"> </el-table-column>
              <el-table-column prop="taskName" label="审批节点" width="90"> </el-table-column>
              <el-table-column prop="approver" label="审批人" width="70"> </el-table-column>
              <el-table-column prop="action" label="审批操作" width="90"> </el-table-column>
              <el-table-column prop="comments" label="审批意见" width="340"> </el-table-column>
              <!-- <el-table-column prop="fileTitle" label="附件" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="handle" :key="tem.id" v-for="tem in scope.row.attachments" size="mini" type="success" @click="handleDownload(tem)">
                    <font color="#409EFF">{{tem.name}}</font><br />
                  </span>
                </template>
              </el-table-column> -->
              <el-table-column prop="fileTitle" label="附件" width="300" :show-overflow-tooltip="false">
                <template slot-scope="scope">
                  <el-table center v-if="scope.row.attachments.length > 0" :data="scope.row.attachments" :show-header="false" style="width: 100%;">
                    <el-table-column prop="name" label="附件名" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="taskName" label="操作" width="110">
                      <template slot-scope="scope">
                        <el-button @click="handlePreview(scope.row)" type="text" size="mini" style="fontSize:16px;">预览</el-button>
                        <el-button @click="handleDownload(scope.row)" type="text" size="mini" style="fontSize:16px;">下载</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="110">
                <template slot-scope="scope">
                  <el-button @click="getChild(scope.row, tableData3, 3)" :processid="scope.row.taskId" v-if="scope.row.type == 1" type="text" size="mini" style="font-size:16px;">展开</el-button>
                  <el-button @click="handleClick(scope.row)" v-if="scope.row.type == 1" type="text" size="mini" style="font-size:16px;">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block" style="margin-top:0.1rem;">
              <el-pagination @current-change="handleCurrentChange3" :current-page="page3" :page-sizes="[20]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="sum3">
              </el-pagination>
            </div>
          </div>
          <div class="dialog">

          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="汇报审批" name="eight" v-model='tableData6'>
        <el-button v-if="BtnShow" type="primary" size="mini" @click="goTaskReport" class="searchBox">任务汇报</el-button>
        <div class="shenpi">
          <div class="table-Box">
            <el-table class="table_two" v-loading="loading" stripe element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="tableData6" height="81%" style="width: 100%;">
              <!-- <el-table-column type="index" :index="meterIndexMethod6" label="NO." width="55"></el-table-column> -->
              <el-table-column prop="endTime" label="审批时间" width="180"> </el-table-column>
              <el-table-column prop="taskName" label="审批节点" width="90"> </el-table-column>
              <el-table-column prop="approver" label="审批人" width="70"> </el-table-column>
              <el-table-column prop="action" label="审批操作" width="100"> </el-table-column>
              <el-table-column prop="comments" label="审批意见" width="300"> </el-table-column>
              <!-- <el-table-column prop="fileTitle" label="附件" :show-overflow-tooltip="false">
                <template slot-scope="scope">
                  <el-table center stripe :data="scope.row.attachments" :show-header="false" style="width: 100%;">
                    <template slot-scope="scope">
                      <span class="handle" size="mini" type="success" @click="handleDownload(scope)">
                        <font color="#409EFF">
                          <el-table-column prop="name" label="附件名" show-overflow-tooltip>
                          </el-table-column>
                        </font>
                      </span>
                    </template>
                  </el-table>
                </template>
              </el-table-column> -->

              <!-- <el-table-column prop="fileTitle" label="附件" show-overflow-tooltip>
                  <template slot-scope="scope">

                    <span class="handle" :key="tem.id" v-for="tem in scope.row.attachments" size="mini" type="success" @click="handleDownload(tem)">
                      <font color="#409EFF">{{tem.name}}</font><br/>
                    </span>

                  </template>
              </el-table-column> -->
              <el-table-column prop="fileTitle" label="附件" width="300" :show-overflow-tooltip="false">
                <template slot-scope="scope">
                  <el-table center v-if="scope.row.attachments.length > 0" :data="scope.row.attachments" :show-header="false" style="width: 100%;">
                    <el-table-column prop="name" label="附件名" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="taskName" label="操作" width="110">
                      <template slot-scope="scope">
                        <el-button @click="handlePreview(scope.row)" type="text" size="mini" style="font-size:16px;">预览</el-button>
                        <el-button @click="handleDownload(scope.row)" type="text" size="mini" style="font-size:16px;">下载</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="130">
                <template slot-scope="scope">
                  <el-button @click="getChild(scope.row, tableData6, 6)" :processid="scope.row.taskId" v-if="scope.row.type == 1" type="text" size="mini" style="font-size:16px;">展开</el-button>
                  <el-button @click="handleClick(scope.row)" v-if="scope.row.type == 1" type="text" size="mini" style="font-size:16px;">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block" style="margin-top:0.1rem;">
              <el-pagination @current-change="handleCurrentChange6" :current-page="page6" :page-sizes="[20]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="sum6">
              </el-pagination>
            </div>
          </div>
          <div class="dialog">

          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="汇报详情" name="five" v-model='tableData4'>
        <div class="shenpi">
          <div class="table-Box">
            <el-table :data="tableData4" class="table_six" v-loading="loading" height="91%" style="width: 100%;" align="right">
              <el-table-column prop="monthId" label="汇报时间" width="90"></el-table-column>
              <el-table-column prop="reportUser" label="汇报人" width="90"></el-table-column>
              <el-table-column prop="reportInfo" label="汇报内容">
                <template slot-scope="scope">
                  <span id="reportInfo" v-html="scope.row.reportInfoMark"></span>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="reportInfoMark" label="内容详情" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="getTitleContent(scope.row)" :textChange="scope.row.id">显示</el-button>
                </template>
              </el-table-column> -->
              <el-table-column prop="progress" label="进度" width="120"> </el-table-column>
              <el-table-column prop="fileTitle" label="附件" width="250" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-table center v-if="scope.row.attachments.length > 0" :data="scope.row.attachments" :show-header="false" style="width: 100%;">
                    <el-table-column prop="name" label="附件名" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="taskName" label="操作" width="110" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <el-button @click="handlePreview(scope.row)" type="text" size="mini" style="font-size:16px;">预览</el-button>
                        <el-button @click="handleDownload(scope.row)" type="text" size="mini" style="font-size:16px;">下载</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
            </el-table>
            <div class="block" style="margin-top:0.1rem;">
              <el-pagination @current-change="handleCurrentChange4" :current-page="page4" :page-sizes="[20]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="sum4">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="催办记录" name="six" v-model='tableData5'>
        <div class="shenpi">
          <div class="table-Box">
            <el-table class="table_seven" :data="tableData5" stripe v-loading="loading" style="width: 100%; height:91%;overflow: auto;" align="right">
              <el-table-column label="NO." type="index" :index="meterIndexMethod5" width="55"> </el-table-column>
              <!-- <el-table-column prop="taskNum" label="督办编号" show-overflow-tooltip> </el-table-column> -->
              <el-table-column prop="remindRole" label="提醒对象" width="90"> </el-table-column>
              <el-table-column prop="remindWay" label="提醒方式" width="90"> </el-table-column>
              <el-table-column prop="remindInfo" label="提醒事宜"> </el-table-column>
              <el-table-column prop="createName" label="发送人" width="90"></el-table-column>
              <el-table-column prop="sendTime" label="发送时间" width="180"></el-table-column>
              <el-table-column prop="mobile" label="手机号码" width="130"> </el-table-column>
              <el-table-column prop="email" label="邮件" width="200"> </el-table-column>
              <el-table-column prop="receiveUser" label="接收人" width="80"></el-table-column>
            </el-table>
            <div class="block" style="margin-top:0.1rem;">
              <el-pagination @current-change="handleCurrentChange5" :current-page="page5" :page-sizes="[20]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="sum5">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="任务评价" name="seven">
        <div>暂无数据</div>
      </el-tab-pane>
    </el-tabs>

    <div class="rewApproval">
      <el-dialog :close-on-click-modal="false" :visible.sync="approvalShow" :title="dialogTitle">
        <approval :approvalNeedData="approvalNeedData" v-if="approvalShow"></approval>
        <!-- <div slot="footer" style="text-align:center;" class="dialog-footer" >
          <el-button type="primary" @click="approvalShow = false" style="" size="mini">返回</el-button>
        </div> -->
      </el-dialog>
    </div>
    <el-dialog :close-on-click-modal="false" :visible.sync="reportApprovalShow" :title="dialogTitle">
      <reportApproval :reportApprovalNeedData="reportApprovalNeedData" v-if="reportApprovalShow"></reportApproval>
      <!-- <span slot="footer" class="dialog-footer">
        <div class="sub" style="text-align:center;">
          <el-button type="primary" @click="reportApprovalShow = false" size="mini">返回</el-button>
        </div>
      </span> -->
    </el-dialog>
    <span class="taskChangeBox">
      <el-dialog :close-on-click-modal="false" :visible.sync="taskChangeShow" title="任务变更">
        <taskChange ref="taskChange" v-if="taskChangeShow" :taskChangeNeedData='taskChangeNeedData'></taskChange>
        <span slot="footer" class="dialog-footer">
          <div class="sub" style="text-align:center;">
            <el-button type="primary" @click="taskChangeShowUpload" style="margin:5px;font-size:0.15rem;width:1.1rem;height: 0.4rem;background:#297ACC;color:white" size="mini">上传附件</el-button>
            <el-button type="primary" @click="taskChangeDoSave" style="margin:5px;font-size:0.15rem;width:0.9rem;height: 0.4rem;background:#297ACC;color:white" size="mini">提交</el-button>
            <el-button type="primary" @click="taskChangeShow = false" style="margin:5px;font-size:0.15rem;width:0.9rem;height: 0.4rem" size="mini">关闭</el-button>
          </div>
        </span>
      </el-dialog>
    </span>
    <span id="taskJieXiangBox">
      <el-dialog :close-on-click-modal="false" :visible.sync="taskJieXiangShow" title="办结申请">
        <taskJieXiang ref="taskJieXiang" v-if="taskJieXiangShow" :taskJieXiangNeedData='taskJieXiangNeedData'></taskJieXiang>
        <span slot="footer" class="dialog-footer">
          <div class="sub" style="text-align:center;">
            <el-button type="primary" @click="taskJieXiangShowUpload" style="margin:5px;font-size:0.18rem;width:1.1rem;height: 0.4rem;background:#297ACC;color:white" size="mini">上传附件</el-button>
            <el-button type="primary" @click="taskJieXiangDoSave" style="margin:5px;font-size:0.18rem;width:0.9rem;height: 0.4rem;background:#297ACC;color:white" size="mini">提交</el-button>
            <el-button type="primary" @click="taskJieXiangShow = false" style="margin:5px;font-size:0.18rem;width:0.9rem;height: 0.4rem" size="mini">关闭</el-button>
          </div>
        </span>
      </el-dialog>
    </span>
    <span class="taskReportBox">
      <el-dialog :close-on-click-modal="false" :visible.sync="taskReportShow" title="任务汇报">
        <taskreport v-if="taskReportShow" :taskReportNeedData='taskReportNeedData'></taskreport>
      </el-dialog>
    </span>
    <div>
      <el-dialog class="svgdia_box" :close-on-click-modal="false" :visible.sync="addContent" title="审批流程图">
        <div class="svgmap"></div>
        <span slot="footer" class="dialog-footer">
          <div class="sub" style="text-align:center;">
            <el-button type="primary" @click="addContent = false" style="margin:5px;font-size:0.16rem;width:0.8rem;height: 0.4rem;" size="mini">关闭</el-button>
          </div>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import approval from './approval';
import reportApproval from './reportApproval'
import taskreport from './taskreport'
import taskChange from './taskChange'
import taskJieXiang from './taskJieXiang'
export default {
  components: {
    approval,
    reportApproval,
    taskreport,
    taskChange,
    taskJieXiang
  },
  props: ['alltaskinfoId'],
  data() {
    return {
      tableData: [{
        name: '王小虎',
      }, {
        name: '王小虎',
      },],
      selectShow: "",
      urlParams: {
        id: ''
      },
      fujianData: [], //任务详情附件数据
      approvalShow: false,
      reportApprovalShow: false,
      approvalNeedData: {},
      reportApprovalNeedData: {},
      currentPage: 0,
      loading: true,
      loadDowm: [],
      activeName: 'first',
      tableData: [],
      total: 0,
      taskinfo: {},//任务详情
      page: 1,
      pageCount: 20,
      value: '',
      tableData1: [],//任务下达
      sum1: 0,
      pageCount1: 20,
      page1: 1,
      tableData2: [],//任务变更
      sum2: 0,
      pageCount2: 20,
      page2: 1,
      tableData3: [],//任务办结
      sum3: 0,
      pageCount3: 20,
      page3: 1,
      tableData6: [],//汇报审批
      sum6: 0,
      pageCount6: 20,
      page6: 1,
      tableData4: [],//汇报详情
      sum4: 0,
      pageCount4: 20,
      page4: 1,
      tableData5: [],//催办记录
      sum5: 0,
      pageCount5: 20,
      page5: 1,

      // 任务下达、变更、办结的审批详情表头
      dialogTitle: '审批详情',
      ruleForm: {
        responsibleDeptIds: '',
      },
      ascriptionData: [],
      ascriptionTaskId: '',
      titleContentShow: false,
      titleContentText: '',
      //上一个汇报内容的id
      beforeId: '',
      JTShow: false,

      taskChangeShow: false,
      taskChangeNeedData: {},
      taskJieXiangShow: false,
      taskJieXiangNeedData: {},
      taskReportShow: false,
      taskReportNeedData: {},

      BtnShow: false,
      // tableHeight: '',
      tableDataCopy: [],
      btnClick: false,
      addContent: false,
    }
  },
  mounted() {
    var that = this;
    // if (window.location.href.indexOf('index') > -1) {
    //   $('.el-tabs').css('height', '100%');
    // }
    // this.urlParams.id = this.$common.getQueryString('id');
    this.urlParams.id = this.alltaskinfoId;
    this.getAscription(this.urlParams.id);

    this.getPdf(this.urlParams.id);
    // taskreport的返回按钮
    eventBus.$on('taskReportClose', (params) => {
      that.taskReportShow = false;
    });
    // taskChange的返回按钮
    eventBus.$on('taskChangeClose', (params) => {
      that.taskChangeShow = false;
    });
    // taskJieXiang的返回按钮
    eventBus.$on('taskJieXiangClose', (params) => {
      that.taskJieXiangShow = false;
    });

  },

  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // if (rowIndex % 2 === 0) {
      //   if (columnIndex === 0) {
      //     return [1, 2];
      //   } else if (columnIndex === 1) {
      //     return [0, 0];
      //   }
      // }
    },
    // 获取用户信息
    userinfo() {
      var that = this;
      this.$common.commitParam(this, "/supervise/sys/userinfo.api", {}, {
        success: function (res) {
          if (that.taskinfo.sponsorUserName == res.data.name) {
            that.BtnShow = true;
            // that.tableHeight = '81%';
          } else {
            // that.tableHeight = '91%';
          }
        }
      }, "get");
    },
    goTaskChange() {
      var that = this;
      var id = that.alltaskinfoId;
      that.taskChangeNeedData.id = that.alltaskinfoId;
      this.open(id, '#/taskChange?id=' + id, '任务变更', 'bg');
    },
    // 展开按钮
    getChild(row, tableName, tableNum) {
      var that = this;

      if ($("[processid=" + row.taskId + "]").find('span').html().indexOf('展开') > -1) {
        this.$common.commitParam(this, "/supervise/workflow/comment.api", { 'processInstanceId': row.processId, 'taskId': row.taskId },
          {
            success: function (res) {
              var startArr = [];
              var endArr = [];
              if (res.data.length == 0) {
                that.$message({ message: '该数据只有当前一条记录！', type: 'warning' });
                return
              }

              for (let i = 0; i < tableName.length; i++) {
                if (tableName[i].processId == res.data[0].processId) {
                  startArr = tableName.slice(0, i + 1);
                  endArr = tableName.slice(i + 1);
                  break;
                }
              }
              for (let j = 0; j < res.data.length; j++) {
                startArr.push(res.data[j]);
              }
              for (let k = 0; k < endArr.length; k++) {
                startArr.push(endArr[k])
              }
              if (tableNum == 1) {
                that.tableData1 = startArr;
                for (let i = 0; i < that.tableData1.length; i++) {
                  for (let j = 0; j < that.tableData1.length; j++) {
                    if (that.tableData1[i].processId == that.tableData1[j].processId && that.tableData1[i].taskId != that.tableData1[j].taskId) {

                      setTimeout(() => {
                        $("[processid=" + that.tableData1[i].taskId + "]").find('span').html('收起');
                      }, 0);
                    }

                  }

                }
              } else if (tableNum == 2) {
                that.tableData2 = startArr;
                for (let i = 0; i < that.tableData2.length; i++) {
                  for (let j = 0; j < that.tableData2.length; j++) {
                    if (that.tableData2[i].processId == that.tableData2[j].processId && that.tableData2[i].taskId != that.tableData2[j].taskId) {

                      setTimeout(() => {
                        $("[processid=" + that.tableData2[i].taskId + "]").find('span').html('收起');
                      }, 0);
                    }

                  }

                }
              } else if (tableNum == 3) {
                that.tableData3 = startArr;
                for (let i = 0; i < that.tableData3.length; i++) {
                  for (let j = 0; j < that.tableData3.length; j++) {
                    if (that.tableData3[i].processId == that.tableData3[j].processId && that.tableData3[i].taskId != that.tableData3[j].taskId) {

                      setTimeout(() => {
                        $("[processid=" + that.tableData3[i].taskId + "]").find('span').html('收起');
                      }, 0);
                    }

                  }

                }
              } else if (tableNum == 6) {
                that.tableData6 = startArr;
                for (let i = 0; i < that.tableData6.length; i++) {
                  for (let j = 0; j < that.tableData6.length; j++) {
                    if (that.tableData6[i].processId == that.tableData6[j].processId && that.tableData6[i].taskId != that.tableData6[j].taskId) {

                      setTimeout(() => {
                        $("[processid=" + that.tableData6[i].taskId + "]").find('span').html('收起');
                      }, 0);
                    }

                  }

                }
              }


              // $("[processid=" + row.taskId + "]").find('span').html('收起');

            }
          }, "get");
      } else {
        this.$common.commitParam(this, "/supervise/workflow/comment.api", { 'processInstanceId': row.processId, 'taskId': row.taskId },
          {
            success: function (res) {

              for (let i = 0; i < res.data.length; i++) {
                for (let j = 0; j < tableName.length; j++) {
                  if (res.data[i].taskId == tableName[j].taskId) {
                    tableName.splice(j, 1);
                    j--;
                  }
                }
              }

              $("[processid=" + row.taskId + "]").find('span').html('展开');

              if (tableNum == 1) {
                that.tableData1 = tableName;
                for (let i = 0; i < that.tableData1.length; i++) {
                  for (let j = 0; j < that.tableData1.length; j++) {
                    if (that.tableData1[i].processId == that.tableData1[j].processId && that.tableData1[i].taskId != that.tableData1[j].taskId) {

                      setTimeout(() => {
                        $("[processid=" + that.tableData1[i].taskId + "]").find('span').html('收起');
                      }, 0);
                    }

                  }

                }
              } else if (tableNum == 2) {
                that.tableData2 = tableName;
                for (let i = 0; i < that.tableData2.length; i++) {
                  for (let j = 0; j < that.tableData2.length; j++) {
                    if (that.tableData2[i].processId == that.tableData2[j].processId && that.tableData2[i].taskId != that.tableData2[j].taskId) {

                      setTimeout(() => {
                        $("[processid=" + that.tableData2[i].taskId + "]").find('span').html('收起');
                      }, 0);
                    }

                  }

                }
              } else if (tableNum == 3) {
                that.tableData3 = tableName;
                for (let i = 0; i < that.tableData3.length; i++) {
                  for (let j = 0; j < that.tableData3.length; j++) {
                    if (that.tableData3[i].processId == that.tableData3[j].processId && that.tableData3[i].taskId != that.tableData3[j].taskId) {

                      setTimeout(() => {
                        $("[processid=" + that.tableData3[i].taskId + "]").find('span').html('收起');
                      }, 0);
                    }

                  }

                }
              } else if (tableNum == 6) {
                that.tableData6 = tableName;
                for (let i = 0; i < that.tableData6.length; i++) {
                  for (let j = 0; j < that.tableData6.length; j++) {
                    if (that.tableData6[i].processId == that.tableData6[j].processId && that.tableData6[i].taskId != that.tableData6[j].taskId) {

                      setTimeout(() => {
                        $("[processid=" + that.tableData6[i].taskId + "]").find('span').html('收起');
                      }, 0);
                    }

                  }

                }
              }



            }
          }, "get");
      }


    },
    // 详情
    handleClick(row) {
      var that = this;
      var taskId = row.taskId;

      var processKey = row.processKey;
      this.$common.commitParam(this, "/supervise/workflow/approvalinfo.api", { "taskId": taskId, 'processKey': processKey }, {
        success: function (res) {
          if (res.data == '') {
            that.$message({ message: '该流程已结束！', type: 'warning' });
            return
          }
          that.addContent = true;
          setTimeout(() => {
            console.log(res.data);
            $('.svgmap').html(res.data);
            $(".approval-content > ._showbutton").click();
            $('._showbutton').remove();
            $('.approval-list>.row:first-child').find('.approval-history').css('display', 'none');


            // for (let i = 0; i < 4; i++) {
            //   $('.approval-list').find('.row').eq(i).remove();

            // }
            // $('.approval-table').remove();
            // $('.reject-box').remove();
            // $('.communication-box').remove();
            // $('.approval-list').find('div').eq(0).remove();
            // $('.approval-list').find('[class=row]').remove();
            // $('.approval-list').find('form').remove();
            // $('.footerBtn').remove();


            
            $("#workflowsvg").click();
            // $(".flow-Chart").remove();
          }, 0);



        }
      }, "get");
      // },
    },
    // 任务变更上传附件方法
    taskChangeShowUpload() {
      this.$refs.taskChange.showUpload();
    },
    // 任务变更提交方法
    taskChangeDoSave() {
      this.$refs.taskChange.doSave();
    },
    goTaskJieXiang() {
      var that = this;
      var id = that.alltaskinfoId;
      that.taskJieXiangNeedData.id = that.alltaskinfoId;
      this.open(id, '#/taskJieXiang?id=' + id, '办结申请', 'jx');
    },
    // 办结申请上传附件方法
    taskJieXiangShowUpload() {
      this.$refs.taskJieXiang.showUpload();
    },
    // 办结申请提交方法
    taskJieXiangDoSave() {
      this.$refs.taskJieXiang.doSave();
    },
    goTaskReport() {
      var that = this;
      var id = that.alltaskinfoId;
      that.taskReportNeedData.id = that.alltaskinfoId;
      that.taskReportNeedData.supervisionTaskId = that.alltaskinfoId;
      this.open(id, '#/taskreport?supervisionTaskId=' + id, '任务汇报', 'report');
    },

    open(id, url, title, oprationType) {
      var that = this;
      this.$common.commitParam(this, "/supervise/mytaskinfo/judge.api", { 'id': id, 'oprationType': oprationType },
        {
          success: function (res) {
            if (res.code == 0) {
              if (url.indexOf('taskreport') > -1) {
                that.taskReportShow = true;
              } else if (url.indexOf('taskChange') > -1) {
                that.taskChangeShow = true;
              } else if (url.indexOf('taskJieXiang') > -1) {
                that.taskJieXiangShow = true;
              }
            } else {
              that.$message({ message: res.description, type: 'warning' });
            }
          }
        }, "get");
    },

    getPdf(businessId) {
      var that = this;

      // businessId= 17508
      this.$common.commitParam(this, "/supervise/attachment/list.ap", { "businessId": businessId }, {
        success: function (res) {

          that.fujianData = res.data;
        }
      }, "get");
    },

    //下载预览附件
    downLoadPdf(item, type) {
      var url;
      if (type === '下载') {
        url = item.url
      } else {
        if (item.pdfUrl !== '') {
          url = item.pdfUrl;

        } else {
          let imgList = ['jpg', 'JPG', 'gif', 'GIF', 'png', 'PNG']
          for (let i = 0; i < imgList.length; i++) {
            if (item.name.indexOf(imgList[i]) > -1) {
              var isPreview = true;
            }

          }
          if (isPreview) {
            url = item.url;
          } else {
            this.$message({
              type: 'error',
              message: '该附件不支持预览'
            });
            return
          }

        }
      }

      window.open(url)
    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod1(index) {
      return (this.page1 - 1) * this.pageCount1 + (index + 1);
    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod2(index) {
      return (this.page2 - 1) * this.pageCount2 + (index + 1);
    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod3(index) {
      return (this.page3 - 1) * this.pageCount3 + (index + 1);
    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod4(index) {
      return (this.page4 - 1) * this.pageCount4 + (index + 1);
    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod5(index) {
      return (this.page5 - 1) * this.pageCount5 + (index + 1);
    },
    // 序号功能-保证在跳转下一页，序号是接着前一页的
    meterIndexMethod6(index) {
      return (this.page6 - 1) * this.pageCount6 + (index + 1);
    },

    // 分页功能-获取每页条数
    handleSizeChange1(val) {
      this.pageCount1 = val;
      this.loadData();
    },
    // 分页功能-获取当前页
    handleCurrentChange1(val) {
      this.page1 = val;
      this.loadData();
    },
    // 分页功能-获取每页条数
    handleSizeChange2(val) {
      this.pageCount2 = val;
      this.loadData();
    },
    // 分页功能-获取当前页
    handleCurrentChange1(val) {
      this.page1 = val;
      this.loadData('assignment');
    },
    handleCurrentChange2(val) {
      this.page2 = val;
      this.loadData('change');
    },
    handleCurrentChange3(val) {
      this.page3 = val;
      this.loadData('banjie');
    },
    handleCurrentChange6(val) {
      // this.page6 = val - 1;
      this.page6 = val;
      this.loadData('report');
    },
    handleCurrentChange4(val) {
      this.page4 = val;
      this.loadData('listTaskReport');
    },
    handleCurrentChange5(val) {
      this.page5 = val;
      this.loadData('listAllByTaskId');
    },
    // 切换接口
    getAscription(id) {
      var that = this;
      this.$common.commitParam(this, "/supervise/taskinfo/ascription.api", { "id": id }, {
        success: function (res) {
          that.ascriptionData = res.data;
          // for (let i = 0; i < that.ascriptionData.length; i++) {
          //   that.ascriptionData[i].id = Number(that.ascriptionData[i].id);

          // }
          that.ruleForm.responsibleDeptIds = res.data[0].id;
          that.ascriptionTaskId = res.data[0].id;
          that.loadData('all');
          that.remindLog();

        }
      }, "get");
    },
    // 切换 点击事件
    goSwitch(item) {

      var that = this;
      that.ascriptionTaskId = item;
      that.loadData('all');
    },
    loadData(Name) {
      var that = this;
      var id = that.ascriptionTaskId;
      var arr = [];

      if (Name == 'all') {
        //任务详情
        this.$common.commitParam(this, "/supervise/taskinfo/get.api", { "id": id }, {
          success: function (res) {
            that.taskinfo = res.data;
            that.value = res.data.importanceId;
            that.selectShow = res.data.taskType;
            if (that.taskinfo.taskType == '集团') {
              that.JTShow = true;
            }
            that.userinfo();

          }
        }, "get");

        //任务下达
        // this.$common.commitParam(this, '/supervise/workflow/comment.api', { 'id': id, 'key': 'assignment' }, {
        this.$common.commitParam(this, '/supervise/workflow/groupComment.api', { 'id': id, 'key': 'assignment' }, {
          success: function (res) {
            that.tableData1 = res.data;
            that.sum1 = res.totalCount;
          }
        }, 'get');

        // 任务变更
        // this.$common.commitParam(this, '/supervise/workflow/comment.api', { 'id': id, 'key': 'change' }, {
        this.$common.commitParam(this, '/supervise/workflow/groupComment.api', { 'id': id, 'key': 'change' }, {
          success: function (res) {
            that.tableData2 = res.data;
            that.sum2 = res.totalCount;
          }
        }, 'get');

        // 任务办结
        // this.$common.commitParam(this, '/supervise/workflow/comment.api', { 'id': id, 'key': 'banjie' }, {
        this.$common.commitParam(this, '/supervise/workflow/groupComment.api', { 'id': id, 'key': 'banjie' }, {
          success: function (res) {
            that.tableData3 = res.data;
            that.sum3 = res.totalCount;
          }
        }, 'get');

        // 汇报审批
        // this.$common.commitParam(this, '/supervise/workflow/comment.api', { 'id': id, 'key': 'report' }, {
        this.$common.commitParam(this, '/supervise/workflow/groupComment.api', { 'id': id, 'key': 'report' }, {
          success: function (res) {
            that.tableData6 = res.data;
            that.sum6 = res.totalCount;
          }
        }, 'get');

        //汇报详情
        this.$common.commitParam(this, '/supervise/mytaskinfo/listTaskReport.api', { 'taskId': id }, {
          success: function (res) {
            that.tableData4 = res.data;
            that.sum4 = res.totalCount;
          }
        }, 'get')

        //催办记录
        this.$common.commitParam(this, '/supervise/taskRemindLog/listAllByTaskId.api', { 'taskId': id }, {
          success: function (res) {
            that.tableData5 = res.data;
            that.sum5 = res.totalCount;
          }
        }, 'get')
      } else if (Name == 'assignment') {
        //任务下达
        var params = {
          id: id,
          page: that.page1,
          key: 'assignment'
        };
        // this.$common.commitParam(this, '/supervise/workflow/comment.api', params, {
        this.$common.commitParam(this, '/supervise/workflow/groupComment.api', params, {
          success: function (res) {
            that.tableData1 = res.data;
            that.sum1 = res.totalCount;
          }
        }, 'get');
      } else if (Name == 'change') {
        // 任务变更
        var params = {
          id: id,
          page: that.page2,
          key: 'change'
        };
        // this.$common.commitParam(this, '/supervise/workflow/comment.api', params, {
        this.$common.commitParam(this, '/supervise/workflow/groupComment.api', params, {
          success: function (res) {
            that.tableData2 = res.data;
            that.sum2 = res.totalCount;
          }
        }, 'get');
      } else if (Name == 'banjie') {
        // 任务办结
        var params = {
          id: id,
          page: that.page3,
          key: 'banjie'
        };
        // this.$common.commitParam(this, '/supervise/workflow/comment.api', params, {
        this.$common.commitParam(this, '/supervise/workflow/groupComment.api', params, {
          success: function (res) {
            that.tableData3 = res.data;
            that.sum3 = res.totalCount;
          }
        }, 'get');
      } else if (Name == 'report') {
        // 汇报审批
        var params = {
          id: id,
          page: that.page6,
          key: 'report'
        };
        // this.$common.commitParam(this, '/supervise/workflow/comment.api', params, {
        this.$common.commitParam(this, '/supervise/workflow/groupComment.api', params, {
          success: function (res) {
            that.tableData6 = res.data;
            that.sum6 = res.totalCount;
          }
        }, 'get');
      } else if (Name == 'listTaskReport') {
        //汇报详情
        var params = {
          taskId: id,
          page: that.page4
        };
        this.$common.commitParam(this, '/supervise/mytaskinfo/listTaskReport.api', params, {
          success: function (res) {
            that.tableData4 = res.data;
            that.sum4 = res.totalCount;
          }
        }, 'get')
      } else if (Name == 'listAllByTaskId') {
        //催办记录
        var params = {
          taskId: id,
          page: that.page5
        };
        this.$common.commitParam(this, '/supervise/taskRemindLog/listAllByTaskId.api', params, {
          success: function (res) {
            that.tableData5 = res.data;
            that.sum5 = res.totalCount;
          }
        }, 'get')
      }



      // this.$common.commitParam(this, "/supervise/mytaskinfo/listTaskReport.api", { "taskId": id, "page": that.page2, "pageCount": that.pageCount2 }, {
      //   success: function (res) {
      //     that.loading = false;
      //     if (res.code == 0) {
      //       res.data.map(function (i, j) {
      //         i.attachments.map(function (x, y) {
      //           var arrItem = { value: x.name, id: x.id }
      //           arr.push(arrItem);
      //         })
      //         that.loadDowm = arr;
      //       });
      //       that.tableData4 = res.data;
      //       that.sum2 = res.totalCount
      //     } else {
      //       that.$message({ message: res.description, type: 'error' });
      //     }
      //   }
      // }, "get");
    },

    // 任务下达、任务变更、任务办结的数据列表
    // getcommit(key) {

    //   this.$common.commitParam(this, "/supervise/workflow/comment.api", { "id": id, "key": key }, {
    //     success: function (res) {
    //       that.loading = false;
    //       if (res.code == 0) {
    //         if (key == 'assignment') {
    //           that.tableData1 = res.data;
    //           that.sum1 = res.totalCount;
    //         } else if (key == 'change') {
    //           that.tableData2 = res.data;
    //           that.sum2 = res.totalCount;
    //         } else if (key == 'banjie') {
    //           that.tableData3 = res.data;
    //           that.sum3 = res.totalCount;
    //         }

    //       } else {
    //         that.$message({ message: res.description, type: 'error' });
    //       }
    //     }
    //   }, "get");
    // },

    remindLog() {
      var that = this;
      var id = that.ascriptionTaskId;
      var params = { page: that.currentPage, pageCount: that.pageSize, 'supervisionTaskId': id }
      this.$common.commitParam(this, '/supervise/taskRemindLog/list.api', params, {
        success: function (res) {
          if (res.code == 0) {
            that.loading = false;
            that.tableData = res.data
            that.total = res.totalCount;
          } else {
            that.$message({ message: res.description, type: 'error' });
          }
        }
      }, "get");
    },
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
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.remindL();
    },
    //序号连续
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + (index + 1);
    },

    // 审批详情按钮（任务下达、任务变更、任务办结）
    Approval(row) {

      var that = this;
      that.approvalNeedData.id = row.id;
      that.approvalNeedData.taskId = row.taskId;
      that.approvalNeedData.processId = row.processId;
      that.approvalNeedData.processKey = row.processKey;
      that.approvalShow = true;
      // eventBus.$emit('fujianHidden', 'true');
      sessionStorage.setItem('fujianHidden', true);

      // var url = '#/approval?id=' + row.id + '&taskId=' + row.taskId + '&processId=' + row.processId + '&processKey=' + row.processKey;
      // window.location.href = url;
      // that.openWindow(url, '任务审批', that.windowScreenWidth, that.windowScreenHeight);
    },

    // 审批详情按钮（汇报详情）
    reportApproval(row) {

      var that = this;
      that.reportApprovalNeedData.id = row.id;
      that.reportApprovalNeedData.taskId = row.taskId;
      that.reportApprovalNeedData.processId = row.processId;
      that.reportApprovalNeedData.processKey = row.processKey;
      that.reportApprovalNeedData.ProcessHandlingShow = true;
      that.reportApprovalShow = true;
      // eventBus.$emit('fujianHidden', 'true');
      sessionStorage.setItem('fujianHidden', true);

      // var url = '#/reportApproval?id=' + row.id + '&taskId=' + row.taskId + '&processId=' + row.processId + '&processKey=' + row.processKey;
      // that.openWindow(url, '任务审批', that.windowScreenWidth, that.windowScreenHeight);
    },

    openWindow(url, name, iWidth, iHeight) {
      window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ', width=' + iWidth + ',innerWidth=' + iWidth + ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizeable=no,location=no,status=no');
    },

    //汇报详情的汇报内容字体颜色方法
    colorChange(row, column) {

      // this.dialogTitle = column.target.innerText;
      for (let i = 0; i < this.tableData4.length; i++) {
        let div = this.tableData4[i].reportInfoMark;
        $("[colorChange=" + this.tableData4[i].id + "]").html(div);
      }

    },
    // 获取汇报内容
    getTitleContent(row) {
      if (this.beforeId != row.id) {
        if (this.beforeId != '') {
          $("[textChange=" + this.beforeId + "]").find('span').html('显示');
          $("[textChange=" + row.id + "]").find('span').css('color', '#409EFF');
        }
        this.beforeId = row.id;
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
  }
}
</script>
<style lang="scss">
.taskinfo {
  height: 100%;
  z-index: 2019;
  text {
    font-size: 0.17rem;
  }
  .el-tabs {
    #pane-first {
      .txt1 {
        // width: 0.59rem;
        height: 0.12rem;
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
      }

      .line1 {
        width: 0.57rem;
        height: 0.12rem;
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333;
      }
    }
  }
  .el-table th,
  .el-table td {
    padding: 0px 0;
    text-align: center;
  }
  .table-Box {
    // height: calc(100% - 33px);
    height: 100%;
  }
  .svgdia_box {
    .el-dialog {
      width: 80% !important;
      .el-dialog__body {
        height: 5.2rem !important;
      }
    }
  }
  .searchBox {
    float: right;
    background: #47b5e8;
    margin: 0.1rem;
  }
  .el-tabs {
    // height: calc(100% - 52px);
    height: 94%;
  }
  .el-tab-pane {
    height: 100%;
  }
  .shenpi {
    height: 100%;
    td {
      height: 0.32rem;
    }
  }
  tr {
    margin-top: 10px;
    // text-align: center;
  }
  td {
    font-size: 0.16rem;
    height: 0.4rem;
    // margin-top: 50px;
    // width: 173px;
    // display: inline;
  }
  .long1 {
    width: 90% !important;
  }
  .long2 {
    width: 550px !important;
  }
  .cell {
    font-size: 0.16rem;
  }
  .el-tooltip {
    font-size: 0.16rem;
  }
  .el-dialog {
    // width: 90% !important;
    // height: 77%;
    margin-top: 0.1rem !important;
  }
  .el-dialog__header {
    border-bottom: 1px solid #ebeef5;
  }
  .el-dialog__header span {
    font-size: 0.16rem;
  }
  .el-dialog__body {
    height: calc(100% - 123px);
    // padding: 0px 20px;
    // height: 6rem !important;
    overflow-y: scroll !important;
  }
  // .el-dialog__footer {
  //   height: .5rem;
  // }
  .el-dialog__footer .el-button--mini {
    background: #fff;
    border: rgb(209, 207, 207) 1px solid;
    color: black;
  }
  .ascriptionBox {
    padding: 5px 0px;
  }
  #pane-first {
    overflow-y: auto !important;
  }

  .el-tabs--border-card {
    box-shadow: none !important;
    border-bottom: none;
    border-left: none;
    border-right: none;
  }
  .el-table .cell {
    min-height: 0.32rem !important;
    line-height: 0.32rem !important;
  }
  .el-tabs--border-card > .el-tabs__content {
    padding: 0;
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
        margin-left: 0.28rem;
      }
    }
  }
  .titleContentBox {
    min-height: 0.5rem;
    width: 54%;
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
      width: 91%;
      margin-left: 0.3rem;
      margin-right: 0.3rem;
      color: white;
      margin-bottom: 0.2rem;
    }
  }
  #reportInfo {
    font-size: 0.13rem;
    span {
      font-size: 0.13rem;
    }
  }
  .taskChangeBox .el-dialog {
    width: 80% !important;
    margin: 0 auto;
    margin-top: 0.4rem !important;
    .el-dialog__body {
      padding: 0px 20px;
    }
  }
  .taskChangeBox .el-dialog__body {
    height: 81% !important;
  }
  #taskJieXiangBox .el-dialog {
    width: 80% !important;
    margin: 0 auto;
    margin-top: 0.4rem !important;
    .el-dialog__body {
      padding: 0px 20px;
    }
  }
  #taskJieXiangBox .el-dialog__body {
    height: 5.3rem !important;
  }
  .taskReportBox .el-dialog {
    width: 80% !important;
    margin: 0 auto;
    margin-top: 0.4rem !important;
    .el-dialog__body {
      padding: 0px 20px;
    }
  }
  .table_two .el-table__body {
    tr {
      td:nth-child(5) {
        div {
          text-align: left;
          line-height: 0.22rem !important;
          font-size: 0.13rem;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
        }
      }
    }
  }
  .table_three .el-table__body {
    tr {
      td:nth-child(5) {
        div {
          text-align: left;
          line-height: 0.22rem !important;
          font-size: 0.13rem;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
        }
      }
    }
  }
  .table_six .el-table__body {
    tr {
      td:nth-child(3) {
        div {
          text-align: left;
          line-height: 0.22rem !important;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
        }
      }
    }
  }
  .table_seven .el-table__body {
    tr {
      td:nth-child(3) {
        div {
          text-align: left;
          line-height: 0.22rem !important;
          font-size: 0.13rem;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
        }
      }
    }
  }
}
</style>
