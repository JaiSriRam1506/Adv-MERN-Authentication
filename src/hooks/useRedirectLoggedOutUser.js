import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../redux/auth/authService';
import { toast } from 'react-toastify';

const useRedirectLoggedOutUser = (path) => {
 const navigate=useNavigate();

  useEffect(()=>{
    let isLoggedIn;
    const checkLoginStatus=async()=>{
        try {
            isLoggedIn=await authService.getLoginStatus();
        } catch (error) {
            console.log(error.message)
        }
        if(!isLoggedIn){
            //toast.info('Session has expired, Please login')
            navigate(path)
            return;
        }
    }
    checkLoginStatus();
  },[path,navigate])
}

export default useRedirectLoggedOutUser