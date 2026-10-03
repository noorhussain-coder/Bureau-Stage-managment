import { configureStore } from "@reduxjs/toolkit"
import { userReacer } from "./reducer/user"


const store=configureStore({
    reducer:{
        user:userReacer
    }
})
export default store


export const server="http://localhost:3000/api"