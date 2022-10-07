import axios from "axios"
import { BASE_URL } from "../common/final.js"

export function getKey() {
	axios.defaults.withCredentials = true
	return axios({
		url: BASE_URL+"/api/key",
		method: "get"
	})
}