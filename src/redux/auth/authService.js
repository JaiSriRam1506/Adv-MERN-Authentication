import axios from 'axios'

const BACKEND_URL=process.env.REACT_APP_BACKEND_URL
export const API_URL=`${BACKEND_URL}api/v1/user/`

//Register User
const register=async(userData)=>{
    const response=await axios.post(API_URL+'register',userData)
    return response.data;
}

//Login User
const login=async(userData)=>{
    const response=await axios.post(API_URL+'login',userData)
    return response.data;
}

//Logout User
const logout=async()=>{
    const response=await axios.get(API_URL+'logout')
    return response.data;
}

//Get Login Status
const getLoginStatus=async()=>{
    const response=await axios.get(API_URL+'getLoginStatus')
    return response.data;
}

//Get User data
const getUser=async()=>{
    const response=await axios.get(API_URL+'getUser')
    return response.data;
}

//Update User Data
const updateUser=async(userData)=>{
    const response=await axios.patch(API_URL+'updateUser',userData)
    return response.data;
}

//Update User Data
const sendVerificationEmail=async()=>{
    const response=await axios.post(API_URL+'sendVerificationEmail')
    return response.data;
}

//Verify User Account
const verifyUser=async(verificationToken)=>{
    const response=await axios.patch(`${API_URL}verifyUser/${verificationToken}`)
    return response.data;
}

//Verify User Account
const changePassword=async(userData)=>{
    const response=await axios.patch(API_URL+'changePassword',userData)
    return response.data;
}

//Forgot Password
const forgotPassword=async(userData)=>{
    const response=await axios.post(API_URL+'forgotPassword',userData)
    return response.data;
}

//resetPassword
const resetPassword=async({userData,resetToken})=>{
    const response=await await axios.patch(`${API_URL}resetPassword/${resetToken}`,userData)
    return response.data;
}

//getUsers
const getUsers=async()=>{
    const response=await axios.get(API_URL+'getUsers')
    return response.data;
}

//deleteUser
const deleteUser=async(id)=>{
    const response=await axios.delete(`${API_URL}deleteUser/${id}`)
    return response.data;
}

//updateRole
const updateRole=async(userData)=>{
    const response=await axios.patch(`${API_URL}updateRole`,userData)
    return response.data;
}

//sendLoginCode
const sendLoginCode=async(email)=>{
    const response=await axios.post(`${API_URL}sendLoginCode/${email}`)
    return response.data;
}

//loginWithCode
const loginWithCode=async({email,userData})=>{
    const response=await axios.post(`${API_URL}loginWithCode/${email}`,userData)
    return response.data;
}

//loginWithGoogle
const loginWithGoogle=async(userToken)=>{
    const response=await axios.post(`${API_URL}google/callback`,userToken)
    return response.data;
}

const authService={
    register,
    login,
    logout,
    getLoginStatus,
    getUser,
    updateUser,
    sendVerificationEmail,
    verifyUser,
    changePassword,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateRole,
    sendLoginCode,
    loginWithCode,
    loginWithGoogle
}

export default authService;