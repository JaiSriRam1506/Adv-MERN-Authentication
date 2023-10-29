import React, { useEffect, useState } from 'react'
import styles from './auth.module.scss'
import Card from '../../components/card/Card'
import {BiLogIn} from 'react-icons/bi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import { GrInsecure } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { RESET, loginWithCode, sendLoginCode } from '../../redux/auth/authSlice'
import Loader from '../../components/loader/Loader'
import { toast } from 'react-toastify'

const LoginWithCode = () => {
const {email} =useParams();
const dispatch=useDispatch();
const navigate=useNavigate();

const [loginCode, setLoginCode] = useState("")
const {isLoggedIn,isSuccess,isLoading,twoFactor}=useSelector((state)=>state.auth)


const loginWithAccessCode=async(e)=>{
  e.preventDefault();
  if(!loginCode || loginCode.length<6){
    return toast.error('Please check login code either wrong or not at least 6 character')
  }
  const userData={
    loginCode
  }
  await dispatch(loginWithCode({email,userData}))
}

useEffect(()=>{
  if(isSuccess && isLoggedIn && !twoFactor){
    navigate('/profile')
}
dispatch(RESET())
},[isSuccess,isLoggedIn,navigate,dispatch,twoFactor])

const sendLoginCodeAgain=()=>{
  //navigate(`/loginWithCode/${email}`)
    dispatch(sendLoginCode(email))
    //dispatch(RESET())
}

  return (
    <div className={`container ${styles.auth}`}>
        {isLoading && <Loader/>}
        <Card>
        <div className={styles.form}>
        <div className='--flex-center'>
            <GrInsecure size={35} color='#999'/>
        </div>
        <h2>Enter Access Code</h2>
        <form onSubmit={loginWithAccessCode}>
            <input type='text' name='loginCode' value={loginCode} placeholder='Access Code' required onChange={(e)=>setLoginCode(e.target.value)}/>
            <button className='--btn --btn-primary --btn-block'>Proceed To Login</button>
            <span className='--flex-center'>Check your email for Login Access Code</span>
            <div className={styles.links}>
            <p><Link to='/'>Home</Link></p>
            <p className='--v-link --color-primary' onClick={sendLoginCodeAgain}><b>Resend Code</b></p>
            </div>
        </form>
        </div>
        </Card>
    </div>
  )
}

export default LoginWithCode