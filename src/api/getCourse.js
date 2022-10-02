import axios from "axios"

export function getCourse(isCur) {
	var url;
	if(isCur) {
		url = "/api/course/cur";
	}else {
		url = "/api/course/all";
	}
	axios.defaults.withCredentials = true;
	return axios({
		url: url,
		method: "get",
		withCredentials: true,
	})
}