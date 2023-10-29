import React, { useEffect, useState } from 'react'
import styles from './auth.module.scss'
import Card from '../../components/card/Card'
import {BiLogIn} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import { useDispatch, useSelector } from 'react-redux'
import { RESET, login } from '../../redux/auth/authSlice'
import { toast } from 'react-toastify'
import { validateEmail } from '../../utils'
import Loader from '../../components/loader/Loader'

const initialState={
    email:'',
    password:'',
}

const Login = () => {
    const [formData,setFormData]=useState(initialState)
    const {email,password}=formData;

const navigate=useNavigate();
const dispatch=useDispatch();
const {isLoggedIn,isSuccess,isLoading,message}=useSelector((state)=>state.auth)

const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value})
}


const loginUser=async(e)=>{
    e.preventDefault();

    if(!email || !password){
        return toast.error('All fields are required')
    }

    if(!validateEmail(email)){
       return toast.error('Email is incorrect, please Enter Correct Email')
    }
    const userData={
        email,password
    }
    await dispatch(login(userData))
}
useEffect(()=>{
    if(isSuccess && isLoggedIn){
        navigate('/profile')
    }
    dispatch(RESET())
},[isSuccess,isLoggedIn,navigate,dispatch])


  return (
    <div className={`container ${styles.auth}`}>
        {isLoading && <Loader/>}
        <Card>
        <div className={styles.form}>
        <div className='--flex-center'>
            <BiLogIn size={35} color='#999'/>
        </div>
        <h2>Login</h2>
        <div className='--flex-center'>
            <button className="--btn --btn-google">Login With Google</button>
        </div>
        <br/>
        <p className='--text-center --fw-bold'>OR</p>
        <form onSubmit={loginUser}>
            <input type='text' name='email' value={email} placeholder='Enter Email' required onChange={handleInputChange}/>
            <PasswordInput name='password' value={password} placeholder='Enter Password' required onChange={handleInputChange}/>
            {/* <input type='password' name='password' value={password} placeholder='Enter Password' required onChange={handleInputChange}/> */}
            <button className='--btn --btn-primary --btn-block'>Login</button>
        </form>
        <Link to='/forgot'>forgot Password</Link>
        <span className={styles.register}>
            <Link to='/'>Home</Link>
            <p> &nbsp;Don't have an account?&nbsp;</p>
            <Link to='/register'>Register</Link>
        </span>
        </div>
        </Card>
    </div>
  )
}

export default Login