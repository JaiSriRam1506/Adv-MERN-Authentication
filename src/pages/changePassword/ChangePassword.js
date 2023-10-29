import React, { useState,useEffect } from 'react'
import './ChangePassword.scss'
import { FaTimes } from 'react-icons/fa'
import { BsCheck2All } from 'react-icons/bs'
import Card from '../../components/card/Card'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import PageMenu from '../pageMenu/PageMenu'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { RESET, changePassword, logout } from '../../redux/auth/authSlice'
import { Spinner } from '../../components/loader/Loader'
import useRedirectLoggedOutUser from '../../hooks/useRedirectLoggedOutUser'

const initialState={
    oldPassword:'',
    password:'',
    password2:''
}

const ChangePassword = () => {
    useRedirectLoggedOutUser('/login')
    const [formData,setFormData]=useState(initialState)
    const {oldPassword,password,password2}=formData;
    const [uCase,setUCase]=useState(false)
    const [num,setNum]=useState(false)
    const [sChar,setSChar]=useState(false)
    const [passLen,setPassLen]=useState(false)
    const crossCheckIcon=<FaTimes size={15} color='red'/>
    const greenTickIcon=<BsCheck2All size={15} color='green'/>

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {isLoading}=useSelector((state)=>state.auth)
    
    
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }

    const updatePassword=async(e)=>{
        e.preventDefault();
        if(!oldPassword || !password || !password2){
            return toast.error('All fields are required')
        }
    
        if(password.length<6){
           return toast.error('Password must be upto 6 Character')
        }
        
        if(password!==password2){
            return toast.error('Password don\'t match')
        }
        const userData={
            oldPassword,newPassword:password
        }
        await dispatch(changePassword(userData))
        await dispatch(logout())
        await dispatch(RESET())
        navigate('/login')
    }
    
    const switchIcons=(condition)=>{
        if(condition)return greenTickIcon;
        return crossCheckIcon;
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
    
    return(
        <>
            <section>
                <div className='container'>
                    <PageMenu/>
                    <h2>Change Password</h2>
                    <div className='--flex-start change-password'>
                        <Card cardClass={'card'}>
                            <>
                                <form onSubmit={updatePassword}>
                                    <p>
                                    <label>Old Password:</label>
                                    <PasswordInput name='oldPassword' value={oldPassword} placeholder='Old Password' required onChange={handleInputChange}/>
                                    </p>
                                    <p>
                                    <label>New Password:</label>
                                    <PasswordInput name='password' value={password} placeholder='New Password' required onChange={handleInputChange}/>
                                    </p>
                                    <p>
                                    <label>Confirm New Password:</label>
                                    <PasswordInput name='password2' value={password2} placeholder='Confirm New Password' required onChange={handleInputChange}/>
                                    </p>
                                    <Card cardClass={'group'}>
                                        <ul className='form-list'>
                                            <li>
                                                <span className={'indicator'}>
                                                    {switchIcons(uCase)}
                                                    &nbsp; LowerCase & UpperCase
                                                </span>
                                            </li>
                                            <li>
                                                <span className={'indicator'}>
                                                    {switchIcons(num)}
                                                    &nbsp; Number(0-9)
                                                </span>
                                            </li>
                                            <li>
                                                <span className={'indicator'}>
                                                    {switchIcons(sChar)}
                                                    &nbsp; Special Characters(!@#$%^&*)
                                                </span>
                                            </li>
                                            <li>
                                                <span className={'indicator'}>
                                                    {switchIcons(passLen)}
                                                    &nbsp; At least 8 Characters
                                                </span>
                                            </li>
                                        </ul>
                                        </Card>
                                        {isLoading?<Spinner/>:(
                                        <button className='--btn --btn-danger --btn-block'>Update Password</button>
                                        )}
                                </form>
                            </>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}



export default ChangePassword