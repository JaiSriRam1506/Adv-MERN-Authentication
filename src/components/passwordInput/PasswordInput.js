import React, { useState } from 'react'
import './PasswordInput.scss'
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'

const PasswordInput = ({name,value,placeholder,onChange,onPaste}) => {
const [showPassword, setShowPassword] = useState(false);
const togglePassword=()=>{
    setShowPassword(!showPassword)
}
  return (
    <div className='password'>
         <input type={showPassword?'text':'password'} 
         name={name} 
         value={value} 
         placeholder={placeholder} 
         required onChange={onChange}
         onPaste={onPaste}/>
         <div className='icon' onClick={togglePassword}>
            {showPassword?(
                <AiOutlineEyeInvisible size={20}/>
            ):(<AiOutlineEye size={20}/>)}
         </div>
    </div>
  )
}

export default PasswordInput