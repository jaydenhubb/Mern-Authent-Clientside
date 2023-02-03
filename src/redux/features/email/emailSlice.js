import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import emailService from "./emailService"

const initialState = {
    sending: false,
    sent:false,
    msg: ""
}

export const sendAutoMail = createAsyncThunk(
    "auth/sendAutoMail",
    async (emailData, thunkApi) => {
      try {
        return await emailService.sendAutoMail(emailData);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkApi.rejectWithValue(message);
      }
    }
  );

const emailSlice = createSlice({
    name:"email",
    initialState,
    reducers:{
        emailReset(state){
            state.sending= false;
            state.sent=false;
            state.msg= "";
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(sendAutoMail.pending, (state, action) => {
            state.sending = true;
          })
          .addCase(sendAutoMail.fulfilled, (state, action) => {
            state.sending = false;
            state.msg = action.payload;
            state.sent = true;
            toast.success(action.payload)
          })
          .addCase(sendAutoMail.rejected, (state, action) => {
            state.sending = false;
            state.msg = action.payload;
            state.sent = false;
            toast.error(action.payload)
          })
    }

})

export const {emailReset} = emailSlice.actions
export default emailSlice.reducer