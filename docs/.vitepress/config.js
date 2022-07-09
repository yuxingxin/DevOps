export default {
    lang: 'zh-CN',
    title: 'DevOps',
    description: 'Just playing around',
    lastUpdated: true,
    themeConfig: {
        setTitle: 'DevOps',
        nav: [
            { text: 'DevOps', link: '/' , activeMatch: '/'},
            { text: 'RxJava', link: 'https://devops.yuxingxin.com' }
        ],
        editLink: {
            pattern: 'https://github.com/yuxingxin/DevOps/edit/master/docs/:path',
            text: 'Edit this page on GitHub'
          },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/yuxingxin/DevOps' }
        ],
        footer: {
            message: 'Released under the CC BY 4.0 License.',
            copyright: 'Copyright © 2017-present yuxingxin'
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        sidebar: {
            '/': [
                {
                    text: 'Git知识',
                    collapsible: true,
                    items: [
                        { text: '介绍', link : '/git' },
                        { text: 'Git安装与配置', link : '/install' },
                        { text: 'Git基础操作', link : '/basic' },
                        { text: 'Git分支操作', link : '/branch' },
                        { text: 'Git标签操作', link : '/tag' },
                        { text: '附录', link : '/appendix' }
                    ]
                },
                {
                    text: '工作流',
                    collapsible: true,
                    items: [
                        { text: '介绍', link : '/workflow' },
                        { text: '集中式工作流', link : '/centralized' },
                        { text: '功能分支工作流', link : '/feature' },
                        { text: 'GitFlow工作流', link : '/gitflow' },
                        { text: 'Forking工作流', link : '/forking' }
                    ]
                },
                {
                    text: 'GitLab',
                    collapsible: true,
                    items: [
                        { text: '介绍', link : '/gitlab' },
                        { text: '账号注册', link : '/signup' },
                        { text: '个人主页', link : '/user-profile' },
                        { text: '群组主页', link : '/group-profile' },
                        { text: '项目主页', link : '/project-profile' },
                        { text: '问题/issue', link : '/issue' },
                        { text: '合并请求', link : '/merge-request' },
                        { text: '维基', link : '/wiki' },
                        { text: '代码片段', link : '/code-segment' }
                    ]
                },
                {
                    text: 'GitLab-CI',
                    collapsible: true,
                    items: [
                        { text: '介绍', link : '/ci' },
                        { text: '基本概念', link : '/concept' },
                        { text: 'Runner注册与配置', link : '/configuration' },
                        { text: '关键字介绍', link : '/keyword' }
                    ]
                }
            ]
        }
    }
}