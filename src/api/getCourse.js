import axios from "axios"
import { BASE_URL } from "../common/final.js"

export function getCourse(isCur) {
	var url;
	if(isCur) {
		url = BASE_URL+"/api/course/cur";
	}else {
		url = BASE_URL+"/api/course/all";
	}
	axios.defaults.withCredentials = true;
	return axios({
		url: url,
		method: "get",
		withCredentials: true,
	})
}