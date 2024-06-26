import authService from "@/services/authService"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const storedUser = localStorage.getItem("user");
const user = storedUser ? storedUser : null;

export interface AuthStateProps {
   user: any | null,
   error: boolean | null | any,
   success: boolean,
   loading: boolean
}

const initialState: AuthStateProps = {
   user: user ? user : null,
   error: false,
   success: false,
   loading: false
}

export const register = createAsyncThunk("auth/register",
   async (user: any, thunkAPI) => {
      const data: any = await authService.register(user)

      //check errors
      if (data.errors) {
         return thunkAPI.rejectWithValue(data.errors[0])
      }

      return data
   }
)

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      reset: (state) => {
         state.loading = false,
            state.error = false,
            state.success = false
      }
   },
   extraReducers: (builder) => {
      builder.addCase(register.pending, (state) => {
         state.loading = true,
            state.error = false
      }).addCase(register.fulfilled, (state, action) => {
         state.loading = false,
            state.success = true,
            state.error = null,
            state.user = action.payload
      }).addCase(register.rejected, (state, action) => {
         state.loading = false,
            state.error = action.payload,
            state.user = null
      })
   }
})

export const { reset } = authSlice.actions