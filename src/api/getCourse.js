import axios from "axios"
import { BASE_URL } from "@/common/final"

export function getCourse(isCur) {
	let url;
	if(isCur) {
		url = BASE_URL+"/api/v2/course/cur";
	}else {
		url = BASE_URL+"/api/v2/course/all";
	}
	axios.defaults.withCredentials = true;
	return axios({
		url: url,
		method: "get",
		withCredentials: true,
	})
}

export function selectedCourse(week) {
	let url = BASE_URL + "/api/v2/course/select/" + week;
	axios.defaults.withCredentials = true;
	return axios({
		url: url,
		method: "get",
		withCredentials: true,
	})
}

export function useLocalCourse(week, courseData) {
	let url = BASE_URL + "/api/v2/course/local/" + week;
	axios.defaults.withCredentials = true;
	return axios({
		headers:{'Content-Type': 'application/json'},
		url: url,
		method: "post",
		withCredentials: true,
		data: courseData
	})
}

export function deleteLocalCourse() {
	let url = BASE_URL + "/api/v2/course/clear";
	axios.defaults.withCredentials = true;
	return axios({
		url: url,
		method: "post",
		withCredentials: true
	})
}

export function getExpCourse() {
	let url = BASE_URL + "/api/v2/course/exp";
	axios.defaults.withCredentials = true;
	return axios({
		url: url,
		method: "get",
		withCredentials: true
	})
}

export function getNormCourse() {
	let url = BASE_URL + "/api/v2/course/norm";
	axios.defaults.withCredentials = true;
	return axios({
		url: url,
		method: "get",
		withCredentials: true
	})
}