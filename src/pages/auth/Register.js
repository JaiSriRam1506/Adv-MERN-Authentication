import React, { useEffect, useState } from 'react'
import styles from './auth.module.scss'
import Card from '../../components/card/Card'
import {BiLogIn} from 'react-icons/bi'
import {TiUserAddOutline} from 'react-icons/ti'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import { FaTimes } from 'react-icons/fa'
import { BsCheck2All } from 'react-icons/bs'
import { toast } from 'react-toastify'
import {validateEmail} from '../../utils/index'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { RESET, register, sendVerificationEmail } from '../../redux/auth/authSlice'
import Loader from '../../components/loader/Loader'

const initialState={
    name:'',
    email:'',
    password:'',
    password2:''
}

const Register = () => {
const [formData,setFormData]=useState(initialState)
const {name,email,password,password2}=formData;
const [uCase,setUCase]=useState(false)
const [num,setNum]=useState(false)
const [sChar,setSChar]=useState(false)
const [passLen,setPassLen]=useState(false)
const crossCheckIcon=<FaTimes size={15} color='red'/>
const greenTickIcon=<BsCheck2All size={15} color='green'/>

const navigate=useNavigate();
const dispatch=useDispatch();
const {isLoggedIn,isSuccess,isLoading,message}=useSelector((state)=>state.auth)


const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value})
}

const switchIcons=(condition)=>{
    if(condition)return greenTickIcon;
    return crossCheckIcon;
}

const registerUser=async(e)=>{
    e.preventDefault();

    if(!name || !email || !password){
        return toast.error('All fields are required')
    }

    if(password.length<6){
       return toast.error('Password must be upto 6 Character')
    }
    if(!validateEmail(email)){
       return toast.error('Email is incorrect, please Enter Correct Email')
    }
    if(password!==password2){
        return toast.error('Password don\'t match')
    }
    const userData={
        name,email,password
    }
    await dispatch(register(userData))
    await dispatch(sendVerificationEmail())
}

useEffect(()=>{
    if(isSuccess && isLoggedIn){
        navigate('/profile')
    }
    dispatch(RESET())
},[isSuccess,isLoggedIn,navigate,dispatch])

useEffect(()=>{
    if(password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))setUCase(true)
    else setUCase(false)

    if(password.match(/([0-9])/))setNum(true)
    else setNum(false)

    if(password.match(/([!,%,&,@,#,$,^,*,?,_,~])/))setSChar(true)
    else setSChar(false)

    if(password.length>=8)setPassLen(true)
    else setPassLen(false)
    
},[password])

  return (
    <div className={`container ${styles.auth}`}>
        {isLoading && <Loader/>}
        <Card>
        <div className={styles.form}>
        <div className='--flex-center'>
            <TiUserAddOutline size={35} color='#999'/>
        </div>
        <h2>Register</h2>
        <form onSubmit={registerUser}>
            <input type='text' name='name' value={name} placeholder='Name' required onChange={handleInputChange}/>
            <input type='text' name='email' value={email} placeholder='Email' required onChange={handleInputChange}/>
            <PasswordInput name='password' value={password} placeholder='Password' required onChange={handleInputChange}/>
            <PasswordInput name='password2' value={password2} placeholder='Confirm Password' required onChange={handleInputChange}
            onPaste={(e)=>{
                e.preventDefault();
                toast.error('Please type instead of paste')
                return false
            }}/>
            {/* <input type='password' name='password' value={password} placeholder='Enter Password' required onChange={handleInputChange}/> */}
            <Card cardClass={styles.group}>
                <ul className='form-list'>
                    <li>
                        <span className={styles.indicator}>
                            {switchIcons(uCase)}
                            &nbsp; LowerCase & UpperCase
                        </span>
                    </li>
                    <li>
                        <span className={styles.indicator}>
                            {switchIcons(num)}
                            &nbsp; Number(0-9)
                        </span>
                    </li>
                    <li>
                        <span className={styles.indicator}>
                            {switchIcons(sChar)}
                            &nbsp; Special Characters(!@#$%^&*)
                        </span>
                    </li>
                    <li>
                        <span className={styles.indicator}>
                            {switchIcons(passLen)}
                            &nbsp; At least 8 Characters
                        </span>
                    </li>
                </ul>
            </Card>
            <button className='--btn --btn-primary --btn-block'>Register</button>
        </form>
        <Link to='/forgot'>forgot Password</Link>
        <span className={styles.register}>
            <Link to='/'>Home</Link>
            <p> &nbsp; Already Have an account?&nbsp;</p>
            <Link to='/login'>Login</Link>
        </span>
        </div>
        </Card>
    </div>
  )
}

export default Register