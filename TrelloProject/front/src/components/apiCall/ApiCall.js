import axios from "axios";

const BASE_URL = "http://localhost:8080"
function sendRequest(url, method, data){
    return axios({
        url: BASE_URL + url,
        method,
        data
    })  
}

export default sendRequest;