import './LogInPanda.scss'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RESET, login, loginWithGoogle, sendLoginCode } from '../../redux/auth/authSlice'
import { toast } from 'react-toastify'
import { validateEmail } from '../../utils'
import Loader from '../../components/loader/Loader'
import { GoogleLogin } from '@react-oauth/google';


const initialState={
    email:'',
    password:'',
}
const LoginPanda = () => {
  const [formData,setFormData]=useState(initialState)
  const {email,password}=formData;
  const [isFocused, setFocused] = useState(false);
  const [eyeBallWidth, setEyeBallWidth] = useState(0);
  const [eyeBallHeight, setEyeBallHeight] = useState(0);
  const passwordInputRef = useRef(null);
  const [isWrongEntry, setIsWrongEntry] = useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {isLoggedIn,isSuccess,isLoading,message,twoFactor}=useSelector((state)=>state.auth)

  const handleFocusIn = () => {
    setFocused(true);
  };

  const handleFocusOut = () => {
    setFocused(false);
  };

  const handleMouseMove = (event) => {
    const dw = window.innerWidth / 15;
    const dh = window.innerHeight / 15;
    const x = event.pageX / dw;
    const y = event.pageY / dh;
    setEyeBallWidth(x);
    setEyeBallHeight(y);
  };

  useEffect(() => {
    const inputElement = passwordInputRef.current;
    inputElement.addEventListener('focus', handleFocusIn);
    inputElement.addEventListener('blur', handleFocusOut);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      inputElement.removeEventListener('focus', handleFocusIn);
      inputElement.removeEventListener('blur', handleFocusOut);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value})
}

const loginUser=async(e)=>{
    e.preventDefault();
    if(!email || !password){
        //return toast.error('All fields are required')
        setIsWrongEntry(true);
        setTimeout(() => {
            setIsWrongEntry(false);
          }, 3000);
    }

    if(!validateEmail(email)){
       return toast.error('Email is incorrect, please Enter Correct Email')
    }
    const userData={
        email,password
    }
    await dispatch(login(userData))
}

const googleLogin=async(credentialResponse)=>{
  await dispatch(loginWithGoogle({userToken:credentialResponse.credential}))
  
}

useEffect(()=>{
    if(!isLoggedIn && twoFactor && message==="New Device has detected" && !isSuccess){
        navigate(`/loginWithCode/${email}`)
        dispatch(sendLoginCode(email))
        dispatch(RESET())
    }
    if(isSuccess && isLoggedIn){
      navigate('/profile')
  }
    dispatch(RESET())
},[isSuccess,isLoggedIn,navigate,dispatch,message,twoFactor,email])

  return (
    <>
    {isLoading && <Loader/>}
    <div class="panda">
    <div class="ear"></div>
    <div class="face">
      <div class="eye-shade"></div>
      <div class="eye-white">
        <div class="eye-ball" style={{
          width: eyeBallWidth + 'px',
          height: eyeBallHeight + 'px',
        }}></div>
      </div>
      <div class="eye-shade rgt"></div>
      <div class="eye-white rgt">
        <div class="eye-ball" style={{
          width: eyeBallWidth + 'px',
          height: eyeBallHeight + 'px',
        }}></div>
      </div>
      <div class="nose"></div>
      <div class="mouth"></div>
    </div>
    <div class="body"> </div>
    <div class="foot">
      <div class="finger"></div>
    </div>
    <div class="foot rgt">
      <div class="finger"></div>
    </div>
  </div>
  <form onSubmit={loginUser} className={isFocused ? 'form up' : 'form'}>
    <div class="hand"></div>
    <div class="hand rgt"></div>
    <div className='--center-all'>
    <GoogleLogin onSuccess={googleLogin}
        onError={() => {console.log('Login Failed');toast.error('Google Login Failed')}}/>
    </div>
      <br/><h4 className='--center-all'><b>OR</b></h4><br/>
    <div class="form-group">
      <input type='text' name='email' value={email} required class="form-control" onChange={handleInputChange}/>
      <label class="form-label">Email</label>
    </div>
    <div class="form-group">
      <input name='password' ref={passwordInputRef} onFocus={handleFocusIn} onBlur={handleFocusOut}
       value={password} id="password" type="password" required class="form-control" 
       onChange={handleInputChange} autoComplete='disabled'/>
      <label class="form-label">Password</label>
      {isWrongEntry && <p className="alert">Bhr to le bro phle..!!</p>}
      <button class="btn --center-all">Login </button><br/>
        <span className="--flex-center">
            <Link to='/forgot'><b>Forgot Password</b></Link>
        </span><br/>
        <span className='--flex-center'>
        <p><Link to='/'><b>Home</b></Link>&nbsp;&nbsp;&nbsp;</p>
        <p><Link to='/register'><b>Register</b></Link></p>
        </span>
    </div>
  </form>
  </>
  )
}

export default LoginPanda