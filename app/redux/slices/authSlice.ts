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
// type InitialState = {
//   value: AuthState;
// }

// type AuthState = {
//   isAuth: boolean;
//   username: string;
//   is_student: boolean;
//   is_teacher: boolean;
//   loading: boolean;
//   error: string | null;
// }

// Define the authentication state interface
export interface AuthState {
  isAuth: boolean;
  username: string;
  is_student: boolean;
  is_teacher: boolean;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: AuthState = {
  isAuth: false,
  username: "",
  is_student: false,
  is_teacher: false,
  loading: false,
  error: null,
};
// const initialState: InitialState={
//   value: {
//     isAuth: false,
//     username: "",
//     is_student: false,
//     is_teacher: false, 
//     loading: false, 
//     error: null,
//   } as AuthState,
// } 

// >>> old? Create the auth slice
// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginUserStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     loginUserSuccess: (state, action: PayloadAction<AuthState['user']>) => {
//       state.user = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     loginUserFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logoutUser: (state) => initialState,


//     // >> this will bypass the username checking/unable to make posts to my/classes (enroll)
//     // logInUser: (state, action: PayloadAction<string>) => {
//     //   state.value.isAuth = true;
//     //   state.value.username = action.payload;
//     // }
//   },
// });


// Create the auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess: (state, action: PayloadAction<Partial<AuthState>>) => {
      state.isAuth = true;
      state.username = action.payload.username;
      state.is_student = action.payload.is_student || false;
      state.is_teacher = action.payload.is_teacher || false;
      state.loading = false;
      state.error = null;
    },
    loginUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.isAuth = false;
      state.username = "";
      state.is_student = false;
      state.is_teacher = false;
      state.loading = false;
      state.error = null;
    },
  },
});

// Export action creators and reducer
export const { loginUserStart, loginUserSuccess, loginUserFailure, logoutUser } = authSlice.actions;

export default authSlice.reducer;