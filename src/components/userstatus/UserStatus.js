import React, { useEffect, useState } from 'react'
import { BiUserCheck, BiUserMinus, BiUserX } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import InfoBox from '../infobox/InfoBox'
import './UsersStats.scss'
import { useDispatch, useSelector } from 'react-redux'
import { USER_STATUS, getUsers } from '../../redux/auth/authSlice'

const icon1= <FaUser size={40} color='#fff'/>
const icon2= <BiUserCheck size={40} color='#fff'/>
const icon3= <BiUserMinus size={40} color='#fff'/>
const icon4= <BiUserX size={40} color='#fff'/>

const UserStatus = () => {
  const {users,noOfVerifiedUsers,noOfSuspendedUsers}=useSelector((state)=>state.auth)

  const dispatch=useDispatch()

  useEffect(()=>{
    if(!users){
      dispatch(getUsers());
    }
    dispatch(USER_STATUS())
  },[dispatch,users])


  return (
    <div className='user-summary'>
      <h3 className='--mt'>User Status</h3>
      <div className='info-summary'>
        <InfoBox icon={icon1} title={'Total Users'} bgColor={'card1'} count={users?.length}/>
        <InfoBox icon={icon2} title={'Verified Users'} bgColor={'card2'} count={noOfVerifiedUsers}/>
        <InfoBox icon={icon3} title={'Unverified Users'} bgColor={'card3'} count={users?.length-noOfVerifiedUsers-noOfSuspendedUsers}/>
        <InfoBox icon={icon4} title={'Suspended Users'} bgColor={'card4'} count={noOfSuspendedUsers}/>
      </div>
    </div>
  )
}

export default UserStatus