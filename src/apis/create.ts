import axios from "axios"
import { SERVER_URL } from "./constant"
import { IItemProps } from "../config"
export const insertCard = async(data:{
    writer:string
    content:string
    img_path:string
}):Promise<IItemProps|null>=>{
    console.log(SERVER_URL+"cards")
    try{
        const result = await axios.post(SERVER_URL+"cards/",data)
        if(result.status !== 201){
            throw new Error("데이터 못받아옴")
        }
        return result.data
    }catch(err){
        return null
    }

}