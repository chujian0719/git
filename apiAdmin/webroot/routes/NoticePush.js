import NoticePush from '../components/nav/NoticePush'
import PushMessage from '../components/notice_push/PushMessage'

const NoticePushRoute = {
    path: "notice_push",
    component: NoticePush,
    childRoutes: [
        {
            path: "push_message",
            component: PushMessage
        }
    ]
}

export default NoticePushRoute;