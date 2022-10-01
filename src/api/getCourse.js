import axios from "axios"

export function getCourse() {
		axios.defaults.withCredentials = true;
		return axios({
			url: "/api/course",
			method: "get",
			withCredentials: true,
		})
}