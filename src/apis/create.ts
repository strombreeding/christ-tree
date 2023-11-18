import axios from "axios"
import { SERVER_URL } from "./constant"
export const insertCard = async(data:{
    nickname:string
    content:string
    imgPath:string
})=>{
    console.log(SERVER_URL+"cards")
    try{
        const result = await axios.post(SERVER_URL+"cards",data)
        if(result.status !== 200){
            throw new Error("데이터 못받아옴")
        }
        return true
    }catch(err){
        return false
    }

}