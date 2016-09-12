var Nav = {
    notice_push: {
        title: "公告推送",
        url: "/notice_push/push_message",
        level: "nav-first-level",
        icon: "fa fa-th-large",
        subs: [
            {
                title: "推送消息",
                url: "/notice_push/push_message",
                level: "nav-second-level",
                icon: "fa fa-th-large"
            }
        ]
    },
    advert_put: {
        id: "advertPut",
        title: "广告投放",
        url: "/advert_put",
        level: "nav-first-level",
        icon: "fa fa-th-large"
    },
    order_manage: {
        id: "orderManage",
        title: "订单管理",
        url: "/order_manage/list",
        level: "nav-first-level",
        icon: "fa fa-th-large",
        subs: [
            {
                id: "list",
                title: "订单列表",
                url: "/order_manage/list"
            }
        ]
    },
    news_manage: {
        id: "newsManage",
        title: "新闻管理",
        url: "/news_manage/list",
        level: "nav-first-level",
        icon: "fa fa-sitemap",
        subs: [
            {
                title: "新闻列表",
                url: "/news_manage/list",
                level: "nav-second-level",
                icon: "fa fa-sitemap"
            }
        ]
    },
    member_manage: {
        id: "memberManage",
        title: "会员管理",
        url: "/member_manage",
        level: "nav-first-level",
        icon: "fa fa-cubes",
        subs: [
            {
                id: "stocklist",
                title: "仓库列表",
                url: "/stockmgr/list",
                level: "nav-second-level",
                icon: "fa fa-cubes",
                subs: [
                    {
                        id: "edit",
                        title: "编辑",
                        url: "/stockmgr/list/edit"
                    }
                ]
            }
        ]
    }

}

export default Nav;