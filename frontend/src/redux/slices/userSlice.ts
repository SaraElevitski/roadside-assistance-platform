import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Volunteer } from "../../models/volunteers.model";

const userSlice = createSlice({
   
initialState: {
        user: null as Volunteer | null,
        message:""
        
    },
    name: "user",
    reducers: {
        logInUser: (state, action: PayloadAction<Volunteer>) => {
            state.user = action.payload
            
        },
        logOutUser: (state) => {
            state.user = null
        },
         setMessage: (state, action: PayloadAction<string>) => {
           state.message=action.payload
          
        },
    }

})

export default userSlice
export const { logInUser, logOutUser ,setMessage} = userSlice.actions