//3001
import axios from "axios";

/*===========================================*/
/*===========================================*/
/*===========================================*/
// http://localhost:3001/
// https://mern-blog-w1a9.onrender.com

const localy = "http://localhost:3001";

const production = "https://mern-blog-njw7.onrender.com";

const request = axios.create({
    baseURL: production
});

export default request;