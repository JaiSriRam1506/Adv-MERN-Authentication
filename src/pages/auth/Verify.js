import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RESET, verifyUser } from '../../redux/auth/authSlice';
import Loader from '../../components/loader/Loader';
import { useParams } from 'react-router-dom';

const Verify = () => {
  const {verificationToken}=useParams();
  const dispatch=useDispatch();
  const {isLoading}=useSelector((state)=>state.auth)
  const verifyUserAccount=async()=>{
    await dispatch(verifyUser(verificationToken))
    await dispatch(RESET())
  }

  return (
    <section>
        <div className='--center-all'>
            {isLoading && <Loader/>}
            <h2>Account Verification</h2>
            <p>To Verify Your Account, click below Button...</p>
            <br/>
            <button className='--btn --btn-primary' onClick={verifyUserAccount}>Verify</button>
        </div>
    </section>
  )
}

export default Verify