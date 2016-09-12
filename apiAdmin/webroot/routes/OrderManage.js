import OrderManage from '../components/nav/OrderManage'
import OrderManage_list from '../components/order_manage/List'

const OrderManageRoute = {
    path: "order_manage",
    component: OrderManage,
    childRoutes: [
        {
            path: "list",
            component: OrderManage_list
        }
    ]
}

export default OrderManageRoute;