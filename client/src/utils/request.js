//3001
import axios from "axios";

/*===========================================*/
/*===========================================*/
/*===========================================*/
// http://localhost:3001/
// https://mern-blog-w1a9.onrender.com
const request = axios.create({
    baseURL: "http://localhost:3001" 
});

export default request;