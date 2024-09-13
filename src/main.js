import {createApp} from 'vue'
import App from './App.vue'
import {Grid, GridItem, List, NoticeBar, Search} from 'vant';
import {Icon} from 'vant';
import {Loading} from 'vant';
import {Image as VanImage} from 'vant';
import router from './router.js'
import './assets/main.css'
import 'vant/lib/index.css';
import 'animate.css';
import '@chinese-fonts/dyh/dist/SmileySans-Oblique/result.css';
import '@chinese-fonts/dymh/dist/DouyinSansBold/result.css';
import {Divider} from 'vant';
import {Col, Row} from 'vant';
import {NavBar} from 'vant';
import {Progress} from 'vant';
import {Form, Field, CellGroup, Cell, SwipeCell} from 'vant';
import {Button} from 'vant';
import {Toast} from 'vant';
import {Popup} from 'vant';
import {Overlay} from 'vant';
import {Checkbox, CheckboxGroup} from 'vant';
import {Collapse, CollapseItem} from 'vant';
import {Dialog} from 'vant';
import axios from "axios";
import {PullRefresh} from 'vant';
import {Pagination} from 'vant';
import {Circle} from 'vant';
import {Badge} from 'vant';
import {Tabbar, TabbarItem} from 'vant';
import {ConfigProvider} from 'vant';
import {Card} from 'vant';
import {Tag} from 'vant';
import {DropdownMenu, DropdownItem} from 'vant';
import {Swipe, SwipeItem} from 'vant';
import {RadioGroup, Radio} from 'vant';
import {Switch} from 'vant';
import {configure} from "@/config/config";
// 千万不要从idea的提示里安装缺少的依赖，否则后果会很严重！！！


const app = createApp(App);

configure()

app.use(Radio);
app.use(RadioGroup);
app.use(Swipe);
app.use(SwipeItem);
app.use(ConfigProvider);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Badge);
app.use(NoticeBar);
app.use(List);
app.use(Search);
app.use(PullRefresh);
app.use(Checkbox);
app.use(Dialog);
app.use(CheckboxGroup);
app.use(Overlay);
app.use(Loading);
app.use(Toast);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(NavBar);
app.use(Icon);
app.use(Grid);
app.use(GridItem);
app.use(router)
app.use(VanImage);
app.use(SwipeCell);
app.use(Divider);
app.use(Col);
app.use(Row);
app.use(Progress);
app.use(Button);
app.use(Popup);
app.use(Collapse);
app.use(CollapseItem);
app.use(Pagination);
app.use(Cell);
app.use(Circle);
app.use(Card);
app.use(Tag);
app.use(DropdownMenu);
app.use(DropdownItem);
app.use(Switch);
app.mount('#app')
