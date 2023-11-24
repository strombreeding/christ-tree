import axios from "axios"
import { SERVER_URL } from "./constant"
export const getCards = async()=>{
    console.log(SERVER_URL+"cards/")
    try{
        const result = await axios.get(SERVER_URL+"cards/")
        if(result.status !== 200){
            throw new Error("데이터 못받아옴")
        }
        return result.data
    }catch(err){
        return false
    }

}
export const getNotice = async()=>{
    console.log(SERVER_URL+"cards/")
    try{
        const result = await axios.get(SERVER_URL+"notices//")
        if(result.status !== 200){
            throw new Error("데이터 못받아옴")
        }
        return result.data.result
    }catch(err){
        return false
    }

}
