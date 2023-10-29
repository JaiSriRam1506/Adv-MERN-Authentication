import React from 'react'
import {useDispatch} from 'react-redux'
import {sendVerificationEmail} from '../../redux/auth/authSlice'
import {RESET} from '../../redux/auth/authSlice'
import './Notification.scss'

const Notification = () => {
    const dispatch=useDispatch();

    const sendVerEmail=async()=>{
        await dispatch(sendVerificationEmail())
        await dispatch(RESET());
    }
  return (
    <div className='container'>
        <div className='alert'>
            <p>
                <b>Message:</b>&nbsp;
            </p>
            <p>To Verify your Account, Please check your email for Verification Link</p>
            &nbsp;
            <p className='v-link' onClick={sendVerEmail}>
                <b>Resend Link</b>
            </p>
            &nbsp;
        </div>
        <br/>
    </div>
  )
}

export default Notification