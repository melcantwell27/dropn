// // classSlice.ts

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import store from '../store';

// interface Class {
//   id: string;
//   datetime: string;
//   // Add any other properties you need for a class
// }

// interface ClassesState {
//   all: Class[];
//   enrolled: Class[];
// }

// const initialState: ClassesState = {
//   all: [],
//   enrolled: [],
// };


// const classesSlice = createSlice({
//   name: 'classes',
//   initialState,
//   reducers: {
//     setClassList(state, action: PayloadAction<Class[]>) {
//       state.classList = action.payload;
//     },
//     setEnrolledClasses(state, action: PayloadAction<Class[]>) {
//       state.enrolledClasses = action.payload;
//     },
//     enrollUserInClass(state, action: PayloadAction<string>) {
//       state.enrolledClasses.push(action.payload);
//     },
//     unenrollUserFromClass(state, action: PayloadAction<string>) {
//       state.enrolledClasses = state.enrolledClasses.filter(id => id !== action.payload);
//     },
//   },
// });

// export const { setClassList, setEnrolledClasses, enrollUserInClass, unenrollUserFromClass } = classSlice.actions;

// export default classesSlice.reducer;
