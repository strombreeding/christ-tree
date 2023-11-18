import axios from "axios"
const SERVER_URL = process.env.React_App_API_PATH ||""
export const getCards = async()=>{
    console.log(SERVER_URL+"cards")
    // await axios.get(SERVER_URL+"cards")
}