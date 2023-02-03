import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import authService from "../redux/features/auth/authService"

const UseRedirectSession = (path) => {
    
  const navigate = useNavigate()
  useEffect(()=>{
    let isLoggedIn;
    const redirectLoggedOutUsers = async()=>{
        try{
            isLoggedIn = await authService.getLoginStatus()
        }catch(err){
            console.log(err.message);
        }
        if(!isLoggedIn){
            toast.info("Session has expired. Please login")
            navigate(path)
            return
        }
    }
    redirectLoggedOutUsers()
  },[path, navigate])
}

export default UseRedirectSession