import React, { useState,useEffect } from 'react'
import styles from './auth.module.scss'
import Card from '../../components/card/Card'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MdPassword } from 'react-icons/md'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import { FaTimes } from 'react-icons/fa'
import { BsCheck2All } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { RESET, resetPassword } from '../../redux/auth/authSlice'
import Loader from '../../components/loader/Loader'
import useRedirectLoggedOutUser from '../../hooks/useRedirectLoggedOutUser'

const initialState={
    password:'',
    password2:''
}

const Reset = () => {
    //useRedirectLoggedOutUser('/login')
    const {resetToken}=useParams();
    const [formData,setFormData]=useState(initialState)
    const {password,password2}=formData;
    const [uCase,setUCase]=useState(false)
    const [num,setNum]=useState(false)
    const [sChar,setSChar]=useState(false)
    const [passLen,setPassLen]=useState(false)
    const crossCheckIcon=<FaTimes size={15} color='red'/>
    const greenTickIcon=<BsCheck2All size={15} color='green'/>
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    const {isLoading}=useSelector((state)=>state.auth)
    
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }
    
    const switchIcons=(condition)=>{
        if(condition)return greenTickIcon;
        return crossCheckIcon;
    }
    
    const handleOnSubmit=async(e)=>{
        e.preventDefault();

        if(!password || !password2){
            return toast.error('Please fill all field')
        }
        if(password!==password2){
            return toast.error('Password don\'t match')
        }
        const userData={
            password,
            cPassword:password2
        }
        await dispatch(resetPassword({userData,resetToken}))
        await dispatch(RESET(userData));
        //navigate('/login')

    }
    
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
                <MdPassword size={35} color='#999'/>
            </div>
            <h2>Reset Password</h2>
            <form onSubmit={handleOnSubmit}>
                <PasswordInput name='password' value={password} placeholder='New Password' required onChange={handleInputChange}/>
                <PasswordInput name='password2' value={password2} placeholder='Confirm New Password' required onChange={handleInputChange}/>
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
                <button className='--btn --btn-primary --btn-block'>Reset</button>
            </form>
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

export default Reset