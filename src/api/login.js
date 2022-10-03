import axios from "axios"
import {getKey} from "./getKey.js"
import "/src/js/security.js"
import Cookies from 'js-cookie'
import { Toast } from "vant"
import { Base64 } from "js-base64"

export function login(username, password, captcha, remember) {
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
			}).then((response) => {
					console.log(response.data);
					if(response.data == "1200 LOGIN SUCCESS") {
						if(remember) {
							var pwd = Base64.encode(password);
							var user = Base64.encode(username);
							Cookies.set("user", user, { expires: 14 });
							Cookies.set("pwd", pwd, { expires: 14 });
							console.log(remember)
						}else {
							Cookies.remove("user");
							Cookies.remove("pwd");
						}
						window.location.href = "/";
					}else {
						Toast.fail("登录失败，请检查账号密码及验证码是否正确")
					}
				});
		});
}