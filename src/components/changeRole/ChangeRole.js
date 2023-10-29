import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, updateRole } from '../../redux/auth/authSlice'
import { EMAIL_RESET, sendAutomatedEmail } from '../../redux/email/emailSlice'

const ChangeRole = ({_id,email}) => {
    const [userRole, setUserRole] = useState('')
    const dispatch=useDispatch();
    const {message}=useSelector((state)=>state.auth)

    const upgradeRole=async(e)=>{
        e.preventDefault();
        await dispatch(updateRole({id:_id,role:userRole}))
        console.log(message);
        if(message.includes('Successfully updated the User Role')){
            const emailData={
                subject:'User Role Has Been Changed : AUTHYOYO',
                send_to:email,
                template:'changeRole',
                reply_to:'noreply_yoyo@gmail.com',
                role:userRole,
                url:'login'
            }
            await dispatch(sendAutomatedEmail(emailData))
        }
        dispatch(EMAIL_RESET())
        await dispatch(getUsers());
    }
    useEffect(()=>{
        dispatch(getUsers())
    },[dispatch])
  return (
    <div className='sort'>
        <form className='--flex-start' onSubmit={upgradeRole}> 
            <select value={userRole} onChange={(e)=>setUserRole(e.target.value)}>
                <option value={""}>--Select Role--</option>
                <option value={"subscriber"}>Subscriber</option>
                <option value={"author"}>Author</option>
                <option value={"admin"}>Admin</option>
                <option value={"suspended"}>Suspended</option>
            </select>
            <button className='--btn --btn-primary' type='submit'>
                <FaCheck size={15}/>
            </button>
        </form>
    </div>
  )
}

export default ChangeRole