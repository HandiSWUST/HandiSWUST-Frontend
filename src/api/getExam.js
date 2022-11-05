import axios from 'axios'
import {Toast} from "vant";
import {BASE_URL} from "../common/final";

export function getExam() {
	return axios({
		url: BASE_URL+"/api/getExam",
		method: "get",
		withCredentials: true
	})

}