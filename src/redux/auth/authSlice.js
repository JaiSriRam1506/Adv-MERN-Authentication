import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import authService from './authService';
import {toast} from 'react-toastify'

const initialState = {
    user:null,
    users:[],
    twoFactor:false,
    message:'',
    isLoggedIn:false,
    isLoading:false,
    isSuccess:false,
    isError:false,
    noOfVerifiedUsers:0,
    noOfSuspendedUsers:0,
    twoFactor:false
}

//Register User
export const register=createAsyncThunk('auth/register',
async(userData,thunkAPI)=>{
try {
    return await authService.register(userData);
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})

//Login User
export const login=createAsyncThunk('auth/login',
async(userData,thunkAPI)=>{
try {
    return await authService.login(userData);
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})

//Logout User
export const logout=createAsyncThunk('auth/logout',
async(_,thunkAPI)=>{
try {
    return await authService.logout();
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})

//getLoginStatus
export const getLoginStatus=createAsyncThunk('auth/getLoginStatus',
async(_,thunkAPI)=>{
try {
    return await authService.getLoginStatus();
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})

//getUser
export const getUser=createAsyncThunk('auth/getUser',
async(_,thunkAPI)=>{
try {
    return await authService.getUser();
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})


//Update User
export const updateUser=createAsyncThunk('auth/updateUser',
async(userData,thunkAPI)=>{
try {
    return await authService.updateUser(userData);
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})


//Send Verification Email
export const sendVerificationEmail=createAsyncThunk('auth/sendVerificationEmail',
async(_,thunkAPI)=>{
try {
    return await authService.sendVerificationEmail();
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})

//Verify User
export const verifyUser=createAsyncThunk('auth/verifyUser',
async(verificationToken,thunkAPI)=>{
try {
    return await authService.verifyUser(verificationToken);
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})

//Change Password
export const changePassword=createAsyncThunk('auth/changePassword',
async(userData,thunkAPI)=>{
try {
    return await authService.changePassword(userData);
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})

//Forgot Password
export const forgotPassword=createAsyncThunk('auth/forgotPassword',
async(userData,thunkAPI)=>{
try {
    return await authService.forgotPassword(userData);
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})

//resetPassword
export const resetPassword=createAsyncThunk('auth/resetPassword',
async({userData,resetToken},thunkAPI)=>{
try {
    return await authService.resetPassword({userData,resetToken});
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})

//getUsers
export const getUsers=createAsyncThunk('auth/getUsers',
async(_,thunkAPI)=>{
try {
    return await authService.getUsers();
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})

//deleteUser
export const deleteUser=createAsyncThunk('auth/deleteUser',
async(id,thunkAPI)=>{
try {
    return await authService.deleteUser(id);
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})

//updateRole
export const updateRole=createAsyncThunk('auth/updateRole',
async(userData,thunkAPI)=>{
try {
    return await authService.updateRole(userData);
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})

//sendLoginCode
export const sendLoginCode=createAsyncThunk('auth/sendLoginCode',
async(email,thunkAPI)=>{
try {
    return await authService.sendLoginCode(email);
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})

//loginWithCode
export const loginWithCode=createAsyncThunk('auth/loginWithCode',
async({email,userData},thunkAPI)=>{
try {
    return await authService.loginWithCode({email,userData});
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})

//loginWithGoogle
export const loginWithGoogle=createAsyncThunk('auth/loginWithGoogle',
async(userToken,thunkAPI)=>{
try {
    return await authService.loginWithGoogle(userToken);
} catch (error) {
    const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}})



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    RESET(state){
        state.twoFactor=false
        state.message=''
        state.isLoggedIn=false
        state.isLoading=false
        state.isSuccess=false
        state.isError=false
    },
    USER_STATUS(state){
        let ver=0;
        let sus=0;
    state.users.map((user)=>{
        if(user.isVerified && user.role!=='suspended')ver++;
        if(!user.isVerified && user.role==='suspended')sus++
    })
    state.noOfVerifiedUsers=ver;
    state.noOfSuspendedUsers=sus;
    }
  },
  extraReducers:(builder)=>{
     builder
    //Register User
            .addCase(register.pending,(state,action)=>{
                state.isLoading=true;
            })
            .addCase(register.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.isError=false
                state.isLoggedIn=true
                state.user=action.payload.data
                state.message=action.payload.message
                toast.success("Registration Successful")
            })
            .addCase(register.rejected,(state,action)=>{
                state.isLoading=false
                state.isSuccess=false
                state.isLoggedIn=false
                state.isError=true
                state.message=action.payload.message
                state.user=null
                console.log(action.payload)
                toast.error(action.payload)
            })

        //Login User
        .addCase(login.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false
            state.user=action.payload.data
            state.message=action.payload.message
            state.isError=false
            state.isSuccess=true
            state.twoFactor=false
            state.isLoggedIn=true
            toast.success("Login Successful")
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isLoggedIn=false
            state.isError=true
            console.log(action.payload)
            if(action.payload==='New Device has detected'){
                state.twoFactor=true
                toast.success("New Device Detected")
            }
            state.message=action.payload
            state.user=null
        })

        //loginWithGoogle
        .addCase(loginWithGoogle.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(loginWithGoogle.fulfilled,(state,action)=>{
            state.isLoading=false
            state.user=action.payload.data
            state.message=action.payload.message
            state.isError=false
            state.isSuccess=true
            state.isLoggedIn=true
            toast.success(action.payload.message)
        })
        .addCase(loginWithGoogle.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isLoggedIn=false
            state.isError=true
            state.message=action.payload
            state.user=null
            toast.error(action.payload.message)
            console.log(action.payload)
        })

        //sendLoginCode
        .addCase(sendLoginCode.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(sendLoginCode.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.isLoggedIn=false
            state.message=action.payload.message
            toast.success('Login Code Sent to your Email, Please check')
        })
        .addCase(sendLoginCode.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isLoggedIn=false
            state.isError=true
            state.message=action.payload.message
            toast.error(action.payload)
            console.log(action.payload);
        })

        //LoginWithCode
        .addCase(loginWithCode.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(loginWithCode.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            if(action.payload.message==='Login Successful with Code'){
                state.message=action.payload.message
                state.twoFactor=false
                state.isLoggedIn=true
                state.user=action.payload.data
                state.isSuccess=true
                toast.success("Login Successful in New Device")
            }else{
                state.message=action.payload.message
                state.isSuccess=false
                state.isLoggedIn=false
                toast.error(action.payload.message)
            }
        })
        .addCase(loginWithCode.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isLoggedIn=false
            state.isError=true
            state.message=action.payload.message
            state.user=null
            toast.error(action.payload)
            console.log(action.payload)
        })

         //Logout User
         .addCase(logout.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.isLoggedIn=false
            state.user=null
            state.message=action.payload.message
            toast.success(action.payload.message)
        })
        .addCase(logout.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isLoggedIn=false
            state.isError=true
            state.message=action.payload.message
            state.user=null
            toast.error(action.payload)
            console.log(action.payload)
        })
         //Get Login Status
         .addCase(getLoginStatus.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(getLoginStatus.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.isLoggedIn=action.payload
        })
        .addCase(getLoginStatus.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            console.log(action.payload)
        })
        //getUser
        .addCase(getUser.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(getUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.user=action.payload.data
        })
        .addCase(getUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.payload.message
            console.log(action.payload)
        })
        //updateUser
        .addCase(updateUser.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.user=action.payload.data
            toast.success('User Updated Successfully')
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.payload.message
            toast.error(action.payload.message)
            console.log(action.payload)
        })

         //sendVerificationEmail
         .addCase(sendVerificationEmail.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(sendVerificationEmail.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.message=action.payload.data
            toast.success(action.payload.data)
        })
        .addCase(sendVerificationEmail.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.payload.message
            toast.error(action.payload.message)
            console.log(action.payload)
        })

        //Verify User
         .addCase(verifyUser.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(verifyUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.message=action.payload.message
            toast.success(action.payload.message)
        })
        .addCase(verifyUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.payload.message
            toast.error(action.payload.message)
            console.log(action.payload)
        })

        //changePassword
        .addCase(changePassword.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(changePassword.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.message=action.payload.message
            toast.success(action.payload.message)
        })
        .addCase(changePassword.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.payload.message
            toast.error(action.payload.message)
            console.log(action.payload)
        })

        //forgotPassword
        .addCase(forgotPassword.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(forgotPassword.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.message=action.payload.message
            toast.success(action.payload.message)
        })
        .addCase(forgotPassword.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.payload.message
            toast.error(action.payload.message)
            console.log(action.payload)
        })

         //resetPassword
         .addCase(resetPassword.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(resetPassword.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.message=action.payload.message
            toast.success(action.payload.message)
        })
        .addCase(resetPassword.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.payload.message
            toast.error(action.payload.message)
            console.log(action.payload)
        })

        //getUsers
        .addCase(getUsers.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(getUsers.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.users=action.payload.data
            state.message=action.payload.message
            console.log(action.payload.data);
            //toast.success(action.payload.message)
        })
        .addCase(getUsers.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.payload.message
            toast.error(action.payload.message)
            console.log(action.payload)
        })

        //deleteUser
        .addCase(deleteUser.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.message=action.payload.message
            toast.success(action.payload.message)
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.payload.message
            toast.error(action.payload.message)
            console.log(action.payload)
        })
        //updateRole
        .addCase(updateRole.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(updateRole.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.message=action.payload.message
            toast.success(action.payload.message)
        })
        .addCase(updateRole.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.payload.message
            toast.error(action.payload.message)
            console.log(action.payload)
        })
  }
});

export const {RESET,USER_STATUS} = authSlice.actions

export default authSlice.reducer