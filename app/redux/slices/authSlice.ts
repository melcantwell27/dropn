//authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the authentication state interface
// export interface AuthState {
//   user: {
//     username: string;
//     is_student: boolean;
//     is_teacher: boolean;
//     // Add any additional fields from your Django User model as needed
//   } | null;
//   loading: boolean;
//   error: string | null;
// }

// // Define the initial state
// const initialState: AuthState = {
//   user: null,
//   loading: false,
//   error: null,
// };
type InitialState = {
  value: AuthState;
}

type AuthState = {
  isAuth: boolean;
  username: string;
  is_student: boolean;
  is_teacher: boolean;
}

const initialState: InitialState={
  value: {
    isAuth: false,
    username: "",
    is_student: false,
    is_teacher: false
  } as AuthState,
} 

// Create the auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // loginUserStart: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // loginUserSuccess: (state, action: PayloadAction<AuthState['user']>) => {
    //   state.user = action.payload;
    //   state.loading = false;
    //   state.error = null;
    // },
    // loginUserFailure: (state, action: PayloadAction<string>) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    logoutUser: (state) => initialState,
    logInUser: (state, action: PayloadAction<string>) => {
      state.value.isAuth = true;
      state.value.username = action.payload;
    }
  },
});

// Export action creators and reducer
export const { logInUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;