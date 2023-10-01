import indexPanel from "./views/index.vue"
import loginPanel from "./views/login.vue"
import courseTable from "./views/course.vue"
import aboutUs from "./views/about.vue"
import score from "./views/score.vue";
import { createRouter, createWebHashHistory } from 'vue-router'
import library from "./views/library.vue";
import calender from "./views/calender.vue";
import exam from "./views/Exam.vue"
import PluginFramework from "@/views/PluginFramework.vue";

const routers = [
	{path: "/", component: indexPanel},
	{path: "/login", component: loginPanel},
	{path: "/course", component: courseTable},
	{path: "/about", component: aboutUs},
	{path: "/score",component: score},
	{path: "/library",component: library},
	{path: "/calender",component: calender},
	{path: "/exam",component: exam},
	{path: "/plugin/:src/:title", component: PluginFramework, props: true},
];


const router = createRouter({
	history: createWebHashHistory(),
	routes: routers
});
export default router;