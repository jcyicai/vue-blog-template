// 按需全局引入 vant组件
import Vue from 'vue'
import { 
    Button, 
    List, 
    Cell, 
    Tabbar, 
    TabbarItem, 
    NavBar, 
    Swipe, 
    SwipeItem, 
    Lazyload, 
    Col, 
    Row, 
    Image as VanImage, 
    Step, 
    Steps, 
    Dialog, 
    Notify,
    Field,
    Form,
    Skeleton  
} from 'vant'

Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(NavBar)
Vue.use(Swipe).use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Col)
Vue.use(Row)
Vue.use(VanImage)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Dialog)
Vue.use(Notify)
Vue.use(Field)
Vue.use(Form)
Vue.use(Skeleton)