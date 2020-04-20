<template>
  <div class="main" style="height:100%;" clear v-if="showIndex">
    <div id="homepageTableDiv" v-show="alltaskNeedData.addContent5 || toBeReadShow">

      <div class="breadcrumb1" v-if="breadcrumbBoxShow">
        <el-button type="primary" size="mini" @click="alltaskNeedData.addContent5 = false">关闭</el-button>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>{{alltaskBreadcrumb.item1}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{alltaskBreadcrumb.item2}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{alltaskBreadcrumb.item3}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <alltask ref="alltask" v-if="alltaskNeedData.addContent5" :parentMessage="alltaskNeedData.parentMessage" :supervisionTaskType="alltaskNeedData.type" :urlType="alltaskNeedData.urlType" :type="alltaskNeedData.addContentType" :deptId="alltaskNeedData.addContentDeptId" :show="alltaskNeedData.showType"></alltask>
      <toBeRead ref="toBeRead" v-if="toBeReadShow" :toBeReadNeedData="toBeReadNeedData"></toBeRead>
    </div>

    
    <div class="header clear">
      <div class="logo">
        <img src="../../static/imgs/logo3.png" alt="">
      </div>
      <div class="name">
        <div class="line"></div>
        <h2 style="width:185px; color:#fff; font-weight:normal;font-size:0.18rem;">工作督办系统<span style="font-size:13px;">&nbsp;&nbsp;V2.05</span></h2>
        
      </div>
      <div class="uesrinfo">

        <!-- <span class="username">{{username}}&nbsp;&nbsp;</span><span class="curentdate">{{now}}</span>   -->

        <!-- 系统设置按钮 -->
        <!-- <img class="systemmanagement" src="../../static/imgs/index/system.png" alt="" @click="getSecondMenus('systemmanagement')" v-if="systemShow"> -->
        <el-select v-model="companyId" placeholder="请选择" @change="setOption(companyId)" v-if="shuisiShow">
          <el-option v-for="item in companyData" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <!-- </div> -->
        <div class="usermsg">
          <img src="" alt="">
        </div>
        <span>{{username}}</span>
        <img class="news" src="../../static/imgs/index/消息.png" alt="">
        <!-- <a href="javascript:void(0)" @click="logout" style="margin-right:0.1rem;margin-left:0.1rem;">注销</a> -->
      </div>
    </div>
    <div class="first_box">
      <div class="menu">
        <div @click="getSecondMenus('homepage')" class="homepage" v-if="homepageShow">
          <span>首页</span>

        </div>
        <div @click="getSecondMenus('dubantask')" class="dubantask" v-if="dubantaskShow">
          <span>督办任务</span>

        </div>

        <div @click="getSecondMenus('reportform')" class="reportform" v-if="reportformShow">
          <span>统计报表</span>

        </div>
        <div @click="getSecondMenus('baseset')" class="baseset" v-if="basesetShow">
          <span>基础设置</span>

        </div>
        <div @click="getSecondMenus('systemmanagement')" class="systemmanagement" v-if="systemShow">
          <span>系统管理</span>

        </div>
        <span style="float: right;color: black;font-weight: 300;line-height: 12px;">技术支持：易慧军—13682485210</span>
      </div>

    </div>
    <!-- <div class="rectangle"></div> -->

    <!-- 左侧树 -->
    <div class="aside" v-if="asideShow">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" id="table">
        <!-- <el-tree :data="menuData" node-key="key" :highlight-current="true" :default-expand-all="true" @node-click="handleClick">
        </el-tree> -->

        <!-- 督办任务菜单 -->

        <!-- <span style="font-size: 12px;">{{$route.path}}</span> -->
        <el-menu v-if="firstKey == 'dubantask'" :default-openeds="['1', '2', '3', '4']" router :default-active="$route.path" class="el-menu-vertical-demo1">
          <el-submenu index="3" v-if="dubanTask.myApproval">
            <template slot="title">
              <img src="../../static/imgs/icon/myApproval.png" alt="">&nbsp;&nbsp;
              <span>我的审批</span>
            </template>
            <el-menu-item v-if="dubanTask.myApprovalBox.todo" index="/todo" @click="gethandleClick('待我审的', 'todo', '3')"><img v-if="changeImgShow" getpath="todo" src="../../static/imgs/icon/item_1.png" alt=""><img v-else getpath="todo" src="../../static/imgs/icon/item.png" alt="">&nbsp;&nbsp;
              待我审的
            </el-menu-item>
            <el-menu-item v-if="dubanTask.myApprovalBox.approvalhis" index="/approvalhis" @click="gethandleClick('我已审的', 'approvalhis', '3')"><img getpath="approvalhis" src="../../static/imgs/icon/item.png" alt="">&nbsp;&nbsp;
              我已审的
            </el-menu-item>
            <el-menu-item v-if="dubanTask.myApprovalBox.launch" index="/launch" @click="gethandleClick('我发起的', 'launch', '3')"><img getpath="launch" src="../../static/imgs/icon/item.png" alt="">&nbsp;&nbsp;
              我发起的
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2" v-if="dubanTask.myTask">
            <template slot="title">
              <img src="../../static/imgs/icon/mytask2.png" alt="">&nbsp;&nbsp;
              <span>我的任务</span>
            </template>
            <el-menu-item v-if="dubanTask.myTaskBox.ongong" index="/ongong" @click="gethandleClick('进行中', 'ongong', '3')">
              <img getpath="ongong" src="../../static/imgs/icon/item.png" alt="">&nbsp;&nbsp;
              进行中
            </el-menu-item>
            <el-menu-item v-if="dubanTask.myTaskBox.complete" index="/complete" @click="gethandleClick('已办结', 'complete', '3')"><img getpath="complete" src="../../static/imgs/icon/item.png" alt="">&nbsp;&nbsp;
              已办结
            </el-menu-item>
          </el-submenu>
          <el-submenu index="1" v-if="dubanTask.taskXiaDa">
            <template slot="title">
              <!-- <i class="el-icon-location"></i> -->
              <img src="../../static/imgs/icon/taskregister.png" alt="">&nbsp;&nbsp;
              <span>任务下达</span>
            </template>
            <el-menu-item v-if="dubanTask.taskXiaDaBox.taskregister" index="/taskregister" @click="gethandleClick('下达列表', 'taskregister', '3')">
              <img getpath="taskregister" src="../../static/imgs/icon/item.png" alt="">&nbsp;&nbsp;
              下达列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4" v-if="dubanTask.allTask">
            <template slot="title">
              <img src="../../static/imgs/icon/alltask.png" alt="">&nbsp;&nbsp;
              <span>所有任务</span>
            </template>
            <el-menu-item v-if="dubanTask.allTaskBox.alltaskquery" index="/alltaskquery" @click="gethandleClick('所有列表', 'alltaskquery', '3')"><img getpath="alltaskquery" src="../../static/imgs/icon/item.png" alt="">&nbsp;&nbsp;
              所有列表
            </el-menu-item>
            <el-menu-item v-if="dubanTask.allTaskBox.alltaskUrge" index="/alltaskUrge" @click="gethandleClick('任务催办', 'alltaskUrge', '3')"><img getpath="alltaskUrge" src="../../static/imgs/icon/item.png" alt="">&nbsp;&nbsp;
              任务催办
            </el-menu-item>
            <el-menu-item v-if="dubanTask.allTaskBox.privilegeModification" index="/privilegeModification" @click="gethandleClick('特权修改', 'privilegeModification', '3')"><img getpath="privilegeModification" src="../../static/imgs/icon/item.png" alt="">&nbsp;&nbsp;
              特权修改
            </el-menu-item>
          </el-submenu>
        </el-menu>

        <!-- 统计报表菜单 -->
        <el-menu v-if="firstKey == 'reportform'" router :default-active="$route.path" class="el-menu-vertical-demo">
          <el-menu-item v-if="reportForm.statisticalanalysis" index="/statisticalanalysis" @click="gethandleClick('统计分析', 'statisticalanalysis', '2')"><img v-if="changeImgShow" getpath="statisticalanalysis" src="../../static/imgs/icon/statisticalanalysis_1.png" alt=""><img v-else getpath="statisticalanalysis" src="../../static/imgs/icon/statisticalanalysis.png" alt="">&nbsp;&nbsp;统计分析</el-menu-item>
          <el-menu-item v-if="reportForm.jtmonthreport" index="/jtmonthreport" @click="gethandleClick('集团月汇报', 'jtmonthreport', '2')"><img getpath="jtmonthreport" src="../../static/imgs/icon/jtmonthreport.png" alt="">&nbsp;&nbsp;集团月汇报</el-menu-item>
          <el-menu-item v-if="reportForm.gsmonthreport" index="/gsmonthreport" @click="gethandleClick('供水月汇报', 'gsmonthreport', '2')"><img getpath="gsmonthreport" src="../../static/imgs/icon/gsmonthreport.png" alt="">&nbsp;&nbsp;供水月汇报</el-menu-item>
        </el-menu>

        <!-- 基础设置菜单 -->
        <!-- {{$route.path}} -->
        <el-menu v-if="firstKey == 'baseset'" router :default-active="$route.path" class="el-menu-vertical-demo">
          <el-menu-item v-if="baseset.dictionaryset" index="/dictionaryset" @click="gethandleClick('数据字典', 'dictionaryset', '2')"><img v-if="changeImgShow" getpath="dictionaryset" src="../../static/imgs/icon/dictionaryset_1.png" alt=""><img v-else getpath="dictionaryset" src="../../static/imgs/icon/dictionaryset.png" alt="">&nbsp;&nbsp;数据字典</el-menu-item>
          <el-menu-item v-if="baseset.assessmentrult" index="/assessmentrult" @click="gethandleClick('考核规则', 'assessmentrult', '2')"><img getpath="assessmentrult" src="../../static/imgs/icon/assessmentrult.png" alt="">&nbsp;&nbsp;考核规则</el-menu-item>
        </el-menu>

        <!-- 系统管理菜单 -->
        <el-menu v-if="firstKey == 'systemmanagement'" router :default-active="$route.path" class="el-menu-vertical-demo">
          <el-menu-item v-if="systemmanagement.userlist" index="/userlist" @click="gethandleClick('用户管理', 'userlist', '2')"><img v-if="changeImgShow" getpath="userlist" src="../../static/imgs/icon/userlist_1.png" alt=""><img v-else getpath="userlist" src="../../static/imgs/icon/userlist.png" alt="">&nbsp;&nbsp;用户管理</el-menu-item>
          <el-menu-item v-if="systemmanagement.rolemanager" index="/rolemanager" @click="gethandleClick('角色管理', 'rolemanager', '2')"><img getpath="rolemanager" src="../../static/imgs/icon/rolemanager.png" alt="">&nbsp;&nbsp;角色管理</el-menu-item>
          <el-menu-item v-if="systemmanagement.operationmanager" index="/operationmanager" @click="gethandleClick('菜单管理', 'operationmanager', '2')"><img getpath="operationmanager" src="../../static/imgs/icon/operationmanager.png" alt="">&nbsp;&nbsp;菜单管理</el-menu-item>
          <el-menu-item v-if="systemmanagement.companylist" index="/companylist" @click="gethandleClick('公司管理', 'companylist', '2')"><img getpath="companylist" src="../../static/imgs/icon/companylist.png" alt="">&nbsp;&nbsp;公司管理</el-menu-item>
          <el-menu-item v-if="systemmanagement.authoritymanager" index="/authoritymanager" @click="gethandleClick('权限管理', 'authoritymanager', '2')"><img getpath="authoritymanager" src="../../static/imgs/icon/authoritymanager.png" alt="">&nbsp;&nbsp;权限管理</el-menu-item>
          <el-menu-item v-if="systemmanagement.userrole" index="/userrole" @click="gethandleClick('用户角色', 'userrole', '2')"><img getpath="userrole" src="../../static/imgs/icon/userrole.png" alt="">&nbsp;&nbsp;用户角色</el-menu-item>
        </el-menu>

      </table>
    </div>

    <div class="section" ref="sectionLeft" :style="asideShow==true?'calc(100% - 128px)':''">
      <div class="breadcrumb" v-if="asideShow">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- <el-breadcrumb-item :to="{ path: 'ongong' }">督办任务</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
          <el-breadcrumb-item :to="item.url" :key="index" v-for="(item,index) in breadcrumbList">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="editableTabsValue2" type="card" :closable="tabsClose" @tab-remove="removeTab" @tab-click="clickTab" class="tabs">
        <el-tab-pane v-for="item in editableTabs2" :key="item.name" :label="item.title" :name="item.name">
          <span slot="label">
            <span>{{item.title}}</span>
            <el-badge :value="item.Num" v-if="item.Num > 0" size="mini" class="item"></el-badge>
          </span>
          <div v-if="item.title === cureentName" style="height:100%">
            <router-view></router-view>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane v-for="item in editableTabs2" :label="item.title" :key="item.name">
          <span slot="label">
            <span>{{item.title}}</span>
            <el-badge :value="Num" v-if="Num > 0" size="mini" class="item"></el-badge>
          </span>
          <div v-if="item.title === cureentName" style="height:100%">
              <router-view></router-view>
            </div>
        </el-tab-pane> -->
      </el-tabs>
    </div>

    <!-- <footer class="main-footer">
      <div>
        <img src="../../static/imgs/logo3.png" alt=""/>
      </div>
    </footer> -->
  </div>
</template>

<script>
import alltask from './taskmanager/alltask'
import toBeRead from './taskmanager/toBeRead'
export default {
  components: {
    alltask,
    toBeRead,
  },
  data() {
    return {
      cureentName: '供水首页',
      // 打开白条的第几个页面
      editableTabsValue2: '1',
      // 白条数据
      editableTabs2: [],
      // [{ name: '1', path: 'index', title: '集团首页' }, { name: '2', path: 'index', title: '供水首页' }, { name: '3', path: 'index', title: '审计整改' }]
      // 首页子菜单(点击首页后白条添加以下数据)（只做存储使用，给editableTabs2提供首页子菜单数据）
      homePageURL: [],
      portal: [],
      portalId: '',
      username: '',
      tabIndex: 0,
      menuData: [],
      url: [],
      arr: [],
      now: '',
      // 左侧树的显示
      asideShow: false,
      // 一级菜单的显示
      homepageShow: false,
      dubantaskShow: false,
      reportformShow: false,
      basesetShow: false,
      systemShow: false,
      // 右上角水司下拉数据列表
      companyData: [],
      // 选中的水司
      companyId: '',
      supervisionTaskType: '',
      shuisiShow: true,
      // 面包屑列表
      breadcrumbList: [],
      // 存放一级菜单面包屑
      firstBreadCrumb: {},
      // 全部菜单
      allMenuList: [],
      num: 0,
      firstKey: 'homepage',
      treeBGColorChange: 1,
      tabsClose: false,

      // 督办任务菜单
      dubanTask: {
        taskXiaDa: false,
        myTask: false,
        myApproval: false,
        allTask: false,
        taskXiaDaBox: { taskregister: false },
        myTaskBox: { ongong: false, complete: false },
        myApprovalBox: { todo: false, launch: false, approvalhis: false },
        allTaskBox: { alltaskquery: false, alltaskUrge: false, privilegeModification: false }
      },
      // 系统报表菜单
      reportForm: {
        statisticalanalysis: false,
        jtmonthreport: false,
        gsmonthreport: false,
      },
      // 基础设置菜单
      baseset: {
        dictionaryset: false,
        assessmentrult: false,
      },
      // 系统管理菜单
      systemmanagement: {
        userlist: false,
        rolemanager: false,
        operationmanager: false,
        companylist: false,
        authoritymanager: false,
        userrole: false,
      },

      // index表格数字点击弹出div框的数据
      addContent5: false,
      alltaskNeedData: {
        addContent5: false,
        type: '',
        urlType: '',
        addContentType: '',
        addContentDeptId: 0,
        showType: '',
      },
      alltaskBreadcrumb: {
        item1: '公司督办',
        item2: '2',
        item3: '3',
      },

      breadcrumbBoxShow: false,
      beforePath: '',
      changeImgShow: false,

      showIndex: false,
      Num: 15,

      toBeReadShow: false,
    }
  },
  mounted() {
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isChrome = userAgent.indexOf("Chrome") > -1
    if (!isIE11 && !isChrome) {
      // alert('本系统建议使用谷歌浏览器或ie11及以上版本的浏览器！');
      this.$message({ message: '本系统建议使用谷歌浏览器或IE11浏览器！', type: 'warning', duration: '5000'});
    }
    if (isEdge) {
      // alert('本系统建议使用谷歌浏览器或ie11及以上版本的浏览器！');
      this.$message({ message: '本系统建议使用谷歌浏览器或IE11浏览器！', type: 'warning', duration: '5000'});
    }




    this.getUserLoginInfo();
    if (sessionStorage.getItem('isShowIndex') == 'true') {
      this.showIndex = true;
    }
    this.userinfo();
    this.getFirstMenus();
    // this.getSecondMenus('homepage');
    // this.loadaside();
    var date = new Date();
    this.now = this.$common.formatDateCH(date);
    // console.log(this.editableTabs2);
    eventBus.$on('mainAllTaskNeedData', (addContent5, type, urlType, showType, addContentType, addContentDeptId, item2, item3) => {
      this.alltaskNeedData.addContent5 = addContent5;
      this.alltaskNeedData.type = type;
      this.alltaskNeedData.urlType = urlType;
      this.alltaskNeedData.showType = showType;
      this.alltaskNeedData.addContentType = addContentType;
      this.alltaskNeedData.addContentDeptId = Number(addContentDeptId);
      this.alltaskNeedData.parentMessage = 2;

      this.alltaskBreadcrumb.item2 = item2;
      this.alltaskBreadcrumb.item3 = item3;

      this.breadcrumbBoxShow = true;

    });
    // 首页上方三个点击
    eventBus.$on('mainAllTaskNeedData1', (addContent5, type, parentMessage) => {
      this.alltaskNeedData.addContent5 = addContent5;
      this.alltaskNeedData.type = type;
      this.breadcrumbBoxShow = false;
      this.alltaskNeedData.showType = false;
      this.alltaskNeedData.parentMessage = parentMessage;

      setTimeout(() => {
        $('#homepageTableDiv #tableBox').css('height', 'calc(100% - 114px)')
      }, 0);
    })
    // 待阅点击
    eventBus.$on('toBeReadNeedData', (toBeReadShow, toBeReadNeedData) => {
      this.toBeReadShow = toBeReadShow
      this.toBeReadNeedData = toBeReadNeedData
    })
    // 接收alltask的关闭homepageTableDiv请求
    eventBus.$on('homepageTableDivClose', (addContent5) => {
      this.alltaskNeedData.addContent5 = addContent5;
    })
    // 接收alltask的关闭homepageTableDiv请求
    eventBus.$on('toBeReadClose', (toBeReadShow) => {
      this.toBeReadShow = false;
      // 前往index页面刷新待阅列表
      eventBus.$emit('toBeReadRefersh', true)
    })
    // 督办任务打开该页面，隐藏面包屑
    eventBus.$on('breadcrumbBoxShow', (isBoolean) => {
      console.log(isBoolean);
      this.breadcrumbBoxShow = isBoolean;
    })
    eventBus.$on('getOngoingNumRefresh', (params) => {
      this.getOngoingNum();
    });
  },
  created() {

  },
  watch: {
    editableTabs2: {
      handler(newName, oldName) {

      },
      deep: true,
    }
  },
  methods: {
    // 添加图标方法
    // renderContent(h, { node, data, store }) {
    //   console.log(data);
    //   console.log(node);
    //   return (
    //     <span>
    //       <i class='img-i'></i>
    //       <span style="font-size:.16rem">{node.label}</span>
    //     </span>
    //   );
    // },

    // 判断oa用户是否登录(非本地登录)
    getUserLoginInfo() {
      var that = this;
      this.$common.commitParam(this, "/supervise/verifySSO.api", {}, {
        success: function (res) {
          if (res.code == -1) {
            if (sessionStorage.getItem('isShowIndex') == 'true') {

            } else {
              window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=https://duban.gdhwater.com/cas.api';
              // window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://localhost:8080/cas.api';
            }


          } else if (res.code == 0) {
            that.showIndex = true;
          }
        }
      }, "get");
      // this.$common.commitParam(this, "/supervise/portal/departmentNumberSummary.api", { 'supervisionTaskType': that.urlData.type }, {
      //   success: function (res) {
      //     that.deptNumberSummaryData = res.data;
      //   }
      // }, "get");
    },

    gethandleClick(label, key, level) {
      let item = {
        label,
        key,
        level
      }
      this.handleClick(item);
      this.changeIMG(key)

    },
    // 更改页面图标
    changeIMG(key) {
      if (this.firstKey != 'dubantask') {
        $("[getpath=" + key + "]").attr('src', '../../static/imgs/icon/' + key + '_1.png');
        if (this.beforePath != key) {
          $("[getpath=" + key + "]").attr('src', '../../static/imgs/icon/' + key + '_1.png');
          $("[getpath=" + this.beforePath + "]").attr('src', '../../static/imgs/icon/' + this.beforePath + '.png');
          this.beforePath = key;
        }
      } else {
        $("[getpath=" + key + "]").attr('src', '../../static/imgs/icon/item_1.png');
        if (this.beforePath != key) {
          $("[getpath=" + key + "]").attr('src', '../../static/imgs/icon/item_1.png');
          $("[getpath=" + this.beforePath + "]").attr('src', '../../static/imgs/icon/item.png');
          this.beforePath = key;
        }
      }
    },
    // 左边树点击节点的点击事件
    handleClick(item, b, c) {

      // console.log(this.menuData);
      this.treeBGColorChange++;
      // console.log(item);
      // console.log(this.menuData);
      // console.log(this.breadcrumbList);
      // console.log($('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children').length);

      // if ($('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children')) {

      // }
      if (this.breadcrumbList.length <= 0) {
        this.breadcrumbList.push(this.firstBreadCrumb);
      } else {
        this.breadcrumbList = [];
        this.breadcrumbList.push(this.firstBreadCrumb);
      }

      let isPush = true;

      for (let i = 0; i < this.breadcrumbList.length; i++) {
        // const element = array[i];
        if (item.label == this.breadcrumbList[i].name) {
          isPush = false;
        }
        if (item.level == this.breadcrumbList[i].level) {
          isPush = false;

          if (item.level == '3') {
            this.breadcrumbList[i].name = item.label;
            this.breadcrumbList[i].url = { path: item.key };
          }
        }

      }

      // if (item.level == '3') {
      //   for (let i = 0; i < this.menuData.length; i++) {
      //     if (this.menuData[i].children.length > 0) {
      //       for (let j = 0; j < this.menuData[i].children.length; j++) {
      //         if (item.key == this.menuData[i].children[j].key) {
      //           console.log(this.menuData[i].label);
      //           if (this.breadcrumbList.length < 2) {
      //             this.breadcrumbList.push({
      //               name: this.menuData[i].label,
      //               level: this.menuData[i].level
      //             })
      //           } else {
      //             this.breadcrumbList[1].name = this.menuData[i].label;
      //             this.breadcrumbList[1].level = this.menuData[i].level;
      //           }
      //         }

      //       }
      //     }

      //   }
      // }
      if (item.level == '3') {
        for (let k = 0; k < this.allMenuList.length; k++) {
          for (let i = 0; i < this.allMenuList[k].children.length; i++) {
            if (this.allMenuList[k].children[i].children != undefined) {
              for (let j = 0; j < this.allMenuList[k].children[i].children.length; j++) {
                if (item.key == this.allMenuList[k].children[i].children[j].key) {
                  if (this.breadcrumbList.length < 2) {
                    this.breadcrumbList.push({
                      name: this.allMenuList[k].children[i].name,
                      level: this.allMenuList[k].children[i].level
                    })
                  } else {
                    this.breadcrumbList[1].name = this.allMenuList[k].children[i].name;
                    this.breadcrumbList[1].level = this.allMenuList[k].children[i].level;
                  }
                }

              }
            }

          }

        }
      }

      if (item.level == '2' && isPush) {
        this.breadcrumbList.push({
          name: item.label,
          level: item.level
        })
      } else if (item.level == '3' && isPush) {
        this.breadcrumbList.push({
          name: item.label,
          url: { path: item.key },
          level: item.level
        })
      }

      this.addTab(this.editableTabsValue2, item.label, item.key);
      // 左侧树第一个可点击节点高亮
      setTimeout(() => {
        if (this.treeBGColorChange < 3) {
          if ($('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children div').length > 0) {
            $('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children').find('div').eq(0).css('background', '#297ACC')
            $('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children').find('div').eq(0).css('color', 'white')
            $('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children').find('div').eq(0).hover(function () {
              // $('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children').css('background', '#297ACC')
              $('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children').find('div').eq(0).css('color', '#606266')
            }, function () {
              // $('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children').css('background', '#297ACC')
              $('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children').find('div').eq(0).css('color', 'white')
            })
          } else {
            $('.el-tree').find('.el-tree-node').eq(0).css('background', '#297ACC')
            $('.el-tree').find('.el-tree-node').eq(0).css('color', 'white')
            $('.el-tree').find('.el-tree-node').eq(0).hover(function () {
              // $('.el-tree').find('.el-tree-node').eq(0).css('background', '#297ACC')
              $('.el-tree').find('.el-tree-node').eq(0).css('color', '#606266')
            }, function () {
              // $('.el-tree').find('.el-tree-node').eq(0).css('background', '#297ACC')
              $('.el-tree').find('.el-tree-node').eq(0).css('color', 'white')
            })
          }
        } else {
          if ($('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children div').length > 0) {
            $('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children').find('div').eq(0).css('background', '#fff')
            $('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children').find('div').eq(0).css('color', '#606266')
            $('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children').find('div').eq(0).hover(function () {
              // $('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children').css('background', '#297ACC')
              $('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children').find('div').eq(0).css('color', '#606266')
            }, function () {
              // $('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children').css('background', '#297ACC')
              $('.el-tree').find('.el-tree-node').eq(0).find('.el-tree-node__children').find('div').eq(0).css('color', '#606266')
            })
          } else {
            $('.el-tree').find('.el-tree-node').eq(0).css('background', '#fff')
            $('.el-tree').find('.el-tree-node').eq(0).css('color', '#606266')
            $('.el-tree').find('.el-tree-node').eq(0).hover(function () {
              // $('.el-tree').find('.el-tree-node').eq(0).css('background', '#297ACC')
              $('.el-tree').find('.el-tree-node').eq(0).css('color', '#606266')
            }, function () {
              // $('.el-tree').find('.el-tree-node').eq(0).css('background', '#297ACC')
              $('.el-tree').find('.el-tree-node').eq(0).css('color', '#606266')
            })
          }
        }

      }, 0);
    },

    // 面包屑数据处理
    breadcrumbChange(item) {
      if (this.breadcrumbList.length <= 0) {
        this.breadcrumbList.push(this.firstBreadCrumb);
      } else {
        this.breadcrumbList = [];
        this.breadcrumbList.push(this.firstBreadCrumb);
      }

      let isPush = true;

      for (let i = 0; i < this.breadcrumbList.length; i++) {
        if (item.label == this.breadcrumbList[i].name) {
          isPush = false;
        }
        if (item.level == this.breadcrumbList[i].level) {
          isPush = false;

          if (item.level == '3') {
            this.breadcrumbList[i].name = item.label;
            this.breadcrumbList[i].url = { path: item.key };
          }
        }

      }

      // if (item.level == '3') {
      //   for (let i = 0; i < this.menuData.length; i++) {
      //     if (this.menuData[i].children.length > 0) {
      //       for (let j = 0; j < this.menuData[i].children.length; j++) {
      //         if (item.key == this.menuData[i].children[j].key) {
      //           console.log(this.menuData[i].label);
      //           if (this.breadcrumbList.length < 2) {
      //             this.breadcrumbList.push({
      //               name: this.menuData[i].label,
      //               level: this.menuData[i].level
      //             })
      //           } else {
      //             this.breadcrumbList[1].name = this.menuData[i].label;
      //             this.breadcrumbList[1].level = this.menuData[i].level;
      //           }
      //         }

      //       }
      //     }

      //   }
      // }
      if (item.level == '3') {
        for (let k = 0; k < this.allMenuList.length; k++) {
          for (let i = 0; i < this.allMenuList[k].children.length; i++) {
            if (this.allMenuList[k].children[i].children != undefined) {
              for (let j = 0; j < this.allMenuList[k].children[i].children.length; j++) {
                if (item.key == this.allMenuList[k].children[i].children[j].key) {
                  if (this.breadcrumbList.length < 2) {
                    this.breadcrumbList.push({
                      name: this.allMenuList[k].children[i].name,
                      level: this.allMenuList[k].children[i].level
                    })
                  } else {
                    this.breadcrumbList[1].name = this.allMenuList[k].children[i].name;
                    this.breadcrumbList[1].level = this.allMenuList[k].children[i].level;
                  }
                }

              }
            }

          }

        }
      }

      if (item.level == '2' && isPush) {
        this.breadcrumbList.push({
          name: item.label,
          level: item.level
        })
      } else if (item.level == '3' && isPush) {
        this.breadcrumbList.push({
          name: item.label,
          url: { path: item.key },
          level: item.level
        })
      }
    },

    logout() {
      var that = this;
      that.$common.commitParam(this, "/supervise/loginout.api", {}, {
        success: function (res) {
          if (res.code === 0) {
            // 本地登录页
            window.location.href = "https://duban.gdhwater.com/index.html#/login";
            // 正式环境单点登录页
            // window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=https://duban.gdhwater.com/cas.api'
            // 测试环境单点登录页
            // window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://localhost:8080/cas.api';
          } else {
            that.$message({ type: 'error', message: "出现异常!" });
            return;
          }
        }
      }, "get");
    },
    loadaside(key) {
      var that = this;
      that.asideShow = false;
      that.$common.commitParam(this, "/supervise/sys/menus.api", { 'key': key }, {
        success: function (res) {
          //获取左侧树数据(el-menu)
          if (key == 'dubantask') {
            for (let i = 0; i < res.data[0].children.length; i++) {

              if (res.data[0].children[i].name == '任务下达') {
                that.dubanTask.taskXiaDa = true;
                if (res.data[0].children[i].children.length > 0) {
                  for (let j = 0; j < res.data[0].children[i].children.length; j++) {
                    if (res.data[0].children[i].children[j].name == '下达列表') {
                      that.dubanTask.taskXiaDaBox.taskregister = true;
                    }
                  }
                }
              }

              if (res.data[0].children[i].name == '我的任务') {
                that.dubanTask.myTask = true;
                if (res.data[0].children[i].children.length > 0) {
                  for (let j = 0; j < res.data[0].children[i].children.length; j++) {
                    if (res.data[0].children[i].children[j].name == '进行中') {
                      that.dubanTask.myTaskBox.ongong = true;
                    }
                    if (res.data[0].children[i].children[j].name == '已办结') {
                      that.dubanTask.myTaskBox.complete = true;
                    }
                  }
                }
              }

              if (res.data[0].children[i].name == '我的审批') {
                that.dubanTask.myApproval = true;
                if (res.data[0].children[i].children.length > 0) {
                  for (let j = 0; j < res.data[0].children[i].children.length; j++) {
                    if (res.data[0].children[i].children[j].name == '待我审的') {
                      that.dubanTask.myApprovalBox.todo = true;
                      that.changeImgShow = true;
                    }
                    if (res.data[0].children[i].children[j].name == '我发起的') {
                      that.dubanTask.myApprovalBox.launch = true;
                    }
                    if (res.data[0].children[i].children[j].name == '我已审的') {
                      that.dubanTask.myApprovalBox.approvalhis = true;
                    }
                  }
                }
              }

              if (res.data[0].children[i].name == '所有任务') {
                that.dubanTask.allTask = true;
                if (res.data[0].children[i].children.length > 0) {
                  for (let j = 0; j < res.data[0].children[i].children.length; j++) {
                    if (res.data[0].children[i].children[j].name == '所有列表') {
                      that.dubanTask.allTaskBox.alltaskquery = true;
                    }
                    if (res.data[0].children[i].children[j].name == '任务催办') {
                      that.dubanTask.allTaskBox.alltaskUrge = true;
                    }
                    if (res.data[0].children[i].children[j].name == '特权修改') {
                      that.dubanTask.allTaskBox.privilegeModification = true;
                    }
                  }
                }
              }
            }
          }

          if (key == 'reportform') {
            for (let i = 0; i < res.data[0].children.length; i++) {

              if (res.data[0].children[i].name == '统计分析') {
                that.reportForm.statisticalanalysis = true;
                that.changeImgShow = true;
              }

              if (res.data[0].children[i].name == '集团月汇报') {
                that.reportForm.jtmonthreport = true;
              }

              if (res.data[0].children[i].name == '供水月汇报') {
                that.reportForm.gsmonthreport = true;
              }
            }
          }

          if (key == 'baseset') {
            for (let i = 0; i < res.data[0].children.length; i++) {

              if (res.data[0].children[i].name == '数据字典') {
                that.baseset.dictionaryset = true;
                that.changeImgShow = true;
              }

              if (res.data[0].children[i].name == '考核规则') {
                that.baseset.assessmentrult = true;
              }
            }
          }

          if (key == 'systemmanagement') {
            for (let i = 0; i < res.data[0].children.length; i++) {

              if (res.data[0].children[i].name == '用户管理') {
                that.systemmanagement.userlist = true;
                that.changeImgShow = true;
              }

              if (res.data[0].children[i].name == '角色管理') {
                that.systemmanagement.rolemanager = true;
              }

              if (res.data[0].children[i].name == '菜单管理') {
                that.systemmanagement.operationmanager = true;
              }

              if (res.data[0].children[i].name == '公司管理') {
                that.systemmanagement.companylist = true;
              }

              if (res.data[0].children[i].name == '权限管理') {
                that.systemmanagement.authoritymanager = true;
              }

              if (res.data[0].children[i].name == '用户角色') {
                that.systemmanagement.userrole = true;
              }
            }
          }


          //获取左侧树数据(el-tree)
          that.menuData = res.data[0].children;
          that.menuData = JSON.parse(JSON.stringify(that.menuData).replace(/name/g, "label"));




          for (var i = 0; i < res.data.length; i++) {
            for (var j = 0; j < res.data[i].children.length; j++) {
              var url = res.data[i].children[j].key;
              var name = res.data[i].children[j].name;
              that.url.push({ url, name });

              if (res.data[i].children[j].children != undefined) {
                for (let k = 0; k < res.data[i].children[j].children.length; k++) {
                  var url = res.data[i].children[j].children[k].key;
                  var name = res.data[i].children[j].children[k].name;
                  that.url.push({ url, name });

                }
              }
            }
          }
          // console.log(that.url);

          // 点击一级菜单默认打开第一个二级菜单或者第一个三级菜单
          if (key != 'homepage') {
            that.asideShow = true;
            if (typeof that.menuData[0].children != 'undefined') {
              if (that.menuData[0].children.length > 0) {
                that.handleClick(that.menuData[0].children[0])
              } else {
                that.handleClick(that.menuData[0])
              }

            } else {
              that.handleClick(that.menuData[0])
            }
          } else {
            that.breadcrumbList = [];
            that.breadcrumbList.push(that.firstBreadCrumb);
            that.breadcrumbList.push({
              name: that.menuData[0].label,
              level: that.menuData[0].level
            });
          }
          if (key == 'dubantask') {
            that.beforePath = 'todo'
            that.changeIMG('todo')
          } else if (key == 'reportform') {
            that.beforePath = 'statisticalanalysis'
            that.changeIMG('statisticalanalysis')
          } else if (key == 'baseset') {
            that.beforePath = 'dictionaryset'
            that.changeIMG('dictionaryset')
          } else if (key == 'systemmanagement') {
            that.beforePath = 'userlist'
            that.changeIMG('userlist')
          }

        }
      }, "get");
    },
    // addIndex(portal) {
    //   var that = this;
    //   for (var i = 0; i < portal.length; i++) {
    //     console.log(portal[i]);
    //     var obj = portal[i];
    //     var data = { title: obj.name, name: (i + 4) + '', content: 'Tab 1 content', path: 'index?type=' + obj.type };
    //     that.editableTabs2.push(data);
    //     that.arr.push(data);
    //     that.$router.push({
    //       path: '/index',
    //       query: {
    //         type: obj.type
    //       }
    //     });
    //     that.cureentName = obj.name;
    //   }
    //   console.log(that.editableTabs2);
    // },
    // 添加tab(顶部白条小窗口)
    // 跳转功能
    addTab(targetName, name, path) {
      // console.log(this.editableTabs2);

      // 二级菜单，点击不跳转
      var SecondTaskMenus = ['任务下达', '我的任务', '我的审批', '所有任务'];
      if (SecondTaskMenus.indexOf(name) > -1) {
        return;
      }

      for (let i = 0; i < this.editableTabs2.length; i++) {
        if (this.editableTabs2[i].title.indexOf(this.homePageURL[0].title) > -1) {
          // console.log(this.editableTabs2[i]);
          this.editableTabs2 = [];
        }

      }
      // name
      this.cureentName = name;
      this.arr = [];
      var newTabName = ++this.tabIndex + '';
      var msg = '';
      this.arr.push({ title: name, name: newTabName, path: path });
      // console.log(this.arr);
      for (var i = 0; i < this.arr.length; i++) {
        var flag = true;
        for (var j = 0; j < this.editableTabs2.length; j++) {
          //判断如果白条已经存在该按钮，则不添加新的按钮
          if (this.arr[i].title == this.editableTabs2[j].title) {
            msg = this.editableTabs2[j].name;
            flag = false;
          }
        }
        if (flag) {
          this.editableTabs2.push(this.arr[i]);
          this.$router.push(path);
          this.editableTabsValue2 = newTabName;
        } else {
          this.$router.push(path);
          this.editableTabsValue2 = msg;
        }
      }
    },
    // 获取用户信息
    userinfo() {
      var that = this;
      this.$common.commitParam(this, "/supervise/sys/userinfo.api", {}, {
        success: function (res) {

          localStorage.setItem('deptId', res.data.deptId);
          // console.log(typeof res.data.companys.id);
          if (res.data.companys.length != 0) {
            // 获取水司下拉框数据
            that.companyData = res.data.companys;
            // 默认选中第一个水司
            that.companyId = that.companyData[0].id;
          } else {
            that.shuisiShow = false;
          }


          that.username = res.data.name;
          that.portal = res.data.portal;
          that.portalId = res.data.portalId;
          that.$common.setCookie('portalId', that.portalId);
          that.$common.setCookie('username', that.username);
          that.$common.setCookie('portal', JSON.stringify(that.portal));
          // that.addIndex(res.data.portal);
          // that.$router.push('/index')
        }
      }, "get");
    },
    // 获取一级菜单
    getFirstMenus() {



      var that = this;
      this.$common.commitParam(this, "/supervise/sys/menus.api?level=1", {}, {
        success: function (res) {
          that.allMenuList = res.data;
          for (let i = 0; i < res.data.length; i++) {
            // that.editableTabs2;



            // 动态获取首页一级菜单
            if (res.data[i].key == 'homepage') {
              that.editableTabs2 = [];
              that.homePageURL = [];
              for (let j = 0; j < res.data[i].children.length; j++) {
                let arr = {};
                arr.name = j + 1 + '';
                arr.path = 'index';
                arr.title = res.data[i].children[j].name;
                that.editableTabs2.push(arr);
                that.homePageURL.push(arr);
                that.cureentName = that.editableTabs2[0].title;
                that.editableTabsValue2 = that.editableTabs2[0].name;
              }
              console.log(that.editableTabs2);

            }
            that.clickTab({ label: that.editableTabs2[0].title });
            // that.homePageShow('homepage');

            if (res.data[i].key == 'homepage' && res.data[i].children.length > 0) {
              that.homepageShow = true;
            } else if (res.data[i].key == 'dubantask' && res.data[i].children.length > 0) {
              that.dubantaskShow = true;
              that.reportformShow = false;
              that.basesetShow = false;
              that.systemShow = false;
            } else if (res.data[i].key == 'reportform' && res.data[i].children.length > 0) {
              that.reportformShow = true;
              that.basesetShow = false;
              that.systemShow = false;
            } else if (res.data[i].key == 'baseset' && res.data[i].children.length > 0) {
              that.basesetShow = true;
              that.systemShow = false;
            } else if (res.data[i].key == 'systemmanagement' && res.data[i].children.length > 0) {
              that.systemShow = true;
            }
            that.getOngoingNum();

          }

          setTimeout(() => {
            // 页面打开，首页高亮
            $('.homepage').find('span').css('color', 'white');
            $('.homepage').css('background', '#297ACC');
          }, 0);
        }
      }, "get", false);
    },
    // 获取各首页进行中数量
    getOngoingNum() {
      var that = this;
      that.$common.commitParam(this, "/supervise/portal/ongoingCount.api", {}, {
        success: function (res) {
          console.log(res);

          for (let i = 0; i < that.editableTabs2.length; i++) {
            if (that.editableTabs2[i].title == '公司首页') {
              that.$set(that.editableTabs2[i], 'Num', res.data.gshomepage);
            } else if (that.editableTabs2[i].title == '水务总部首页') {
              that.$set(that.editableTabs2[i], 'Num', res.data.sbkhomepage);
            } else if (that.editableTabs2[i].title == '粤海集团首页') {
              that.$set(that.editableTabs2[i], 'Num', res.data.jthomepage);
            } else if (that.editableTabs2[i].title == '审计整改') {
              that.$set(that.editableTabs2[i], 'Num', res.data.sjhomepage);
            }

          }
          // console.log(that.editableTabs2);
        }
      }, "get");
    },
    // 点击一级菜单获取二级菜单
    getSecondMenus(key) {
      this.firstKey = key;
      this.treeBGColorChange = 1;
      this.firstBreadCrumb.name = $('.' + key).find('span').text();
      this.firstBreadCrumb.level = '1';
      // this.homePageShow(key);


      this.BGChange(key);

      if (key == 'homepage') {
        this.editableTabs2 = this.homePageURL;
        this.cureentName = this.editableTabs2[0].title;
        this.editableTabsValue2 = '1';
      }

      if (key != 'homepage') {
        this.asideShow = true;
        this.tabsClose = true;

        $('.el-tabs__header').css('margin-left', '210px');
        $('.el-tabs__header').css('display', 'none');
        $('.main-footer').css('display', 'none');
        // $('.breadcrumb').css('padding-left', '14.8%');
        this.loadaside(key);
        if (document.body.clientWidth > 1366) {
          this.$refs.sectionLeft.paddingLeft = '217px';
        } else {
          this.$refs.sectionLeft.paddingLeft = '16%';
        }
      } else {
        this.loadaside(key);
        this.asideShow = false;
        this.tabsClose = false;
        $('.el-tabs__header').css('margin-left', '0px');
        $('.el-tabs__header').css('display', 'block');
        $('.main-footer').css('display', 'block');
        // $('.breadcrumb').css('padding-left', '1.5%');
        this.$refs.sectionLeft.paddingLeft = '0px';
        this.$router.push('index?type=GS');
        this.editableTabs2 = this.homePageURL;
        // console.log(this.url);
      }
      // var that = this;
      // this.$common.commitParam(this, "/supervise/sys/menus.api", { 'key': key }, {
      //   success: function (res) {
      //    ;
      //   }
      // }, "get", false);

      // 打开第一个二级菜单的第一个子菜单
      // this.handleClick();


    },
    // 一级菜单点击高亮
    BGChange(key) {

      let highLight = ['homepage', 'dubantask', 'reportform', 'baseset', 'systemmanagement'];
      for (let i = 0; i < highLight.length; i++) {
        let j = i
        if (key == highLight[j]) {
          $('.' + key).find('span').css('color', 'white');
          $('.' + key).css('background', '#297ACC');
          $('.' + key).hover(function () {
            $(this).css('background', '#297ACC');
            $(this).find('span').css('color', 'white');
          }, function () {
            $(this).css('background', '#297ACC');
            $(this).find('span').css('color', 'white');
          })
        } else {
          // debugger
          $('.' + highLight[j]).find('span').css('color', '#0253a4');
          $('.' + highLight[j]).css('background', 'white');
          $('.' + highLight[j]).hover(function () {
            $(this).css('background', '#297ACC');
            $(this).find('span').css('color', 'white');
          }, function () {
            $(this).css('background', 'white');
            $(this).find('span').css('color', '#0253a4');
          })
        }

      }
    },
    //点击获取水司名称
    setOption(id) {

      let highLight = ['homepage', 'dubantask', 'reportform', 'baseset', 'systemmanagement'];
      for (let i = 0; i < highLight.length; i++) {
        if (highLight[i].indexOf('homepage') > -1) {
          $('.homepage').find('span').css('color', 'white');
          $('.homepage').css('background', '#297ACC');
          $('.breadcrumb').css('padding-left', '1%');
        } else {
          $('.' + highLight[i]).find('span').css('color', '#0253a4');
          $('.' + highLight[i]).css('background', 'white');
          $('.breadcrumb').css('padding-left', '1%');
        }

      }
      console.log(id);
      var that = this;
      that.asideShow = false;
      this.$common.commitParam(this, "/supervise/sys/switchCompany.api", { 'regId': id }, {
        success: function (res) {
          // that.supervisionTaskType = 'GS'
          // let baitiao = { label: '公司首页' };
          // let baitiao1 = { label: '集团首页' };
          // that.clickTab(baitiao1);
          // // this.editableTabsValue2 = '1';
          // setTimeout(() => {
          //   that.clickTab(baitiao);
          //   // this.editableTabsValue2 = '2';
          // }, 0);
          //;
          that.editableTabs2 = [];
          that.homePageURL = [];
          that.getFirstMenus();
          $('.el-tabs__header').css('display', 'block');

        }
      }, "get");
      $('.el-tabs__header').css('margin-left', '0px');
      // that.$router.push('/index');
      // this.userinfo();
      // this.getFirstMenus();
    },
    // 首页子菜单数量为1时，隐藏白条
    // homePageShow(firstMenu) {
    //   var that = this;
    //   // console.log(firstMenu);
    //   console.log(that.editableTabs2);
    //   if (that.editableTabs2.length == 1 && firstMenu == 'homepage') {
    //     $('.el-tabs__nav').hide();
    //     $('.is-top').css('height', '5.5%')
    //   } else {
    //     $('.el-tabs__nav').show();
    //   }
    // },
    // 移除tab(顶部白条小窗口)
    removeTab(targetName) {
      var tabs = this.editableTabs2;
      var activeName = this.editableTabsValue2;
      // return;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue2 = activeName;
      this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);

      var val = "";
      for (var i = 0; i < this.editableTabs2.length; i++) {
        if (this.editableTabsValue2 == this.editableTabs2[i].name) {
          val = this.editableTabs2[i].title;
        }
      }
      for (var i = 0; i < this.url.length; i++) {
        for (var j = 0; j < this.portal.length; j++) {
          var obj = this.portal[j];
          if (val === obj.name) {
            // this.$router.push('index?type=' + obj.type);
            this.$router.push('index');
          } else if (val == this.url[i].name) {
            this.$router.push(this.url[i].url);
          }
        }
        this.cureentName = val
      }
    },

    // 点击白条按钮
    clickTab(targetName) {
      // console.log(this.allMenuList);
      // console.log(targetName);
      if (targetName.label == '公司首页') {
        this.alltaskBreadcrumb.item1 = '公司督办'
      } else {
        this.alltaskBreadcrumb.item1 = targetName.label;
      }

      let key;

      // 点击使所在的一级菜单高亮
      for (let i = 0; i < this.allMenuList.length; i++) {
        for (let j = 0; j < this.allMenuList[i].children.length; j++) {
          if (this.allMenuList[i].children[j].name == targetName.label) {
            this.BGChange(this.allMenuList[i].key);
            key = this.allMenuList[i].key;
          } else {
            // console.log(this.allMenuList[i].children[j].children);
            if (this.allMenuList[i].children[j].children !== undefined) {
              for (let k = 0; k < this.allMenuList[i].children[j].children.length; k++) {
                if (this.allMenuList[i].children[j].children[k].name == targetName.label) {
                  this.BGChange(this.allMenuList[i].key);
                  key = this.allMenuList[i].key;
                }

              }
            }
          }

        }
      }
      var that = this;


      that.$common.commitParam(this, "/supervise/sys/menus.api", { 'key': key }, {
        success: function (res) {
          //;

          //获取左侧树数据
          that.menuData = res.data[0].children;
          that.menuData = JSON.parse(JSON.stringify(that.menuData).replace(/name/g, "label"));
          // console.log(that.menuData);



          for (var i = 0; i < res.data.length; i++) {
            for (var j = 0; j < res.data[i].children.length; j++) {
              var url = res.data[i].children[j].key;
              var name = res.data[i].children[j].name;
              that.url.push({ url, name });
              // console.log(res.data[i].children[j].children);
              if (res.data[i].children[j].children != undefined) {
                for (let k = 0; k < res.data[i].children[j].children.length; k++) {
                  var url = res.data[i].children[j].children[k].key;
                  var name = res.data[i].children[j].children[k].name;
                  that.url.push({ url, name });

                }
              }
            }
          }
        }
      }, "get");



      // var obj = that.portal[targetName.index];
      // console.log(that.portal[targetName.index]);


      let supervisionTaskType;
      if (targetName.label == '粤海集团首页') {
        supervisionTaskType = 'JT'
        that.supervisionTaskType = 'JT'
      } else if (targetName.label == '公司首页') {
        supervisionTaskType = 'GS'
        that.supervisionTaskType = 'GS'
      } else if (targetName.label == '审计整改') {
        supervisionTaskType = 'SJ'
        that.supervisionTaskType = 'SJ'
      } else if (targetName.label == '水务总部首页') {
        supervisionTaskType = 'SBK'
        that.supervisionTaskType = 'SBK'
      }

      if (supervisionTaskType != null && typeof (supervisionTaskType) !== "undefined") {
        that.$router.push('index?type=' + supervisionTaskType);
      } else {
        for (var i = 0; i < that.url.length; i++) {
          if (targetName.label == that.url[i].name) {
            that.$router.push(that.url[i].url)
          }
        }
      }
      that.cureentName = targetName.label;

      let item = {};
      for (let i = 0; i < that.allMenuList.length; i++) {
        for (let j = 0; j < that.allMenuList[i].children.length; j++) {
          if (that.allMenuList[i].children[j].name == targetName.label) {
            this.firstBreadCrumb.name = that.allMenuList[i].name;
            this.firstBreadCrumb.level = '1';
            item.label = that.allMenuList[i].children[j].name;
            item.level = that.allMenuList[i].children[j].level;
            if (supervisionTaskType != null && typeof (supervisionTaskType) !== "undefined") {
              item.key = 'index?type=' + supervisionTaskType;
            } else {
              item.key = that.allMenuList[i].children[j].key;
            }
            break;
          } else if (that.allMenuList[i].children[j].children != undefined) {
            for (let k = 0; k < that.allMenuList[i].children[j].children.length; k++) {
              if (that.allMenuList[i].children[j].children[k].name == targetName.label) {
                this.firstBreadCrumb.name = that.allMenuList[i].name;
                item.label = that.allMenuList[i].children[j].children[k].name;
                item.level = that.allMenuList[i].children[j].children[k].level;
                if (supervisionTaskType != null && typeof (supervisionTaskType) !== "undefined") {
                  item.key = 'index?type=' + supervisionTaskType;
                } else {
                  item.key = that.allMenuList[i].children[j].children[k].key;
                }
                break;
              }

            }
          }

        }

      }


      if (that.num > 3) {
        that.breadcrumbChange(item);
      }
      that.num++;
    }
  }
}
</script>

<style lang="scss">
$backgroundColor: #297acc;
$font-color: #297acc;
$theme-bg-color: #eaf4ff;
$color: white;

.el-menu {
  border-right: none !important;
}
.el-menu-item:hover {
  outline: 0;
  color: #3193f5;
  background-color: transparent;
  // color: white;
}
.el-menu-item.is-active {
  background: #297acc;
  color: #fff;
}
.el-menu-item.is-active:hover {
  color: #fff;
}
.el-menu .el-menu-item,
.el-submenu__title {
  height: 38px !important;
  line-height: 38px !important;
}
html {
  height: 100%;
  width: 100%;
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  height: 100%;
}

ul,
ol {
  margin: 0;
  padding: 0;
}

ul li {
  list-style: none;
}

a {
  text-decoration: none;
}

.el-tree-node__expand-icon {
  height: 38px;
  position: absolute;
  right: 23px;
  // top: -6px;
  line-height: 38px;
  color: #333;
  // padding:.12rem 0;
}
.el-tree-node__label {
  font-size: 0.14rem !important;
  padding: 0 40px;
}
.main .section .el-tabs__header {
  background: #f5f7fa;
}
.main .section .el-tabs__nav-scroll {
  // background: #f5f7fa;
  border-top: 1px solid #dcefe6;
  // border-bottom: 1px solid #dcefe6;
  .el-tabs__nav {
    border: 0;
  }
}
.main .section .el-tabs__item {
  border: 0;
  // border-bottom: 1px solid #dcefe6;
}
.main .section .el-tabs .el-tabs__item:not(:first-child) {
  border-left: 1px solid #ccc;
}
.main .section .is-active {
  background: #fff;
  border: 0;
}
.main .aside .el-tree-node__content {
  height: 0.38rem;
}
.main:first-child {
  // overflow: hidden;
  // border-bottom: 0.1rem solid #eaf4ff;
  // border-right: 0.1rem solid #eaf4ff;
  box-sizing: border-box;
  overflow-y: hidden;
}

.main .header {
  background: $backgroundColor;
  // padding: 0.1rem;
  line-height: 0.38rem !important;
  height: 0.38rem;
  // overflow: hidden;
}
.main .header .el-input__inner {
  line-height: 0.26rem;
}

.main .logo {
  height: 0.35rem;
  width: 1.6rem;
  display: block;
  padding-top: 0px;
  float: left;
  vertical-align: middle;
  line-height: 0px;
  margin-top: -3px;
}
.main .el-tabs--border-card {
  box-shadow: none;
  border-radius: 2px;
}
.main .name {
  height: 0.35rem;
  width: 1.1rem;
  padding-top: 0px;
  padding-left: 0.3rem;
  float: left;
  display: block;
  font-size: 0.16rem;
}

.main .name .line {
  width: 2px;
  height: 0.26rem;
  background-color: rgba(255, 255, 255, 0.5);
  float: left;
  margin-top: 8px;
}

.main .name h2 {
  margin-left: 0.3rem;
}

.main .first_menu {
  width: 5rem;
  height: 0.6rem; // background-color: pink;
  position: absolute;
  left: 4.3rem;
  top: 0px;
  display: flex;
}

.main .first_menu div {
  flex: 1;
  text-align: center;
  opacity: 0.7;
  cursor: pointer;
}

.main .first_menu .homepage {
  flex: 0.75;
  text-align: center;
  opacity: 0.7;
  cursor: pointer;
}

.main .first_menu .shouye {
  flex: 0.7;
  text-align: center;
  opacity: 0.7;
  cursor: pointer;
}

.main .first_menu div:hover {
  text-align: center;
  opacity: 1;
  cursor: pointer;
}

.main .first_menu .shouye:hover {
  flex: 0.7;
  text-align: center;
  opacity: 1;
  cursor: pointer;
}

.main .first_menu div img {
  display: block;
  margin-left: 0px;
  margin-top: 0.14rem;
  width: 0.28rem;
  height: 0.28rem;
}

.main .first_menu div span {
  position: absolute;
  color: white;
  line-height: 0.6rem;
  font-size: 0.16rem;
}

.main .clear:after {
  content: "";
  display: block;
  clear: both;
}

.main .uesrinfo {
  float: right;
  font-size: 0.14rem;
  color: #fff;
  padding-right: 0.16rem;
}

.main .uesrinfo .shuisi {
  width: 1rem;
  height: 0.3rem;
  border: 1px #fff solid;
  display: inline-block;
  border-radius: 0.2rem;
  vertical-align: middle;
  line-height: 0.3rem;
}

.main .uesrinfo .shuisi span {
  width: 0.6rem;
  height: 0.3rem;
  display: inline-block;
  text-align: center;
  margin-left: 0.13rem;
}

.main .uesrinfo .shuisi .triangle {
  display: inline-block;
  width: 0;
  height: 0;
  border-width: 5px 0 5px 5px;
  border-style: solid;
  border-color: transparent transparent transparent white;
}

.main .uesrinfo .usermsg {
  display: inline-block;
  // width: 0.8rem;
  height: 0.3rem;
  vertical-align: middle;
  margin-left: 0.15rem; // text-align: center;
  // border: 1px #fff solid;
  // background-color: pink;
}

.main .uesrinfo .usermsg img {
  background: url(../../static/imgs/index/l_1.png) no-repeat -4px -5px;
  display: inline-block;
  width: 0.28rem;
  height: 0.22rem;
  border-radius: 0.15rem;
}

.main .uesrinfo .usermsg span {
  // background-color: green;
  // position: absolute;
  height: 0.3rem;
  // width: 100px;
  line-height: 0.3rem;
  text-align: center;
  font-size: 0.14rem;
}

.main .uesrinfo .news {
  // margin-top: 0.1rem;
  vertical-align: middle;
  margin-left: 0.15rem;
  width: 0.18rem;
  height: 0.18rem;
}

.main .uesrinfo a {
  text-decoration: none;
  color: #fff;
}

.main .uesrinfo a:hover {
  color: #ff8000;
}

.main .username {
  color: #ff8000;
  font-weight: bold;
}

.main .aside {
  float: left;
  height: calc(100% - 0.9rem);
  overflow-y: hidden;
  overflow-x: hidden;
  border-right: 0.1rem solid #eaf4ff;
  border-left: 0.1rem solid #eaf4ff;
  // border-bottom: 0.1rem solid #eaf4ff;
  margin-top: 0.1rem;
}

.main #table {
  width: 2rem;
  height: 100%;
  overflow-y: scroll;
  background: #fff;
}

.main #table img {
  width: 0.128rem;
  height: 0.144rem;
}

.main .left {
  background-color: #f5f5f5;
  width: 2rem;
}

.main .home {
  width: 2rem;
  height: 0.3rem;
}

.main .home:hover {
  width: 2rem;
  height: 0.3rem;
  background-color: #b9c9e1;
  cursor: pointer;
}

.main .left .icon {
  height: 0.16rem;
  width: 0.16rem;
  margin-left: 0.15rem;
  float: left;
  margin-top: 8px;
  padding-left: 2px;
}

.main .left .txt {
  height: 0.16rem;
  margin-left: 0.15rem;
  float: left;
  margin-top: 8px;
  font-size: 0.12rem;
  color: #32425c;
  font-weight: bold;
  display: block;
}

.main .one {
  width: 2rem;
  height: 0.3rem;
  background-image: url(../../static/imgs/aside/one.png);
  float: left;
}

.main .one .icon2 {
  height: 0.16rem;
  width: 0.16rem;
  margin-left: 0.1rem;
  float: left;
  margin-top: 8px;
  padding-left: 0.15rem;
  padding-right: 0.2rem;
  background-color: #f5f5f5;
}

.main .one .txt2 {
  height: 0.16rem;
  width: 0.7rem;
  float: left;
  margin-top: 8px;
  font-size: 17px;
  color: #666666;
  font-weight: bold;
  display: block;
  background-color: #f5f5f5;
}

.main .b {
  background-color: #f5f5f5; // height: 0.3rem;
  width: 2rem;
  font-size: 0.15rem;
  line-height: 0.3rem;
  margin-left: 0px;
  float: left;
}

.main .b:hover {
  background-color: #b9c9e1;
  height: 0.3rem;
  width: 2rem;
  font-size: 0.15rem;
  line-height: 0.3rem;
  margin-left: 0px;
  float: left;
  cursor: pointer;
}

.main .b_txt {
  color: #42587a;
  font-size: 0.15rem;
  padding-left: 0.7rem;
}

.main .c {
  background-color: #f5f5f5;
  height: 0.3rem;
  width: 2rem;
  font-size: 0.13rem;
  line-height: 0.3rem;
  margin-left: 0px;
  float: left;
}

.main .c:hover {
  background-color: #b9c9e1;
  height: 0.3rem;
  width: 2rem;
  font-size: 0.13rem;
  line-height: 0.3rem;
  margin-left: 0px;
  float: left;
  cursor: pointer;
}

.main .c_txt {
  color: #42587a;
  font-size: 0.13rem;
  padding-left: 0.84rem;
}

/* section */

// .main .section {
//   // padding-left: 217px;
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// .main .el-tabs__nav .el-tabs__item:nth-child(1) span {
//   display: none;
// }

.main
  .el-tabs--card
  > .el-tabs__header
  .el-tabs__item:nth-child(1).is-closable:hover {
  // padding-left: 0.2rem;
  // padding-right: 0.2rem;
}
.el-submenu__title {
  font-size: 14px;
}
.el-menu-item {
  font-size: 13px;
}
.el-menu-item:focus {
  color: #ffffff;
}
.el-menu-item:hover {
  color: #3193f5;
}
.el-menu-vertical-demo .el-menu-item {
  font-weight: bolder;
}
.el-submenu__title span {
  // font-weight: bolder;
  font-family: "microsoft yahei";
}
.el-submenu__title {
  font-weight: bolder;
}

.el-tabs__nav {
  // border: none;
}

.is-top {
  // overflow: hidden;
  // // height: 6%;
  // background: #fff;
}
.first_box {
  width: 99%;
  height: 0.3rem;
  // border: 1px solid red;
  font-size: 0.12rem;
  padding-left: 5px;
}
.first_box .menu {
  height: 100%;
  // text-align: center;
  // vertical-align: middle;
}
.first_box .menu span {
  font-size: 0.14rem;
  color: #0253a4;
  display: inline-block;
  padding: 8px 0.15rem;
  height: 0.24rem;
  font-size: 0.13rem;
  line-height: 6px;
  font-weight: bolder;
  &:hover {
    color: $color;
  }
}
.first_box .menu div {
  display: inline-block;
  // width: 6%;
  // height: 80%;
  background: white;
  text-align: center;
  border-radius: 3px;
  border: 1px solid white;
  cursor: pointer;
  height: 0.24rem;
  margin-top: 3px;
  &:hover {
    background: $backgroundColor;
  }
}

.rectangle {
  width: 100%;
  height: 0.1rem;
  background: #eaf4ff;
}
.breadcrumb {
  height: 6.1%;
  // width: 80%;
  padding-left: 14.8%;
  background: white;
  border-bottom: 1px solid #efefef;
  margin-bottom: 1%;
}
.el-breadcrumb {
  font-size: 0.16rem !important;
  line-height: 2.5 !important;
}
.breadcrumb1 {
  height: 6.1%;
  background: white;
  border-bottom: 1px solid #efefef;
  .el-button {
    position: absolute;
    top: 0.07rem;
    left: 0.1rem;
    color: black;
    background: white;
    border-color: #d3d4d6;
  }
  .el-button:hover {
    color: black;
    background: white;
    border-color: #d3d4d6;
  }
  .el-breadcrumb {
    font-size: 0.16rem !important;
    line-height: 2.5 !important;
    padding-left: 5%;
  }
}
@media (min-width: 100.24rem) and (max-width: 1366px) {
  .main .aside {
    width: 16%;
  } // .main .section {
  //   padding-left: 16%;
  // }
}

.uesrinfo .systemmanagement {
  width: 0.3rem;
  height: 0.3rem;
  vertical-align: middle;
  margin-right: 0.2rem;
  opacity: 0.7;
  cursor: pointer;
}

.uesrinfo .systemmanagement:hover {
  width: 0.3rem;
  height: 0.3rem;
  vertical-align: middle;
  margin-right: 0.2rem;
  opacity: 1;
  cursor: pointer;
}

.main .header .el-select .el-input__inner {
  border-radius: 4px;
  width: 1rem;
  background-color: #ffffff;
  border: white 1px solid;
  color: #000000;
  font-size: 0.12rem;
  height: 0.28rem;
}
.el-tree-node__content {
  font-weight: bold;
}
.main .el-tree-node.is-current > .el-tree-node__content {
  background-color: #297acc !important;
  color: white;
}
.el-tabs--card > .el-tabs__header {
  // border: none;
  // border-bottom: 1px solid #eaf4ff;
}
.el-tabs--card > .el-tabs__header .el-tabs__item.is-active.is-closable {
  // background-color: #fff;
  // height: 0.4rem;
  // font-size: 0.16rem;
  // line-height: 0.4rem;
}
.main .el-tabs--card > .el-tabs__header .el-tabs__item {
  // font-size: 0.16rem;
  // height: 0.4rem;
  // line-height: 0.4rem;
}
// .el-tabs__nav-wrap {
//   margin-bottom: 0;
//   height: 100%;
//   .el-tabs__nav-scroll {
//     height: 100%;
//     .el-tabs__nav {
//       height: 100%;
//     }
//   }
// }
// .el-tabs__item{
//   border-right: none;
// }
.el-tabs--card > .el-tabs__header .el-tabs__item {
  // border: none;
}
.el-tabs--card > .el-tabs__header .el-tabs__nav {
  // border: none;
}
.section {
  border: 0.1rem solid #eaf4ff;
  // border-bottom: none;
  background: white !important;
}
.el-tabs__header {
  // height: 0.38rem;
}
.el-tabs--border-card > .el-tabs__header {
  // height: 0.4rem;
}
.body .el-tabs__header {
  // height: 0.4rem;
}
.tabs {
  background-color: #fff;
}
.el-tabs {
  .el-tabs__content {
    background-color: #fff;
  }
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #ffffff;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  /*-ms-scrollbar-face-color: #3193F6;*/
  background-color: #e3e4e6;
  /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);;*/
}
::-webkit-scrollbar-track {
  /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);*/
  border-radius: 5px;
  background-color: #fff;
}
.v-modal {
  z-index: 999 !important;
}
.el-table {
  .el-table__body {
    .el-button--text {
      height: 38px;
      line-height: 38px;
      padding: 0px !important;
    }
  }
}
.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  font-size: 0.14rem; //表格的字体大小
}
.searchBox span {
  font-size: 0.14rem;
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #f5f5f5;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item {
  // margin: -1px;
  // box-sizing: border-box;
  // color: #909399;
  // height: 103%;
  // background: #e9edf1;
  // font-size: 0.14rem;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  // border-top: 3px solid #409eff;
}
.main .el-pager li,
.main .el-pagination .btn-next,
.main .el-pagination .btn-prev,
.main .el-pagination button:disabled,
.main .el-input__inner {
  background: #fff;
}
.main .el-range-editor--mini .el-range-input {
  background: #fff;
}
.el-message.el-message--error > i,
.el-message,
.el-message--warning {
  font-size: 0.16rem;
}
.el-message__icon.el-icon-info,
.el-message__icon.el-icon-success {
  font-size: 0.16rem;
}
.el-button--primary,
.el-button--primary:hover {
  color: #f8fafe;
  background: #297acc;
  // background: #47b5e8;
  border-color: #d3d4d6;
}
.el-dialog__title {
  font-size: 700;
}
.el-dialog__header {
  padding: 16px 30px 16px !important;
  font-size: 0.16rem !important;
  font-weight: 700 !important;
  border-bottom: 1px solid #ebeef5;
  // margin-bottom:0.1rem !important;
}
.el-dialog__footer {
  border-top: 1px solid #efefef;
  padding: 10px 20px 10px;
}
.topbtn,
.searchBtn {
  color: #fff;
  background: #faa646 !important;
  border-color: #faa646 !important;
}

.el-dialog__footer .el-button {
  width: 0.9rem !important;
  height: 0.38rem !important;
}
// .el-button:focus, .el-button:hover{
//   background: #fff;
// }
.main-footer {
  border: 0.1rem solid #eaf4ff;
  border-top: 0;
  border-bottom: 0;
  height: 60px;
  background: #297acc;
  div {
    width: 200px;
    height: 40px;
    margin: auto;
    position: relative;
    img {
      height: 40px;
      width: 200px;
      position: absolute;
      top: 5px;
    }
  }
}
#homepageTableDiv {
  background-color: white;
  // width: calc(100% - 0.2rem);
  width: 100%;
  position: absolute;
  top: 0.38rem;
  height: calc(100% - 0.38rem);
  z-index: 2000;
  overflow: hidden;
  box-sizing: border-box;
  border: 0.1rem solid #eaf4ff;
  .alltask {
    height: 93%;
  }
  .searchBox {
    font-size: 0.16rem;
    padding-top: 0.2rem;
  }
  #tableBox {
    height: calc(100% - 45px);
  }
  .block .el-pagination {
    height: 0.38rem;
  }
}
.pending1 .taskinfo {
  .el-tabs__content {
    height: 98% !important;
  }
}
.mytask .taskinfo {
  .el-tabs__content {
    height: 98% !important;
  }
}
.alltask .taskinfo {
  .el-tabs__content {
    height: 98% !important;
  }
}
.el-tooltip__popper {
  max-width: 60%;
}
// .homepageTableDiv .el-select-dropdown {
//   z-index: 10000 !important;
// }
</style>
