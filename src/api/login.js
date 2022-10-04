import axios from "axios"
import {getKey} from "./getKey.js"
import "/src/js/security.js"

export async function login(username, password, captcha, remember, show) {
		var formData = new FormData();
		axios.defaults.withCredentials = true;
		await getKey().then((resp) => {
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
		});
		return axios({
			url: '/api/login',
			method: 'post',
			withCredentials: true,
			data: formData
		})
}