import { createApp } from 'vue'
import App from './App.vue'
import {Grid, GridItem, NoticeBar} from 'vant';
import { Icon } from 'vant';
import { Loading } from 'vant';
import { Image as VanImage } from 'vant';
import router from './router.js'
import './assets/main.css'
import 'vant/lib/index.css';
import { Divider } from 'vant';
import { Col, Row } from 'vant';
import { NavBar } from 'vant';
import { Progress } from 'vant';
import { Form, Field, CellGroup,Cell } from 'vant';
import { Button } from 'vant';
import { Toast } from 'vant';
import { Popup } from 'vant';
import { Overlay } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { Dialog } from 'vant';
import axios from "axios";
import { PullRefresh } from 'vant';
import { Pagination } from 'vant';
import { Circle } from 'vant';



axios.defaults.withCredentials = true;
const app = createApp(App);
axios.interceptors.response.use(response => {
    // console.log(response.data)
    if (response.data) {
        // 数据正常，进行的逻辑功能
        return response;
    } else {
        // 如果返回的 success 是 false，表明业务出错，直接触发 reject
        // 抛出的错误，被 catch 捕获
        return Promise.reject(new Error(response.data.message));
    }
}, error => {
    // 只重传5次，超过后抛异常
    var cfg = error.config;
    if(cfg.retryCount == undefined) {
        cfg.retryCount = 0;
    }
    if(cfg.retryCount >= 10) {
        return Promise.reject(error);
    }
    cfg.retryCount++;
    // 对响应错误做点什么
    // location.reload();
    // 延时1000ms
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    }).then(() => {
        return axios(error.config);
    })
})

app.use(NoticeBar);
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
app.mount('#app')
