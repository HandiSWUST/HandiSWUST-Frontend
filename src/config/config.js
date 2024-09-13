import axios from "axios";
import router from "@/router";
import {Toast} from "vant";
import {TAG_HEADER} from "@/common/final";
import {v4} from 'uuid';

export function configure() {
    axios.defaults.withCredentials = true;

    // TODO
    axios.defaults.baseURL = 'https://swust.ivresse.top/'

    let val = localStorage.getItem(TAG_HEADER);
    if (!val) {
        const v = v4();
        localStorage.setItem(TAG_HEADER, v)
        val = v;
    }

    axios.interceptors.request.use(request => {
        const origin = location.origin ?? 'http'
        console.log(origin)
        if (!origin.startsWith('https')) {
            request.headers.set(TAG_HEADER, val)
        }
        if (navigator.userAgent.includes("MicroMessenger")) {
            router.push('/WeChatProhibition')
            return Promise.reject();
        }
        return request;
    })
    axios.interceptors.response.use(response => {


        // console.log(response.data)
        if (response.data) {

            // 数据正常，进行的逻辑功能
            return response;
        } else {
            console.log(JSON.stringify(response))
            if (+response.data.getStats() === 500) {
                Toast.fail("登录状态过期");
                this.$router.push("/login");
            }
            // 如果返回的 success 是 false，表明业务出错，直接触发 reject
            // 抛出的错误，被 catch 捕获
            return Promise.reject(new Error(response.data.message));
        }
    }, error => {
        // 只重传2次，超过后抛异常
        const cfg = error.config;
        if (cfg.retryCount === undefined) {
            cfg.retryCount = 0;
        }
        if (cfg.retryCount >= 2) {
            // 不要使用reject，否则没法捕捉
            return Promise.resolve(error);
        }
        cfg.retryCount++;
        // 对响应错误做点什么
        // 延时500ms
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 500)
        }).then(() => {
            return axios(error.config);
        })
    })
}
