import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};
export const registerRouter = {
    path: '/register',
    name: 'register',
    meta: {
        title: 'Register - 注册'
    },
    component: () => import('@/views/register.vue')
};
export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {
            path: 'home',
            title: '首页',
            name: 'home_index',
            component: () => import('@/views/home/home.vue')
        },
        {
            path: 'ownspace',
            title: '个人中心',
            name: 'ownspace_index',
            component: () => import('@/views/own-space/own-space.vue')
        },
        {
            path: 'message',
            title: '消息中心',
            name: 'message_index',
            component: () => import('@/views/message/message.vue')
        },
        {
            path: 'send',
            name: 'send',
            title: '送达详情',
            component: () => import('@/diplomas/send/send.vue')
        },
        {
            path: 'sendY',
            name: 'sendY',
            title: '送达详情',
            component: () => import('@/diplomas/send/sendY.vue')
        },
        {
            path: 'sendDip',
            name: 'sendDip',
            title: '发送文书',
            component: () => import('@/diplomas/send/sendDip.vue')
        },
        {
            path: 'sendDipY',
            name: 'sendDipY',
            title: '发送文书',
            component: () => import('@/diplomas/send/sendDipY.vue')
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/bookbuilding',
        name: 'bookbuilding',
        title: '立案登记',
        access: ['admin', 'judge', 'clerk'],
        component: Main,
        children: [
            {
                path: 'index',
                title: '立案登记',
                name: 'bookbuilding_index',
                component: () => import('@/views/bookBuilding/bookbuilding.vue')
            }
        ]
    },
    {
        path: '/caseManage',
        name: 'caseManage',
        title: '案件管理',
        access: ['admin', 'judge', 'clerk'],
        component: Main,
        children: [
            {
                path: 'index',
                title: '案件分配',
                name: 'caseManage_index',
                component: () => import('@/views/caseManage/caseManage.vue')
            },
            {
                path: 'connection',
                title: '案件关联',
                name: 'courtdate_connection',
                component: () => import('@/views/connection/connection.vue')
            }

        ]
    },
    {
        path: '/courtdate',
        name: 'courtdate',
        title: '庭审排期',
        access: ['admin', 'judge', 'clerk'],
        component: Main,
        children: [
            {
                path: 'index',
                title: '庭审排期',
                name: 'courtdate_index',
                component: () => import('@/views/courtDate/courtdate.vue')
            },
            {
                path: 'check',
                title: '排期确认',
                name: 'courtdate_check',
                component: () => import('@/views/courtDate/datecheck.vue')
            },

            {
                path: 'lock',
                title: '日期锁定',
                name: 'courtdate_lock',
                component: () => import('@/views/courtDate/datelock.vue')
            },
            {
                path: 'calendar',
                title: '排班日历',
                name: 'calendar',
                component: () => import('@/views/courtDate/calendar.vue')
            }
        ]
    },
    {
        path: '/diplomas',
        name: 'diplomas',
        title: '文书管理',
        access: ['admin', 'judge', 'clerk'],
        component: Main,
        children: [
            {
                path: 'dip',
                name: 'dip',
                title: '文书生成',
                component: () => import('@/diplomas/diplomas/dip.vue')
            },
            {
                path: 'sendM',
                name: 'sendM',
                title: '文件送达管理',
                component: () => import('@/diplomas/send/sendM.vue')
            },
            {
                path: 'SMS',
                name: 'SMS',
                title: '短信通知记录',
                component: () => import('@/diplomas/message/SMS.vue')
            }
        ]
    },
    {
        path: '/notice',
        title: '公告送达管理',
        name: 'notice',
        access: ['admin', 'judge', 'clerk'],
        component: Main,
        children: [
            {
                path: 'noticeM',
                title: '公告管理',
                name: 'noticeM',
                component: () => import('@/notice/noticeM.vue')
            }
        ]
    },
    {
        path: '/information',
        name: 'information',
        title: '信息管理',
        access: ['admin', 'judge', 'clerk'],
        component: Main,
        children: [
            {
                path: 'judgeInfo',
                name: 'judgeInfo',
                title: '法官信息库',
                component: () => import('@/information/judgeInfo/judgeInfo.vue')
            },
            {
                path: 'clerkInfo',
                name: 'clerkInfo',
                title: '书记员信息库',
                component: () => import('@/information/clerkInfo/clerkInfo.vue')
            },
            {
                path: 'litigantInfo',
                name: 'litigantInfo',
                title: '当事人信息库',
                component: () => import('@/information/litigantInfo/litigantInfo.vue')
            },
            {
                path: 'serviceInfo',
                name: 'serviceInfo',
                title: '送达专员信息库',
                component: () => import('@/information/serviceInfo/serviceInfo.vue')
            },
            {
                path: 'tribunalInfo',
                name: 'tribunalInfo',
                title: '法庭信息库',
                component: () =>
                    import('@/information/tribunalInfo/tribunalInfo.vue')
            },
            {
                path: 'caseInfo',
                name: 'caseInfo',
                title: '案件信息库',
                component: () => import('@/information/caseInfo/caseInfo.vue')
            },
            {
                path: 'evidence',
                name: 'evidence',
                title: '证据信息库',
                component: () => import('@/views/evidence/evidence.vue')
            },
            {
                path: 'templateM',
                title: '模板管理',
                name: 'templateM',
                component: () => import('@/information/template/templateM.vue')
            }
        ]
    },
    {
        path: '/step',
        name: 'step',
        title: '案件时间轴',
        access: ['admin', 'judge', 'clerk'],
        component: Main,
        children: [
            {
                path: 'index',
                title: '案件时间轴',
                name: 'step_index',
                component: () => import('@/views/step/step.vue')
            }
        ]
    },
    {
        path: '/litigantCaseInfo',
        name: 'litigantCaseInfo',
        title: '案件进展查询',
        access: ['litigant'],
        component: Main,
        children: [
            {
                path: 'index',
                title: '案件进展查询',
                name: 'litigantCaseInfo_index',
                component: () => import('@/views/litigant/litigantCaseInfo.vue')
            }
        ]
    },
    {
        path: '/litigantEvidence',
        name: 'litigantEvidence',
        title: '在线提交材料',
        access: ['litigant'],
        component: Main,
        children: [
            {
                path: 'index',
                title: '在线提交材料',
                name: 'litigantEvidence_index',
                component: () => import('@/views/litigant/litigantEvidence.vue')
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    registerRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
