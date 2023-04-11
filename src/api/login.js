import axios from "axios"
import {getKey} from "./getKey.js"
import { BASE_URL } from "@/common/final"
import "/src/js/security.js"

export async function login(username, password, captcha) {
    let formData = new FormData();
    axios.defaults.withCredentials = true;
    await getKey().then((resp) => {
        let data = resp.data.data;
        let Modulus = data["modulus"];
        let public_exponent = data["exponent"];
        // console.log(password);
        let key = new RSAUtils.getKeyPair(public_exponent, "", Modulus);
        let reversedPwd = password.split("").reverse().join("");
        let encrypedPwd = RSAUtils.encryptedString(key,reversedPwd);
        // console.log(encrypedPwd);
        formData.append("username", username);
        formData.append("password", encrypedPwd);
        formData.append("captcha", captcha);
    });
    return axios({
        url: BASE_URL+'/api/v2/login/login',
        method: 'post',
        withCredentials: true,
        data: formData
    })
}