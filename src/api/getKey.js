import axios from "axios"
import { BASE_URL } from "@/common/final"

export function getKey() {
	axios.defaults.withCredentials = true
	return axios({
		url: BASE_URL+"/api/v2/login/key",
		method: "get"
	})
}