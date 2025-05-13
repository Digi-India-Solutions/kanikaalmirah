import axios from "axios";
const serverURL = "https://api.kanikaalmirah.com";

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
  baseURL: "https://api.kanikaalmirah.com",
  headers:{
    "Content-Type": "application/json"
  },
  withCredentials:true
})

export default axiosInstance
export { serverURL, postData, getData };
