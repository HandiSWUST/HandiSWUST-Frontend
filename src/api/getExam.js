import axios from 'axios'
import {BASE_URL} from "@/common/final";

export function getExam() {
	return axios({
		url: BASE_URL+"/api/v2/extension/getExam",
		method: "get",
		withCredentials: true
	})

}