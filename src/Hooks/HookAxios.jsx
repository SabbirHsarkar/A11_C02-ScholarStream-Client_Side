import axios from "axios";


const axiosInstance= axios.create({

    baseURL:'https://scholarstream-beryl.vercel.app'
})

const HookAxios=()=>{
    return axiosInstance
}
export default HookAxios