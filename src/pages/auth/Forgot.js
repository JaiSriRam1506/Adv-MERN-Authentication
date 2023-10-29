import React, { useState } from 'react'
import styles from './auth.module.scss'
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { validateEmail } from '../../utils'
import {useDispatch, useSelector} from 'react-redux'
import { RESET, forgotPassword } from '../../redux/auth/authSlice'
import Loader from '../../components/loader/Loader'

const Forgot = () => {
const [email, setEmail] = useState("")
const dispatch=useDispatch();

const {isLoggedIn}=useSelector((state)=>state.auth)

const handleOnSubmit=async(e)=>{
  e.preventDefault();

  if(!email || !validateEmail(email)){
    toast.error('Please enter or Valid Email')
  }

  const userData={
    email
  }
  await dispatch(forgotPassword(userData))
  await dispatch(RESET(userData));
}


  return (
    <div className={`container ${styles.auth}`}>
        {isLoggedIn && <Loader/>}
        <Card>
        <div className={styles.form}>
        <div className='--flex-center'>
            <AiOutlineMail size={35} color='#999'/>
        </div>
        <h2>Forgot Password</h2>
        <form onSubmit={handleOnSubmit}>
            <input type='text' name='email' value={email} placeholder='Enter Email' required onChange={(e)=>{setEmail(e.target.value)}}/>
            <button className='--btn --btn-primary --btn-block'>Forgot</button>
            <div className={styles.links}>
            <p><Link to='/'>Home</Link></p>
            <p><Link to='/login'>Login</Link></p>
            </div>
        </form>
        </div>
        </Card>
    </div>
  )
}

export default Forgot