import axios from "axios"

export function getKey() {
	axios.defaults.withCredentials = true
	return axios({
		url: "/api/key",
		method: "get"
	})
}