import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      "path":'/',
      meta: {
        title: '首页'
      },
      component: resolve => require(['@/components/main'], resolve)
    },
    {
      path: '/login',
      meta: {
        title: '登录'
      },
      component: resolve => require(['@/components/login'], resolve)
    },
    {
      path: '/approval',
      meta: {
        title: '任务内容'
      },
      component: resolve => require(['@/components/approval'], resolve)
    },
    {
      path: '/approvalForIndex',
      meta: {
        title: '首页待办审批详情'
      },
      component: resolve => require(['@/components/approvalForIndex'], resolve)
    },
    {
      path: '/reportApproval',
      meta: {
        title: '任务内容'
      },
      component: resolve => require(['@/components/reportApproval'], resolve)
    },
    {
      path: '/taskConfirm',
      meta: {
        title: '任务确认'
      },
      component: resolve => require(['@/components/taskConfirm'], resolve)
    },
    {
      path: '/',
      meta: {
        title: '主容器'
      },
      component: resolve => require(['@/components/main'], resolve),
      children:[
        {
          path: '/index',
          meta: {
            title: '首页'
          },
          component: resolve => require(['@/components/index'], resolve)
        },
        {
          path: '/taskregister',
          meta: {
            title: '下达列表'
          },
          component: resolve => require(['@/components/taskmanager/taskregister'], resolve)
        },
        {
          path: '/privilegeModification',
          meta: {
            title: '特权修改'
          },
          component: resolve => require(['@/components/taskmanager/privilegeModification'], resolve)
        },
        {
          path: '/ongong',
          meta: {
            title: '进行中'
          },
          component: resolve => require(['@/components/taskmanager/mytask'], resolve)
        },
        {
          path: '/complete',
          meta: {
            title: '已办结'
          },
          component: resolve => require(['@/components/taskmanager/mytask2'], resolve)
        },
        {
          path: '/myattention',
          meta: {
            title: '我的关注'
          },
          component: resolve => require(['@/components/taskmanager/myfocus'], resolve)
        },
        {
          path: '/alltaskquery',
          meta: {
            title: '所有任务'
          },
          component: resolve => require(['@/components/taskmanager/alltask'], resolve)
        },
        {
          path: '/alltaskUrge',
          meta: {
            title: '所有任务'
          },
          component: resolve => require(['@/components/taskmanager/alltaskUrge'], resolve)
        },
        {
          path: '/reportsubmit',
          meta: {
            title: '月报提交'
          },
          component: resolve => require(['@/components/taskmanager/monreportsub'], resolve)
        },
        {
          path: '/contact',
          meta: {
            title: '联络人修改'
          },
          component: resolve => require(['@/components/taskmanager/concatmodify'], resolve)
        },
        {
          path: '/privilegemodifi',
          meta: {
            title: '特权修改'
          },
          component: resolve => require(['@/components/taskmanager/privilegemodify'], resolve)
        },
        {
          path: '/myapply',
          meta: {
            title: '我的申请'
          },
          component: resolve => require(['@/components/myprocess/myapply'], resolve)
        },
        {
          path: '/todo',
          meta: {
            title: '待我审的'
          },
          component: resolve => require(['@/components/myprocess/mycheck'], resolve)
        },
        {
          path: '/launch',
          meta: {
            title: '我发起的'
          },
          component: resolve => require(['@/components/myprocess/mycheck1'], resolve)
        },
        {
          path: '/approvalhis',
          meta: {
            title: '我已审的'
          },
          component: resolve => require(['@/components/myprocess/mycheck2'], resolve)
        },
        {
          path: '/jtmonthreport',
          meta: {
            title: '集团月汇报'
          },
          component: resolve => require(['@/components/taskreport/taskcheckout'], resolve)
        },
        {
          path: '/gsmonthreport',
          meta: {
            title: '供水月汇报'
          },
          component: resolve => require(['@/components/taskreport/taskcheckout1'], resolve)
        },
        {
          path: '/taskremind',
          meta: {
            title: '任务提醒'
          },
          component: resolve => require(['@/components/taskreport/taskinfo'], resolve)
        },
        {
          path: '/statisticalanalysis',
          meta: {
            title: '统计分析'
          },
          component: resolve => require(['@/components/taskreport/tasksearch'], resolve)
        },
        {
          path: '/listassessment',
          meta: {
            title: '考核查询'
          },
          component: resolve => require(['@/components/taskassess/assesssearch'], resolve)
        },
        {
          path: '/deptassessment',
          meta: {
            title: '部门考核'
          },
          component: resolve => require(['@/components/taskassess/departassess'], resolve)
        },
        {
          path: '/artificialassessment',
          meta: {
            title: '人工考核'
          },
          component: resolve => require(['@/components/taskassess/manassess'], resolve)
        },
        {
          path: '/sourceofsupervision',
          meta: {
            title: '督办来源类型'
          },
          component: resolve => require(['@/components/basset/overseetype'], resolve)
        },
        {
          path: '/reportremind',
          meta: {
            title: '汇报提醒设置'
          },
          component: resolve => require(['@/components/basset/repremset'], resolve)
        },
        {
          path: '/dictionaryset',
          meta: {
            title: '数据字典设置'
          },
          component: resolve => require(['@/components/basset/dictionary'], resolve)
        },
        {
          path: '/config',
          meta: {
            title: '系统参数设置'
          },
          component: resolve => require(['@/components/basset/config'], resolve)
        },
        {
          path: '/assessmentrult',
          meta: {
            title: '考核规则定义'
          },
          component: resolve => require(['@/components/basset/checruledef'], resolve)
        },
        {
          path: '/logmanager',
          meta: {
            title: '日志管理'
          },
          component: resolve => require(['@/components/systemmanagement/logmanagement'], resolve)
        },
        {
          path: '/operationmanager',
          meta: {
            title: '菜单管理'
          },
          component: resolve => require(['@/components/systemmanagement/modelmanagement'], resolve)
        },
        {
          path: '/authoritymanager',
          meta: {
            title: '权限管理'
          },
          component: resolve => require(['@/components/systemmanagement/permisemanagement'], resolve)
        },
        {
          path: '/rolemanager',
          meta: {
            title: '角色管理'
          },
          component: resolve => require(['@/components/systemmanagement/rolemanagement'], resolve)
        },
        {
          path: '/userrole',
          meta: {
            title: '用户角色'
          },
          component: resolve => require(['@/components/systemmanagement/userrole'], resolve)
        },
        {
          path: '/userlist',
          meta: {
            title: '用户管理'
          },
          component: resolve => require(['@/components/systemmanagement/userlist'], resolve)
        },
        {
          path: '/companyList',
          meta: {
            title: '公司管理'
          },
          component: resolve => require(['@/components/systemmanagement/companyList'], resolve)
        },
        {
          path: '/listmessage',
          meta: {
            title: '短信列表'
          },
          component: resolve => require(['@/components/tasksms/smslist'], resolve)
        }
      ]
    },
    {
      path: '/alltaskinfo',
      meta: {
        title: '任务详情'
      },
      component: resolve => require(['@/components/alltaskinfo'], resolve)
    },
    {
      path: '/todo1',
      meta: {
        title: '待审批'
      },
      component: resolve => require(['@/components/approval'], resolve)
    },
    {
      path: '/taskreport',
      meta: {
        title: '待汇报'
      },
      component: resolve => require(['@/components/taskreport'], resolve)
    },
    {
      path: '/taskChange',
      meta: {
        title: '任务变更'
      },
      component: resolve => require(['@/components/taskChange'], resolve)
    },
    {
      path: '/taskJieXiang',
      meta: {
        title: '任务结项'
      },
      component: resolve => require(['@/components/taskJieXiang'], resolve)
    }
  ]
})
