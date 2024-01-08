import axios from "axios";

async function apiRequest(type, path, body = {}) {
    const BASE_URL = "http://52.9.162.97:8080";
    const CONFIG = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }

    switch (type) {
        case "GET":
            console.log(`${BASE_URL}${path}`)
            const get = await axios.get(`${BASE_URL}${path}`, CONFIG)
            console.log(get.data)
            return get.data;

        case "POST":
            console.log(`${BASE_URL}${path}`)
            const post = await axios.post(`${BASE_URL}${path}`, body, CONFIG)
            console.log(post.data)
            return post.data;

        default:
            console.log("unsupport type");
    }
}

export { apiRequest }