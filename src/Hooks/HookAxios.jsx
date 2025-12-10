import axios from "axios";


const axiosInstance= axios.create({

    baseURL:'http://localhost:5000'
})

const HookAxios=()=>{
    return axiosInstance
}
export default HookAxios