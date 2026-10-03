i
import axios from 'axios'
import { server } from '../store'



export const Login=(email,password)=>async dispatch=>{

    try {
        dispatch({type:"loginRequest"})
        const {data}=axios.post(`${server}/auth/login`,{email,password},
            {headers:{"Content-Type":"application/josn"},
        withCredentials:true
        }
          
        )
dispatch({type:"loginSuccess",payload:data})
console.log(data)
    } catch (error) {
        dispatch({type:"loginFail",payload:error.response.data.message})
    }

}
export const register=(username,email,password)=>async dispatch=>{
    try {
        dispatch({type:"registerRequest"})
        const {data}=axios.post(`${server}/auth/register`,{username,email,password},{
            headers:{"Content-Type":"multipart/form-data"},
            withCredentials:true
        })
        dispatch({type:"registerSuccess",payload:data})
    } catch (error) {
        dispatch({type:"registerFail",payload:error.response.data.message})
    }
}
export const logout=()=>async dispatch=>{
try {
    dispatch({type:"logoutRequest"})
    const {data}=axios.get(`${server}/auth/logout`,{withCredentials:true})
    dispatch({type:"logoutSuccess",payload:data})
} catch (error) {
    dispatch({type:"logoutFail",payload:error.response.data.message})
}
}
