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

export function selectedCourse(week) {
	var url = BASE_URL+"/api/course/select/"+week;
	axios.defaults.withCredentials = true;
	return axios({
		url: url,
		method: "get",
		withCredentials: true,
	})
}

export function useLocalCourse(week, courseData) {
	var url = BASE_URL+"/api/course/local/"+week;
	axios.defaults.withCredentials = true;
	return axios({
		headers:{'Content-Type': 'application/json'},
		url: url,
		method: "post",
		withCredentials: true,
		data: courseData
	})
}