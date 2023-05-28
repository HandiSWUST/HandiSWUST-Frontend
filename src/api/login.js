import { BASE_URL } from "@/common/final"
import "/src/js/security.js"
import axios from "axios";

function getKey() {
    axios.defaults.withCredentials = true
    return axios({
        url: BASE_URL + "/api/v2/login/key",
        method: "get"
    })
}

export function getCaptcha() {
    axios.defaults.withCredentials = true;
    return axios({
        method: "get",
        url: BASE_URL + "/api/v2/login/captcha",
        withCredentials: true
    })
}

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