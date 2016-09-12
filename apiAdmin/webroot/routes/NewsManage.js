import NewsManage from '../components/nav/NewsManage'
import NewsManage_list from '../components/news_manage/List'

const NewsManageRoute = {
    path: "news_manage",
    component: NewsManage,
    childRoutes: [
        {
            path: "list",
            component: NewsManage_list
        }
    ]
}

export default NewsManageRoute;