import React, { useEffect } from 'react'
import './Header.scss'
import {RiLoginCircleFill} from 'react-icons/ri'
import {FaUserCircle} from 'react-icons/fa'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { RESET, getLoginStatus, getUser, logout } from '../../redux/auth/authSlice'
import { ShowOnLogin, ShowOnLogout } from '../protect/HiddenLink'
import useRedirectLoggedOutUser from '../../hooks/useRedirectLoggedOutUser'
import {shortenText} from '../../utils/index'

const activeLink=({isActive})=>{
    return isActive?'active':''
}

const Header = () => {
    //useRedirectLoggedOutUser('/login')
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const {isLoggedIn,user}=useSelector((state)=>state.auth)

    useEffect(()=>{
        dispatch(getLoginStatus());
        dispatch(getUser());
    },[isLoggedIn,dispatch])


    const logoutUser=async()=>{
        dispatch(RESET())
        await dispatch(logout())
        navigate('/login')
    }

    const goHome=()=>{
        navigate('/')
    }
  return (
    <header className='header'>
        <nav>
            <div className='logo' onClick={goHome}>
            <RiLoginCircleFill size={35}/>
            <spa>Auth:YoYo</spa>
            </div>
            <ul className='home-links'>
                <ShowOnLogin>
                <li className='--flex-center'>
                    <FaUserCircle size={30}/>
                    <p className='--color-white'>Hello {user?shortenText(user.name,7):'...'} | </p>
                </li>
                </ShowOnLogin>
                <ShowOnLogout>
                <li>
                   <button className='--btn --btn-primary'>
                    <Link to='/login'>Login</Link>
                   </button>
                </li>
                </ShowOnLogout>
                <ShowOnLogin>
                <li>
                    <NavLink to='/profile' className={activeLink}>Profile</NavLink>
                </li>
                <li>
                   <button className='--btn --btn-secondary' onClick={logoutUser}>Logout</button>
                </li>
                </ShowOnLogin>
            </ul>
        </nav>
    </header>
  )
}

export default Header