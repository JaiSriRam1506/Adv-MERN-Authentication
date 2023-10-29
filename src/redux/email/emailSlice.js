import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import emailService from './emailService';
import { toast } from 'react-toastify';

const initialState = {
    sendingEmail:false,
    sentEmail:false,
    msg:''
}

//sendAutomatedEmail
export const sendAutomatedEmail=createAsyncThunk('email/sendAutomateEmail',
async function(emailData,thunkAPI){
    try {
        return await emailService.sendAutomatedEmail(emailData)
    } catch (error) {
        const message=(error.response && error.response.data && error.response.data.message)|| error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    EMAIL_RESET(state){
        state.sendingEmail=false
        state.sentEmail=false
        state.msg=''
    }
  },
  extraReducers:(builder)=>{
    builder
      //Send Automated Email
           .addCase(sendAutomatedEmail.pending,(state,action)=>{
                state.sendingEmail=true
           })
           .addCase(sendAutomatedEmail.fulfilled,(state,action)=>{
            state.sendingEmail=false
            state.sentEmail=true
            state.msg=action.payload.message
           })
           .addCase(sendAutomatedEmail.rejected,(state,action)=>{
            state.sendingEmail=false
            state.sentEmail=false
            state.msg=action.payload.message
            toast.error(action.payload.message)
           })
  }
});

export const {EMAIL_RESET} = emailSlice.actions

export default emailSlice.reducer