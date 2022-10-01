import axios from "axios"
import {getKey} from "./getKey.js"
import "/src/js/security.js"
import Cookies from 'js-cookie'
import {getCourse} from "/src/api/getCourse"
import { Toast } from "vant"

export function login(username, password, captcha) {
		var formData = new FormData();
		axios.defaults.withCredentials = true;
		getKey().then((resp) => {
			var data = resp.data;
			var Modulus = data["modulus"];
			var public_exponent = data["exponent"];
			console.log(data);
			var key = new RSAUtils.getKeyPair(public_exponent, "", Modulus);
			var reversedPwd = password.split("").reverse().join("");
			var encrypedPwd = RSAUtils.encryptedString(key,reversedPwd);
			console.log(encrypedPwd);
			formData.append("username", username);
			formData.append("password", encrypedPwd);
			formData.append("captcha", captcha);
			axios({
				url: '/api/login',
				method: 'post',
				withCredentials: true,
				data: formData
			}).then((resp) => {
				console.log(resp.data);
				if(resp.data == "1200 LOGIN SUCCESS") {
					window.location.href = "/";
				}else {
					Toast.fail("登录失败，请检查账号密码及验证码是否正确")
				}
			})
		});
}