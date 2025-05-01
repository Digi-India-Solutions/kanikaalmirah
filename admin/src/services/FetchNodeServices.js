import axios from "axios";
const serverURL = "http://localhost:9000";

const postData = async (url, body) => {
  try {
    console.log(JSON.stringify(body));
    
    var response = await axios.post(`${serverURL}/${url}`, body);
    
    var data = response.data;
    return data;
  } catch (e) {
    return null;
  }
};

const getData = async (url) => {
  try {
    var response = await axios.get(`${serverURL}/${url}`,{withCredentials:true});
    var data = response.data;
    return data;
  } catch (e) {
    return null;
  }
};

const axiosInstance=axios.create({
  baseURL: "http://localhost:9000",
  headers:{
    "Content-Type": "application/json"
  },
  withCredentials:true
})

export default axiosInstance
export { serverURL, postData, getData };
